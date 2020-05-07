import React, { Component } from "react";
import Navigation from "./Navigation";
import DataService from "../services/data.service";
import { Container, Col, Row, Button, Table } from "react-bootstrap";
import FormModal from "./FormModal";
import Pagination from "react-js-pagination";

class Gestor extends Component {
  constructor() {
    super();
    this.state = {
      instrumentos: [],
      formModalShow: false,
      instrumento: {
        id: 0,
        instrumento: "",
        descripcion: "",
        marca: "",
        modelo: "",
        precio: 0,
        costoEnvio: "",
        cantidadVendida: 0,
        imagen: "",
      },
      activePage: 1,
      rangoPaginas: 4,
      totalItems: 0,
    };
    this.refreshTable = this.refreshTable.bind(this);
  }

  componentDidMount() {
    this.refreshTable();
  }

  // Método que refresca la tabla
  refreshTable() {
    this.getNumberOfInstrumentos();
    this.getAllInstrumentos();
  }

  // Método que cambia la página activa
  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber }, () => {
      this.refreshTable();
    });
  }

  // Obtengo la cantidad de elementos que hay en la base de datos
  getNumberOfInstrumentos() {
    DataService.getNumberOfItems()
      .then((response) => {
        this.setState({
          totalItems: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  // Método que obtiene los instrumentos por página
  getAllInstrumentos() {
    DataService.getAll(this.state.activePage, this.state.rangoPaginas)
      .then((response) => {
        this.setState({
          instrumentos: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  // Método que elimina un instrumento (DELETE)
  deleteInstrumento(instrumento) {
    DataService.delete(instrumento.id)
      .then((response) => {
        console.log(response.data);
        this.refreshTable();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    let formModalClose = () => {
      // Oculto el modal y regreso el instrumento a estado vacío
      this.setState({
        formModalShow: false,
        instrumento: {
          id: 0,
          instrumento: "",
          descripcion: "",
          marca: "",
          modelo: "",
          precio: 0,
          costoEnvio: "",
          cantidadVendida: 0,
          imagen: "",
        },
      });
    };

    return (
      <React.Fragment>
        <Navigation></Navigation>
        <Container className="container mt-5 textoTabla">
          <Row>
            <Col>
              <h1>ABM de instrumentos</h1>
            </Col>
            <Col>
              <Button
                variant="primary"
                className="float-right"
                onClick={() => this.setState({ formModalShow: true })}
              >
                Añadir
              </Button>
              {/* Ventana modal */}

              <FormModal
                show={this.state.formModalShow}
                onHide={formModalClose}
                instrumento={this.state.instrumento}
                afterUpdate={this.refreshTable}
              />
            </Col>
          </Row>
          <Row>
            <div className="scrollTabla">
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Instrumento</th>
                    <th>Descripcion</th>
                    <th>Modelo</th>
                    <th>Marca</th>
                    <th>Precio</th>
                    <th>Costo Envío</th>
                    <th>Cant. Vendida</th>
                    <th>Imagen</th>
                    <th>Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {this.state.instrumentos.map((row, i) => (
                    <tr key={row.id} className="filasTabla">
                      <th>{row.id}</th>
                      <td>{row.instrumento}</td>
                      <td>{row.descripcion}</td>
                      <td>{row.modelo}</td>
                      <td>{row.marca}</td>
                      <td>{row.precio}</td>
                      <td>{row.costoEnvio}</td>
                      <td>{row.cantidadVendida}</td>
                      <td>{row.imagen}</td>
                      <td>
                        <Button
                          variant="success"
                          block
                          onClick={() => {
                            this.setState({
                              formModalShow: true,
                              instrumento: row,
                            });
                          }}
                        >
                          Editar
                        </Button>
                        {"     "}
                        <Button
                          variant="danger"
                          block
                          onClick={() => {
                            if (
                              window.confirm(
                                "Seguro deseas eliminar este instrumento?"
                              )
                            ) {
                              this.deleteInstrumento(row);
                            }
                          }}
                        >
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Row>
          <div className="float-right mt-5">
            <Pagination
              itemClass="page-item"
              linkClass="page-link"
              activePage={this.state.activePage}
              itemsCountPerPage={this.state.rangoPaginas}
              totalItemsCount={this.state.totalItems}
              pageRangeDisplayed={this.state.pageNumber}
              onChange={this.handlePageChange.bind(this)}
            />
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

export default Gestor;
