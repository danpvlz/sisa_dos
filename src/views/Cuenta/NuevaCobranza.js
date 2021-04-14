import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
import Select from 'react-select';
// core components
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import SearchAsociado from "components/Selects/SearchAsociado";
import {showAssociated} from '../../redux/actions/Asociado';
import {fetchError,hideMessage} from '../../redux/actions/Common';
import {saveCuenta} from '../../redux/actions/Cuenta';
import ConfirmDialog from '../../components/ConfirmDialog';

const NuevaEmision = () => {
  const dispatch = useDispatch();
  const { associatedObject } = useSelector(({ asociado }) => asociado);
  const [idAsociado, setidAsociado] = useState(undefined);
  const [showAfiliacion, setshowAfiliacion] = useState(false);

  const history = useHistory();

  const { register, handleSubmit, watch, reset } = useForm();
  const [formdata, setformdata] = useState(null);
  const [confirm, setComfirm] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [tipoDocumentoEmision, settipoDocumentoEmision] = useState(null);
  const [pagado, setpagado] = useState(null)
  const [bancopago, setbancopago] = useState(null)
  const [meses, setmeses] = useState([]);

  useEffect(() => {
    if(idAsociado!=null){
      dispatch(showAssociated(idAsociado));
    }
  }, [idAsociado]);

  const onSubmit = (data) => {
    idAsociado == null ?
    dispatch(fetchError("Debe elegir un asociado."))
    :
    tipoDocumentoEmision == null ?
    dispatch(fetchError("Debe elegir si es boleta o factura."))
    :
    pagado == null ?
    dispatch(fetchError("Debe elegir si el comprobante fue pagado."))
    :
    pagado == 2 && bancopago == null ?
    dispatch(fetchError("Debe elegir un banco."))
    :
    meses.length == 0 ?
    dispatch(fetchError("Debe elegir al menos un mes."))
    :
    toggleModal();
    setformdata(data);

    dispatch(hideMessage());
  };

  const toggleModal = () => {
    setShowConfirm(!showConfirm);
  };

  useEffect(() => {
    if (confirm) {
      formdata.idAsociado=idAsociado;
      formdata.tipo_de_comprobante=tipoDocumentoEmision;
      formdata.pagado=pagado;
      formdata.banco=bancopago;
      formdata.meses=meses;
      formdata.cantidad=meses.length
      formdata.conafiliacion=showAfiliacion;
      dispatch(saveCuenta(formdata));
      history.push('/admin/cuentas');
    }
    setComfirm(false);
  }, [confirm]);

  return (
    <>
      <div className="header pb-8 pt-5 pt-lg-8 pt-md-8  d-flex align-items-center">
        <span className="mask bg-gradient-info opacity-8" />
      </div>
      {/* Page content */}
      <Container className="mt--7" fluid>
        <ConfirmDialog
          question={'¿Seguro de registrar emisión?'}
          showConfirm={showConfirm}
          toggleModal={toggleModal}
          setConfirm={setComfirm} />
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="12">
                    <h3 className="mb-0">Nueva emisión</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Col lg="12">
                      <h6 className="heading-small text-muted mb-4">
                        Cuenta
                      </h6>
                      <div className="pl-lg-4">
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Asociado
                          </label>
                              <SearchAsociado setVal={setidAsociado} />
                            </FormGroup>
                          </Col>
                          <Col lg="3">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Tipo
                              </label>
                              <Input
                                className="form-control-alternative"
                                type="text"
                                value={idAsociado ? associatedObject[0]?.tipoAsociado == 2 ? "Persona" : "Empresa" : ""}
                                disabled
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="3">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Cobrador
                              </label>
                              <Input
                                className="form-control-alternative"
                                type="text"
                                disabled
                                value={idAsociado ? associatedObject[0]?.descripcion : ""}
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="3">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Fecha emisión
                          </label>
                              <Input
                                className="form-control-alternative"
                                name="fechaEmision"
                                type="date"
                                readOnly
                                value={new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().split('T')[0]}
                                innerRef={register({ required: true })}
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="2">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Tipo de documento
                          </label>
                              <Select
                                placeholder="Seleccione..."
                                className="select-style"
                                onChange={(inputValue, actionMeta) => {
                                  settipoDocumentoEmision(inputValue.value);
                                }}
                                defaultValue={idAsociado ? associatedObject[0]?.tipoDocumento == 6 ? { value: 1, label: "Factura" } : null : null}
                                options={[{ value: 1, label: "Factura" }, { value: 2, label: "Boleta" }]} />
                            </FormGroup>
                          </Col>
                          <Col lg="2">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                ¿Pagado?
                          </label>
                              <Select
                                placeholder="Seleccione..."
                                className="select-style"
                                name="paidOut"
                                onChange={(inputValue, actionMeta) => {
                                  setpagado(inputValue.value);
                                }}
                                options={[{ value: 2, label: "Sí" }, { value: 1, label: "No" }]} 
                                innerRef={register({ required: true })}
                                />
                            </FormGroup>
                          </Col>
                          {
                            pagado == 2 ? 
                            <>
                            <Col lg="3">
                              <FormGroup>
                                <label
                                  className="form-control-label "
                                  htmlFor="input-address"
                                >
                                  Fecha de pago
                            </label>
                                <Input
                                  className="form-control-alternative"
                                  name="fechaPago"
                                  type="date"
                                  readOnly
                                  value={new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().split('T')[0]}
                                  innerRef={register({ required: true })}
                                />
                              </FormGroup>
                            </Col>
                            <Col>
                              <FormGroup className="mb-0 pb-4">
                                <label
                                  className="form-control-label"
                                  htmlFor="filterMonth"
                                >
                                  Banco
                            </label>
                                <Select
                                  placeholder="Seleccione..."
                                  className="select-style"
                                  name="banco"
                                  onChange={(inputValue, actionMeta) => {
                                    setbancopago(inputValue != null ? inputValue.value : null);
                                  }}
                                  isClearable
                                  options={[{ value: 1, label: "BCP" }, { value: 2, label: "BBVA" }]} />
                              </FormGroup >
                            </Col>
                            </>
                            :
                            ""
                          }
                          <Col lg="12">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Observación
                          </label>
                              <Input
                                className="form-control-alternative"
                                name="observacion"
                                type="text"
                                innerRef={register({ required: false })}
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Correo destino
                          </label>
                              <Input
                                className="form-control-alternative"
                                name="correo"
                                type="email"
                                innerRef={register({ required: false })}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </div>
                      <hr className="my-4 " />
                    </Col>
                    <Col>
                  <div className="custom-control custom-control-alternative custom-checkbox text-right">
                    <Input
                      className="custom-control-input"
                      id="customCheck5"
                      type="checkbox"
                      onChange={(e) => {
                        setshowAfiliacion(e.target.checked)
                      }}
                    />
                    <label className="custom-control-label" htmlFor="customCheck5">
                      Afiliación
                    </label>
                  </div>
                    </Col>
                    <Col lg="12" className={showAfiliacion?"block":"d-none"}>
                      <h6 className="heading-small text-muted mb-4">
                        Afiliación
                      </h6>
                      <div className="pl-lg-4">
                        <Row>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Concepto
                          </label>
                              <Input
                                className="form-control-alternative"
                                type="text"
                                value={"PAGO AFILIACION ASOCIADO"}
                                disabled
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="2">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Importe
                          </label>
                              <Input
                                className="form-control-alternative text-center"
                                name="importe"
                                type="number"
                                min="0" 
                                innerRef={register({ required: showAfiliacion})}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </div>
                      <hr className="my-4 " />
                    </Col>
                    <Col lg="12 ">
                      <h6 className="heading-small text-muted mb-4">
                        Membresía
                      </h6>
                      <div className="pl-lg-4">
                        <Row>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Concepto
                          </label>
                              <Input
                                className="form-control-alternative"
                                type="text"
                                value={"PAGO ORDINARIO ASOCIADO"}
                                disabled
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="2">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Importe
                          </label>
                              <Input
                                className="form-control-alternative text-center"
                                name="ammount"
                                type="number"
                                min="0"
                                value={idAsociado ? associatedObject[0]?.importeMensual : ""}
                                disabled
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="2">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Cantidad
                          </label>
                              <Input
                                className="form-control-alternative text-center"
                                type="number"
                                min="1"
                                value={meses.length}
                                disabled
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Meses
                          </label>

                              <Select
                                placeholder="Seleccione..."
                                className="select-style select-multiple-height"
                                isMulti
                                name="months"
                                options={[{ 'value': 1, 'label': 'Enero' },
                                { 'value': 2, 'label': 'Febrero' },
                                { 'value': 3, 'label': 'Marzo' },
                                { 'value': 4, 'label': 'Abril' },
                                { 'value': 5, 'label': 'Mayo' },
                                { 'value': 6, 'label': 'Junio' },
                                { 'value': 7, 'label': 'Julio' },
                                { 'value': 8, 'label': 'Agosto' },
                                { 'value': 9, 'label': 'Setiembre' },
                                { 'value': 10, 'label': 'Octubre' },
                                { 'value': 11, 'label': 'Noviembre' },
                                { 'value': 12, 'label': 'Diciembre' },
                                ]}
                                classNamePrefix="select"
                                onChange={(inputValue, actionMeta) => {
                                  setmeses(inputValue);
                                }}
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="2">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Año
                              </label>
                              <Input
                                className="form-control-alternative text-center"
                                name="year_pass"
                                type="number"
                                min="2019"
                                max="2022"
                                defaultValue="2021"
                                innerRef={register({ required: false })}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                          <hr />
                          <div style={{float: 'right', fontSize:'1.5rem'}}>

                          <small>Total: s/.</small><strong >{idAsociado ? (associatedObject[0]?.importeMensual)*meses?.length : 0}</strong>
                          </div>
                      </div>
                    </Col>
                  </Row>
                  <div className="text-center mt-5">
                    <Button className="my-4 btn-block" color="primary" type="submit" disabled={idAsociado?false:true}>
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

export default NuevaEmision;
