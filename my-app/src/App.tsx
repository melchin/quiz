import "./App.css";
import { ILocationConsolidatedWeather } from "interfaces/weatherAPI";
import React, { ChangeEvent, useCallback, useState } from "react";
import { consolidatedWeatherByLocation } from "utils/search";

function App() {
  let [weather, setWeather] = useState<
    ILocationConsolidatedWeather[] | null | undefined
  >(undefined);

  let [loading, setLoading] = useState<boolean>(false);

  let [location, setLocation] = useState<string>('');

  const onChangeLocation = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setLocation(e?.currentTarget?.value ?? "");
  }, []);

  const fetchWeather = async () => {
    if (location) {
      setLoading(true);
      consolidatedWeatherByLocation(location)
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
        <button type="submit" disabled={!location.length} onClick={fetchWeather}> SUBMIT </button>
      </div>
      <Forecast data={weather} loading={loading} location={location} />
    </div>
  );
}

const Forecast: React.FC<{
  data: ILocationConsolidatedWeather[] | null | undefined;
  loading: boolean;
  location: string;
}> = ({ data, loading, location }) => {
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
      // Return the forecast for each day in the list of consoldatedweather
    </div>
  )
};

export default App;
