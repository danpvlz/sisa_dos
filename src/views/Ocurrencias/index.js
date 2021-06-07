import React, {  useState, useEffect } from "react";
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
  Input,
} from "reactstrap";
// core components
import New from "./new";
import ConfirmDialog from '../../components/Modals/ConfirmDialog';
import { useDispatch, useSelector } from "react-redux";
import { list, show, changeStatus, destroy, resetCursoObject } from "../../redux/actions/Curso";
import Loading from "../../components/Loaders/LoadingSmall";
import moment from "moment";
import 'moment/locale/es';
moment.locale('es');

const Index = () => {
  const dispatch = useDispatch();
  const { cursoList, cursoStatusActions } = useSelector(({ curso }) => curso);
  const { loading } = useSelector(({ commonData }) => commonData);
  const [search, setsearch] = useState({});
  const [searchCurso, setsearchCurso] = useState("");
  const [page, setPage] = useState(1);
  const [showModal, setshow] = useState({
    confirm: false,
    new: false,
  });
  const [selected, setSelected] = useState(null);
  const [idCurso, setIdCurso] = useState(null);
  const [confirm, setconfirm] = useState(false);
  const [action, setAction] = useState(1);

  const handleNew = () => {
    dispatch(resetCursoObject());
    setSelected(null);
    toggleModal('new');
  };

  useEffect(() => {
    if (cursoStatusActions === 200) {
      dispatch(list(page, search));
    }
  }, [cursoStatusActions,dispatch,page,search]);

  useEffect(() => {
    let tsearch = search;
    if (searchCurso === "") {
      delete tsearch.searchCurso;
    } else {
      tsearch.searchCurso = searchCurso;
    }
    setsearch(tsearch);
    dispatch(list(page, tsearch));
  }, [page, searchCurso,search,dispatch]);

  useEffect(() => {
    if (selected) {
      dispatch(show(selected));
    }
    return () => {
      setSelected(null);
    }
  }, [selected,dispatch])

  const toggleModal = (modal) => {
    setshow({ ...showModal, [modal]: !showModal[modal] });
  };

  useEffect(() => {
    if (confirm) {
      if (action === 1 || action === 0) { dispatch(changeStatus(idCurso)) }
      if (action === 2) { dispatch(destroy(idCurso)) }
      setconfirm(false)
    }
  }, [confirm,action,idCurso,dispatch]);

  return (
    <>
      <div className="header pb-8 pt-9 d-flex align-items-center">
        <span className="mask bg-gradient-info opacity-8" />
      </div>
      <ConfirmDialog
        question={action === 1 ? "¿Seguro de desactivar el curso?" : action === 2 ? "¿Seguro de eliminar el curso?" : "¿Seguro de activar el curso?"}
        showConfirm={showModal.confirm} toggleModal={() => toggleModal('confirm')} setConfirm={setconfirm} />
      <New
        show={showModal.new}
        toggleModal={() => toggleModal('new')}
      />
      {/* Page content */}
      <Container className="mt--9" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 bg-secondary">
                <Row >
                  <Col lg="12" className="border-0 d-flex justify-content-between">
                    <h3 className="mb-0">Curso</h3>
                    <Button
                      className="btn-new-xl btn-icon d-none d-md-block"
                      color="primary"
                      onClick={handleNew}
                    >
                      <span className="btn-inner--icon">

                        <i className="fa fa-plus" />
                      </span>
                      <span className="btn-inner--text">Nuevo curso</span>
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
                      <Col lg="6"  >
                        <FormGroup className="mb-0 pb-4">
                          <label
                            className="form-control-label"
                            htmlFor="filterDescription"
                          >
                            Búsqueda
                      </label>
                          <Input
                            className="form-control-alternative"
                            id="filterDescription"
                            placeholder="Buscar curso"
                            type="text"
                            onChange={(e) => {
                              setsearchCurso(e.target.value === "" ? "" : e.target.value)
                            }}
                            value={searchCurso}
                          />
                        </FormGroup >
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </CardHeader>
              {
                !loading || cursoList?.data ?
                  <>
                    <Table className="align-items-center table-flush table-sm" responsive>
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">Curso</th>
                          <th scope="col">Estado</th>
                          <th scope="col">Ult. Mod.</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          cursoList?.data?.map((curso, key) =>
                            <tr key={key}>
                              <td>
                                {curso.descripcion}
                              </td>
                              <td>
                                <Badge color="" className="badge-dot mr-4">
                                  <i className={curso.estado === 0 ? "bg-danger" : "bg-success"} />
                                  {curso.estado === 1 ? "Activo" : "Inactivo"}
                                </Badge>
                              </td>
                              <td>
                                {moment(curso.updated_at, "YYYY-MM-DD h:m:s").fromNow()}
                              </td>
                              <td className="text-right">
                                <Button
                                  className="btn btn-sm m-0 p-0 icon icon-shape rounded-circle shadow"
                                  onClick={(e) => { setSelected(curso.idCurso); toggleModal('new'); }}
                                >
                                  <i className="text-blue fa fa-eye fa-2x" aria-hidden="true"></i>
                                </Button>
                                <Button
                                  className="btn btn-sm m-0 p-0 icon icon-shape rounded-circle shadow"
                                  onClick={(e) => { setAction(curso.estado); setIdCurso(curso.idCurso); toggleModal('confirm'); }}
                                >
                                  <i className={`text-${curso.estado === 1 ? 'danger fa fa-ban' : 'green ni ni-check-bold'}  fa-2x`} aria-hidden="true"></i>
                                </Button>
                                <Button
                                  className="btn btn-sm m-0 p-0 icon icon-shape rounded-circle shadow"
                                  onClick={(e) => { setAction(2); setIdCurso(curso.idCurso); toggleModal('confirm'); }}
                                >
                                  <i className="text-danger fa fa-trash fa-2x" aria-hidden="true"></i>
                                </Button>
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
                          totalItems={cursoList?.meta?.total ? cursoList?.meta?.total : 0}
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

export default Index;
