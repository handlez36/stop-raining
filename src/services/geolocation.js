import axios from "axios";

const OPEN_CAGE_BASE_URL = "https://api.opencagedata.com/geocode/v1/json";

export const getGeolocationCoords = setGeolocationFunc => {
  if (!navigator.geolocation) {
    setGeolocationFunc({
      geolocationData: null,
      error: "Sorry, no geolocation."
    });
  }

  navigator.geolocation.getCurrentPosition(
    position => {
      setGeolocationFunc({ geolocationData: position.coords, error: null });
    },
    () => {
      setGeolocationFunc({
        geolocationData: null,
        error: "Error getting your location."
      });
    }
  );
  return {};
};

export const getCityState = async (latitude, longitude) => {
  const url = `${OPEN_CAGE_BASE_URL}?q=${latitude}+${longitude}&key=${process.env.REACT_APP_OPEN_CAGE_API_KEY}`;
  const response = await axios.get(url);

  if (response && response.status === 200) {
    const locationStr = parseLocationDetails(response);
    return { data: locationStr, error: null };
  } else {
    return { data: null, error: "Error finding location details" };
  }
};

const parseLocationDetails = response => {
  const { data: { results = [] } = {} } = response;
  if (results.length > 0) {
    const { components: { town, state_code } = {} } = results[0];
    if (town && state_code) {
      return `${town}, ${state_code}`;
    }
  } else {
    return null;
  }
};
