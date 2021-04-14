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
  Input
} from "reactstrap";
// core components
import Select from 'react-select';
import ConfirmDialog from '../../components/ConfirmDialog';
import Header from "components/Headers/AsociadoHeader.js";
import SearchAsociado from "components/Selects/SearchAsociado.js";
import SearchCobrador from "components/Selects/SearchCobrador.js";
import SearchPromotor from "components/Selects/SearchPromotorFilter";
import SetCodigoModal from "components/SetCodigoModal.js";
import { useDispatch, useSelector } from "react-redux";
import { listAssociated, exportAssociateds, status, assignCode, removeInProcess } from "../../redux/actions/Asociado";

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
  const [selectedAsociado, setSelectedAsociado] = useState(null);
  const [showSetCodigo, setshowSetCodigo] = useState(false);
  const [codigo, setcodigo] = useState(null);
  const [sendcodigo, setsendcodigo] = useState(false);
  const [confirm, setComfirm] = useState(false);
  
  const [question, setquestion] = useState('');
  const [action, setAction] = useState(1);
  const [showConfirm, setShowConfirm] = useState(false);

  //Filters
  const [since, setsince] = useState(null);
  const [promotorSearched, setPromotorSearched] = useState(null);

  const [showHeaders, setshowHeaders] = useState({
    Tipo: true,
    Documento: true,
    Estado: true,
    Importe: true,
    Cobrador: true,
    Comite: true,
    Direccion: true,
    Ingreso: true,
    Promotor: true,
    Codigo: true,
  });

  useEffect(() => {
    if (associatedStatusActions == 200) {
      dispatch(listAssociated(page,search));
    }
  }, [associatedStatusActions]);

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
    let tsearch = search;
    if (since == null) {
      delete tsearch.since;
    } else {
      tsearch.month = since;
    }
    setsearch(tsearch);
    dispatch(listAssociated(page, tsearch));
  }, [since]);

  useEffect(() => {
    let tsearch = search;
    if (promotorSearched == null) {
      delete tsearch.promotorSearched;
    } else {
      tsearch.promotor = promotorSearched;
    }
    setsearch(tsearch);
    dispatch(listAssociated(page, tsearch));
  }, [promotorSearched]);

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

  const toggleModalCodigo = () => {
    setshowSetCodigo(!showSetCodigo);
  };

  useEffect(() => {
    if (sendcodigo) {
      //REGISTRAR
      var fData = {
        "idAsociado": selectedAsociado,
        "codigo": codigo
      }
      dispatch(assignCode(fData))
      //REGISTRAR
      setcodigo(null);
      setsendcodigo(false);
      setSelectedAsociado(null);
    }
  }, [sendcodigo]);

  const toggleModalConfirm = () => {
    setShowConfirm(!showConfirm);
  };

  useEffect(() => {
    if (confirm) {
      if (action == 1) {
        dispatch(status(selectedAsociado)); //CAMBIAR DE ESTADO
      } else {
        dispatch(removeInProcess(selectedAsociado)); //ELIMINAR
      }
      setComfirm(false);
      setSelectedAsociado(null);
    }
  }, [confirm, action]);

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
      <SetCodigoModal 
        showSetCodigo={showSetCodigo} 
        toggleModal={toggleModalCodigo}  
        codigo={codigo}
        setcodigo={setcodigo}
        setSendCodigo={setsendcodigo}
      />
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
            <ConfirmDialog
              question={question}
              showConfirm={showConfirm} toggleModal={toggleModalConfirm} setConfirm={setComfirm} />
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
                      <Col lg="3"  >
                        <FormGroup className="mb-0 pb-4">
                          <label
                            className="form-control-label"
                            htmlFor="filterMonth"
                          >
                            Ingreso
                      </label>
                          <Input
                            className="form-control-alternative"
                            id="fitlerSince"
                            placeholder="fitlerSince"
                            type="month"
                            value={since}
                            onChange={(inputValue, actionMeta) => {
                              setsince(inputValue != null ? inputValue.target.value : null);
                            }}
                          />
                        </FormGroup >
                      </Col>                      
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
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Promotor
                              </label>
                              <SearchPromotor setVal={setPromotorSearched} />
                            </FormGroup>
                          </Col>
                      <Col lg="3"  >
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
                      <Col lg="5" className="text-right m-auto">
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
                    <th scope="col" style={{cursor:'pointer'}} className={!showHeaders.Documento ? 'd-none' : ''} onClick={()=>setshowHeaders({...showHeaders,Documento:!showHeaders.Documento})}>Documento</th>
                    <th scope="col" style={{cursor:'pointer'}} className={!showHeaders.Tipo ? 'd-none' : ''} onClick={()=>setshowHeaders({...showHeaders,Tipo:!showHeaders.Tipo})}>Tipo</th>
                    <th scope="col" style={{cursor:'pointer'}} className={!showHeaders.Estado ? 'd-none' : ''} onClick={()=>setshowHeaders({...showHeaders,Estado:!showHeaders.Estado})}>Estado</th>
                    <th scope="col" style={{cursor:'pointer'}} className={!showHeaders.Importe ? 'd-none' : ''} onClick={()=>setshowHeaders({...showHeaders,Importe:!showHeaders.Importe})}>Importe</th>
                    <th scope="col" style={{cursor:'pointer'}} className={!showHeaders.Cobrador ? 'd-none' : ''} onClick={()=>setshowHeaders({...showHeaders,Cobrador:!showHeaders.Cobrador})}>Cobrador</th>
                    <th scope="col" style={{cursor:'pointer'}} className={!showHeaders.Comite ? 'd-none' : ''} onClick={()=>setshowHeaders({...showHeaders,Comite:!showHeaders.Comite})}>Comité gremial</th>
                    <th scope="col" style={{cursor:'pointer'}} className={!showHeaders.Promotor ? 'd-none' : ''} onClick={()=>setshowHeaders({...showHeaders,Promotor:!showHeaders.Promotor})}>Promotor</th>
                    <th scope="col" style={{cursor:'pointer'}} className={!showHeaders.Codigo ? 'd-none' : ''} onClick={()=>setshowHeaders({...showHeaders,Codigo:!showHeaders.Codigo})}>Código</th>
                    <th scope="col" style={{cursor:'pointer'}} className={!showHeaders.Ingreso ? 'd-none' : ''} onClick={()=>setshowHeaders({...showHeaders,Ingreso:!showHeaders.Ingreso})}>Ingreso</th>
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
                  <td className={!showHeaders.Documento ? 'd-none' : ''}>
                    {asociado.documento}
                  </td>
                  <td className={!showHeaders.Tipo ? 'd-none' : ''}>
                    {asociado.tipoAsociado == 1 ? "Empresa" : "Persona"}
                  </td>
                  <td className={!showHeaders.Estado ? 'd-none' : ''}>
                    <Badge color="" className="badge-dot mr-4">
                      <i className={asociado.estado == 1 ? "bg-success" : asociado.estado == 2 ? "bg-info" : "bg-warning"} />
                      {asociado.estado == 1 ? "Activo" : asociado.estado == 2 ? "En proceso" : "Retiro"}
                    </Badge>
                  </td>
                  <td className={!showHeaders.Importe ? 'd-none' : ''}>
                    <small>s/. </small>{asociado.importeMensual}
                  </td>
                  <td className={!showHeaders.Cobrador ? 'd-none' : ''}>
                    {asociado.cobrador}
                  </td>
                  <td className={!showHeaders.Comite ? 'd-none' : ''}>
                    {asociado.comitegremial}
                  </td>
                  <td className={!showHeaders.Promotor ? 'd-none' : ''}>
                    {asociado.promotor}
                  </td>
                  <td className={!showHeaders.Codigo ? 'd-none' : ''}>
                    {asociado.codigo}
                  </td>
                  <td className={!showHeaders.Ingreso ? 'd-none' : ''}>
                    {asociado.fechaIngreso}
                  </td>
                  <td className="text-right">
                    <UncontrolledDropdown>
                      <DropdownToggle
                        className="btn-icon-only text-light"
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
                              pathname: '/admin/editar-asociado-co',
                              state: { asociadoSelected: asociado.idAsociado }});
                          }}
                        >
                           <i className="text-blue fa fa-eye" aria-hidden="true"></i> Ver más
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
                    totalItems={associatedList?.meta?.total ? associatedList?.meta?.total : 0}
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
