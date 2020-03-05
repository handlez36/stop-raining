import React, { useState, useEffect } from "react";

import { getFiveDayForecast } from "./../services/weather";

import "./FiveDayForecast.css";

const FiveDayForecast = ({ geolocationData }) => {
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const { latitude, longitude } = geolocationData;
    const getForecast = async () => {
      const { forecastData, error } = await getFiveDayForecast(
        latitude,
        longitude
      );
      setForecastData(forecastData);
      setError(error);
    };
    getForecast();
  }, [geolocationData]);

  console.log("Five day forecast: ", forecastData);

  return <div className='five-day-forecast'></div>;
};

export default FiveDayForecast;
