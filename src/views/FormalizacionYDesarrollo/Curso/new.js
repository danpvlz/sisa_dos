import React, { useState, useEffect } from 'react'
import {
  Button,
  FormGroup,
  Input,
  Row,
  Col,
  Modal,
  Form,
  UncontrolledTooltip,
} from "reactstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchError, hideMessage } from '../../../redux/actions/Common';
import { store, update } from "../../../redux/actions/Curso";

const New = ({ show, toggleModal }) => {
  const { register, handleSubmit } = useForm();

  const [file, setFile] = useState(null);
  const [fileSend, setfileSend] = useState(null);
  
  const { cursobject } = useSelector(({ curso }) => curso);
  const dispatch = useDispatch();
  const [formdata, setformdata] = useState({
    descripcion: "",
  });
  const [copiedText, setcopiedText] = useState("");

  const onSubmit = (data) => {
    formdata.foto = fileSend;
    if (formdata.descripcion === "") {
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
        publicitario: process.env.REACT_APP_BASE+"capacitacion-cclam/"+window.btoa(cursobject.idCurso),
        inscripcion: cursobject?.inscripcion
      });
    }
  }, [cursobject]);

  const hiddenFileInput = React.useRef(null);

  const handleOpenFileSearch = event => {
    hiddenFileInput.current.click();
  };
  const handleChangeFileInput = event => {
    const fileUploaded = event.target.files[0];
    setfileSend(fileUploaded)
    setFile(fileUploaded ? URL.createObjectURL(fileUploaded) : null);
  };

  return (
    <Modal
      className="modal-dialog-centered"
      size="lg"
      isOpen={show}
      toggle={toggleModal}
    >
      <div className="modal-header ">
        <h3 className="modal-title">
          {cursobject?.idCurso ? "Editar curso" : "Nuevo curso"}
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
            {/* Inicio flayer */}
            <Col lg="12" className="mb-2">
              <label
                className="form-control-label"
                htmlFor="input-ruc"
              >Flayer</label>
              <input
                type="file"
                name="photo"
                ref={hiddenFileInput}
                onChange={handleChangeFileInput}
                style={{ display: 'none' }}
              />
              <div className="input-image-rectangle-container">
                <img
                  alt="Flayer de curso"
                  className="input-image-rectangle"
                  src={
                    file == null || file === "" ?
                    cursobject.foto ? 
                    process.env.REACT_APP_BASE + 'storage/' + cursobject.foto
                    :
                    require("../../../assets/img/resources/upload-image.jpg")
                        .default
                      :
                      file
                  }
                  onClick={handleOpenFileSearch}
                />
              </div>
            </Col>
            {/* Fin flayer */}
            {
              cursobject.idCurso ? 
              <>
              <Col lg="12">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-ruc"
                  >Link publicitario</label>
                  {
                      <Row className="mr-0 pr-0">
                        <Col className="col-11 mr-0 pr-0">
                      <div className="form-control-alternative text-left assistance-input">
                      <a href={formdata?.publicitario} target="_blank" rel="noreferrer">{formdata?.publicitario}</a>
                      </div>
                        </Col>
                        <Col className="col-1 mx-0 px-0">
                          <CopyToClipboard
                            text={formdata?.publicitario}
                            onCopy={() => setcopiedText(formdata?.publicitario)}
                          >
                            <Button
                              id="tooltipCopiarLinkCurso"
                              type="button"
                            >
                              <i className="ni ni-single-copy-04" />
                            </Button>
                          </CopyToClipboard>
                          <UncontrolledTooltip
                            delay={0}
                            trigger="hover focus"
                            target="tooltipCopiarLinkCurso"
                          >
                            {copiedText === formdata?.publicitario
                              ? "Copiado"
                              : "Copiar link"}
                          </UncontrolledTooltip>
                        </Col>
                      </Row>
                    }
                </FormGroup>
              </Col>
              <Col lg="12">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-ruc"
                  >Link de inscripción</label>
                  {
                      <Row className="mr-0 pr-0">
                        <Col className="col-11 mr-0 pr-0">
                      <div className="form-control-alternative text-left assistance-input">
                      <a href={formdata?.inscripcion} target="_blank" rel="noreferrer">{formdata?.inscripcion}</a>
                      </div>
                        </Col>
                        <Col className="col-1 mx-0 px-0">
                          <CopyToClipboard
                            text={formdata?.inscripcion}
                            onCopy={() => setcopiedText(formdata?.inscripcion)}
                          >
                            <Button
                              id="tooltipCopiarLinkCurso"
                              type="button"
                            >
                              <i className="ni ni-single-copy-04" />
                            </Button>
                          </CopyToClipboard>
                          <UncontrolledTooltip
                            delay={0}
                            trigger="hover focus"
                            target="tooltipCopiarLinkCurso"
                          >
                            {copiedText === formdata?.inscripcion
                              ? "Copiado"
                              : "Copiar link"}
                          </UncontrolledTooltip>
                        </Col>
                      </Row>
                    }
                </FormGroup>
              </Col>
              </>
              :
              ""
            }
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