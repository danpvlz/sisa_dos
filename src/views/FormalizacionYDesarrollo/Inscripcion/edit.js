import React, { useState, useEffect } from 'react'
import {
  Button,
  FormGroup,
  Row,
  Col,
  Modal,
  Form,
} from "reactstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchError, hideMessage } from '../../../redux/actions/Common';
import { update } from "../../../redux/actions/Inscripcion";
import SearchParticipants from "../../../components/Selects/SearchParticipantsForEdit";
import SearchCursoFilter from "../../../components/Selects/SearchCursoFilter";

const Edit = ({ show, toggleModal }) => {
  const { handleSubmit } = useForm();
  const { inscripcionObject } = useSelector(({ inscripcion }) => inscripcion);
  const dispatch = useDispatch()
  const [formdata, setformdata] = useState({
    idParticipante: null,
    idCurso: null,
    pagado: 0,
  });

  const onSubmit = (data) => {
    if (formdata.idCurso == null) {
      dispatch(fetchError("Debe elegir un curso."))
    } else {
      if (formdata.idParticipante == null) {
        dispatch(fetchError("Debe elegir un participante."))
      } else {
        dispatch(update(formdata, inscripcionObject.idInscripcion));
        setformdata({
          idParticipante: null,
          idCurso: null,
          pagado: 0,
        });
        toggleModal();
        dispatch(hideMessage());
      }
    }
  };

  useEffect(() => {
    if (inscripcionObject) {
      setformdata({
        idParticipante: inscripcionObject?.idParticipante,
        idCurso: inscripcionObject?.idCurso,
        pagado: inscripcionObject?.pagado,
      });
    }
  }, [inscripcionObject]);

  const setNewFormData = (key, val) => {
    setformdata({ ...formdata, [key]: val });
  }

  return (
    <Modal
      className="modal-dialog-centered"
      size="lg"
      isOpen={show}
      toggle={toggleModal}
    >
      <div className="modal-header ">
        <h3 className="modal-title">
          Editar inscripción
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
            <Col lg="12">
              <div className="custom-control custom-control-alternative custom-checkbox mb-3">
                <input
                  className="custom-control-input"
                  id="cbPagado"
                  type="checkbox"
                  defaultChecked={ formdata.pagado===1 }
                  onChange={(e)=>setNewFormData('pagado',e.target.checked === true ? 1 : 0)}
                />
                <label className="custom-control-label" htmlFor="cbPagado">
                  ¿Pagado?
                </label>
              </div>
            </Col>
            <Col lg="6">
              <FormGroup>
                <label
                  className="form-control-label"
                  htmlFor="input-ruc"
                >Curso</label>
                <SearchCursoFilter setVal={setNewFormData} val={formdata.idCurso} searchVal={inscripcionObject?.idCurso} />
              </FormGroup>
            </Col>
            <Col lg="6">
              <FormGroup>
                <label
                  className="form-control-label"
                >Participante</label>
                <SearchParticipants setVal={setNewFormData} val={formdata.idParticipante} searchVal={inscripcionObject?.idParticipante} />
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
            Actualizar
          </Button>
        </div>
      </Form>
    </Modal>);
}


export default Edit;