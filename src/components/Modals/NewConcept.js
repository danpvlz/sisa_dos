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
import { fetchError, hideMessage } from '../../redux/actions/Common';
import Select from 'react-select';
import SearchAreas from '../Selects/SearchAreas';
import SearchCategories from '../Selects/SearchCategories';
import { store, update } from "../../redux/actions/Concepto";

const NewConcept = ({ show, toggleModal }) => {
  const { register, handleSubmit, reset } = useForm();
  const { conceptObject } = useSelector(({ concepto }) => concepto);
  const dispatch = useDispatch();
  const setCategoriaId = (id) => {
    setformdata({ ...formdata, idCategoria: id });
  }
  const setidArea = (id) => {
    setformdata({ ...formdata, idArea: id });
  }
  const [formdata, setformdata] = useState({
    codigo: "",
    descripcion: "",
    tipoConcepto: "",
    igv: "",
    inmutable: "",
    valor: "",
    idCategoria: "",
    idArea: ""
  });

  useEffect(() => {
    if (conceptObject) {
      setformdata({
        codigo: conceptObject.codigo,
        descripcion: conceptObject.descripcion,
        tipoConcepto: conceptObject.tipoConcepto,
        igv: conceptObject.tipoIGV,
        inmutable: conceptObject.priceInmutable,
        valor: conceptObject.valorConIGV,
        idCategoria: conceptObject.categoriaCuenta,
        idArea: conceptObject.idArea,
      });
    }
    return () => {
      setformdata({
        codigo: "",
        descripcion: "",
        tipoConcepto: "",
        igv: "",
        inmutable: "",
        valor: "",
        idCategoria: "",
        idArea: ""
      });
    }
  }, [conceptObject])

  const onSubmit = (data) => {
    if (formdata.descripcion === "") {
      dispatch(fetchError("Debe especificar una descripción para el concepto."))
    } else {
      if (formdata.idCategoria === "") {
        dispatch(fetchError("Debe elegir una categoria para el concepto."))
      } else {
        if (conceptObject?.idConcepto) {
          dispatch(update(formdata, conceptObject.idConcepto));
          setformdata({
            codigo: "",
            descripcion: "",
            tipoConcepto: "",
            igv: "",
            inmutable: "",
            valor: "",
            idCategoria: "",
            idArea: ""
          });
          reset();
          toggleModal();
        } else {
          dispatch(store(formdata));
          setformdata({
            codigo: "",
            descripcion: "",
            tipoConcepto: "",
            igv: "",
            inmutable: "",
            valor: "",
            idCategoria: "",
            idArea: ""
          });
          reset();
          toggleModal();
        }
        dispatch(hideMessage());
      }
    }

  };

  return (
    <Modal
      className="modal-dialog-centered"
      size="md"
      isOpen={show}
      toggle={toggleModal}
    >
      <div className="modal-header ">
        <h3 className="modal-title">
          {conceptObject?.idConcepto ? "Editar concepto" : "Nuevo concepto"}
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
                      name="descripcion"
                      value={formdata.descripcion}
                      onChange={(e) => {
                        setformdata({ ...formdata, descripcion: e.target.value })
                      }}
                      innerRef={register({ required: false })}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-address"
                    >
                      Área</label>
                    <SearchAreas setVal={setidArea} idArea={formdata.idArea} />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-address"
                    >
                      Categoria</label>
                    <SearchCategories idArea={formdata.idArea} setVal={setCategoriaId} idCategoria={formdata.idCategoria} />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-address"
                    >
                      Tipo</label>
                    <Select
                      placeholder="Seleccione..."
                      className="select-style"
                      name="typeDoc"
                      value={[{ value: 1, label: "Servicio" }, { value: 2, label: "Producto" }][formdata.tipoConcepto - 1]}
                      onChange={(inputValue, actionMeta) => {
                        setformdata({ ...formdata, tipoConcepto: inputValue.value });
                      }}
                      options={[{ value: 1, label: "Servicio" }, { value: 2, label: "Producto" }]} />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-address"
                    >
                      IGV</label>
                    <Select
                      placeholder="Seleccione..."
                      className="select-style"
                      name="typeDoc"
                      value={[{ value: 8, label: "Exonerada" }, { value: 7, label: "Gratuita" }, { value: 1, label: "Gravada" }].find(i => i.value === formdata.igv)}
                      onChange={(inputValue, actionMeta) => {
                        setformdata({ ...formdata, igv: inputValue.value });
                      }}
                      options={[{ value: 8, label: "Exonerada" }, { value: 7, label: "Gratuita" }, { value: 1, label: "Gravada" }]} />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-ruc"
                    >Valor</label>
                    <Input
                      className="form-control-alternative"
                      type="number"
                      name="valor"
                      placeholder="S/."
                      value={formdata.valor}
                      onChange={(e) => {
                        setformdata({ ...formdata, valor: e.target.value })
                      }}
                      innerRef={register({ required: false })}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-address"
                    >
                      ¿Inmutable?</label>
                    <Select
                      placeholder="Seleccione..."
                      className="select-style"
                      name="typeDoc"
                      value={[{ value: 1, label: "Sí" }, { value: 0, label: "No" }][formdata.inmutable - 1]}
                      onChange={(inputValue, actionMeta) => {
                        setformdata({ ...formdata, inmutable: inputValue.value });
                      }}
                      options={[{ value: 1, label: "Sí" }, { value: 0, label: "No" }]} />
                  </FormGroup>
                </Col>
              </Row>
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

            {conceptObject?.idConcepto ? "Actualizar" : "Registrar"}

          </Button>
        </div>
      </Form>
    </Modal>);
}


export default NewConcept;