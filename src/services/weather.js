import axios from "axios";

const OPEN_WEATHER_BASE_URL = "http://api.openweathermap.org/data/2.5";
const OPEN_WEATHER_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

export const getCurrentWeather = async (latitude, longitude) => {
  const url = `${OPEN_WEATHER_BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${OPEN_WEATHER_KEY}&units=imperial`;
  const response = await axios.get(url);

  if (response && response.status === 200) {
    return { weatherData: response.data, error: null };
  } else {
    return { weatherData: null, error: "Error pulling five day forecast" };
  }
};

export const getFiveDayForecast = async (latitude, longitude) => {
  const url = `${OPEN_WEATHER_BASE_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${OPEN_WEATHER_KEY}&units=imperial`;
  const response = await axios.get(url);

  if (response && response.status === 200) {
    return { forecastData: response.data, error: null };
  } else {
    return { forecastData: null, error: "Error pulling five day forecast" };
  }
};
