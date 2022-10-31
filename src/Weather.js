import React from 'react';
import Accordion from 'react-bootstrap/Accordion';


class Weather extends React.Component {
    
  render() {
    return (
      <>
        <h1>Forecast Data</h1>
        <Accordion defaultActiveKey="0">
          {this.props.weatherData.map((datetime, index) =>
            <Accordion.Item eventKey={index} key={index} >
              <Accordion.Header>
                {datetime.datetime}
              </Accordion.Header>
              <Accordion.Body>
                {datetime.description}
              </Accordion.Body>
            </Accordion.Item>
          )}
        </Accordion>
      </>
    )
  }
}

export default Weather;