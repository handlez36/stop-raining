import React, { Component, Fragment } from "react";

import CurrentForecast from "./components/CurrentForecast";
import FiveDayForecast from "./components/FiveDayForecast";
import { getGeolocationCoords, getCityState } from "./services/geolocation";
import "./App.css";

class App extends Component {
  state = {
    status: "",
    hasGeolocation: null,
    geolocationData: null,
    locationStr: null
  };

  onGeolocationUpdate = async ({ geolocationData, error }) => {
    const hasGeolocation = !error;
    const status = hasGeolocation
      ? "Yep, you're browser's cool. You're good!"
      : error;

    let locationStr = "";
    if (hasGeolocation) {
      const { data, error } = await getCityState(
        geolocationData.latitude,
        geolocationData.longitude
      );
      locationStr = data || error;
    }
    this.setState({ geolocationData, status, hasGeolocation, locationStr });
  };

  componentDidMount() {
    getGeolocationCoords(this.onGeolocationUpdate);
    this.setState({ status: "Checking Geolocation availability?" });
  }

  render() {
    const { status, geolocationData, locationStr } = this.state;

    return (
      <div className='App'>
        <p>
          Welcome! It's been raining for 40 days and 40 nights in Atlanta. Let's
          check the upcoming forecast
        </p>
        <div className='request-status'>{status}</div>
        {geolocationData && (
          <Fragment>
            <CurrentForecast
              geolocationData={geolocationData}
              locationStr={locationStr}
            />
            <FiveDayForecast geolocationData={geolocationData} />
          </Fragment>
        )}
      </div>
    );
  }
}

export default App;
