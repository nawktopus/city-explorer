import React from "react";
import WeatherDay from "./WeatherDay";

class Weather extends React.Component {
  render() {
    let weatherDaySingleForecast = this.props.weatherData.map((element, idx) => {
      return <WeatherDay 
        datetime={element.datetime}
        description = {element.description}
        key={idx}
      />
    })
    return (
      <>
        <main>
          {weatherDaySingleForecast}
        </main>    
      </>
    )
  }
}

export default Weather;