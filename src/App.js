import './css/App.css';
import React from 'react';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Figure from 'react-bootstrap/Figure';
import Weather from './Weather';

class App extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        city: '',
        cityData: [],
        error: false,
        errorMessage: '',
        lat: '',
        lon: '',
        mapURL: '',
        center: '',
        weatherData: [],
        // cityToDisplay: [],
        }
      }
    // handleInput prevents form from automatically submitting or prevents the page from refreshing 
    handleInput = (e) => {
      e.preventDefault();
      this.setState({
        city: e.target.value
      })
    }

    getCityData = async (e) => {
      e.preventDefault();
      console.log(this.state.city);
  
      try {
        
        let LocationURL = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`
        console.log(LocationURL);

        let locationData = await axios.get(LocationURL);
        
        let cityToDisplay = locationData.data[0];
        
        console.log(cityToDisplay);
        console.log(cityToDisplay.lat);
        console.log(cityToDisplay.lon)


        let mapURL = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${cityToDisplay.lat},${cityToDisplay.lon}&zoom=14`
        // https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${cityToDisplay.lat},${cityToDisplay.lon}&zoom=14&markers=icon:small-red-cutout|${cityToDisplay.lat},${cityToDisplay.lon}
        console.log(mapURL);

        this.setState({
          lat: cityToDisplay.lat,
          lon: cityToDisplay.lon,
          cityData: cityToDisplay,
          map: mapURL,
          error: false,
        });
        console.log(cityToDisplay);
      this.getWeatherData(cityToDisplay);

      } catch(error){
        console.log(error);
        this.setState({
          error: true,
          errorMessage: error.message
        })
      }
    }

    getWeatherData = async (location) => {
      try {
        
        let url = `${process.env.REACT_APP_SERVER}/weather?cityName=${this.state.city}&lat=${location.lat}&lon=${location.lon}`
  
        console.log('weather url', url);
  
        let weatherData = await axios.get(url)
  
        this.setState({
          weatherData: weatherData.data,
        });
      } catch (error) {
        this.setState({
          error: true,
          errorMessage: error.message
        });
      }
    }
  render() {
    return (
  <>

  {/*form and button creation*/}
  {/* form use function getCityData upon click; and uses function handleInput to prevent page and submit from being pushed prematurely */}
  <form onSubmit={this.getCityData}> 
      <label> Enter a City!
        <input type= "text" onInput={this.handleInput}/>
        <button type= "submit" > Explore!</button>
      </label>
  </form>
      {/*Ternary W ? T : F */}
      {
      this.state.error
      ?
      <Alert variant='warning'>{this.state.errorMessage}</Alert>
            :
            this.state.cityData &&
            <>
            <Figure>
              <Figure.Image
                width={500}
                height={500}
                alt="Map of city chosen by the user"
                src={this.state.map}
              />
              <Figure.Caption>
                {this.state.cityData.display_name} {this.state.cityData.lat}  {this.state.cityData.lon}
              </Figure.Caption>
            </Figure>
            <Weather
              weatherData={this.state.weatherData}
            />
      </>
      } 
  </>
  );
  }
}

export default App;
