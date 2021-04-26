import React, { useCallback, useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import PaginationComponent from "react-reactstrap-pagination";

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  Table,
  Container,
  Row,
  Button,
  Col,
  FormGroup,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
// core components
import SearchConcepto from "components/Selects/SearchConcepto";
import NewConcept from "components/Modals/NewConcept.js";
import SearchAreas from '../../components/Selects/SearchAreas';
import { useDispatch, useSelector } from "react-redux";

import { list, show, resetConceptObject} from "../../redux/actions/Concepto";

const Conceptos = () => {
  const dispatch = useDispatch();
  const { conceptoList, conceptStatusActions } = useSelector(({ concepto }) => concepto);
  const [search, setsearch] = useState({});
  const [idConcepto, setidConcepto] = useState(null);
  const [labelConcepto, setLabelConcepto] = useState(null);
  const [debCollector, setdebCollector] = useState(null);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [showModal, setshow] = useState(false);
  const [idArea, setidArea] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (conceptStatusActions == 200) {
      dispatch(list(page,search));
    }
  }, [conceptStatusActions]);

  const handleNew = () => {
    dispatch(resetConceptObject());
    setSelected(null);
    toggleModal();
  };

  useEffect(() => {
    let tsearch=search;
    if(idConcepto == null){
      delete tsearch.idConcepto;
    }else{
      tsearch.idConcepto=idConcepto;
    }
    if(idArea == null){
      delete tsearch.idArea;
    }else{
      tsearch.idArea=idArea;
    }
    setsearch(tsearch);
    dispatch(list(page,tsearch))
  }, [idConcepto,idArea]);

  useEffect(() => {
    dispatch(list(page,search))
  }, [page]);

  useEffect(() => {
    if(selected){
      dispatch(show(selected));
    }
    return () => {
      setSelected(null);
    }
  }, [selected])

  const toggleModal = () => {
    setshow(!showModal);
  };

  return (
    <>
      <div className="header pb-8 pt-9 d-flex align-items-center">
        <span className="mask bg-gradient-info opacity-8" />
      </div>
      {/* Page content */}
      <Container className="mt--9" fluid>
      <NewConcept 
        show={showModal} 
        toggleModal={toggleModal}
      />
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 bg-secondary">
                <Row >
                  <Col lg="12" className="border-0 d-flex justify-content-between">
                    <h3 className="mb-0">Concepto</h3>
                    <Button
                      className="btn-new-xl btn-icon d-none d-md-block"
                      color="primary"
                      onClick={handleNew}
                    >
                      <span className="btn-inner--icon">

                        <i className="fa fa-plus" />
                      </span>
                      <span className="btn-inner--text">Nuevo concepto</span>
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
                      <Col lg="4"  >
                        <FormGroup className="mb-0 pb-4">
                          <label
                            className="form-control-label"
                            htmlFor="filterMonth"
                          >
                            Área
                          </label>
                          <SearchAreas setVal={setidArea} idArea={idArea} />
                        </FormGroup>
                      </Col>
                      <Col lg="4"  >
                        <FormGroup className="mb-0 pb-4">
                          <label
                            className="form-control-label"
                            htmlFor="filterMonth"
                          >
                            Concepto
                      </label>
                          <SearchConcepto setVal={setidConcepto} setLabel={setLabelConcepto} />
                        </FormGroup>
                      </Col>
                    </Row>

                  </Col>

                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Código</th>
                    <th scope="col">Ult. Modif.</th>
                    <th scope="col">Concepto</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">IGV</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Inmutable</th>
                    <th scope="col">Categoría</th>
                    <th scope="col">Área</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    conceptoList?.data?.map((concepto, key) =>

                      <tr key={key}>
                        <td scope="row">
                          {concepto.idConcepto}
                        </td>
                        <td>
                          {
                          ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio','Agosto','Setiembre','Octubre','Noviembre','Diciembre'][new Date(concepto.updated_at).getMonth()]
                                            + ' ' +
                          new Date(concepto.updated_at).getFullYear() 
                          }
                        </td>
                        <td>
                          {concepto.descripcion}
                        </td>
                        <td>
                          {concepto.tipoConcepto == 1 ? "Servicio" : "Producto"}
                        </td>
                        <td>
                          {concepto.tipoIGV == 1 ? "Gravada" : concepto.tipoIGV == 8 ? "Exonerado" : "Gratuita"}
                        </td>
                        <td>
                          {concepto.valorConIGV ? 'S/.'+concepto.valorConIGV : '-'}
                        </td>
                        <td>
                          <Badge color="" className="badge-dot mr-4">
                            <i className={concepto.priceInmutable == 1 ? "bg-success" : "bg-info"} />
                            {concepto.priceInmutable == 1 ? "Sí" : "No"}
                          </Badge>
                        </td>
                        <td>
                          {concepto.categoriaNombre}
                        </td>
                        <td>
                          {concepto.area}
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
                                onClick={(e) => {setSelected(concepto.idConcepto); toggleModal();}}
                              >
                              <i className="text-blue fa fa-edit" aria-hidden="true"></i> Editar
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
                    totalItems={conceptoList?.meta?.total ? conceptoList?.meta?.total : 0}
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

export default Conceptos;
