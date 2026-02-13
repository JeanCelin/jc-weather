import {
  Sun,
  Cloud,
  CloudRain,
  CloudLightning,
  CloudSnow,
  CloudFog,
  CloudSun,
  Cloudy,
  CloudHail,
} from "lucide-react";

export function getWeatherIconById(id) {
  // Thunderstorm
  if (id >= 200 && id < 300) return CloudLightning;

  // Drizzle
  if (id >= 300 && id < 400) return CloudHail;

  // Rain
  if (id >= 500 && id < 600) {
    if (id === 511) return CloudSnow; // freezing rain
    if (id >= 520) return CloudHail;  // shower
    return CloudRain;
  }

  // Snow
  if (id >= 600 && id < 700) return CloudSnow;

  // Atmosphere
  if (id >= 700 && id < 800) return CloudFog;

  // Clear
  if (id === 800) return Sun;

  // Clouds
  if (id === 801) return CloudSun;
  if (id === 802) return Cloudy;
  if (id >= 803) return Cloud;

  // fallback
  return Cloud;
}
