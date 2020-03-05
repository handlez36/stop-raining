import React, { Fragment, useState, useEffect } from "react";
import { shape, string, number } from "prop-types";
import moment from "moment";

import { getCurrentWeather } from "./../services/weather";
import "./CurrentForecast.css";

const ICON_IMG_BASE = "http://openweathermap.org/img/wn";

const parseTime = dt => {
  try {
    return moment.unix(dt).format("dddd h:mm A");
  } catch (e) {
    return null;
  }
};

const parseIconUrl = weather => {
  if (weather && weather.length > 0) {
    const { icon, description } = weather[0];
    const imgUrl = `${ICON_IMG_BASE}/${icon}@2x.png`;
    return { imgUrl, description };
  } else {
    return { imgUrl: "", description: "unknown" };
  }
};

const CurrentForecast = ({ geolocationData, locationStr }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const { latitude, longitude } = geolocationData;
    const getCurrentForecast = async () => {
      const { weatherData, error } = await getCurrentWeather(
        latitude,
        longitude
      );
      setWeatherData(weatherData);
      setError(error);
    };
    getCurrentForecast();
  }, [geolocationData]);

  const { name: city, dt, weather, main: { temp } = {} } = weatherData || {};
  const { imgUrl, description } = parseIconUrl(weather);

  return (
    <div className='current-forecast'>
      {error && (
        <div className='error'>
          Sorry, we're having trouble getting the weather data
        </div>
      )}
      <h4>Current Forecast</h4>
      {weatherData && !error && (
        <Fragment>
          <div className='location'>{locationStr || city}</div>
          <div className='time'>{parseTime(dt)}</div>
          <div className='status'>{description}</div>
          <div className='temperature'>
            <img className='icon' src={imgUrl} alt={description} />
            <div className='digits'>
              {Math.floor(temp)}
              <span className='unit'>&deg;F</span>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

CurrentForecast.propTypes = {
  geolocationData: shape({
    latitude: number,
    longitude: number
  }),
  locationStr: string
};

CurrentForecast.defaultProps = {
  locationStr: ""
};

export default CurrentForecast;
