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
} from "reactstrap";
// core components
import ConfirmDialog from '../../../components/Modals/ConfirmDialog';
import { useDispatch, useSelector } from "react-redux";
import { list, show, destroy, exportInscripciones } from "../../../redux/actions/Inscripcion";
import Loading from "../../../components/Loaders/LoadingSmall";
import SearchParticipants from "../../../components/Selects/SearchParticipants";
import SearchCursoFilter from "../../../components/Selects/SearchCursoFilter";
import Edit from "./edit";
import moment from "moment";
import 'moment/locale/es';
moment.locale('es');

const Index = () => {
  const dispatch = useDispatch();
  const { inscripcionList, inscripcionStatusActions } = useSelector(({ inscripcion }) => inscripcion);
  const { loading } = useSelector(({ commonData }) => commonData);
  const [search, setsearch] = useState({});
  const [page, setPage] = useState(1);
  const [showModal, setshow] = useState({
    confirm: false,
    edit: false,
  });
  const [selected, setSelected] = useState(null);
  const [action, setAction] = useState(1);
  const [participantSearched, setParticipant] = useState(null);
  const [cursoSearched, setCursoSearched] = useState(null);

  const history = useHistory();

  /*
    const handleNew = () => {
      dispatch(resetObject());
      setSelected(null);
      toggleModal('new');
    };
  */

  const handleNew = useCallback(() => history.push('/admin/formalizacion-y-desarrollo/nueva-inscripcion'), [history]);

  useEffect(() => {
    if (inscripcionStatusActions === 200) {
      dispatch(list(page, search));
    }
  }, [inscripcionStatusActions,dispatch,page,search]);

  useEffect(() => {
    let tsearch = search;
    if (participantSearched == null) {
      delete tsearch.participante;
    } else {
      tsearch.participante = participantSearched.value;
    }
    if (cursoSearched == null) {
      delete tsearch.curso;
    } else {
      tsearch.curso = cursoSearched;
    }
    setsearch(tsearch);
    dispatch(list(page, tsearch));
  }, [page, participantSearched,cursoSearched,search,dispatch]);

  const toggleModal = (modal) => {
    setshow({ ...showModal, [modal]: !showModal[modal] });
  };

  const handleConfirm = () => {
    if (action === 2) { dispatch(destroy(selected)) }
  }

  useEffect(() => {
    if (action === 1 && selected!=null) { dispatch(show(selected)); }
  },[selected,action,dispatch])

  return (
    <>
      <div className="header pb-8 pt-9 d-flex align-items-center">
        <span className="mask bg-gradient-info opacity-8" />
      </div>
      <ConfirmDialog
        question={action === 1 ? "¿Seguro de desactivar el participante?" : action === 2 ? "¿Seguro de eliminar inscripción?" : "¿Seguro de activar el participante?"}
        showConfirm={showModal.confirm} toggleModal={() => toggleModal('confirm')} handleConfirm={handleConfirm} />
      <Edit
        show={showModal.edit}
        toggleModal={() => toggleModal('edit')}
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
                    <h3 className="mb-0">Inscripción</h3>
                    <Button
                      className="btn-new-xl btn-icon d-none d-md-block"
                      color="primary"
                      onClick={handleNew}
                    >
                      <span className="btn-inner--icon">

                        <i className="fa fa-plus" />
                      </span>
                      <span className="btn-inner--text">Nueva inscripción</span>
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
                      <Col lg="5">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-ruc"
                          >Curso</label>
                          <SearchCursoFilter setVal={setCursoSearched} val={cursoSearched} />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                          >Participante</label>
                          <SearchParticipants setVal={setParticipant} participant={participantSearched} />
                        </FormGroup>
                      </Col>
                      <Col lg="1" className="text-right m-auto">
                        <Button color="success" type="button" onClick={() => dispatch(exportInscripciones(search))}>
                          <img alt="Botón exportar" src={require("../../../assets/img/theme/excel_export.png").default} style={{ height: "20px" }} />
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </CardHeader>
              {
                !loading || inscripcionList?.data ?
                  <>
                    <Table className="align-items-center table-flush table-sm" responsive>
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">Participante</th>
                          <th scope="col">DNI</th>
                          <th scope="col">Curso</th>
                          <th scope="col">¿Pagado?</th>
                          <th scope="col">Inscripción</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          inscripcionList?.data?.map((inscription, key) =>
                            <tr key={key}>
                              <td>
                                <a href={`https://wa.me/51${inscription.celular}`} target="_blank" rel="noreferrer">{inscription.participante}</a>
                              </td>
                              <td>
                                {inscription.dni}
                              </td>
                              <td>
                                {inscription.curso}
                              </td>
                              <td>
                                {inscription.pagado === 0 ? 
                                  <i className="ni ni-fat-remove text-muted ni-lg"/>  
                                :
                                  <i className="ni ni-check-bold text-success ni-lg"/>  
                                }
                              </td>
                              <td>
                                {moment(inscription.fecha, "YYYY-MM-DD h:m:s").fromNow()}
                              </td>
                              <td className="text-right">
                                <Button
                                  className="btn btn-sm m-0 p-0 icon icon-shape rounded-circle shadow"
                                  onClick={(e) => { setAction(1); setSelected(inscription.idInscripcion); toggleModal('edit'); }}
                                >
                                  <i className="text-blue fa fa-eye fa-2x" aria-hidden="true"></i>
                                </Button>
                                <Button
                                  className="btn btn-sm m-0 p-0 icon icon-shape rounded-circle shadow"
                                  onClick={(e) => { setAction(2); setSelected(inscription.idInscripcion); toggleModal('confirm'); }}
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
                          totalItems={inscripcionList?.meta?.total ? inscripcionList?.meta?.total : 0}
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
