import {
  L_TITLE,
  L_LOCATION_TYPE,
  L_LATT_LONG,
  L_WOEID,
  L_DISTANCE,
  L_TIME,
  L_SUN_RISE,
  L_SUN_SET,
  L_TIMEZONE_NAME,
  L_PARENT,
  L_CONSOLIDATED_WEATHER,
  L_SOURCES,
  L_P_TITLE,
  L_P_LOCATION_TYPE,
  L_P_LATT_LONG,
  L_P_WOEID,
  L_CW_ID,
  L_CW_APPLICABLE_DATE,
  L_CW_WEATHER_STATE_NAME,
  L_CW_WEATHER_STATE_ABBR,
  L_CW_WIND_SPEED,
  L_CW_WIND_DIRECTION,
  L_CW_WIND_DIRECTION_COMPASS,
  L_CW_MIN_TEMP,
  L_CW_MAX_TEMP,
  L_CW_THE_TEMP,
  L_CW_AIR_PRESSURE,
  L_CW_HUMIDITY,
  L_CW_VISIBILITY,
  L_CW_PREDICTABILITY,
  L_S_TITLE,
  L_S_URL
} from "constants/weatherResponseFields";

/**
 * @prop TITLE - Name of the location
 * @prop LOCATION_TYPE - (City|Region / State / Province|Country|Continent)
 * @prop LATT_LONG - Received as floats comma seperated.
 * @prop WOEID - Where on Earth ID
 * @prop DISTANCE - Only Returned on lattlong search (in meters)
 */
export interface ILocationSearch {
  [L_TITLE]: string;
  [L_LOCATION_TYPE]: string;
  [L_LATT_LONG]: number[];
  [L_WOEID]: number;
  [L_DISTANCE]: number;
}

/**
 * @prop TITLE - Name of the Parent Location
 * @prop LOCATION_TYPE - (City|Region / State / Province|Country|Continent)
 * @prop LATT_LONG - Received as floats comma seperated.
 * @prop WOEID - Where on Earth ID
 */
export interface ILocationParent {
  [L_P_TITLE]: string;
  [L_P_LOCATION_TYPE]: string;
  [L_P_LATT_LONG]: number[];
  [L_P_WOEID]: number;
}

/**
 * @prop ID - Internal identifier for the forecast
 * @prop APPLICABLE_DATE - Date that the forecast or observation pertains to
 * @prop WEATHER_STATE_NAME - Text description of the weather state
 * @prop WEATHER_STATE_ABBR - One or two letter abbreviation of the weather state
 * @prop WIND_SPEED - Speed of Wind
 * @prop WIND_DIRECTION - Direction of Wind
 * @prop WIND_DIRECTION_COMPASS - Compass point of Wind direction
 * @prop MIN_TEMP - Minimum Temperature (C)
 * @prop MAX_TEMP - Max Temperature (C)
 * @prop THE_TEMP - Current Temperature (C)
 * @prop AIR_PRESSURE -Air Pressure (mbar)
 * @prop HUMIDITY - Humidity (%)
 * @prop VISIBILITY - Visibility (miles)
 * @prop PREDICTABILITY - (%) Our interpretation of the level to which the forecasters agree with each other - 100% being a complete consensus.
 * @prop TITLE - Not included in ConsolidatedWeather, but added for convenience
 */
export interface ILocationConsolidatedWeather {
  [L_CW_ID]: number;
  [L_CW_APPLICABLE_DATE]: Date;
  [L_CW_WEATHER_STATE_NAME]: string;
  [L_CW_WEATHER_STATE_ABBR]: string;
  [L_CW_WIND_SPEED]: number;
  [L_CW_WIND_DIRECTION]: number;
  [L_CW_WIND_DIRECTION_COMPASS]: string;
  [L_CW_MIN_TEMP]: number;
  [L_CW_MAX_TEMP]: number;
  [L_CW_THE_TEMP]: number;
  [L_CW_AIR_PRESSURE]: number;
  [L_CW_HUMIDITY]: number;
  [L_CW_VISIBILITY]: number;
  [L_CW_PREDICTABILITY]: number;
  [L_TITLE]?: string;
}

/**
 * @prop TITLE - Name of the source
 * @propt URL - URL of the source
 */
export interface ILocationSource {
  [L_S_TITLE]: string;
  [L_S_URL]: string;
}

/**
 * TITLE - Name of the Location
 * LOCATION - (City|Region / State / Province|Country|Continent)
 * LATT_LONG - Lat and Long Coordinates (Numbers comma separated)
 * TIME - Time in Location
 * SUN_RISE - Time of Sun Rise
 * SUN_SET - Time of Sun Set
 * TIMEZONE_NAME - Name of the timezone that the location is in
 * PARENT - Category
 * CONSOLIDATED_WEATHER - Category
 * SOURCES - Category
 */
export interface ILocation {
  [L_TITLE]: string;
  [L_LOCATION_TYPE]: string;
  [L_LATT_LONG]: number[];
  [L_TIME]: Date;
  [L_SUN_RISE]: Date;
  [L_SUN_SET]: Date;
  [L_TIMEZONE_NAME]: string;
  [L_PARENT]: ILocationParent;
  [L_CONSOLIDATED_WEATHER]: ILocationConsolidatedWeather[];
  [L_SOURCES]: ILocationSource[];
}
