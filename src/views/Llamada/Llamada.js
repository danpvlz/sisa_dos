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
import SearchAsociado from "components/Selects/SearchAsociado.js";
import SearchCobrador from "components/Selects/SearchCobrador.js";
import { useDispatch, useSelector } from "react-redux";
import { listCalls, exportPhoneCalls } from "../../redux/actions/Llamada";

const Llamadas = () => {
  const dispatch = useDispatch();
  const { phoneCallList, meta } = useSelector(({ llamada }) => llamada);
  const [search, setsearch] = useState({});
  const [since, setsince] = useState(null);
  const [until, setuntil] = useState(null);
  const [idAsociado, setIdAsociado] = useState(null);
  const [debCollector, setdebCollector] = useState(null);
  const [page, setPage] = useState(1);
  const history = useHistory();
  const handleNew = useCallback(() => history.push('/admin/registro-llamada'), [history]);

  useEffect(() => {
    let tsearch=search;
    if(idAsociado == null){
      delete tsearch.idAsociado;
    }else{
      tsearch.idAsociado=idAsociado;
    }
    setsearch(tsearch);
    dispatch(listCalls(page,tsearch))
  }, [idAsociado]);

  useEffect(() => {
    let tsearch=search;
    if(debCollector == null){
      delete tsearch.debCollector;
    }else{
      tsearch.debCollector=debCollector;
    }
    setsearch(tsearch);
    dispatch(listCalls(page,tsearch))
  }, [debCollector]);

  useEffect(() => {
    let tsearch=search;
    if(since == null){
      delete tsearch.since;
    }else{
      tsearch.since=since;
    }
    setsearch(tsearch);
    dispatch(listCalls(page,tsearch))
  }, [since]);

  useEffect(() => {
    let tsearch=search;
    if(until == null){
      delete tsearch.until;
    }else{
      tsearch.until=until;
    }
    setsearch(tsearch);
    dispatch(listCalls(page,tsearch))
  }, [until]);

  useEffect(() => {
    dispatch(listCalls(page,search))
  }, [page])
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
                    <h3 className="mb-0">Llamadas</h3>
                    <Button
                      className="btn-new-xl btn-icon d-none d-md-block"
                      color="primary"
                      onClick={handleNew}
                    >
                      <span className="btn-inner--icon">

                        <i className="fa fa-plus" />
                      </span>
                      <span className="btn-inner--text">Nueva llamada</span>
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
                            defaultValue="lucky.jesse"
                            id="filterMonth"
                            placeholder="filterMonth"
                            type="date"
                            onChange={(e) => {
                              setsince(e.target.value == "" ? null : e.target.value)
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
                            defaultValue="lucky.jesse"
                            id="filterMonth"
                            placeholder="filterMonth"
                            type="date"
                            onChange={(e) => {
                              setuntil(e.target.value == "" ? null : e.target.value)
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
                          <SearchAsociado  setVal={setIdAsociado}/>
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
                          <SearchCobrador setVal={setdebCollector}/>
                        </FormGroup>
                      </Col>
                      <Col lg="2" className="text-right ml-auto">
                        <Button color="success" type="button" onClick={()=>dispatch(exportPhoneCalls(search))}>
                          <img src={require("../../assets/img/theme/excel_export.png").default} style={{ height: "20px" }} />
                        </Button>
                      </Col>
                    </Row>

                  </Col>

                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Asociado</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Sector</th>
                    <th scope="col">Cobrador</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">H. inicio</th>
                    <th scope="col">H. fin</th>
                    <th scope="col">Detalle</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    phoneCallList?.data?.map((llamada, key) =>

                      <tr key={key}>
                        <td scope="row">
                          {llamada.asociado}
                        </td>
                        <td>
                          {llamada.tipo == 1 ? "Empresa" : "Persona"}
                        </td>
                        <td>
                          <Badge color="" className="badge-dot mr-4">
                            <i className={llamada.estado == 1 ? "bg-success" : "bg-warning"} />
                            {llamada.estado == 1 ? "Activo" : "Retiro"}
                          </Badge>
                        </td>
                        <td>
                          {llamada.sector}
                        </td>
                        <td>
                          {llamada.cobrador}
                        </td>
                        <td>
                          {llamada.fecha}
                        </td>
                        <td>
                          {llamada.inicio}
                        </td>
                        <td>
                          {llamada.fin}
                        </td>
                        <td>
                          {llamada.detalle}
                        </td>
                      </tr>
                    )
                  }

                </tbody>
              </Table>
              
              <CardFooter className="py-4">
                <nav aria-label="...">
                  {
                    meta.total > 0 &&
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      {
                        page > 1 &&
                        <PaginationItem className="disabled">
                          <PaginationLink
                            onClick={(e) => { e.preventDefault(); setPage(page - 1) }}
                            tabIndex="-1"
                          >
                            <i className="fas fa-angle-left" />
                            <span className="sr-only">Previous</span>
                          </PaginationLink>
                        </PaginationItem>
                      }
                      {
                        Array.from({ length: meta.last_page>5 ? 5 :  meta.last_page}, (_, i) => i + 1).map((cpage, key) =>
                          <PaginationItem key={key} className={page === cpage ? "active" : "inactive"}>
                            <PaginationLink
                              onClick={(e) => { e.preventDefault(); setPage(cpage) }}
                            >
                              {cpage}
                            </PaginationLink>
                          </PaginationItem>)
                      }
                      {
                        page < meta.last_page &&
                        <PaginationItem>
                          <PaginationLink
                            onClick={(e) => { e.preventDefault(); setPage(page + 1) }}
                          >
                            <i className="fas fa-angle-right" />
                            <span className="sr-only">Next</span>
                          </PaginationLink>
                        </PaginationItem>
                      }
                    </Pagination>
                  }
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Llamadas;
