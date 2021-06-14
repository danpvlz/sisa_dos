import React, {  useState, useEffect } from "react";
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
  Input,
} from "reactstrap";
// core components
import New from "./new";
import ConfirmDialog from '../../../components/Modals/ConfirmDialog';
import { useDispatch, useSelector } from "react-redux";
import { list, show, destroy, resetObject } from "../../../redux/actions/Participante";
import Loading from "../../../components/Loaders/LoadingSmall";

var timeOutFunc;
const Index = () => {
  const dispatch = useDispatch();
  const { participanteList, participanteStatusActions } = useSelector(({ participante }) => participante);
  const { loading } = useSelector(({ commonData }) => commonData);
  const [search, setsearch] = useState({});
  const [searchParticipante, setSearchParticipante] = useState("");
  const [page, setPage] = useState(1);
  const [showModal, setshow] = useState({
    confirm: false,
    new: false,
  });
  const [selected, setSelected] = useState(null);

  const handleNew = () => {
    dispatch(resetObject());
    setSelected(null);
    toggleModal('new');
  };

  useEffect(() => {
    if (participanteStatusActions === 200) {
      dispatch(list(page, search));
    }
  }, [participanteStatusActions,dispatch,page,search]);

  useEffect(() => {
    let tsearch = search;
    if (searchParticipante === "") {
      delete tsearch.searchParticipante;
    } else {
      tsearch.searchParticipante = searchParticipante;
    }
    
    setsearch(tsearch);
    clearTimeout(timeOutFunc);
    timeOutFunc = setTimeout(() => {
      dispatch(list(page, tsearch));
    }, 800);
  }, [page, searchParticipante,dispatch,search]);

  const toggleModal = (modal) => {
    setshow({ ...showModal, [modal]: !showModal[modal] });
  };

  const handleConfirm=()=>{
    dispatch(destroy(selected));
  }

  return (
    <>
      <div className="header pb-8 pt-9 d-flex align-items-center">
        <span className="mask bg-gradient-info opacity-8" />
      </div>
      <ConfirmDialog
        question={"¿Seguro de eliminar el participante?"}
        showConfirm={showModal.confirm} toggleModal={() => toggleModal('confirm')} handleConfirm={handleConfirm} />
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
                              setSearchParticipante(e.target.value === "" ? "" : e.target.value)
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
                !loading || participanteList?.data ?
                  <>
                    <Table className="align-items-center table-flush" responsive>
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">Participante</th>
                          <th scope="col">DNI</th>
                          <th scope="col">Email</th>
                          <th scope="col">Celular</th>
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
                              <td>
                                {participante.nombres + ' ' + participante.apellidoPaterno + ' ' + participante.apellidoMaterno}
                              </td>
                              <td>
                                {participante.dni}
                              </td>
                              <td>
                                <a href={`mailto:${participante.correo}`} target="_blank" rel="noreferrer">
                                  {participante.correo}
                                </a>
                              </td>
                              <td>
                                <a href={`https://wa.me/51${participante.celular}`} target="_blank" rel="noreferrer">
                                  {participante.celular}
                                </a>
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
                                  onClick={(e) => { dispatch(show(participante.idParticipante)); toggleModal('new'); }}
                                >
                                  <i className="fa-lg text-blue fa fa-eye" aria-hidden="true"></i>
                                </span>
                                <span
                                  className="mx-2"
                                  style={{cursor: 'pointer' }}
                                  onClick={(e) => {  setSelected(participante.idParticipante); toggleModal('confirm'); }}
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
