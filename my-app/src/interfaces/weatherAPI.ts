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
 * @prop ID -
 * @prop APPLICABLE_DATE -
 * @prop WEATHER_STATE_NAME -
 * @prop WEATHER_STATE_ABBR -
 * @prop WIND_SPEED -
 * @prop WIND_DIRECTION -
 * @prop WIND_DIRECTION_COMPASS -
 * @prop MIN_TEMP -
 * @prop MAX_TEMP -
 * @prop THE_TEMP -
 * @prop AIR_PRESSURE -
 * @prop HUMIDITY -
 * @prop VISIBILITY -
 * @prop PREDICTABILITY -
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
  [L_TITLE]: string;
}

/**
 * @prop TITLE -
 * @propt URL -
 */
export interface ILocationSource {
  [L_S_TITLE]: string;
  [L_S_URL]: string;
}

/**
 * TITLE -
 * LOCATION -
 * LATT -
 * TIME -
 * SUN -
 * SUN -
 * TIMEZONE -
 * PARENT -
 * CONSOLIDATED -
 * SOURCES -
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
