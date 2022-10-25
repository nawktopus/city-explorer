import './App.css';
import React from 'react';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Header from './Header.js';
import Footer from './Footer.js';
import Main from './Main.js'; 
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

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
        
        console.log(url);

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
  <Header />
        <Main />
        <Footer />

        <Container>
          <Form>
            <Form.Group>
            <Form.Control 
            type = 'City'
            placeholder = 'Search'
            onChange={this.handleInput}
            />
            <Button variant='primary' type='click' onClick={this.getCityData} class="p-2">
              Explore now!
            </Button>
            </Form.Group>
          </Form>

  {this.state.cityData.place_id && (
            <>
<<<<<<< HEAD
              <Alert variant='primary' style={{margin: '25px', boxShadow: '2px 2px 2px gray'}} >
=======
              <Alert variant='primary' style={{margin: '50px', boxShadow: '2px 2px 2px gray'}} >
>>>>>>> f0f5b14af84f2a0bdb5ddeb780ace0ecf71d6a38
                <h2>Location: {this.state.cityData.display_name}</h2>
                <h2>Latitude: {this.state.cityData.lat}</h2>
                <h2>Longitude: {this.state.cityData.lon}</h2>
              </Alert>
              <img style={{display: 'block', margin: 'auto', boxShadow: '2px 2px 2px #b4cde7', borderRadius: '50px'}}
<<<<<<< HEAD
            src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=10`}
            alt='map'
=======
            src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=12`}
            alt='static map'
>>>>>>> f0f5b14af84f2a0bdb5ddeb780ace0ecf71d6a38
          />
            </>
          )}

  {this.state.error && (
<<<<<<< HEAD
            <Alert variant='danger' style={{margin: '100px', boxShadow: '2px 2px 2px red'}}>
=======
            <Alert variant='danger' style={{margin: '500px', boxShadow: '2px 2px 2px red'}}>
>>>>>>> f0f5b14af84f2a0bdb5ddeb780ace0ecf71d6a38
              <h2>Error: {this.state.errorMessage}</h2>
            </Alert>
          )}
      </Container>

  </>
  );
  }
}


export default App;
