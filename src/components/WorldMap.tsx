import React, { useState, useEffect } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';
import { useESG } from '../context/ESGContext';
import { Country, MapGeography } from '../types';
import { colorHexMap, getScoreColor } from '../utils/colorUtils';

const geoUrl = "/world.json";

export const WorldMap: React.FC = () => {
  const {
    countries,
    selectedDimension,
    selectedCountry,
    setSelectedCountry
  } = useESG();
  const [position, setPosition] = useState<{ coordinates: [number, number]; zoom: number }>({
    coordinates: [0, 20],
    zoom: 1
  });

  useEffect(() => {
    if (selectedCountry) {
        const destCoordinates = selectedCountry.coordinates
        destCoordinates[1] = Math.max(destCoordinates[1] - 20, 0)
        setPosition({
            coordinates: destCoordinates,
            zoom: 1.5
        });
    } else {
      setPosition({
        coordinates: [0, 20],
        zoom: 1
      });
    }
  }, [selectedCountry]);

  const findCountryByGeoId = (geoId: string): Country | undefined => {
    return countries.find(country => country.code === geoId);
  };

  const handleCountryClick = (geo: MapGeography) => {
    const geoId = geo.id
    const country = findCountryByGeoId(geoId);
    if (country) {
      setSelectedCountry(country);
    }
  };

  const handleBackToWorld = () => {
    setSelectedCountry(null);
    setPosition({
      coordinates: [0, 20],
      zoom: 1
    });
  };

  return (
    <div className="relative w-full h-full">
      {selectedCountry && (
        <button
          className="absolute top-4 left-4 z-10 px-3 py-1 bg-white shadow-md rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50"
          onClick={handleBackToWorld}
        >
          ← Back to World
        </button>
      )}
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 100,
        }}
        width={800}
        height={600}
        className="w-full h-full"
      >
        <ZoomableGroup
            center={position.coordinates}
            zoom={position.zoom}
            translateExtent={[[0, 0], [800, 600]]}
            >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const country = findCountryByGeoId(geo.id);
                let fillColor = "#cccccc";
                if (country) {
                    const colorClass = getScoreColor(country.scores, selectedDimension);
                    fillColor = colorHexMap[colorClass] || "#cccccc";
                }

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => handleCountryClick(geo)}
                    style={{
                      default: {
                        fill: fillColor,
                        outline: "none",
                        stroke: "black",
                        strokeWidth: 0.2,
                      },
                      hover: {
                        fill: fillColor,
                        outline: "none",
                        stroke: "black",
                        strokeWidth: 1,
                        opacity: 0.8,
                      },
                      pressed: {
                        fill: "black",
                        outline: "none",
                        stroke: "black",
                        strokeWidth: 1,
                      }
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};