import {
  L_CW_WIND_SPEED,
  L_CW_WIND_DIRECTION_COMPASS,
  L_CW_MIN_TEMP,
  L_CW_MAX_TEMP,
  L_CW_THE_TEMP,
  L_CW_AIR_PRESSURE,
  L_CW_HUMIDITY,
  L_CW_VISIBILITY,
  L_CW_PREDICTABILITY
} from "constants/weatherResponseFields";

/**
 * This is an object of all the properties we wish to display to the user.
 */
const weatherTranslations: Record<string, string> = {
  [L_CW_WIND_SPEED]: "Wind Speed",
  [L_CW_WIND_DIRECTION_COMPASS]: "Wind Direction",
  [L_CW_MIN_TEMP]: "Minimum Temperature",
  [L_CW_MAX_TEMP]: "Maximum Temperature",
  [L_CW_THE_TEMP]: "Current Temperature",
  [L_CW_AIR_PRESSURE]: "Air Pressure",
  [L_CW_HUMIDITY]: "Humidity",
  [L_CW_VISIBILITY]: "Visibility",
  [L_CW_PREDICTABILITY]: "Predictability"
};

/**
 * Instead of decoding the values that come from the network request,
 * we have this utility function that converts values into a format that
 * we want to see in the UI. This allows us to keep the significance of the values
 * returned from the back end.
 * @param value The number we are rounding.
 * @param multiplier The number of digits we want to keep
 * @param unit The unit to suffix
 * @returns
 */
export const roundWithUnits = (
  value: number,
  multiplier: number = 100,
  unit: string
) => {
  return `${Math.round(value * multiplier) / multiplier} ${unit}`;
};

/**
 * Within the Consolidated Weather Model, we translate the keys and convert the related values
 * to be readable in the UI. For this App we only include the values that we want to display
 * to the user.
 * @param key Object's Key
 * @param value Object's Value
 * @returns Stringified key/value
 */
export const translateWeather = (key: string, value: any): string | null => {
  const name = weatherTranslations[key];
  if (!name || value == null) {
    return null;
  }
  let val = value;
  switch (key) {
    case L_CW_WIND_SPEED: {
      val = roundWithUnits(value, 100, "mph");
      break;
    }
    case L_CW_MIN_TEMP:
    case L_CW_MAX_TEMP:
    case L_CW_THE_TEMP: {
      val = roundWithUnits(value, 100, "C");
      break;
    }
    case L_CW_AIR_PRESSURE: {
      val = roundWithUnits(value, 1, "mbar");
      break;
    }
    case L_CW_HUMIDITY:
    case L_CW_PREDICTABILITY: {
      val = roundWithUnits(value, 10, "%");
      break;
    }
    case L_CW_VISIBILITY: {
      val = roundWithUnits(value, 100, "miles");
      break;
    }
    default:
      break;
  }
  return `${name}: ${val}`;
};
