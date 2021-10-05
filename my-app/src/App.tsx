import { ILocationConsolidatedWeather } from "interfaces/weatherAPI";
import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { consolidatedWeatherTodayByLocation } from "utils/search";
import Forecast from "components/Forecast";

function App() {
  let [weather, setWeather] = useState<
    ILocationConsolidatedWeather | null | undefined
  >(undefined);

  let [loading, setLoading] = useState<boolean>(false);

  let [location, setLocation] = useState<string>('');

  const locationInput = useRef<HTMLInputElement>(null)

  const onChangeLocation = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setLocation(e?.currentTarget?.value ?? "");
  }, []);

  const fetchWeather = useCallback(async () => {
    if (location) {
      setLoading(true);
      consolidatedWeatherTodayByLocation(location)
        .then((weatherData) => setWeather(weatherData))
        .catch(e => setWeather(null))
        .finally(() => setLoading(false))
    } else {
      setWeather(undefined)
    }
  }, [location])

  useEffect(() => {
    const ref = locationInput;
    const submit = (e: KeyboardEvent) => {
      if (e.code === 'Enter') {
        ref.current?.blur();
        fetchWeather();
      }
    }
  
    ref.current?.addEventListener('keydown', submit);
    return () => {
      ref.current?.removeEventListener('keydown', submit)
    }
  }, [locationInput, fetchWeather]);

  return (
    <div className="App">
      <div>
        <label>{`Location: `}</label>
        <input ref={locationInput} type="text" onChange={onChangeLocation} />
        <button type="submit" disabled={!location.length || loading} onClick={fetchWeather}> SUBMIT </button>
      </div>
      <Forecast data={weather} loading={loading} location={location} />
    </div>
  );
}

export default App;
