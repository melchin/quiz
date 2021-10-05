import {
  LOCATION_SEARCH_URL,
  L_CONSOLIDATED_WEATHER,
  L_P_WOEID,
  WEATHER_DOMAIN,
  WEATHER_SEARCH_URL
} from "constants/weatherResponseFields";
import {
  ILocation,
  ILocationConsolidatedWeather,
  ILocationParent
} from "interfaces/weatherAPI";

export const searchByLocation = async (
  location: string
): Promise<ILocationParent[]> => {
  const res = await fetch(`${WEATHER_DOMAIN}${LOCATION_SEARCH_URL}${location}`);
  return await res.json();
};

export const consolidatedWeatherByLocation = async (
  location: string
): Promise<ILocationConsolidatedWeather[] | null> => {
  const locations = await searchByLocation(location);
  if (locations && locations[0] && locations[0][L_P_WOEID]) {
    const res = await fetch(
      `${WEATHER_DOMAIN}${WEATHER_SEARCH_URL}${locations[0][L_P_WOEID]}`
    );
    const location: ILocation = await res.json();
    return Promise.resolve(location ? location[L_CONSOLIDATED_WEATHER] : null);
  }
  return Promise.resolve(null);
};
