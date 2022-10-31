import React from "react";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';

class Movie extends React.Component {
  render() {
    return (
      <>
        <main>
          <Row className="row" xs={1} sm={2} md={3} lg={4}>

            {this.props.movieData.map((element, idx) =>
              // <li key={idx}>{element.title}</li>
              <Card key={idx} className="bg-light border reactCard" style={{ width: '18rem', color:'#b4cde7' }}>
                <Card.Body>
                  <Card.Title className="cardTitle">{element.title}</Card.Title>
                  <Card.Text>
                    {element.overview}
                  </Card.Text>
                  {/* <Button variant="primary">Go somewhere</Button> */}
                </Card.Body>
              </Card>
            )}
            </Row>
        </main>
      </>
    )
  }

}

export default Movie;