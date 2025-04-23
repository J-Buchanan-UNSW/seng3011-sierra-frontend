import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';
import { useESG } from '../context/ESGContext';
import { MapGeography } from '../types';
import { getScoreColor, colorHexMap } from '@/utils/colorUtils';

const geoUrl = "/world.json";

export const WorldMap: React.FC = () => {
  const {
    countries,
    selectedCountry,
    setSelectedCountry,
    selectedDimension
  } = useESG();

  const findCountryByCode = (code: any) => {
    return countries.find((country: any) => {
      if (country.code) {
        return country.code.toString() == code.toString();
      }
      return false;
    });
  }

  const handleCountryClick = (geo: MapGeography) => {
    const geoCode = geo.id;
    const country = findCountryByCode(geoCode);
    if (country) {
      setSelectedCountry(country);
    }
  };

  const handleBackToWorld = () => {
    setSelectedCountry(null);
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
            center={[0, 400]}
            zoom={1.4}
            translateExtent={[[0, 0], [800, 600]]}
            >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const country = findCountryByCode(geo.id);
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