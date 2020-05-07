import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
//import Formulario from "./Formulario";
import DataService from "../services/data.service";

class FormModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagen: "",
    };
    // Creo una referencia al botón cerrar para cerrar el modal una vez que hago submit del formulario
    this.cerrarModal = React.createRef();
  }

  handleChangeImage = (event) => {
    // Cargo el nombre del archivo en this.state.imagen
    this.setState({ imagen: event.target.files[0].name });
    // Creo el documento y le inserto el archivo que he subido
    const data = new FormData();
    data.append("file", event.target.files[0]);
    // Llamo al servicio y realizo el upload de la imagen
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

    let nombreImagen = "";

    if (this.state.imagen !== "") {
      //Si el he subido un nuevo archivo, asigno el nombre de la imagen que se encuentra en this.state
      nombreImagen = this.state.imagen;
    } else {
      // Si no he subido una nueva imagen, le dejo el valor por defecto del instrumento en props
      nombreImagen = event.target.imagen.value;
    }

    // Construyo el instrumento a enviar
    const instrumento = {
      id: event.target.id.value,
      instrumento: event.target.instrumento.value,
      descripcion: event.target.descripcion.value,
      marca: event.target.marca.value,
      modelo: event.target.modelo.value,
      precio: event.target.precio.value,
      costoEnvio: event.target.costoEnvio.value,
      cantidadVendida: event.target.cantidadVendida.value,
      imagen: nombreImagen,
    };

    // Si el id del instrumento es mayor a 0, hago una llamada PUT, sino hago un POST
    if (instrumento.id > 0) {
      this.updateInstrumento(instrumento);
    } else {
      this.addInstrumento(instrumento);
    }
  };

  //Método que actualiza un instrumento PUT
  updateInstrumento(instrumento) {
    DataService.update(instrumento.id, instrumento)
      .then((response) => {
        console.log(response);
        this.props.afterUpdate();
        alert("Instrumento actualizado con éxito!");
      })
      .then(this.cerrarModal.current.click())
      .catch((e) => {
        console.log(e);
        alert("Ha ocurrido un error, intenta más tarde!");
      });
  }

  //Método que agrega un nuevo instrumento POST
  addInstrumento(instrumento) {
    DataService.save(instrumento)
      .then((response) => {
        console.log(response.data);
        this.props.afterUpdate();
        alert("Instrumento agregado con éxito!");
      })
      .then(this.cerrarModal.current.click())
      .catch((e) => {
        console.log(e);
        alert("Ha ocurrido un error, intenta más tarde!");
      });
  }

  render() {
    //const config = [this.props.onHide, this.props.instrumento, this.props.show];

    return (
      <React.Fragment>
        <Modal
          instrumento={this.props.instrumento}
          onHide={this.props.onHide}
          show={this.props.show}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {this.props.instrumento.id === 0 ? "Añadir" : "Editar"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Control
                type="text"
                name="id"
                defaultValue={this.props.instrumento.id}
                hidden
                required
              />
              <Form.Group controlId="formBasicNro1">
                <Form.Label>Titulo instrumento</Form.Label>
                <Form.Control
                  type="text"
                  name="instrumento"
                  defaultValue={this.props.instrumento.instrumento}
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
                      defaultValue={this.props.instrumento.marca}
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
                      defaultValue={this.props.instrumento.modelo}
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
                  defaultValue={this.props.instrumento.descripcion}
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
                      defaultValue={this.props.instrumento.precio}
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
                      defaultValue={this.props.instrumento.costoEnvio}
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
                      defaultValue={this.props.instrumento.cantidadVendida}
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
                  defaultValue={this.props.instrumento.imagen}
                  placeholder="Ingrese una imagen del producto"
                  disabled
                  required
                />
                <Form.Control
                  type="file"
                  name="archivo"
                  onChange={this.handleChangeImage}
                />
              </Form.Group>

              <Modal.Footer>
                <Button onClick={this.props.onHide} ref={this.cerrarModal}>
                  Cerrar
                </Button>
                <Button variant="primary" type="submit">
                  Guardar cambios
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

export default FormModal;
