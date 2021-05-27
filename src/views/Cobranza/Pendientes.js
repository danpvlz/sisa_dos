import React, { useCallback, useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  Button,
  Col,
  FormGroup,
  Input,
} from "reactstrap";
// core components
import PendingsHeader from "components/Headers/PendingsHeader.js";
import { useDispatch, useSelector } from "react-redux";
import { listPendings, indicatorsPendings } from "../../redux/actions/Cuenta";
import SearchAsociado from "components/Selects/SearchAsociado";
import SearchCobrador from "components/Selects/SearchCobrador";
import Loading from "../../components/Loaders/LoadingSmall";

const EstadoCuenta = () => {
  const dispatch = useDispatch();
  const { pendingsList, pendingsIndicators } = useSelector(({ cuenta }) => cuenta);
  const { loading } = useSelector(({ commonData }) => commonData);
  const history = useHistory();
  const handleNew = useCallback(() => history.push('/admin/registro-emision'), [history]);
  const [page, setPage] = useState(1);
  const [search, setsearch] = useState({ "fecha": new Date().toISOString().substring(0, 10) });
  const [month, setmonth] = useState(null);
  const [idAsociado, setidAsociado] = useState(null);
  const [debCollector, setdebCollector] = useState(null);

  const [load, setload] = useState(false);

  useEffect(() => {
    let tsearch = search;
    if (idAsociado == null) {
      delete tsearch.idAsociado;
    } else {
      tsearch.idAsociado = idAsociado;
    }
    if (load) {
      setsearch(tsearch);
      dispatch(listPendings(page, search));
      dispatch(indicatorsPendings(search));
    }
  }, [idAsociado]);

  useEffect(() => {
    let tsearch = search;
    if (debCollector == null) {
      delete tsearch.debCollector;
    } else {
      tsearch.debCollector = debCollector;
    }
    if (load) {
      setsearch(tsearch);
      dispatch(listPendings(page, search));
      dispatch(indicatorsPendings(search));
    }
  }, [debCollector]);

  useEffect(() => {
    let tsearch = search;
    if (month == null) {
      tsearch.fecha = new Date().toISOString().substring(0, 10);
    } else {
      tsearch.fecha = month;
    }
    if (load) {
      setsearch(tsearch);
      dispatch(listPendings(page, search));
      dispatch(indicatorsPendings(search));
    }
  }, [month]);

  useEffect(() => {
    dispatch(indicatorsPendings(search));
    dispatch(listPendings(page, search));
    setload(true);
  }, [page])

  return (
    <>
      <PendingsHeader
        pendientes={pendingsIndicators[0]?.pendientes}
        cobrado={pendingsIndicators[0]?.cobrado}
        emitidos={pendingsIndicators[0]?.emitidos}
        anulado={pendingsIndicators[0]?.anulado}
      />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 bg-secondary">
                <Row >
                  <Col lg="12" className="border-0 d-flex justify-content-between">
                    <h3 className="mb-0">Pendientes</h3>
                  </Col>
                  <Col lg="12 ">
                    <hr className="my-4 " />
                    <Row className="bg-secondary">
                      <Col lg="3"  >
                        <FormGroup className="mb-0 pb-4">
                          <label
                            className="form-control-label"
                            htmlFor="filterMonth"
                          >
                            Fecha
                      </label>
                          <Input
                            className="form-control-alternative"
                            id="filterMonth"
                            placeholder="filterMonth"
                            type="date"
                            defaultValue={new Date().toISOString().substring(0, 10)}
                            onChange={(e) => {
                              setmonth(e.target.value == "" ? null : e.target.value);
                            }}
                          />
                        </FormGroup >
                      </Col>
                      <Col lg="4"  >
                        <FormGroup className="mb-0 pb-4">
                          <label
                            className="form-control-label"
                            htmlFor="filterMonth"
                          >
                            Asociado
                      </label>
                          <SearchAsociado setVal={setidAsociado} />
                        </FormGroup>
                      </Col>
                      <Col lg="4"  >
                        <FormGroup className="mb-0 pb-4">
                          <label
                            className="form-control-label"
                            htmlFor="filterMonth"
                          >
                            Cobrador
                      </label>
                          <SearchCobrador setVal={setdebCollector} />
                        </FormGroup>
                      </Col>
                      <Col lg="1" className="text-right my-auto ml-auto d-none">
                        <Button color="success" type="button">
                          <img src={require("../../assets/img/theme/excel_export.png").default} style={{ height: "20px" }} />
                        </Button>
                      </Col>
                    </Row>

                  </Col>

                </Row>
              </CardHeader>
              {
                !loading || pendingsList?.data ?
                  <>
                    <Table className="align-items-center table-flush" responsive>
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">Fecha emision</th>
                          <th scope="col">Serie-Número</th>
                          <th scope="col">Asociado</th>
                          <th scope="col">Total</th>
                          <th scope="col">Estado</th>
                          <th scope="col">Cobrador</th>
                          <th scope="col">Anulación</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          pendingsList?.data?.map((cuenta, key) =>

                            <tr key={key}>
                              <td scope="row">
                                {cuenta.fechaEmision}
                              </td>
                              <td>
                                {`${cuenta.serie + '-' + cuenta.numero}`}
                              </td>
                              <td>
                                {cuenta.asociado}
                              </td>
                              <td className="text-center">
                                <small>S/.</small> {cuenta.total}
                              </td>
                              <td>
                                <Badge color="" className="badge-dot mr-4">
                                  <i className={cuenta.estado == 1 ? "bg-info" : cuenta.estado == 2 ? "bg-success" : "bg-danger"} />
                                  {cuenta.estado == 1 ? "Por cancelar" : cuenta.estado == 2 ? "Cancelada" : "Anulada"}
                                </Badge>
                              </td>
                              <td>
                                {cuenta.descripcion}
                              </td>
                              <td>
                                {cuenta.fechaAnulacion}
                              </td>
                            </tr>
                          )
                        }

                      </tbody>
                    </Table>
                    <CardFooter className="py-4">
                      <nav aria-label="...">
                        <Pagination
                          className="pagination justify-content-end mb-0"
                          listClassName="justify-content-end mb-0"
                        >
                          <PaginationItem className="disabled">
                            <PaginationLink
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                              tabIndex="-1"
                            >
                              <i className="fas fa-angle-left" />
                              <span className="sr-only">Previous</span>
                            </PaginationLink>
                          </PaginationItem>
                          <PaginationItem className="active">
                            <PaginationLink
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              1
                      </PaginationLink>
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationLink
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              2 <span className="sr-only">(current)</span>
                            </PaginationLink>
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationLink
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              3
                      </PaginationLink>
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationLink
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              <i className="fas fa-angle-right" />
                              <span className="sr-only">Next</span>
                            </PaginationLink>
                          </PaginationItem>
                        </Pagination>
                      </nav>
                    </CardFooter>
                  </>
                  :
                  <Loading />
              }
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default EstadoCuenta;
