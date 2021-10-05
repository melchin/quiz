import "./App.css";
import { ILocationConsolidatedWeather } from "interfaces/weatherAPI";
import React, { ChangeEvent, useCallback, useState } from "react";
import { consolidatedWeatherTodayByLocation } from "utils/search";
import { L_CW_WEATHER_STATE_ABBR, L_CW_WEATHER_STATE_NAME, L_TITLE, WEATHER_DOMAIN, WEATHER_IMG_URL } from "constants/weatherResponseFields";
import { translateWeather } from "utils/conversions";

function App() {
  let [weather, setWeather] = useState<
    ILocationConsolidatedWeather | null | undefined
  >(undefined);

  let [loading, setLoading] = useState<boolean>(false);

  let [location, setLocation] = useState<string>('');

  const onChangeLocation = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setLocation(e?.currentTarget?.value ?? "");
  }, []);

  const fetchWeather = async () => {
    if (location) {
      setLoading(true);
      consolidatedWeatherTodayByLocation(location)
        .then((weatherData) => setWeather(weatherData))
        .catch(e => setWeather(null))
        .finally(() => setLoading(false))
    } else {
      setWeather(undefined)
    }
  }

  return (
    <div className="App">
      <div>
        <label>Location:</label>
        <input type="text" onChange={onChangeLocation} />
        <button type="submit" disabled={!location.length || loading} onClick={fetchWeather}> SUBMIT </button>
      </div>
      <Forecast data={weather} loading={loading} location={location} />
    </div>
  );
}

const Forecast: React.FC<{
  data: ILocationConsolidatedWeather | null | undefined;
  loading: boolean;
  location: string;
}> = (props) => {
  const { data, loading, location } = props;
  if (loading) {
    return <span> Loading Weather Data... </span>
  }
  if (data === undefined) {
    return <span>Type a Location to Find Weather Data</span>
  } else if (data === null) {
    return <span>{`Weather Data Could not be found for ${location}`}</span>
  }
  return (
    <div>
      <h1>{`Today's Forecast in ${data[L_TITLE]}`}</h1>
      <ul style={{ listStyleType: 'none'}}>
        <li>
          <img src={`${WEATHER_DOMAIN}${WEATHER_IMG_URL}${data[L_CW_WEATHER_STATE_ABBR]}.png`} alt={data[L_CW_WEATHER_STATE_NAME]}/>
        </li>
        {Object.keys(data).map((property, index) => {
          const weather = translateWeather(property, data[property as keyof ILocationConsolidatedWeather])
          if (weather) {
            return (
              <li key={property}> 
                {weather}
              </li>
            )
          }
          return null;
        })}
      </ul>
    </div>
  )
};

export default App;
