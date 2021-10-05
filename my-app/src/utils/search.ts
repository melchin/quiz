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

/**
 * This method is necessary in order to get the woeid (Where on Earth ID) so that
 * we can fetch the related Consolidated Weather data
 * @param location The user's input before searching for a location
 * @returns An Array of Parent Location data
 */
export const searchByLocation = async (
  location: string
): Promise<ILocationParent[]> => {
  const res = await fetch(`${WEATHER_DOMAIN}${LOCATION_SEARCH_URL}${location}`);
  return await res.json();
};

/**
 * Collects the Weather data for Today for the provided Location.
 * @param location The user's input before searching for a location.
 * @returns If successful it returns the Consolidated Weather data TODAY for
 * the provided Location. Otherwise we return null if we are unnsuccesful.
 * @assumption - The Location's Time property (which is in a specific time zone),
 * matches the time zone used int he consolidated Weather data for "applicable date".
 */
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
      /**
       * Due to our assumption listed above, we keep the time in the location's time
       * zone. Therefore we grab the yyyy mm dd if it exists. We use this to match it with the
       * consolidated weather data for today's date.
       */
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
