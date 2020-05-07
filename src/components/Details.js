import React, { Component } from "react";
import Navigation from "./Navigation";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DataService from "../services/data.service";

class Details extends Component {
  constructor() {
    super();
    this.state = {
      instrumentoActual: {
        imagen: "notfound.jpg",
      },
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.getInstrumento(this.props.match.params.id);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getInstrumento(id) {
    DataService.getOne(id)
      .then((response) => {
        this.setState({
          instrumentoActual: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const instrumentoEncontrado = this.state.instrumentoActual;

    const imagePath =
      "http://localhost:9001/api/v1/instrumentos/images/" +
      instrumentoEncontrado.imagen;

    if (instrumentoEncontrado.costoEnvio === "G") {
      this.costoDescripcion = (
        <span className="envioGratis">
          <img
            src={"http://localhost:9001/api/v1/instrumentos/images/camion.png"}
            alt="envio gratis"
          ></img>
          Envío gratis a todo el País
        </span>
      );
    } else {
      this.costoDescripcion = (
        <span className="costoEnvio">
          Costo de Envío Interior de Argentina: $
          {instrumentoEncontrado.costoEnvio}
        </span>
      );
    }

    return (
      <React.Fragment>
        <Navigation></Navigation>
        <Container className="container mt-5">
          <Row>
            <Col>
              <img
                src={imagePath}
                alt="Imagen producto"
                className="imgDetails"
              ></img>
              <div className="descripcionInstrumento">
                <h5>Descipción</h5>
                <p>{instrumentoEncontrado.descripcion}</p>
              </div>
            </Col>
            <Col>
              <p className="cantidadVendida">
                {instrumentoEncontrado.cantidadVendida} vendidos
              </p>
              <h3>{instrumentoEncontrado.instrumento}</h3>
              <h2 className="precio">${instrumentoEncontrado.precio}</h2>
              <br></br>
              <p>Marca: {instrumentoEncontrado.marca}</p>
              <p>Modelo: {instrumentoEncontrado.modelo}</p>
              <p>Costo de envío:</p>
              <p>{this.costoDescripcion}</p>
              <br></br>
              <button className="btn btn-primary">Agregar al carrito</button>
            </Col>
          </Row>
          <Row>
            <a className="btn btn-primary" href="/productos">
              Volver
            </a>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default Details;
