import React, { useState, useEffect } from "react";
import moment from "moment";
import { AreaChart, Area, XAxis, YAxis, LabelList } from "recharts";

import { getFiveDayForecast } from "./../services/weather";
import "./FiveDayForecast.css";

const formatForecastData = forecastData => {
  if (!forecastData) return null;

  const { list = [] } = forecastData;

  return list.slice(0, 10).map(hourlyForecast => {
    const { dt, main: { temp = 0 } = {} } = hourlyForecast;
    const forecastTime = moment.unix(dt).format("h A");

    return { name: forecastTime, temp: Math.floor(temp) };
  });
};

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

  const formattedData = formatForecastData(forecastData);
  console.log("Five day forecast: ", forecastData);
  console.log("Formatted data: ", formattedData);

  return (
    <div className='five-day-forecast'>
      <div className='title'>
        <h4>Forecast for next few hours</h4>
      </div>
      <AreaChart
        width={1200}
        height={200}
        data={formattedData}
        margin={{ top: 10, right: 10, left: 50, bottom: 0 }}
      >
        <XAxis dataKey='name' tickLine={false} />
        <YAxis
          dataKey='temp'
          type='number'
          domain={["dataMin - 5", "dataMax + 5"]}
          hide
        />
        <Area
          type='monotone'
          dataKey='temp'
          stroke='#FFD342'
          fill='#FFF5D9'
          isAnimationActive={false}
        >
          <LabelList
            data={formattedData}
            dataKey='temp'
            position='top'
            offset={10}
          />
        </Area>
      </AreaChart>
    </div>
  );
};

export default FiveDayForecast;
