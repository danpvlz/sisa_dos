/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {useCallback} from "react";
import {useHistory} from 'react-router-dom';

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
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  Button
} from "reactstrap";
// core components

const Tables = () => {
  const colaboradores = require('../../data/colaborador.json');
  const history = useHistory();
  const handleNew = useCallback(() => history.push('/admin/nuevo-colaborador'), [history]);
  const handleEdit = useCallback(() => history.push('/admin/editar-colaborador'), [history]);
  return (
    <>
    <div className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"> 
      <span className="mask bg-gradient-info opacity-8" />
    </div>
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 d-flex justify-content-between">
              <h3 className="mb-0">Colaboradores <Badge color="primary" pill>{colaboradores.length}</Badge></h3>
              <Button
                className="btn-new-xl btn-icon d-none d-md-block"
                color="primary"
                onClick={handleNew}
              >
                <span className="btn-inner--icon">
                  
                <i className="fa fa-plus" />
                </span>
                <span className="btn-inner--text">Nuevo colaborador</span>
              </Button>
              <Button
                className="btn-new-small icon icon-shape bg-primary text-white rounded-circle shadow d-sm-none"
                onClick={handleNew}
              >
              <i className="fas fa-plus" />
              </Button>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Colaborador</th>
                    <th scope="col">Rol</th>
                    <th scope="col">DNI</th>
                    <th scope="col">Ingreso</th>
                    <th scope="col">Usuario</th>
                    <th scope="col">Estado</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {
                    colaboradores?.map((colaborador,key)=>
                      <tr key={key}>
                        <th scope="row">
                      <Media className="align-items-center">
                        <img
                        className="avatar rounded-circle mr-3"
                          alt="..."
                          src={
                            require("../../assets/img/theme/Gerencia-2-819x1024.png")
                              .default
                          }
                        />
                        <Media>
                          <span className="mb-0 text-sm">
                          {colaborador.colaborador}
                          </span>
                        </Media>
                      </Media>
                          
                        </th>
                        <td>
                          {colaborador.rol}
                        </td>
                        <td>
                          {colaborador.dni}
                        </td>
                        <td>
                          {colaborador.fechaIngreso}
                        </td>
                        <td>
                          {colaborador.usuario}
                        </td>
                        <td>
                          {parseInt(colaborador.estado)==1 ? 
                            <Badge color="" className="badge-dot mr-4">
                              <i className="bg-success" />Activo
                            </Badge>
                          : 
                            <Badge color="" className="badge-dot mr-4">
                              <i className="bg-danger" />Inactivo
                            </Badge>
                          }
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
                                onClick={handleEdit}
                              >
                                Editar
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                {parseInt(colaborador.estado)==1 ? 'Dar de baja' : 'Activar'}
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
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Tables;
