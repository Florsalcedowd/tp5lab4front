import React, { Component } from "react";
import Navigation from "./Navigation";
import DataService from "../services/data.service";
import { Container, Form, Button, Col, Row } from "react-bootstrap";

class Formulario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      instrumento: "",
      descripcion: "",
      marca: "",
      modelo: "",
      precio: 0,
      costoEnvio: "",
      cantidadVendida: 0,
      imagen: "",
    };
  }

  componentDidMount() {
    this._isMounted = true;
    console.log(this.state);
    console.log(this.props.instrumentos);
    if (window.localStorage.getItem("id") > 0) {
      this.getInstrumento();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getInstrumento() {
    DataService.getOne(window.localStorage.getItem("id"))
      .then((response) => {
        this.setState({
          id: response.data.id,
          instrumento: response.data.instrumento,
          descripcion: response.data.descripcion,
          marca: response.data.marca,
          modelo: response.data.modelo,
          precio: response.data.precio,
          costoEnvio: response.data.costoEnvio,
          cantidadVendida: response.data.cantidadVendida,
          imagen: response.data.imagen,
        });
        console.log(this.state);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChangeImage = (event) => {
    this.setState({ imagen: event.target.files[0].name });
    const data = new FormData();
    data.append("file", event.target.files[0]);
    DataService.uploadFile(data)
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const instrumento = {
      id: this.state.id,
      instrumento: this.state.instrumento,
      descripcion: this.state.descripcion,
      marca: this.state.marca,
      modelo: this.state.modelo,
      precio: this.state.precio,
      costoEnvio: this.state.costoEnvio,
      cantidadVendida: this.state.cantidadVendida,
      imagen: this.state.imagen,
    };

    if (this.state.id > 0) {
      this.updateInstrumento(instrumento);
    } else {
      this.addInstrumento(instrumento);
    }
  };

  updateInstrumento(instrumento) {
    DataService.update(instrumento.id, instrumento)
      .then((response) => {
        console.log(response);
        this.handleUpdateChange(response.data);
      })
      .then(this.props.history.push("/gestor"))
      .catch((e) => {
        console.log(e);
      });
  }

  addInstrumento(instrumento) {
    DataService.save(instrumento)
      .then((response) => {
        console.log(response);
        var handleAddChange = this.props.handleAddChange;
        handleAddChange(response.data);
      })
      .then(this.props.history.push("/gestor"))
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    return (
      <React.Fragment>
        <Navigation></Navigation>
        <Container className="mt-5 w-80">
          <h1>{this.state.id === 0 ? "Añadir" : "Editar"}</h1>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicNro1">
              <Form.Label>Titulo instrumento</Form.Label>
              <Form.Control
                type="text"
                name="instrumento"
                value={this.state.instrumento}
                onChange={this.handleChange}
                placeholder="Ingrese un título"
                required
              />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group controlId="formBasicNro1">
                  <Form.Label>Marca</Form.Label>
                  <Form.Control
                    type="text"
                    name="marca"
                    value={this.state.marca}
                    onChange={this.handleChange}
                    placeholder="Ingrese una marca"
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicNro1">
                  <Form.Label>Modelo</Form.Label>
                  <Form.Control
                    type="text"
                    name="modelo"
                    value={this.state.modelo}
                    onChange={this.handleChange}
                    placeholder="Ingrese un modelo"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="formBasicNro1">
              <Form.Label>Descripcion</Form.Label>
              <Form.Control
                as="textarea"
                name="descripcion"
                value={this.state.descripcion}
                onChange={this.handleChange}
                placeholder="Ingrese una descripcion"
                required
              />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group controlId="formBasicNro1">
                  <Form.Label>Precio</Form.Label>
                  <Form.Control
                    type="number"
                    name="precio"
                    value={this.state.precio}
                    onChange={this.handleChange}
                    placeholder="Ingrese nombre"
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicNro1">
                  <Form.Label>Costo de envío</Form.Label>
                  <Form.Control
                    type="text"
                    name="costoEnvio"
                    value={this.state.costoEnvio}
                    onChange={this.handleChange}
                    placeholder="Ingrese costo de envío"
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicNro1">
                  <Form.Label>Cantidad vendida</Form.Label>
                  <Form.Control
                    type="number"
                    name="cantidadVendida"
                    value={this.state.cantidadVendida}
                    onChange={this.handleChange}
                    placeholder="Ingrese cantidad vendida"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="formBasicNro1">
              <Form.Label>Imagen del instrumento</Form.Label>
              <Form.Control
                type="text"
                name="imagen"
                value={this.state.imagen}
                placeholder="Ingrese una imagen del producto"
                disabled
                required
              />
              <Form.Control
                type="file"
                name="imagen"
                onChange={this.handleChangeImage}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </React.Fragment>
    );
  }
}

export default Formulario;
