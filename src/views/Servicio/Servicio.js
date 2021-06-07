import React, { useCallback, useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import PaginationComponent from "react-reactstrap-pagination";

// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  Table,
  Container,
  Row,
  Button,
  Col,
  FormGroup,
  Input,
} from "reactstrap";
// core components
import SearchAsociado from "components/Selects/SearchAsociado.js";
import SearchCobrador from "components/Selects/SearchCobrador.js";
import { useDispatch, useSelector } from "react-redux";
import { listServices } from "../../redux/actions/Servicio";
import Loading from "../../components/Loaders/LoadingSmall";

const Servicios = () => {
  const dispatch = useDispatch();
  const { servicesList } = useSelector(({ servicio }) => servicio);
  const { loading } = useSelector(({ commonData }) => commonData);
  const [search, setsearch] = useState({});
  const [since, setsince] = useState(null);
  const [until, setuntil] = useState(null);
  const [idAsociado, setIdAsociado] = useState(null);
  const [debCollector, setdebCollector] = useState(null);
  const [page, setPage] = useState(1);
  const history = useHistory();
  const handleNew = useCallback(() => history.push('/admin/registro-servicio'), [history]);

  useEffect(() => {
    let tsearch = search;
    if (idAsociado == null) {
      delete tsearch.idAsociado;
    } else {
      tsearch.idAsociado = idAsociado;
    }
    if (debCollector == null) {
      delete tsearch.debCollector;
    } else {
      tsearch.debCollector = debCollector;
    }
    if (since == null) {
      delete tsearch.since;
    } else {
      tsearch.since = since;
    }
    if (until == null) {
      delete tsearch.until;
    } else {
      tsearch.until = until;
    }
    setsearch(tsearch);
    dispatch(listServices(page, tsearch));
  }, [dispatch,idAsociado,debCollector,since,until,search,page]);
  
  return (
    <>
      <div className="header pb-8 pt-9 d-flex align-items-center">
        <span className="mask bg-gradient-info opacity-8" />
      </div>
      {/* Page content */}
      <Container className="mt--9" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 bg-secondary">
                <Row >
                  <Col lg="12" className="border-0 d-flex justify-content-between">
                    <h3 className="mb-0">Servicios</h3>
                    <Button
                      className="btn-new-xl btn-icon d-none d-md-block"
                      color="primary"
                      onClick={handleNew}
                    >
                      <span className="btn-inner--icon">

                        <i className="fa fa-plus" />
                      </span>
                      <span className="btn-inner--text">Nuevo servicio</span>
                    </Button>
                    <Button
                      className="btn-new-small icon icon-shape bg-primary text-white rounded-circle shadow d-sm-none"
                      onClick={handleNew}
                    >
                      <i className="fas fa-plus" />
                    </Button>
                  </Col>
                  <Col lg="12 ">
                    <hr className="my-4" />
                    <Row className="bg-secondary">
                      <Col lg="2"  >
                        <FormGroup className="mb-0 pb-4">
                          <label
                            className="form-control-label"
                            htmlFor="filterMonth"
                          >
                            Desde
                      </label>
                          <Input
                            className="form-control-alternative"
                            id="filterMonth"
                            placeholder="filterMonth"
                            type="date"
                            onChange={(e) => {
                              setsince(e.target.value === "" ? null : e.target.value)
                            }}
                          />
                        </FormGroup >
                      </Col>
                      <Col lg="2"  >
                        <FormGroup className="mb-0 pb-4">
                          <label
                            className="form-control-label"
                            htmlFor="filterMonth"
                          >
                            Hasta
                      </label>
                          <Input
                            className="form-control-alternative"
                            id="filterMonth"
                            placeholder="filterMonth"
                            type="date"
                            onChange={(e) => {
                              setuntil(e.target.value === "" ? null : e.target.value)
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
                          <SearchAsociado setVal={setIdAsociado} />
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
                    </Row>
                  </Col>
                </Row>
              </CardHeader>
              {
                !loading || servicesList?.data ?
                  <>
                    <Table className="align-items-center table-flush" responsive>
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">Asociado</th>
                          <th scope="col">Fecha</th>
                          <th scope="col">Servicio</th>
                          <th scope="col">Actividad actual</th>
                          <th scope="col">Usuario</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          servicesList?.data?.map((servicio, key) =>
                            <tr key={key}>
                              <td>
                                {servicio.asociado}
                              </td>
                              <td>
                                {servicio.fecha}
                              </td>
                              <td>
                                {servicio.descripcionServicio}
                              </td>
                              <td>
                                {servicio.actividadActual}
                              </td>
                              <td>
                                {servicio.nombres}
                              </td>
                            </tr>
                          )
                        }

                      </tbody>
                    </Table>
                    <CardFooter className="py-4">
                      <nav aria-label="..." className="pagination justify-content-end mb-0">
                        <PaginationComponent
                          listClassName="justify-content-end mb-0"
                          firstPageText="<<"
                          lastPageText=">>"
                          previousPageText="<"
                          nextPageText=">"
                          totalItems={servicesList?.meta?.total ? servicesList?.meta?.total : 0}
                          pageSize={10}
                          onSelect={(selectedPage) => setPage(selectedPage)}
                          defaultActivePage={page}
                        />
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

export default Servicios;
