import React, { useCallback, useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import PaginationComponent from "react-reactstrap-pagination";

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
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
import ConfirmDialog from '../../../components/Modals/ConfirmDialog';
import { useDispatch, useSelector } from "react-redux";
import { list, show, destroy, resetObject } from "../../../redux/actions/Participante";
import Loading from "../../../components/Loaders/LoadingSmall";

const Index = () => {
  const dispatch = useDispatch();
  const { participanteList, participanteStatusActions } = useSelector(({ participante }) => participante);
  const { loading } = useSelector(({ commonData }) => commonData);
  const [search, setsearch] = useState({});
  const [searchParticipante, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showModal, setshow] = useState({
    confirm: false,
    new: false,
  });
  const [selected, setSelected] = useState(null);
  const [confirm, setconfirm] = useState(false);
  const [action, setAction] = useState(1);
  const history = useHistory();

  const handleNew = () => {
    dispatch(resetObject());
    setSelected(null);
    toggleModal('new');
  };

  useEffect(() => {
    if (participanteStatusActions == 200) {
      dispatch(list(page, search));
    }
  }, [participanteStatusActions]);

  useEffect(() => {
    let tsearch = search;
    if (searchParticipante == "") {
      delete tsearch.searchParticipante;
    } else {
      tsearch.searchParticipante = searchParticipante;
    }
    setsearch(tsearch);
    dispatch(list(page, tsearch));
  }, [page, searchParticipante]);

  useEffect(() => {
    if (selected) {
      dispatch(show(selected));
    }
    return () => {
      setSelected(null);
    }
  }, [selected])

  const toggleModal = (modal) => {
    setshow({ ...showModal, [modal]: !showModal[modal] });
  };

  useEffect(() => {
    if (confirm) {
      if (action == 2) { dispatch(destroy(selected)) }
      setconfirm(false)
    }
  }, [confirm]);

  return (
    <>
      <div className="header pb-8 pt-9 d-flex align-items-center">
        <span className="mask bg-gradient-info opacity-8" />
      </div>
      <ConfirmDialog
        question={action == 1 ? "¿Seguro de desactivar el participante?" : action == 2 ? "¿Seguro de eliminar el participante?" : "¿Seguro de activar el participante?"}
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
                    <h3 className="mb-0">Participante</h3>
                    <Button
                      className="btn-new-xl btn-icon d-none d-md-block"
                      color="primary"
                      onClick={handleNew}
                    >
                      <span className="btn-inner--icon">

                        <i className="fa fa-plus" />
                      </span>
                      <span className="btn-inner--text">Nuevo participante</span>
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
                            placeholder="Buscar participante"
                            type="text"
                            onChange={(e) => {
                              setSearch(e.target.value == "" ? "" : e.target.value)
                            }}
                            value={searchParticipante}
                          />
                        </FormGroup >
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </CardHeader>
              {
                !loading && participanteList.data ?
                  <>
                    <Table className="align-items-center table-flush" responsive>
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">Participante</th>
                          <th scope="col">DNI</th>
                          <th scope="col">Email</th>
                          <th scope="col">Celular.</th>
                          <th scope="col">Empresa</th>
                          <th scope="col">RUC</th>
                          <th scope="col">Cargo</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          participanteList?.data?.map((participante, key) =>
                            <tr key={key}>
                              <td scope="row">
                                {participante.nombres + ' ' + participante.apellidoPaterno + ' ' + participante.apellidoMaterno}
                              </td>
                              <td>
                                {participante.dni}
                              </td>
                              <td>
                                {participante.correo}
                              </td>
                              <td>
                                {participante.celular}
                              </td>
                              <td>
                                {participante.empresa}
                              </td>
                              <td>
                                {participante.ruc}
                              </td>
                              <td>
                                {participante.cargo}
                              </td>
                              <td className="text-right">
                                <span
                                  className="mx-2"
                                  style={{cursor: 'pointer' }}
                                  onClick={(e) => { setSelected(participante.idParticipante); toggleModal('new'); }}
                                >
                                  <i className="fa-lg text-blue fa fa-eye" aria-hidden="true"></i>
                                </span>
                                <span
                                  className="mx-2"
                                  style={{cursor: 'pointer' }}
                                  onClick={(e) => { setAction(participante.estado); setSelected(participante.idParticipante); toggleModal('confirm'); }}
                                >
                                  <i className={`fa-lg text-${participante.estado == 1 ? 'danger fa fa-ban' : 'green ni ni-check-bold'}`} aria-hidden="true"></i>
                                </span>
                                <span
                                  className="mx-2"
                                  style={{cursor: 'pointer' }}
                                  onClick={(e) => { setAction(2); setSelected(participante.idParticipante); toggleModal('confirm'); }}
                                >
                                  <i className="fa-lg text-danger fa fa-trash" aria-hidden="true"></i>
                                </span>
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
                          totalItems={participanteList?.meta?.total ? participanteList?.meta?.total : 0}
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
