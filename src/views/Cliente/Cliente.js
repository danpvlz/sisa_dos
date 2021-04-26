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
import SearchCliente from "components/Selects/SearchCliente";
import NewClient from "components/Modals/NewClient.js";
import { useDispatch, useSelector } from "react-redux";

import { list, showCliente, resetClienteObject } from "../../redux/actions/Cliente";

const Cliente = () => {
  const dispatch = useDispatch();
  const { clientList, clienteObject } = useSelector(({ cliente }) => cliente);
  const [search, setsearch] = useState({});
  const [idCliente, setidCliente] = useState(null);
  const [debCollector, setdebCollector] = useState(null);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [showModal, setshow] = useState(false);
  const history = useHistory();
  const handleNew = () => {
    dispatch(resetClienteObject());
    setSelected(null);
    toggleModal();
  };

  useEffect(() => {
    let tsearch=search;
    if(idCliente == null){
      delete tsearch.idCliente;
    }else{
      tsearch.idCliente=idCliente;
    }
    setsearch(tsearch);
    dispatch(list(page,tsearch));
  }, [idCliente]);

  useEffect(() => {
    dispatch(list(page,search))
  }, [page]);

  useEffect(() => {
    if(selected){
      dispatch(showCliente(selected));
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
      <NewClient 
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
                    <h3 className="mb-0">Cliente</h3>
                    <Button
                      className="btn-new-xl btn-icon d-none d-md-block"
                      color="primary"
                      onClick={handleNew}
                    >
                      <span className="btn-inner--icon">

                        <i className="fa fa-plus" />
                      </span>
                      <span className="btn-inner--text">Nuevo cliente</span>
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
                            Cliente
                          </label>
                          <SearchCliente setVal={setidCliente}/>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Denominación</th>
                    <th scope="col">Tipo doc.</th>
                    <th scope="col">Documento</th>
                    <th scope="col">Direccion</th>
                    <th scope="col">Email</th>
                    <th scope="col">Teléfonos</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    clientList?.data?.map((cliente, key) =>

                      <tr key={key}>
                        <td scope="row">
                          {cliente.denominacion}
                        </td>
                        <td>
                          {cliente.tipoDocumento == 1 ? "DNI" : cliente.tipoDocumento == 6 ? "RUC" : "CARNET DE EXT."}
                        </td>
                        <td>
                          {cliente.documento}
                        </td>
                        <td>
                          {cliente.direccion}
                        </td>
                        <td>
                          {cliente.email}
                        </td>
                        <td>
                          {cliente.telefono}
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
                                onClick={(e) => {setSelected(cliente.idCliente); toggleModal();}}
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
                    totalItems={clientList?.meta?.total ? clientList?.meta?.total : 0}
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

export default Cliente;
