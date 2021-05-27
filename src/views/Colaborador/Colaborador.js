import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';

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
  Table,
  Container,
  Row,
  Button
} from "reactstrap";
import ConfirmDialog from '../../components/Modals/ConfirmDialog';
// core components
import { useDispatch, useSelector } from "react-redux";
import { listWorker, status, vacations } from "../../redux/actions/Colaborador";
import Loading from "../../components/Loaders/LoadingSmall";
const Colaborador = () => {
  const dispatch = useDispatch();
  const { workerList, meta, workerStatusActions } = useSelector(({ colaborador }) => colaborador);
  const { loading } = useSelector(({ commonData }) => commonData);
  const [page, setPage] = useState(1)
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirm, setComfirm] = useState(false);
  const [action, setAction] = useState(1);
  const [colabSelected, setColabSelected] = useState(-1);
  const [question, setquestion] = useState('')

  const history = useHistory();
  const handleNew = useCallback(() => history.push('/admin/nuevo-colaborador'), [history]);
  useEffect(() => {
    if (workerStatusActions == 200) {
      dispatch(listWorker(page));
    }
  }, [workerStatusActions])

  useEffect(() => {
    dispatch(listWorker(page))
  }, [page])

  useEffect(() => {
    if (confirm) {
      if (action == 1) {
        dispatch(status(colabSelected));
      } else {
        dispatch(vacations(colabSelected));
      }
      setComfirm(false);
      setColabSelected(-1);
    }
  }, [confirm, action])

  const toggleModal = () => {
    setShowConfirm(!showConfirm);
  };

  return (
    <>
      <div className="header py-8 d-flex align-items-center">
        <span className="mask bg-gradient-info opacity-8" />
      </div>
      {/* Page content */}
      <Container className="mt--8" fluid>
        <ConfirmDialog
          question={question}
          showConfirm={showConfirm} toggleModal={toggleModal} setConfirm={setComfirm} />
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 d-flex justify-content-between">
                <h3 className="mb-0">Colaboradores <Badge color="primary" pill>{meta?.total}</Badge></h3>
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
              {
                !loading || workerList?.data ?
                  <>
                    <Table className="align-items-center table-flush" responsive>
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">Colaborador</th>
                          <th scope="col">DNI</th>
                          <th scope="col">Ingreso</th>
                          <th scope="col">Usuario</th>
                          <th scope="col">Estado</th>
                          <th scope="col" />
                        </tr>
                      </thead>
                      <tbody>
                        {
                          workerList?.data?.map((colaborador, key) =>
                            <tr key={key}>
                              <th scope="row">
                                <Media className="align-items-center">
                                  <img
                                    className="avatar rounded-circle mr-3"
                                    alt="..."
                                    src={
                                      colaborador.foto == null || colaborador.foto == "" ?
                                        require("../../assets/img/theme/default.png")
                                          .default
                                        :
                                        process.env.REACT_APP_BASE + colaborador.foto
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
                                {colaborador.dni}
                              </td>
                              <td>
                                {colaborador.fechaIngreso}
                              </td>
                              <td>
                                {colaborador.usuario}
                              </td>
                              <td>
                                {parseInt(colaborador.estado) == 1 ?
                                  <Badge color="" className="badge-dot mr-4">
                                    <i className="bg-success" />Activo
                            </Badge>
                                  :
                                  parseInt(colaborador.estado) == 2 ?
                                    <Badge color="" className="badge-dot mr-4">
                                      <i className="bg-info" />De vacaciones
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
                                  <DropdownMenu className="dropdown-menu-arrow" right positionFixed={true}>
                                    <DropdownItem
                                      onClick={() => {
                                        history.push({
                                          pathname: '/admin/editar-colaborador',
                                          state: { workerSelected: colaborador.idColaborador }
                                        });
                                      }}
                                    >
                                      Editar
                              </DropdownItem>

                                    {
                                      parseInt(colaborador.estado) == 0 || parseInt(colaborador.estado) == 1 ?
                                        <DropdownItem
                                          onClick={() => {
                                            setquestion(parseInt(colaborador.estado) == 1 ? `¿Seguro de dar de baja al trabajador?` : `¿Seguro de reincorporar al trabajador?`)

                                            setAction(1)
                                            setColabSelected(colaborador.idColaborador);
                                            toggleModal()
                                          }}
                                        >
                                          {parseInt(colaborador.estado) == 1 ? 'Dar de baja' : 'Activar'}
                                        </DropdownItem>
                                        : ""
                                    }
                                    {
                                      parseInt(colaborador.estado) == 1 || parseInt(colaborador.estado) == 2 ?
                                        <DropdownItem
                                          onClick={() => {
                                            setquestion(parseInt(colaborador.estado) == 2 ? `¿Seguro de terminar vacaciones del trabajador?` : `¿Seguro de empezar vacaciones del trabajador?`)
                                            setAction(2)
                                            setColabSelected(colaborador.idColaborador);
                                            toggleModal()
                                          }}
                                        >
                                          {parseInt(colaborador.estado) == 2 ? 'Terminar vacaciones' : 'Empezar vacaciones'}
                                        </DropdownItem>
                                        : ""
                                    }
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
                              Array.from({ length: meta.last_page }, (_, i) => i + 1).map((cpage, key) =>
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

export default Colaborador;
