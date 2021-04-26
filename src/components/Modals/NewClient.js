import React, {useState,useEffect} from 'react'
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
import { 
  searchRuc,
  searchDni,
  resetSearchRuc,
  resetSearchDni 
} from "../../redux/actions/Asociado";
import {store,update,list} from "../../redux/actions/Cliente";

const NewClient = ({ show, toggleModal }) => {
  const { register, handleSubmit, watch, reset } = useForm();
  const dispatch = useDispatch();
  const [formdata, setformdata] = useState({
    tipoDocumento: "",
    documento: "",
    denominacion: "",
    direccion: "",
    email: "",
    telefono: ""
  });
  const [loading, setloading] = useState(false);
  
  const { rucSearched, dniSearched } = useSelector(({ asociado }) => asociado);
  const { clienteObject } = useSelector(({ cliente }) => cliente);

  useEffect(() => {
    setloading(false);
    if(dniSearched){
      setformdata({...formdata,
        denominacion: dniSearched.nombre_completo});
    }
    if(rucSearched){
      setformdata({...formdata,
        denominacion: rucSearched.nombre_o_razon_social,
        direccion: rucSearched.direccion ? rucSearched.direccion : ""});
    }
  }, [rucSearched,dniSearched]);

  const onSubmit = (data) => {
    if(formdata.tipoDocumento==""){
      dispatch(fetchError("Debe elegir un tipo de documento."))
    }else{
      if(formdata.documento==""){
        dispatch(fetchError("Debe digitar el número de documento."))
      }else{
        if(formdata.denominacion==""){
          dispatch(fetchError("Debe especificar una denominación."))
        }else{
          if(clienteObject?.idCliente){
            dispatch(update(formdata,clienteObject.idCliente));
            dispatch(list());
            setformdata(null);
            toggleModal();
          }else{
            dispatch(store(formdata));
            dispatch(list());
            setformdata(null);
            toggleModal();
          }
          dispatch(hideMessage());
        }
      }
    }
  };

  useEffect(() => {
    return () => {
      dispatch(resetSearchRuc());
      dispatch(resetSearchDni());
    }
  }, []);

  useEffect(() => {
    if (clienteObject) {
      setformdata({
        tipoDocumento: clienteObject?.tipoDocumento,
        documento: clienteObject?.documento,
        denominacion: clienteObject?.denominacion,
        direccion: clienteObject?.direccion,
        email: clienteObject?.email,
        telefono: clienteObject?.telefono
      });
    }
    return () => {
      setformdata({
        tipoDocumento: "",
        documento: "",
        denominacion: "",
        direccion: "",
        email: "",
        telefono: ""
      });
    }
  }, [clienteObject]);

  return (
    <Modal
      className="modal-dialog-centered"
      size="lg"
      isOpen={show}
      toggle={toggleModal}
    >
    <div className="modal-header ">
      <h3 className="modal-title">
        {clienteObject?.idCliente ? "Editar cliente" : "Nuevo cliente"}
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
            <Col lg="4">
              <FormGroup>
                <label
                  className="form-control-label"
                  htmlFor="input-address"
                >
                  Tipo de documento</label>
                <Select
                  placeholder="Seleccione..."
                  className="select-style"
                  name="typeDoc"
                  onChange={(inputValue) => {
                    setformdata({ ...formdata, tipoDocumento: inputValue.value })
                  }}
                  value={[{ value: 1, label: "DNI" }, { value: 6, label: "RUC" }, { value: 4, label: "Carnet de extranjería" }, { value: 7, label: "Pasaporte" }].find(a=>a.value==formdata?.tipoDocumento)}
                  options={[{ value: 1, label: "DNI" }, { value: 6, label: "RUC" }, { value: 4, label: "Carnet de extranjería" }, { value: 7, label: "Pasaporte" }]} />
              </FormGroup>
            </Col>
            <Col lg="4">
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="input-ruc"
              >Documento</label>
              <div className="d-flex">
                <Input
                  className="form-control-alternative"
                  type="text"
                  name="document"
                  id="document"
                  onChange={(e)=>setformdata({...formdata,documento:e.target.value})}
                  value={formdata?.documento}
                  innerRef={register({ required: true })}
                />
                {
                  (formdata?.tipoDocumento==1 || formdata?.tipoDocumento==6) &&
                  <Button className="btn-icon" size="sm" color="primary" type="button"
                  onClick={()=>{
                    setloading(true);
                    formdata?.tipoDocumento==1 ? dispatch(searchDni(document.getElementById('document').value)) : dispatch(searchRuc(document.getElementById('document').value));
                  }}
                  >
                  <span>
                    {
                      loading ?
                      <i className="fa fa-spinner fa-spin fa-fw" aria-hidden="true" />
                      :
                      <i className="fa fa-search" />
                    }
                  </span>
                  </Button>

                }
              </div>
            </FormGroup>
          </Col>
            </Row>
          </Col>
          <Col lg="12">
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="input-ruc"
              >Denominación</label>
                <Input
                  className="form-control-alternative"
                  type="text"
                  name="denominacion"
                  onChange={(e) => {
                    setformdata({...formdata,denominacion:e.target.value});
                  }}
                  value={formdata?.denominacion}
                  innerRef={register({ required: true })}
                />
            </FormGroup>
          </Col>
          <Col lg="12">
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="input-ruc"
              >Direccion</label>
                <Input
                  className="form-control-alternative"
                  type="text"
                  name="direccion"
                  onChange={(e) => {
                    setformdata({...formdata,direccion:e.target.value});
                  }}
                  value={formdata?.direccion}
                  innerRef={register({ required: false })}
                />
            </FormGroup>
          </Col>
          <Col lg="4">
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="input-ruc"
              >Correo</label>
                <Input
                  className="form-control-alternative"
                  type="email"
                  name="email"
                  onChange={(e)=>setformdata({...formdata,email:e.target.value})}
                  value={formdata?.email}
                  innerRef={register({ required: false })}
                />
            </FormGroup>
          </Col>
          <Col lg="4">
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="input-ruc"
              >Teléfono</label>
                <Input
                  className="form-control-alternative"
                  type="tel"
                  name="telf"
                  onChange={(e)=>setformdata({...formdata,telefono:e.target.value})}
                  value={formdata?.telefono}
                  innerRef={register({ required: false })}
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
          {clienteObject?.idCliente ? "Actualizar" : "Registrar"}
        </Button>
      </div>
    </Form>
    </Modal>);
}


export default NewClient;