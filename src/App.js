import './css/App.css';
import React from 'react';
import axios from 'axios';

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
        mapData: [],
        center: '',
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
        
        let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&lat=${this.state.lat}&${this.state.lon}format=json`
        
        console.log(url);

        let cityData = await axios.get(url);
  
        console.log(cityData.data[0]);
        this.setState({
          cityData: cityData.data[0],
          error: false,
        });
      
      } catch(error){
        console.log(error);
        this.setState({
          error: true,
          errorMessage: error.message
        })
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
      <p>{this.state.errorMessage}</p>
      :
      <>
      <p>{this.state.cityData.display_name} {this.state.cityData.lat} {this.state.cityData.lon} {this.state.mapData.center}</p>
      <img src = {`https://maps.locationiq.com/v3/staticmap/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=14`}  alt='map'/>
      </>
      } 
  </>
  );
  }
}

export default App;
