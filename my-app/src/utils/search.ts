import {
  LOCATION_SEARCH_URL,
  L_CONSOLIDATED_WEATHER,
  L_CW_APPLICABLE_DATE,
  L_P_WOEID,
  L_TIME,
  L_TITLE,
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

export const consolidatedWeatherTodayByLocation = async (
  location: string
): Promise<ILocationConsolidatedWeather | null> => {
  const locations = await searchByLocation(location);
  if (locations && locations[0] && locations[0][L_P_WOEID]) {
    const res = await fetch(
      `${WEATHER_DOMAIN}${WEATHER_SEARCH_URL}${locations[0][L_P_WOEID]}`
    );
    const location: ILocation = await res.json();
    if (location) {
      const timeInLocation = String(location[L_TIME]).match(/\d\d\d\d-\d\d-\d\d/)?.[0];
      const locationWeatherDataToday = location[L_CONSOLIDATED_WEATHER].find(weatherData => String(weatherData[L_CW_APPLICABLE_DATE]) === timeInLocation)
      if (locationWeatherDataToday) {
        locationWeatherDataToday[L_TITLE] = location[L_TITLE];
      }
      return Promise.resolve(locationWeatherDataToday ?? null);
    }
  }
  return Promise.resolve(null);
};
