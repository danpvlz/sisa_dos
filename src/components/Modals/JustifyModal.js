import React from 'react'
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Modal,
} from "reactstrap";

const Justify = ({ showJustify, toggleModal, handleJustify, justificacion, setjustificacion }) => {
    const saveJustification = () => {
      handleJustify();
      toggleModal();
    }
    return (
      <Modal
        className="modal-dialog-centered"
        isOpen={showJustify}
        toggle={toggleModal}
      >
        <div className="modal-body pb-0">
          <Input type="textarea"
            value={justificacion}
            placeholder="Especifica el motivo por el que no pudiste marcar asistencia o tu falta."
            rows={3}
            onChange={(e) => {
              setjustificacion(e.target.value == "" ? null : e.target.value)
            }}
          />
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
          <Button className="btn-primary" color="primary" type="button" onClick={saveJustification}>
            Guardar
          </Button>
        </div>
      </Modal>);
  }
  

export default Justify;