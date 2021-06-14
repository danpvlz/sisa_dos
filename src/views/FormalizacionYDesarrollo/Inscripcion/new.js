import React, { useState } from "react";
import { useHistory } from 'react-router-dom';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import SearchParticipants from "../../../components/Selects/SearchParticipants";
import SearchCurso from "../../../components/Selects/SearchCurso";
import New from "../Participante/new";
import { fetchError, hideMessage } from '../../../redux/actions/Common';
import { store } from '../../../redux/actions/Inscripcion';
import ConfirmDialog from '../../../components/Modals/ConfirmDialog';

const NewInscripcion = () => {
  const { handleSubmit } = useForm();
  const dispatch = useDispatch();
  const [participant, setParticipant] = useState(null);
  const [cursoSearched, setCursoSearched] = useState(null);
  const [news, setNews] = useState([]);
  const [items, setitems] = useState([]);
  const [participantSearched, setParticipantSearched] = useState(null);

  const history = useHistory();

  const [formdata, setformdata] = useState(null);
  const [show, setShow] = useState({ confirm: false, new: false });

  const onSubmit = (data) => {
    items.length === 0 ?
      dispatch(fetchError("Debe elegir al menos un registro."))
      :
      toggleModal('confirm');
    setformdata(data);

    dispatch(hideMessage());
  };

  const toggleModal = (modal) => {
    setShow({...show,[modal]:!show[modal]});
  };

  const handleConfirm = () => {
    formdata.items = items;
    dispatch(store(formdata));
    history.push('/admin/formalizacion-y-desarrollo/inscripcion');
  }

  return (
    <>
      <div className="header pb-8 pt-5 pt-lg-8 pt-md-8  d-flex align-items-center">
        <span className="mask bg-gradient-info opacity-8" />
      </div>
      {/* Page content */}
      <Container className="mt--7" fluid>
        <New
          show={show.new}
          setSearched={setParticipantSearched}
          toggleModal={() => toggleModal('new')}
        />
        <ConfirmDialog
          question={'¿Seguro de registrar inscripción?'}
          showConfirm={show.confirm}
          toggleModal={() => toggleModal('confirm')}
          handleConfirm={handleConfirm} />
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="12">
                    <h3 className="mb-0">Nueva inscripción</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Col lg="4">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-ruc"
                        >Curso</label>
                        <SearchCurso setVal={setCursoSearched} val={cursoSearched} setNews={setNews} news={news} />
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                        >Participante</label>
                        <Row className="mr-0 pr-0">
                          <Col className="col-11 mr-0 pr-0">
                            <SearchParticipants setVal={setParticipant} participant={participant} searched={participantSearched} />
                          </Col>
                          <Col className="col-1 mx-0 px-0">
                            <Button color="primary" type="button" onClick={() => toggleModal('new')}>
                              <i className="ni ni-single-02" />
                            </Button>
                          </Col>
                        </Row>
                      </FormGroup>
                    </Col>
                    <Col lg="1" className="my-auto mx-0">
                      <Button
                        className="my-auto mx-0 d-flex btn-outline"
                        color="success"
                        type="button"
                        onClick={() => {
                          if (cursoSearched == null) {
                            dispatch(fetchError("Debe escoger un curso."));
                            setTimeout(() => {
                              dispatch(hideMessage());
                            }, 1500);
                          } else {
                            if (participant == null) {
                              dispatch(fetchError("Debe escoger un participante."));
                              setTimeout(() => {
                                dispatch(hideMessage());
                              }, 1500);
                            } else {
                              if (items.some(item => item.curso.value === cursoSearched.value) && items.some(item => item.participant.value === participant.value)) {
                                dispatch(fetchError("Ya registro a este participante en este curso."));
                                setTimeout(() => {
                                  dispatch(hideMessage());
                                }, 1500);
                              } else {
                                setitems(items.concat([{ curso: cursoSearched, participant: participant }]));
                              }
                            }
                          }
                        }}>
                        <i className="fa fa-plus my-auto mr-2" aria-hidden="true"></i>Agregar
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Table className="align-items-center table-flush" responsive>
                        <thead className="thead-light">
                          <tr className="text-left">
                            <th scope="col">Curso</th>
                            <th scope="col">Participante</th>
                            <th scope="col" />
                          </tr>
                        </thead>
                        <tbody className="text-left">
                          {
                            items.map((item, key) =>
                              <tr key={key}>
                                <td>{item.curso.label}</td>
                                <td>{item.participant.label}</td>
                                <td>
                                  <Button className="btn btn-sm" color="danger" type="button" onClick={() => { setitems(items.filter((a, i) => i !== key)) }}>
                                    <i className="fa fa-trash" />
                                  </Button>
                                </td>
                              </tr>
                            )
                          }
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                  <div className="text-center mt-5">
                    <Button className="my-4 btn-block" color="success" type="submit" disabled={items.length === 0}>
                      Registrar
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default NewInscripcion;
