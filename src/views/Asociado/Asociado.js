import React, { useCallback,useState,useEffect } from "react";
import { useHistory } from 'react-router-dom';
import PaginationComponent from "react-reactstrap-pagination";

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Table,
  Container,
  Row,
  Button,
  Col,
  FormGroup,
} from "reactstrap";
// core components
import Select from 'react-select';
import Header from "components/Headers/AsociadoHeader.js";
import SearchAsociado from "components/Selects/SearchAsociado.js";
import SearchCobrador from "components/Selects/SearchCobrador.js";
import { useDispatch, useSelector } from "react-redux";
import { listAssociated, exportAssociateds, status } from "../../redux/actions/Asociado";

const Asociado = () => {
  const dispatch = useDispatch();
  const { associatedList, meta, associatedStatusActions } = useSelector(({ asociado }) => asociado);
  const [search, setsearch] = useState({});
  const [idAsociado, setIdAsociado] = useState(null);
  const [state, setState] = useState(null);
  const [debCollector, setdebCollector] = useState(null);
  const [page, setPage] = useState(1)
  //const asociados = require('../../data/asociado.json');
  const history = useHistory();
  const handleNewAsociado = useCallback(() => history.push('/admin/nuevo-asociado'), [history]);

  useEffect(() => {
    let tsearch=search;
    if(idAsociado == null){
      delete tsearch.idAsociado;
    }else{
      tsearch.idAsociado=idAsociado;
    }
    setsearch(tsearch);
    dispatch(listAssociated(page,tsearch))
  }, [idAsociado]);

  useEffect(() => {
    let tsearch=search;
    if(debCollector == null){
      delete tsearch.debCollector;
    }else{
      tsearch.debCollector=debCollector;
    }
    setsearch(tsearch);
    dispatch(listAssociated(page,tsearch))
  }, [debCollector]);

  useEffect(() => {
    let tsearch=search;
    if(state == null){
      delete tsearch.state;
    }else{
      tsearch.state=state;
    }
    setsearch(tsearch);
    dispatch(listAssociated(page,tsearch))
  }, [state]);

  useEffect(() => {
    dispatch(listAssociated(page,search))
  }, [page])
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 bg-secondary">
                <Row >
                  <Col lg="12" className="border-0 d-flex justify-content-between">
                    <h3 className="mb-0">Asociados</h3>
                    <Button
                      className="btn-new-xl btn-icon d-none d-md-block"
                      color="primary"
                      onClick={handleNewAsociado}
                    >
                      <span className="btn-inner--icon">

                        <i className="fa fa-plus" />
                      </span>
                      <span className="btn-inner--text">Nuevo asociado</span>
                    </Button>
                    <Button
                      className="btn-new-small icon icon-shape bg-primary text-white rounded-circle shadow d-sm-none"
                      onClick={handleNewAsociado}
                    >
                      <i className="fas fa-plus" />
                    </Button>
                  </Col>
                  <Col lg="12 ">
                    <hr className="my-4 " />
                    <Row className="bg-secondary">
                      <Col lg="5"  >
                        <FormGroup className="mb-0 pb-4">
                          <label
                            className="form-control-label"
                            htmlFor="filterMonth"
                          >
                            Asociado
                      </label>
                          <SearchAsociado setVal={setIdAsociado}/>
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
                      <Col lg="2"  >
                        <FormGroup className="mb-0 pb-4">
                          <label
                            className="form-control-label"
                            htmlFor="filterMonth"
                          >
                            Estado
                      </label>
                          <Select
                            placeholder="Seleccione..."
                            className="select-style"
                            name="sexo"
                            onChange={(inputValue, actionMeta) => {
                              setState(inputValue != null ? inputValue.value : null);
                            }}
                            isClearable
                            options={[{ value: 1, label: "Activo" }, { value: 2, label: "En proceso" },{ value: 3, label: "Retiro" }]} />
                        </FormGroup >
                      </Col>
                      <Col lg="1" className="text-right m-auto">
                        <Button color="success"  type="button" onClick={()=>dispatch(exportAssociateds(search))}>
                          <img src={require("../../assets/img/theme/excel_export.png").default} style={{height:"20px"}} /> 
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
                    <th scope="col">Documento</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Actividad</th>
                    <th scope="col">Comité gremial</th>
                    <th scope="col">Importe</th>
                    <th scope="col">Cobrador</th>
                    <th scope="col">Dirección</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {
                    associatedList?.data?.map((asociado,key)=>
                    
                  <tr key={key}>
                  <td scope="row">
                    {asociado.asociado}
                  </td>
                  <td>
                    {asociado.tipoAsociado == 1 ? "Empresa" : "Persona"}
                  </td>
                  <td>
                    {asociado.documento}
                  </td>
                  <td>
                    <Badge color="" className="badge-dot mr-4">
                      <i className={asociado.estado == 1 ? "bg-success" : asociado.estado == 2 ? "bg-info" : "bg-warning"} />
                      {asociado.estado == 1 ? "Activo" : asociado.estado == 2 ? "En proceso" : "Retiro"}
                    </Badge>
                  </td>
                  <td>
                    {asociado.actividad}
                  </td>
                  <td>
                    {asociado.comitegremial}
                  </td>
                  <td>
                    <small>s/. </small>{asociado.importeMensual}
                  </td>
                  <td>
                    {asociado.cobrador}
                  </td>
                  <td>
                    {asociado.direccionSocial}
                  </td>
                  <td className="text-right">
                    <UncontrolledDropdown>
                      <DropdownToggle
                        className="btn-icon-only text-light"
                        href="#pablo"
                        role="button"
                        size="sm"
                        color=""
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-ellipsis-v" />
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-menu-arrow" right>
                        <DropdownItem
                        className="d-flex"
                          onClick={()=>{
                            history.push({
                              pathname: '/admin/editar-asociado',
                              state: { asociadoSelected: asociado.idAsociado }});
                          }}
                        >
                           <i className="text-blue fa fa-eye" aria-hidden="true"></i> Ver más
                        </DropdownItem>
                        {asociado.estado == 1 ?
                          <DropdownItem
                          className="d-flex"
                            onClick={()=>{
                              dispatch(status(asociado.idAsociado));
                              dispatch(listAssociated(page,search))
                            }}
                          >
                            <i className="text-danger fa fa-ban" aria-hidden="true"></i> Retirar
                          </DropdownItem>
                        : asociado.estado == 2 || asociado.estado == 0 ? 
                          <DropdownItem
                          className="d-flex"
                            onClick={()=>{
                              dispatch(status(asociado.idAsociado));
                              dispatch(listAssociated(page,search))
                            }}
                          >
                            <i className="text-green fa fa-check" aria-hidden="true"></i> Activar
                          </DropdownItem>
                        : ""}
                        <DropdownItem
                        className="d-none"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                           <i className="text-blue fa fa-phone fa-rotate-90" aria-hidden="true"></i> Llamadas
                        </DropdownItem>
                        <DropdownItem
                        className="d-none"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="text-blue fa fa-credit-card" aria-hidden="true"></i> Cuentas 
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
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
                    totalItems={associatedList?.meta?.total}
                    pageSize={10}
                    onSelect={(selectedPage)=>setPage(selectedPage)}
                  />
                </nav>
              
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Asociado;
