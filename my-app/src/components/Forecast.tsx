import React from "react";
import { ILocationConsolidatedWeather } from "interfaces/weatherAPI";
import {
  L_CW_WEATHER_STATE_ABBR,
  L_CW_WEATHER_STATE_NAME,
  L_TITLE,
  WEATHER_DOMAIN,
  WEATHER_IMG_URL
} from "constants/weatherResponseFields";
import { translateWeather } from "utils/conversions";

const Forecast: React.FC<{
  data: ILocationConsolidatedWeather | null | undefined;
  loading: boolean;
  location: string;
}> = props => {
  const { data, loading, location } = props;
  if (loading) {
    return <span> Loading Weather Data... </span>;
  }
  if (data === undefined) {
    return <span>Type a Location to Find Weather Data</span>;
  } else if (data === null) {
    return <span>{`Weather Data Could not be found for ${location}`}</span>;
  }
  return (
    <div>
      <h1>{`Today's Forecast in ${data[L_TITLE]}`}</h1>
      <ul style={{ listStyleType: "none" }}>
        <li>
          <img
            src={`${WEATHER_DOMAIN}${WEATHER_IMG_URL}${data[L_CW_WEATHER_STATE_ABBR]}.png`}
            alt={data[L_CW_WEATHER_STATE_NAME]}
          />
        </li>
        {Object.keys(data).map(property => {
          const weather = translateWeather(
            property,
            data[property as keyof ILocationConsolidatedWeather]
          );
          if (weather) {
            return <li key={property}>{weather}</li>;
          }
          return null;
        })}
      </ul>
    </div>
  );
};

export default Forecast;
