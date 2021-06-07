import React, { useState, useEffect } from "react";
import Chart from "chart.js";
// react plugin used to create charts
import { Bar } from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample2,
} from "variables/charts.js";

import { useDispatch, useSelector } from "react-redux";
import { loadDashboardByArea } from "../../redux/actions/Caja";

import Header from "components/Headers/Indexes/Index.js";
import LineTrend from "components/Graphs/LineTrend";

const AreaDashbord = ({idArea=null,children}) => {
  const dispatch = useDispatch();
  const { cajaDashboardByArea } = useSelector(({ caja }) => caja);
  const [order, setorder] = useState({
    orderClientes:'monto',
    orderConceptos:'monto',
  });
  const [currentmonth, setcurrentmonth] = useState(new Date().getMonth());

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  useEffect(() => {
    dispatch(loadDashboardByArea({...order,area: idArea,
      mes: currentmonth+1 }));
  }, [order,idArea,currentmonth,dispatch]);

  const handleClickLine = (element) => {
    if (element.length > 0) {
      var ind = element[0]._index;
      dispatch(loadDashboardByArea({
        ...order,
        area: idArea,
        mes: ind+1
      }));
      setcurrentmonth(ind)
    }
  }
  const toMoneyFormat=(input)=>{
    return input.toLocaleString('en-US', {
      minimumFractionDigits: 0
    });
  }

  return (
    <>
      <Header
        emitido={cajaDashboardByArea?.lineEmitido?.find(e=>e.mes===currentmonth+1)?.monto}
        cobrado={cajaDashboardByArea?.lineCobrado?.find(e=>e.mes===currentmonth+1)?.monto}
        emitidoPrev={cajaDashboardByArea?.lineEmitido?.find(e=>e.mes===currentmonth)?.monto}
        cobradoPrev={cajaDashboardByArea?.lineCobrado?.find(e=>e.mes===currentmonth)?.monto}
        clientes={cajaDashboardByArea?.clientes ? cajaDashboardByArea.clientes : []}
        clientesPrev={cajaDashboardByArea?.clientesPrev ? cajaDashboardByArea.clientesPrev.length : "-"}
        top={cajaDashboardByArea?.clientes ? cajaDashboardByArea.clientes[0] : "-"}
        children={children}
      />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Información general
                    </h6>
                    <h2 className="text-white mb-0">Emitido vs. Cobrado {new Date().getFullYear()}</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <LineTrend lineCobrado={cajaDashboardByArea?.lineCobrado} lineEmitido={cajaDashboardByArea?.lineEmitido} handleClick={handleClickLine} />
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Performance
                    </h6>
                    <h2 className="mb-0">Total de servicios</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Bar
                    data={{
                      labels: cajaDashboardByArea?.lineEmitido?.map(a => ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", 'Sep', 'Oct', 'Nov', 'Dic'][a.mes - 1]),
                      datasets: [
                        {
                          label: "Órdenes",
                          data: cajaDashboardByArea?.lineEmitido?.map(a => a.cantidad),
                        }
                      ],
                    }}
                    options={chartExample2.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="6">
            <Card className="shadow area-table-content">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Clientes</h3>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive >
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Cliente</th>
                    <th scope="col" onClick={()=>{setorder({...order,orderClientes:'cantidad'})}} style={{cursor: 'pointer'}}>
                      Cantidad { order.orderClientes==='cantidad' ? <i className={`fa fa-arrow-down`}></i> : ""}</th>
                    <th scope="col" onClick={()=>{setorder({...order,orderClientes:'monto'})}} style={{cursor: 'pointer'}}>
                      Monto { order.orderClientes==='monto' ? <i className={`fa fa-arrow-down`}></i> : ""}</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    cajaDashboardByArea?.clientes?.map((cliente,key)=>
                      <tr key={key}>
                        <th scope="row" className="table-w-line-break">{cliente.cliente}</th>
                        <td>{cliente.cantidad}</td>
                        <td>S/.{toMoneyFormat(cliente.monto)}</td>
                      </tr>
                    )
                  }
                </tbody>
              </Table>
            </Card>
          </Col>
          <Col xl="6">
            <Card className="shadow area-table-content">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Conceptos</h3>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive >
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Concepto</th>
                    <th scope="col" onClick={()=>{setorder({...order,orderConceptos:'cantidad'})}} style={{cursor: 'pointer'}}>Cantidad { order.orderConceptos==='cantidad' ? <i className={`fa fa-arrow-down`}></i> : ""}</th>
                    <th scope="col" onClick={()=>{setorder({...order,orderConceptos:'monto'})}} style={{cursor: 'pointer'}}>Monto { order.orderConceptos==='monto' ? <i className={`fa fa-arrow-down`}></i> : ""}</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    cajaDashboardByArea?.conceptos?.map((concepto,key)=>
                      <tr key={key}>
                        <th scope="row" className="table-w-line-break">{concepto.concepto}</th>
                        <td>{concepto.cantidad}</td>
                        <td>S/.{toMoneyFormat(concepto.monto)}</td>
                      </tr>
                    )
                  }
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AreaDashbord;
