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
  Table,
} from "reactstrap";
import Select from 'react-select';
// core components
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import SearchCliente from "components/Selects/SearchCliente";
import { showCliente, resetClienteObject } from '../../redux/actions/Cliente';
import { fetchError, hideMessage } from '../../redux/actions/Common';
import { saveCuenta } from '../../redux/actions/Caja';
import ConfirmDialog from '../../components/Modals/ConfirmDialog';
import NewClient from '../../components/Modals/NewClient';
import SearchConcepto from "components/Selects/SearchConcepto";

const NuevaEmision = () => {
  const dispatch = useDispatch();
  const { clienteObject } = useSelector(({ cliente }) => cliente);
  const [idCliente, setidCliente] = useState(undefined);
  const [idConcepto, setidConcepto] = useState(undefined);
  const [labelConcepto, setLabelConcepto] = useState(undefined);
  const [inmutable, setinmutable] = useState(null);
  const [numPayFilled, setnumPayFilled] = useState({
    operation: false,
    sofdoc: false,
  });

  const history = useHistory();

  const { register, handleSubmit, watch, reset } = useForm();
  const [formdata, setformdata] = useState(null);
  const [confirm, setComfirm] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [tipoDocumentoEmision, settipoDocumentoEmision] = useState(null);
  const [pagado, setpagado] = useState(null);
  const [opcion, setOpcion] = useState(null);
  const [typeChange, settypeChange] = useState(1);
  const [searchDoc, setSearchDoc] = useState(null);

  const setPriceConcepto = (price) => {
    setitemValues({ ...itemValues, "price": price, "subtotal": price * itemValues.ammount })
  }

  const [itemValues, setitemValues] = useState({
    detail: '',
    price: 0,
    ammount: 0,
    subtotal: 0,
    igv: 1,
  });

  const [docModificar, setdocModificar] = useState({
    tipo: "",
    serie: "",
    numero: ""
  });

  const [items, setitems] = useState([]);

  const addItem = () => {
    if (items.some(item =>
      item.idConcepto == idConcepto)) {
      dispatch(fetchError("Item repetido"));
    } else {
      if (idConcepto == null) {
        dispatch(fetchError("Debe seleccionar un concepto."));
      } else {
        if (itemValues.price == 0) {
          dispatch(fetchError("El precio no puede ser cero."));
        } else {
          if (itemValues.price == 0) {
            dispatch(fetchError("El precio no puede ser cero."));
          } else {
            if (itemValues.ammount == 0) {
              dispatch(fetchError("La cantidad no puede ser cero."));
            } else {
              itemValues.idConcepto = idConcepto;
              itemValues.labelConcepto = labelConcepto;
              setitems(items.concat(itemValues));
              setitemValues({
                detail: '',
                price: 0,
                ammount: 0,
                subtotal: 0,
                igv: 1,
              });
            }
          }
        }
      }
    }

    setTimeout(() => {
      dispatch(hideMessage());
    }, 500);
  }

  useEffect(() => {
    if (idCliente != null) {
      dispatch(showCliente(idCliente));
    }
  }, [idCliente]);

  const onSubmit = (data) => {
    idCliente == null ?
      dispatch(fetchError("Debe elegir un cliente."))
      :
      tipoDocumentoEmision == null ?
        dispatch(fetchError("Debe elegir el tipo de documento."))
        :
        tipoDocumentoEmision != 3 && pagado == null ?
          dispatch(fetchError("Debe elegir si el comprobante fue pagado."))
          :
          pagado == 2 && opcion == null ?
            dispatch(fetchError("Debe elegir una opción."))
            :
            pagado == 2 && (!numPayFilled.operation && !numPayFilled.sofdoc) ?
              dispatch(fetchError("Debe especificar un número de operación o de sofydoc."))
              :
              items.length == 0 ?
                dispatch(fetchError("Debe agregar al menos un item."))
                :
                tipoDocumentoEmision == 3 && docModificar.tipo == "" ?
                  dispatch(fetchError("Debe especificar el tipo de documento a modificar."))
                  :
                  tipoDocumentoEmision == 3 && docModificar.serie == "" ?
                    dispatch(fetchError("Debe especificar la serie del documento a modificar."))
                    :
                    tipoDocumentoEmision == 3 && docModificar.numero == "" ?
                      dispatch(fetchError("Debe especificar el número del documento a modificar."))
                      :
                      toggleModal();
    setformdata(data);
    dispatch(hideMessage());
  };

  useEffect(() => {
    if (confirm) {
      formdata.idCliente = idCliente;
      formdata.tipo_de_comprobante = tipoDocumentoEmision;
      formdata.pagado = pagado;
      formdata.opcion = opcion;
      formdata.typeChange = typeChange;
      formdata.items = items;
      formdata.docModificar = docModificar;
      dispatch(saveCuenta(formdata));
      history.push('/admin/cuentas-caja');
    }
    setComfirm(false);
  }, [confirm]);

  const toggleModal = () => {
    setShowConfirm(!showConfirm);
  };

  const [showNewClient, setshowNewClient] = useState(false);

  const toggleModalNewClient = () => {
    setshowNewClient(!showNewClient);
  };

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
        <NewClient
          show={showNewClient}
          toggleModal={toggleModalNewClient}
          setSearchDoc={setSearchDoc}
        />
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
                      <h6 className="heading-small text-muted mb-4 d-flex">
                        <i className="fa fa-file mr-2 my-auto" /> Cuenta
                      </h6>
                      <div className="pl-lg-4">
                        <Row>
                          <Col lg="6" className="mr-0 pr-0">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Cliente
                              </label>
                              <div className="d-flex">
                                <div className="col-10 mx-0 px-0">
                                  <SearchCliente setVal={setidCliente} searchDoc={searchDoc} idCliente={idCliente} />
                                </div>
                                <div className="col-2 ml-0 pl-0">
                                  <Button color="primary" type="button" onClick={() => { dispatch(resetClienteObject()); toggleModalNewClient(); }}>
                                    <i className="fa fa-plus" />
                                  </Button>
                                </div>
                              </div>
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
                                name="tipoDocClient"
                                value={idCliente ? clienteObject?.tipo : ""}
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
                                Fecha emisión {

                                  pagado == 2 ? "/ Fecha de pago" : ""}
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
                                  if (inputValue.value == 3) {
                                    setpagado(null);
                                  } else {
                                    setdocModificar({
                                      tipo: "",
                                      serie: "",
                                      numero: ""
                                    });
                                  }
                                }}
                                options={[{ value: 1, label: "Factura" }, { value: 2, label: "Boleta" }, { value: 3, label: "Nota de crédito" }]} />
                            </FormGroup>
                          </Col>
                          {
                            tipoDocumentoEmision == 3 ?
                              <>
                                <Col lg="2">
                                  <FormGroup>
                                    <label
                                      className="form-control-label"
                                      htmlFor="input-address"
                                    >
                                      Tipo doc. modificar
                                    </label>
                                    <Select
                                      placeholder="Seleccione..."
                                      className="select-style"
                                      name="typeDocUpdate"
                                      id="typeDocUpdate"
                                      onChange={(inputValue, actionMeta) => {
                                        setdocModificar({ ...docModificar, tipo: inputValue.value, serie: inputValue.value == 1 ? "F108" : inputValue.value == 2 ? "B108" : "" });
                                      }}
                                      options={[{ value: 1, label: "Factura" }, { value: 2, label: "Boleta" }]} />
                                  </FormGroup>
                                </Col>
                                <Col lg="2">
                                  <FormGroup>
                                    <label
                                      className="form-control-label"
                                      htmlFor="input-address"
                                    >
                                      Serie a modificar
                                </label>
                                    <Input
                                      className="form-control-alternative"
                                      type="text"
                                      name="serieUpdate"
                                      onChange={(e) => {
                                        setdocModificar({ ...docModificar, serie: e.target.value })
                                      }}
                                      value={docModificar.tipo == 1 ? "F108" : docModificar.tipo == 2 ? "B108" : ""}
                                      readOnly
                                      innerRef={register({ required: tipoDocumentoEmision == 3 })}
                                    />
                                  </FormGroup>
                                </Col>
                                <Col lg="2">
                                  <FormGroup>
                                    <label
                                      className="form-control-label"
                                      htmlFor="input-address"
                                    >
                                      Num. modificar
                                </label>
                                    <Input
                                      className="form-control-alternative"
                                      type="text"
                                      name="numUpdate"
                                      onChange={(e) => {
                                        setdocModificar({ ...docModificar, numero: e.target.value })
                                      }}
                                      value={docModificar.numero}
                                      innerRef={register({ required: tipoDocumentoEmision == 3 })}
                                    />
                                  </FormGroup>
                                </Col>
                              </>
                              :
                              <>
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
                                      id="paidOut"
                                      onChange={(inputValue, actionMeta) => {
                                        setpagado(inputValue.value);
                                      }}
                                      options={[{ value: 2, label: "Sí" }, { value: 1, label: "No" }]}
                                      innerRef={register({ required: true })}
                                    />
                                  </FormGroup>
                                </Col>
                              </>
                          }
                          <Col lg="2">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Moneda
                              </label>
                              <Select
                                placeholder="Seleccione..."
                                className="select-style"
                                name="typeChange"
                                id="typeChange"
                                defaultValue={{ value: 1, label: "PEN" }}
                                onChange={(inputValue, actionMeta) => {
                                  settypeChange(inputValue.value);
                                }}
                                options={[{ value: 1, label: "PEN" }, { value: 2, label: "USD" }]} />
                            </FormGroup>
                          </Col>
                          <Col lg="9">
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
                          <Col lg="3">
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
                    {
                      pagado == 2 &&
                      <Col lg="12">
                        <h6 className="heading-small text-muted mb-4">
                          <i className="ni ni-money-coins mr-2 my-auto" /> Pago
                      </h6>
                        <div className="pl-lg-4">
                          <Row>
                            <>
                              <Col lg="2">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-address"
                                  >
                                    Medio de pago
                                      </label>
                                  <Select
                                    placeholder="Seleccione..."
                                    className="select-style"
                                    name="option"
                                    id="option"
                                    onChange={(inputValue, actionMeta) => {
                                      setOpcion(inputValue.value);
                                    }}
                                    options={[{ value: 3, label: "Banco" }, { value: 4, label: "Contado" }]}
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
                                    Num. Operación
                                        </label>
                                  <Input
                                    className="form-control-alternative"
                                    name="numoperacion"
                                    type="text"
                                    onChange={(e) => {
                                      setnumPayFilled({ ...numPayFilled, operation: e.target.value != '' ? true : false });
                                    }}
                                    innerRef={register({ required: false })}
                                  />
                                </FormGroup>
                              </Col>
                              <Col lg="2">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-address"
                                  >
                                    Num. SOFDOC
                                  </label>
                                  <Input
                                    className="form-control-alternative"
                                    name="numsofdoc"
                                    type="text"
                                    onChange={(e) => {
                                      setnumPayFilled({ ...numPayFilled, sofdoc: e.target.value != '' ? true : false });
                                    }}
                                    innerRef={register({ required: false })}
                                  />
                                </FormGroup>
                              </Col>
                            </>
                          </Row>
                        </div>
                        <hr className="my-4 " />
                      </Col>
                    }
                    <Col lg="12 ">
                      <h6 className="heading-small text-muted mb-4">
                        <i className="ni ni-cart mr-2 my-auto" /> Items
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
                              <SearchConcepto setVal={setidConcepto} setLabel={setLabelConcepto} setInmutable={setinmutable} setprice={setPriceConcepto} />
                            </FormGroup>
                          </Col>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Detalle
                          </label>
                              <Input
                                className="form-control-alternative text-center"
                                name="detalle"
                                type="text"
                                onChange={(e) => {
                                  setitemValues({ ...itemValues, "detail": e.target.value })
                                }}
                                value={itemValues.detail}
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="2">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Tipo IGV
                              </label>
                              <Select
                                placeholder="Seleccione..."
                                className="select-style"
                                name="typeChange"
                                id="typeChange"
                                value={[{ value: 1, label: "Gravada" }, { value: 7, label: "Gratuita" }][itemValues.igv - 1]}
                                onChange={(inputValue, actionMeta) => {
                                  setitemValues({ ...itemValues, igv: inputValue.value })
                                }}
                                options={[{ value: 1, label: "Gravada" }, { value: 2, label: "Gratuita" }]} />
                            </FormGroup>
                          </Col>
                          <Col lg="2">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Precio
                          </label>
                              <Input
                                className="form-control-alternative text-center"
                                name="price"
                                type="number"
                                min="0"
                                readOnly={inmutable == 1}
                                onChange={(e) => {
                                  setitemValues({ ...itemValues, "price": e.target.value, "subtotal": e.target.value * itemValues.ammount })
                                }}
                                value={itemValues.price}
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
                                name="ammount"
                                type="number"
                                min="0"
                                defaultValue="1"
                                onChange={(e) => {
                                  setitemValues({ ...itemValues, "ammount": e.target.value, "subtotal": e.target.value * itemValues.price })
                                }}
                                value={itemValues.ammount}
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="2">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Total
                          </label>
                              <Input
                                className="form-control-alternative text-center"
                                name="subtotal"
                                type="number"
                                disabled
                                value={itemValues.subtotal.toFixed(2)}
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="1" className="text-right my-auto">
                            <Button color="primary" type="button" onClick={addItem}>
                              <i className="fa fa-plus" />
                            </Button>
                          </Col>
                          <Col>
                            <Table className="align-items-center table-flush" responsive>
                              <thead className="thead-light">
                                <tr className="text-right">
                                  <th scope="col" className="text-left">Concepto</th>
                                  <th scope="col">Precio</th>
                                  <th scope="col">Cantidad</th>
                                  <th scope="col">TipoIGV</th>
                                  <th scope="col">Subtotal</th>
                                  <th scope="col">IGV</th>
                                  <th scope="col">Total</th>
                                  <th scope="col" />
                                </tr>
                              </thead>
                              <tbody className="text-right">
                                {
                                  items.map((item, key) =>
                                    <tr key={key}>
                                      <td scope="row" className="text-left">
                                        {item.labelConcepto}
                                      </td>
                                      <td>
                                        {item.price}
                                      </td>
                                      <td>
                                        {item.ammount}
                                      </td>
                                      <td>
                                        {item.igv == 1 ? "Gravada" : "Gratuita"}
                                      </td>
                                      <td>
                                        {
                                          item.igv == 2 ?
                                            item.subtotal
                                            :
                                            (item.subtotal * 100 / 118).toFixed(2)}
                                      </td>
                                      <td>
                                        {
                                          item.igv == 2 ?
                                            "-"
                                            :
                                            (item.subtotal - (item.subtotal * 100 / 118)).toFixed(2)}
                                      </td>
                                      <td>
                                        {item.subtotal}
                                      </td>
                                      <td>
                                        <Button className="btn btn-sm" color="danger" type="button" onClick={() => { setitems(items.filter((a, i) => i != key)) }}>
                                          <i className="fa fa-trash" />
                                        </Button>
                                      </td>
                                    </tr>)
                                }
                              </tbody>
                            </Table>
                          </Col>
                        </Row>
                        <hr />
                        <div style={{ float: 'right', fontSize: '1.5rem', display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
                          {
                            items.some(item => item.igv == 2) &&
                            <div><small>Gratuita: s/.</small><strong >{items.reduce((r, a) => { return r + a.subtotal }, 0)}</strong></div>
                          }
                          {
                            items.some(item => item.igv == 1) &&
                            <>
                              <div><small>Gravada: s/.</small><strong >{
                                (items.filter(item => item.igv == 1).reduce((r, a) => { return r + a.subtotal }, 0) * 100 / 118).toFixed(2)
                              }</strong></div>
                              <div><small>IGV: s/.</small><strong >{

                                (items.filter(item => item.igv == 1).reduce((r, a) => { return r + a.subtotal }, 0) - (items.filter(item => item.igv == 1).reduce((r, a) => { return r + a.subtotal }, 0) * 100 / 118)).toFixed(2)


                              }</strong></div>
                            </>
                          }
                          <div><small>Total: s/.</small><strong >{items.filter(item => item.igv == 1).reduce((r, a) => { return r + a.subtotal }, 0).toFixed(2)}</strong></div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <div className="text-center mt-5">
                    <Button className="my-4 btn-block" color="success" type="submit" disabled={idCliente ? false : true}>
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
