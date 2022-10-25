import './App.css';
import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        city: '',
        cityData: [],
        error: false,
        errorMessage: ''
        }
      }

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
        
        let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`
  
        let cityData = await axios.get(url);
  
        console.log(cityData.data[0]);
        this.setState({
          cityData: cityData.data[0],
          error: false
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
  <form onSubmit={this.getCityData}>
  <label > Pick a City!
      <input type="text" onInput={this.handleInput}/>
      <button type='submit'>Explore!</button>
  </label>
  </form>

  {
    this.state.error
    ?
    <p>{this.state.errorMessage}</p>
    :
    <p>{this.state.cityData.display_name}</p>
  }

  </>
  );
}
}


export default App;
