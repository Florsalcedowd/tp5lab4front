import React, { Component } from "react";
import Navigation from "./Navigation";
/* import { instrumentos } from "../data/instrumentos.json"; */
import CardProducto from "./CardProducto";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import DataService from "../services/data.service";
import Pagination from "react-js-pagination";
import { Col } from "react-bootstrap";

class Products extends Component {
  constructor() {
    super();
    this.state = {
      instrumentos: [],
      activePage: 1,
      rangoPaginas: 6,
      totalItems: 0,
    };
  }

  // Llamo al método que trae los datos de la tabla
  componentDidMount() {
    this.refreshTable();
  }

  // Método que refresca los datos en la tabla
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

  render() {
    const instrumentos = this.state.instrumentos.map((instrumento, i) => {
      return (
        <CardProducto
          key={instrumento.id}
          id={instrumento.id}
          imagen={instrumento.imagen}
          precio={instrumento.precio}
          costoEnvio={instrumento.costoEnvio}
          cantidadVendida={instrumento.cantidadVendida}
          instrumento={instrumento.instrumento}
        ></CardProducto>
      );
    });
    return (
      <React.Fragment>
        <Navigation></Navigation>
        <Container className="container mt-5">
          <Row>
            <Col>
              <h2>Productos</h2>
            </Col>
            <Col>
              <div className="mt-2 float-right">
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
            </Col>
          </Row>
          <hr></hr>

          <Row className="ml-3">{instrumentos}</Row>

          <hr></hr>
          <div className="mt-2 float-right">
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

export default Products;
