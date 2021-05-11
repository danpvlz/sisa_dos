import React, { useState, useEffect } from 'react'
import {
  Button,
  FormGroup,
  Input,
  Row,
  Col,
  Modal,
  Form,
} from "reactstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchError, hideMessage } from '../../../redux/actions/Common';
import { store, update } from "../../../redux/actions/Curso";
import SearchParticipants from "../../../components/Selects/SearchParticipants";
import NewParticipant from "../Participante/new";

const New = ({ show, toggleModal }) => {
  const { register, handleSubmit, watch, reset } = useForm();
  const { cursobject } = useSelector(({ curso }) => curso);
  const dispatch = useDispatch();
  const [idParticipant, setidParticipant] = useState(null);
  const [formdata, setformdata] = useState({
    descripcion: "",
  });

  const onSubmit = (data) => {
    if (formdata.descripcion == "") {
      dispatch(fetchError("Debe ingresar una descripción."))
    } else {
      if (cursobject?.idCurso) {
        dispatch(update(formdata, cursobject.idCurso));
        setformdata(null);
        toggleModal();
      } else {
        dispatch(store(formdata));
        setformdata(null);
        toggleModal();
      }
      dispatch(hideMessage());
    }
  };

  useEffect(() => {
    if (cursobject) {
      setformdata({
        descripcion: cursobject?.descripcion,
      });
    }
  }, [cursobject]);

  return (
    <Modal
      className="modal-dialog-centered"
      size="lg"
      isOpen={show}
      toggle={toggleModal}
    >
      <NewParticipant />
      <div className="modal-header ">
        <h3 className="modal-title">
          {cursobject?.idCurso ? "Editar inscripción" : "Nuevo inscripción"}
        </h3>
        <button
          aria-label="Close"
          className="close"
          data-dismiss="modal"
          type="button"
          onClick={toggleModal}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="modal-body pb-0 bg-secondary">
          <Row>
            <Col lg="6">
              <FormGroup>
                <label
                  className="form-control-label"
                  htmlFor="input-ruc"
                >Participante</label>
                <div className="d-flex">
                  <div className="col-10 mx-0 px-0">
                <SearchParticipants setVal={setidParticipant} idVal={idParticipant} />
                  </div>
                  <div className="col-2 ml-0 pl-0">
                    <Button color="primary" type="button" >
                      <i className="fa fa-plus" />
                    </Button>
                  </div>
                </div>
              </FormGroup>
            </Col>
            <Col lg="12">
              <FormGroup>
                <label
                  className="form-control-label"
                  htmlFor="input-ruc"
                >Descripción</label>
                <Input
                  className="form-control-alternative"
                  type="text"
                  name="denominacion"
                  onChange={(e) => {
                    setformdata({ ...formdata, descripcion: e.target.value });
                  }}
                  value={formdata?.descripcion}
                  innerRef={register({ required: true })}
                />
              </FormGroup>
            </Col>
          </Row>
        </div>
        <div className="modal-footer">
          <Button
            className="mr-auto"
            color="link"
            data-dismiss="modal"
            type="button"
            onClick={toggleModal}
          >
            Cerrar
          </Button>
          <Button className="btn-primary" color="primary" type="submit">
            {cursobject?.idCurso ? "Actualizar" : "Registrar"}
          </Button>
        </div>
      </Form>
    </Modal>);
}


export default New;