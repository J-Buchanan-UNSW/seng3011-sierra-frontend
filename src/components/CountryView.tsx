import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker } from 'react-simple-maps';
import { useESG } from '../context/ESGContext';
import * as topojson from 'topojson-client';
import { geoCentroid, geoBounds, geoContains } from 'd3-geo';
import { ScoreCard } from './ScoreCard';
import { getScoreColor, colorHexMap } from '@/utils/colorUtils';
import { getCountryWeather } from '@/data/weatherData';

const geoUrl = "/world-countries.json";

export const CountryView: React.FC = () => {
  const navigate = useNavigate();
  const {
    selectedCountry,
    selectedDimension,
    setSelectedCompany
  } = useESG();

  const [geoData, setGeoData] = useState<any>(null);
  const [countryView, setCountryView] = useState<{ center: [number, number]; zoom: number } | null>(null);
  const [countryWeather, setCountryWeather] = useState<any>(null);

  useEffect(() => {
    fetch(geoUrl)
      .then(res => res.json())
      .then(data => setGeoData(data));
  }, []);

  useEffect(() => {
    if (geoData && selectedCountry) {
      const countries: any = topojson.feature(geoData, geoData.objects.countries);
      const country = countries.features.find(
        (f: any) => f.id === selectedCountry.code || f.properties?.code === selectedCountry.code
      );

      if (country) {
        const centroid = geoCentroid(country);
        const bounds = geoBounds(country);

        const lngSpan = Math.abs(bounds[1][0] - bounds[0][0]);
        const latSpan = Math.abs(bounds[1][1] - bounds[0][1]);
        const maxSpan = Math.max(lngSpan, latSpan);

        let zoom = 1.5;
        if (maxSpan < 10) zoom = 10;
        else if (maxSpan < 20) zoom = 6;
        else if (maxSpan < 40) zoom = 3;
        else zoom = 1.5;

        setCountryView({
          center: centroid,
          zoom
        });

        getCountryWeather(selectedCountry.code).then((w) => {
          setCountryWeather(w)
        });
      }
    } else if (selectedCountry) {
      setCountryView({ center: [0, 20], zoom: 1.5 });
    }

  }, [geoData, selectedCountry]);

  if (!selectedCountry || !geoData || !countryView) {
    return null;
  }

  const handleCompanyClick = (companyId: string) => {
    const company: any = Object.values(selectedCountry.companies).find((data: any) => data.id === companyId);
    if (company) {
      setSelectedCompany(company);
      navigate(`/company/${companyId}?name=${encodeURIComponent(company.name)}`);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mt-4">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900">{selectedCountry.name}</h2>
        <p className="text-gray-600">Viewing companies by {selectedDimension} performance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
            <ComposableMap
              projection="geoMercator"
              width={800}
              height={400}
              className="w-full h-full"
            >
              <ZoomableGroup center={countryView.center} zoom={countryView.zoom}>
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const isSelected = geo.properties.code === selectedCountry.code;
                      if (!isSelected) return null;

                      const fillColor = "#5171d1";
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          style={{
                            default: {
                              fill: fillColor,
                              outline: "none",
                              stroke: "#FFFFFF",
                              strokeWidth: 0.5
                            },
                            hover: {
                              fill: fillColor,
                              outline: "none",
                              stroke: "#FFFFFF",
                              strokeWidth: 0.75
                            },
                            pressed: {
                              fill: 'black',
                              outline: "none",
                              stroke: "#FFFFFF",
                              strokeWidth: 1
                            }
                          }}
                        />
                      );
                    })
                  }
                </Geographies>

                {Object.values(selectedCountry.companies).map((company: any) => {
                  let markerPosition: [number, number] = countryView.center;
                  const feature: any = topojson.feature(geoData, geoData.objects.countries)
                  const country = feature.features.find(
                    (f: any) => f.id === selectedCountry.code || f.properties?.code === selectedCountry.code
                  );

                  if (country) {
                    const bounds = geoBounds(country);

                    let attempts = 0;
                    while (attempts < 100) {
                      const randomLng = bounds[0][0] + Math.random() * (bounds[1][0] - bounds[0][0]);
                      const randomLat = bounds[0][1] + Math.random() * (bounds[1][1] - bounds[0][1]);
                      const testPoint: [number, number] = [randomLng, randomLat];

                      if (geoContains(country, testPoint)) {
                        markerPosition = testPoint;
                        break;
                      }

                      attempts++;
                    }
                  }
                  const colorClass = getScoreColor(company.scores, selectedDimension);
                  const fillColor = colorHexMap[colorClass] || "#cccccc";

                  return (
                    <Marker
                      key={company.id}
                      coordinates={markerPosition}
                      onClick={() => handleCompanyClick(company.id)}
                    >
                      <circle
                        r={6 / countryView.zoom}
                        fill={fillColor}
                        stroke="#000000"
                        strokeWidth={2 / countryView.zoom}
                        className="company-dot"
                      />
                    </Marker>
                  );
                })}
              </ZoomableGroup>
            </ComposableMap>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Companies in {selectedCountry.name}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.values(selectedCountry.companies).map((company: any) => {
                const colorClass = "#FFFFFF";

                return (
                  <div
                    key={company.id}
                    className={`border-l-4 ${colorClass} bg-white p-3 rounded shadow-sm cursor-pointer hover:bg-gray-50 transition-colors`}
                    onClick={() => handleCompanyClick(company.id)}
                  >
                    <div className="font-medium text-gray-900">{company.name}</div>
                    <div className="text-sm text-gray-500">{selectedCountry.name}</div>
                    <div className="mt-1 text-sm">
                      {selectedDimension} score: <span className="font-medium">{company.scores[selectedDimension]}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div>
          <ScoreCard
            title={`${selectedCountry.name} ESG Performance`}
            scores={selectedCountry.scores}
          />

          <div className="mt-4 bg-white rounded-lg shadow-sm p-4">
            <h3 className="font-medium text-gray-900 mb-2">Country Statistics</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-gray-600">Companies:</span>
                <span className="font-medium">{Object.keys(selectedCountry.companies).length}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Average ESG Score:</span>
                <span className="font-medium">
                  {Math.round((
                    selectedCountry.scores.environmental +
                    selectedCountry.scores.social +
                    selectedCountry.scores.governance
                  ) / 3)}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Best Performing:</span>
                <span className="font-medium">
                  {
                    selectedCountry.scores.environmental > selectedCountry.scores.social &&
                    selectedCountry.scores.environmental > selectedCountry.scores.governance
                      ? 'Environmental'
                      : selectedCountry.scores.social > selectedCountry.scores.governance
                        ? 'Social'
                        : 'Governance'
                  }
                </span>
              </li>
            </ul>
          </div>

          <div className="mt-4 bg-white rounded-lg shadow-sm p-4">
            <h3 className="font-medium text-gray-900 mb-2">Country Weather</h3>
            {countryWeather ? (<ul className="space-y-2">
              {countryWeather.apparent_temperature_max_celsius && (
                <li className="flex justify-between">
                  <span className="text-gray-600">High:</span>
                  <span className="font-medium">{countryWeather.apparent_temperature_max_celsius.toFixed(2).toString() + "°C"}</span>
                </li>)}
              {countryWeather.apparent_temperature_min_celsius && (
                <li className="flex justify-between">
                  <span className="text-gray-600">Low:</span>
                  <span className="font-medium">{countryWeather.apparent_temperature_min_celsius.toFixed(2).toString() + "°C"}</span>
                </li>)}
              {countryWeather.apparent_temperature_celsius && (
                <li className="flex justify-between">
                  <span className="text-gray-600">Avg:</span>
                  <span className="font-medium">{countryWeather.apparent_temperature_celsius.toFixed(2).toString() + "°C"}</span>
                </li>)}
              {countryWeather.cloud_cover_percentage != null && (
                <li className="flex justify-between">
                  <span className="text-gray-600">Cloud Cover:</span>
                  <span className="font-medium">{countryWeather.cloud_cover_percentage.toFixed(2).toString() + "%"}</span>
                </li>)}
              {countryWeather.daylight_duration_seconds && (
                <li className="flex justify-between">
                  <span className="text-gray-600">Daylight Duration:</span>
                  <span className="font-medium">{Math.round(countryWeather.daylight_duration_seconds / 3600).toString() + " hours"}</span>
                </li>
              )}
              <div className='text-[10px] text-gray-600 text-right pt-[1rem]'>
                From Dr Weather (F11A CHARLIE)
              </div>
            </ul>) :
              (<div>No weather data</div>)
            }
          </div>
        </div>
      </div>
    </div>
  );
};