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

export const roundWithUnits = (
  value: number,
  multiplier: number = 100,
  unit: string
) => {
  return `${Math.round(value * multiplier) / multiplier} ${unit}`;
};

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
