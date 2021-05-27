import React from "react";

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

const Header = ({emitido,cobrado,emitidoPrev,cobradoPrev,clientes,clientesPrev,top}) => {
  const toMoneyFormat=(input)=>{
    return input.toLocaleString('en-US', {
      minimumFractionDigits: 0
    });
  }

  const compare=(cur,prev)=>{
    let response={
      percent: cur>prev ? 100-Math.round((prev/cur)*100) : 100-Math.round((cur/prev)*100),
      color: cur>prev ? 'success' : 'danger',
      orientation: cur>prev ? 'up' : 'down',
    }
    return response;
  }
  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Emitido
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {toMoneyFormat(emitido)}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fa fa-calendar-check" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className={`text-${compare(emitido,emitidoPrev).color} mr-2`}>
                        <i className={`fa fa-arrow-${compare(emitido,emitidoPrev).orientation}`} /> {compare(emitido,emitidoPrev).percent}%
                      </span>{" "}
                      <span className="text-nowrap">al mes pasado</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Cobrado
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {toMoneyFormat(cobrado)}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-success text-white rounded-circle shadow">
                          <i className="ni ni-check-bold" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className={`text-${compare(cobrado,cobradoPrev).color} mr-2`}>
                        <i className={`fa fa-arrow-${compare(cobrado,cobradoPrev).orientation}`} /> {compare(cobrado,cobradoPrev).percent}%
                      </span>{" "}
                      <span className="text-nowrap">al mes pasado</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Clientes
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{clientes.length}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-primary text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className={`text-${compare(clientes.length,clientesPrev).color} mr-2`}>
                        <i className={`fa fa-arrow-${compare(clientes.length,clientesPrev).orientation}`} /> {compare(clientes.length,clientesPrev).percent}%
                      </span>{" "}
                      <span className="text-nowrap">al mes pasado</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Top
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{top.cliente}</span>
                      </div>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                      {
                        Math.round(
                          top.monto/
                          clientes.map(item => item.monto).reduce((prev, next) => {return prev + next},0)
                          *100
                        )
                      }%
                      </span>{" "} 
                      <span className="text-nowrap">Del total de ventas</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
