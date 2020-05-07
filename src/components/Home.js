import React, { Component } from "react";
import Navigation from "./Navigation";
import { Row, Container } from "react-bootstrap";

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <Navigation></Navigation>
        <Container className="mt-5">
          <Row className="home">
            <h1>Musical Hendrix</h1>
            <br></br>
            <p>
              tienda de instrumentos musicales con ya más de 15 años de
              experiencia. Tenemos el conocimiento y la capacidad como para
              informarte acerca de las mejores elecciones para tu compra
              musical.
            </p>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default Home;
