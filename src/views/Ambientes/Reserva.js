import React, { useState, useRef } from "react";

// reactstrap components
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Button,
  Table,
  Collapse,
} from "reactstrap";

// core components
import { useForm } from "react-hook-form";
import { fetchError, hideMessage } from '../../redux/actions/Common';
import { useDispatch, useSelector } from "react-redux";
import { save, listMonth, listWeek } from "../../redux/actions/Reserva";
import CalendarMC from "../../components/Calendars/CalendarMC";
import SearchCliente from "components/Selects/SearchCliente";
import SearchColaborador from "components/Selects/SearchColaborador";
import SearchAmbientes from "components/Selects/SearchAmbientes";
import ReactDateTime from "react-datetime";
import NewClient from '../../components/Modals/NewClient';
import moment from "moment";
import 'moment/locale/es';
moment.locale('es');

const ReservaCommon = ({ register, settimeinfo, timeinfo, dateSelected }) => {
  const [since, setsince] = useState(null);
  const [until, setuntil] = useState(null);

  const handleChangeHour = (e, type) => {
    if (e._isValid) {
      if (type === "since") {
        setsince(moment(e));
        setuntil(moment(e)?.add(1, 'hour'));
        settimeinfo({ ...timeinfo, since: e?.format('LTS'), until: moment(e)?.add(1, 'hour')?.format('LTS'), dif: 1 });
      } else {
        setuntil(e);
        settimeinfo({ ...timeinfo, until: e?.format('LTS'), dif: e?.diff(since, 'hours') ? e?.diff(since, 'hours') :  0});
      }
    } else {
      if (type === "since") {
        setsince(null);
        settimeinfo({ ...timeinfo, since: null, until: null, dif: 0 });
      } else {
        setuntil(null);
      }
    }
  }

  return (
    <>
      <Col lg="12">
        <FormGroup className="mb-0 pb-4">
          <Input
            className="form-control-alternative"
            placeholder="Motivo"
            type="text"
            name="motivo"
            innerRef={register({ required: false })}
          />
        </FormGroup >
      </Col>
      <Col lg="12">
        <div className="form-control-alternative assistance-input mb-3">
        <i className="fa fa-calendar mr-2" aria-hidden="true"></i> {moment(dateSelected).format('LL')}
        </div>
        {
          moment(dateSelected,'YYYY-MM-DD').diff(moment().format('YYYY-MM-DD'),'days')<0 ?
          <div className="mb-3 mt--2">
          <i className="fa fa-exclamation-triangle text-danger text-small mr-2" aria-hidden="true"></i>
          <small className="text-danger font-weight-bold">Seleccione una fecha mayor a hoy.</small>
          </div>
          :
          ""
        }
      </Col>
      <Col lg="6">
        <FormGroup className="mb-0 pb-4">
          <InputGroup className="input-group-alternative">
            <ReactDateTime
              name="since"
              inputProps={{
                placeholder: "Desde"
              }}
              timeFormat={"h A"}
              onChange={(e) => handleChangeHour(e, 'since')}
              dateFormat={false}
              value={since?.format('h A')}
            />
          </InputGroup>
        </FormGroup >
      </Col>
      <Col lg="6">
        <FormGroup className="mb-0 pb-4">
          <InputGroup className="input-group-alternative">
            <ReactDateTime
              name="until"
              inputProps={{
                placeholder: "Hasta"
              }}
              timeFormat={"h A"}
              onChange={(e) => handleChangeHour(e, 'until')}
              dateFormat={false}
              value={until?.format('h A')}
            />
          </InputGroup>
        </FormGroup >
      </Col>
    </>
  );
}

const ReservaItems = ({ type, items, setitems, cantidad, request, setidAmbiente }) => {
  const selectAmbientes = useRef();
  const dispatch = useDispatch();
  const [ambienteSelected, setambienteSelected] = useState({
    idAmbiente: "",
    label: "",
    inmutable: "",
    price: "",
    descuento: "",
    gratuito: false
  });
  const getTotal=()=>{
    return ((ambienteSelected.price ? ambienteSelected.price : 0)*(cantidad ? cantidad : 0))-(ambienteSelected?.descuento ? ambienteSelected.descuento : 0);
  }
  const addItem = () => {
    let foundError=false;
    if (ambienteSelected.idAmbiente === "") {
      dispatch(fetchError("Debe seleccionar un concepto."));
      foundError=true;
    } else {
      if (items.some(a => a.idAmbiente === ambienteSelected.idAmbiente)) {
        dispatch(fetchError("Item repetido"));
        foundError=true;
      } else {
        if (type === "externa" && ambienteSelected.gratuito === false && ambienteSelected.price === "") {
          dispatch(fetchError("Debe asignar un precio."));
          foundError=true;
        } else {
          if (type === "externa" && (cantidad===0 || !cantidad)) {
            dispatch(fetchError("Escoja un rango de hóras válido, no puede ser cero."));
            foundError=true;
          } else {
            ambienteSelected.cantidad= cantidad;
            ambienteSelected.total= getTotal();
            setitems(items.concat(ambienteSelected));
            setambienteSelected({
              ...ambienteSelected,
              idAmbiente: "",
              label: "",
              inmutable: "",
              price: "",
              descuento: ""
            });
            selectAmbientes?.current?.select?.clearValue();
          }
        }
      }
    }
    if(foundError){
      setTimeout(() => {
        dispatch(hideMessage());
      }, 500);
    }
  }

  const handleChangeAmbienteSelected=(e)=>{
    setambienteSelected(e);
    setidAmbiente(e.idAmbiente);
    dispatch(listMonth({...request.month,idConcepto:e.idAmbiente}));
    dispatch(listWeek({...request.week,idConcepto:e.idAmbiente}));
  }
  
  return (
    <>
      <Col lg="12">
        <FormGroup className="mb-0 pb-3">
          <SearchAmbientes 
            setSelected={handleChangeAmbienteSelected}
            selectInputRef={selectAmbientes}
          />
        </FormGroup >
      </Col>
      {
        type === "externa" ?
          <>
            <Col lg="12">
              <FormGroup className="mb-2">
                <input
                  className="form-control-alternative mr-4"
                  id="free2"
                  name="free2"
                  type="checkbox"
                  checked={ambienteSelected.gratuito}
                  onChange={(e) => {if(e.target.checked!==ambienteSelected.gratuito){ setambienteSelected({ ...ambienteSelected, gratuito: e.target.checked })}}}
                />
                <label
                  htmlFor="free2"
                >
                  <span className="text-muted">Gratuito</span>
                </label>
              </FormGroup >
            </Col>
            {
              !ambienteSelected.gratuito ?
                <>
                  <Col lg="6">
                    <FormGroup className="mb-0 pb-4">
                      <label
                        className="form-control-label"
                        htmlFor="precio"
                      >
                        Precio (S/.)
                      </label>
                      <Input
                        className="form-control-alternative text-right"
                        id="precio"
                        type="number"
                        min="0"
                        step="any"
                        onWheelCapture={(e) => e.target.blur() }
                        readOnly={ambienteSelected.inmutable === 1}
                        placeholder="S/."
                        value={ambienteSelected.price}
                        onChange={(e) => {if(e.target.value!==ambienteSelected.price){ setambienteSelected({ ...ambienteSelected, price: e.target.value })}}}
                      />
                    </FormGroup >
                  </Col>
                  <Col lg="6">
                    <FormGroup className="mb-0 pb-4">
                      <label
                        className="form-control-label"
                        htmlFor="cantidad"
                      >
                        Cantidad (h)
                      </label>
                      <Input
                        className="form-control-alternative text-right"
                        id="cantidad"
                        type="number"
                        min="1"
                        step="any"
                        disabled
                        value={cantidad}
                      />
                    </FormGroup >
                  </Col>
                  <Col lg="6">
                    <FormGroup className="mb-0 pb-4">
                      <label
                        className="form-control-label"
                        htmlFor="descuento"
                      >
                        Descuento (S/.)
                      </label>
                      <Input
                        className="form-control-alternative text-right"
                        id="descuento"
                        type="number"
                        min="0"
                        step="any"
                        placeholder="S/."
                        onWheelCapture={(e) => e.target.blur() }
                        value={ambienteSelected.descuento ? ambienteSelected.descuento : ""}
                        onChange={(e) => {
                          if(e.target.value!==ambienteSelected?.descuento){
                            setambienteSelected({ ...ambienteSelected, descuento: e.target.value })
                          }
                        }}
                      />
                    </FormGroup >
                  </Col>
                  <Col lg="6">
                    <FormGroup className="mb-0 pb-4">
                      <label
                        className="form-control-label"
                        htmlFor="total"
                      >
                      Total (S/.)
                      </label>
                      <Input
                        className="form-control-alternative text-right"
                        id="total"
                        type="total"
                        placeholder="S/."
                        value={((ambienteSelected.price ? ambienteSelected.price : 0)*(cantidad ? cantidad : 0))-(ambienteSelected?.descuento ? ambienteSelected.descuento : 0)}
                        disabled
                      />
                    </FormGroup >
                  </Col>
                </>
                :
                ""
            }
          </>
          :
          ""
      }
      <Col lg="12" className="mt-3">
        <Button color="primary" className="btn btn-block" onClick={addItem}>
          <i className="fa fa-plus mr-1" /> Agregar
        </Button>
      </Col>
      {
        items.length > 0 ?
          <Col lg="12" className="mt-3">
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr className="text-right">
                  <th scope="col" className="text-left">Concepto</th>
                  <th scope="col" />
                </tr>
              </thead>
              <tbody>
                {
                  items?.map((item, key) =>
                    <tr key={key}>
                      <td className="p-1 text-left">
                        {item?.label}
                        {
                        type==='externa' ?
                        `
                        ${item?.gratuito ? 'GRATUITO' : 
                        (`
                          x${item?.cantidad} 
                          ${item.descuento ? 
                            '(-S/.'+item.descuento +')' 
                            : ''
                          }      
                          Total:S/.${item?.total}
                        `)}
                        `
                        :
                        ''
                      }
                      </td>
                      <td className="p-1 text-right">
                        <Button className="btn btn-sm" color="danger" type="button" onClick={() => { setitems(items.filter((a, i) => i !== key)) }}>
                          <i className="fa fa-trash" />
                        </Button>
                      </td>
                    </tr>)
                }
              </tbody>
            </Table>
          </Col>
          :
          ""
      }
    </>
  );
}

const ReservaInterna = ({ changeType, dateSelected, request, setidAmbiente }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const [timeinfo, settimeinfo] = useState({});
  const [colaborador, setcolaborador] = useState(null);
  const [items, setitems] = useState([]);

  const resetForm=()=>{
    settimeinfo({});
    setitems([]);
    reset();
  }
  

  const onSubmit = (data) => {
    let foundError=false;
    if (Object.keys(timeinfo).length === 0 || timeinfo?.since==null || timeinfo?.until==null) {
      dispatch(fetchError("Debe especificar las horas de uso."));
      foundError=true;
    } else {
      if (colaborador == null) {
        dispatch(fetchError("Debe seleccionar un colaborador."));
        foundError=true;
      } else {
        if (items.length === 0) {
          dispatch(fetchError("Debe agregar al menos un item."));
          foundError=true;
        } else {
          data.idResponsable = colaborador;
          data.date = dateSelected;
          data.typeReservation = 'interna';
          
          dispatch(save({ ...timeinfo, ...data, items: items }));
          dispatch(listMonth(request.month))
          dispatch(listWeek(request.week))
          resetForm()
        }
      }
    }
    if(foundError){
      setTimeout(() => {
        dispatch(hideMessage());
      }, 500);
    }
  }

  return (
    <Card className="shadow">
      <CardHeader className="border-0 mb-0 pb-0">
        <Row>
          <div className="col-2">
            <Button
              className="icon icon-shape rounded-circle shadow"
              onClick={() => changeType(null)}
            >
              <i className="fa fa-chevron-left mr-2" aria-hidden="true"></i>
            </Button>
          </div>
          <div className="col-10"><h1 className="mt-1">Reserva interna</h1></div>
        </Row>
      </CardHeader>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <CardBody className="border-0">
          <Row>
            <ReservaCommon register={register} settimeinfo={settimeinfo} timeinfo={timeinfo} dateSelected={dateSelected} />
            <Col lg="12">
              <FormGroup className="mb-0 pb-4">
                <SearchColaborador setVal={setcolaborador} />
              </FormGroup >
            </Col>
            <ReservaItems type={'interna'} items={items} setitems={setitems} cantidad={timeinfo.dif} request={request} setidAmbiente={setidAmbiente}/>
            <Col lg="12" className="mt-4">
              <Button color="success" className="btn btn-block" type="submit" disabled={moment(dateSelected,'YYYY-MM-DD').diff(moment().format('YYYY-MM-DD'),'days')<0}>
                Registrar
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Form>
    </Card>);
}

const ReservaExterna = ({ changeType, dateSelected, request, setidAmbiente }) => {
  const selectInputRefCliente = useRef();
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const [cliente, setcliente] = useState(null);
  const [searchDoc, setSearchDoc] = useState(null);
  const [timeinfo, settimeinfo] = useState({});
  const [items, setitems] = useState([]);
  const [show, setshow] = useState({
    new: false,
    confirm: false,
  });

  const resetForm=()=>{
    settimeinfo({});
    setitems([]);
    reset();
  }
  
  const onSubmit = (data) => {
    let foundError=false;
    if (Object.keys(timeinfo).length === 0 || timeinfo?.since==null || timeinfo?.until==null) {
      dispatch(fetchError("Debe especificar las horas de uso."));
      foundError=true;
    } else {
      if (cliente == null) {
        dispatch(fetchError("Debe seleccionar un cliente."));
        foundError=true;
      } else {
        if (items.length === 0) {
          dispatch(fetchError("Debe agregar al menos un item."));
          foundError=true;
        } else {
          data.idResponsable = cliente;
          data.date = dateSelected;
          data.typeReservation = 'externa';
          
          
          dispatch(save({ ...timeinfo, ...data, items: items }));
          dispatch(listMonth(request.month))
          dispatch(listWeek(request.week))
          resetForm()

          
          selectInputRefCliente?.current?.select?.clearValue();
        }
      }
    }
    if(foundError){
      setTimeout(() => {
        dispatch(hideMessage());
      }, 500);
    }
  }

  const toogleModal = (prop) => {
    setshow({ ...show, [prop]: !show[prop] });
  };

  return (
    <>
      <NewClient
        show={show.new}
        toggleModal={() => toogleModal('new')}
        setSearchDoc={setSearchDoc}
      />
      <Card className="shadow">
        <CardHeader className="border-0 mb-0 pb-0">
          <Row>
            <div className="col-2">
              <Button
                className="icon icon-shape rounded-circle shadow"
                onClick={() => changeType(null)}
              >
                <i className="fa fa-chevron-left mr-2" aria-hidden="true"></i>
              </Button>
            </div>
            <div className="col-10"><h1 className="mt-1">Reserva externa</h1></div>
          </Row>
        </CardHeader>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <CardBody className="border-0">
            <Row>
              <ReservaCommon register={register} settimeinfo={settimeinfo} timeinfo={timeinfo} dateSelected={dateSelected} />
              <Col lg="12">
                <FormGroup className="mb-0 pb-4">
                  <div className="d-flex">
                    <div className="col-10 mx-0 px-0">
                      <SearchCliente setVal={setcliente} searchDoc={searchDoc} idCliente={cliente}  selectInputRef={selectInputRefCliente}/>
                    </div>
                    <div className="col-2 ml-0 pl-0">
                      <Button color="primary" type="button" onClick={() => toogleModal('new')}>
                        <i className="fa fa-plus" />
                      </Button>
                    </div>
                  </div>
                </FormGroup >
              </Col>
              <ReservaItems type={'externa'} items={items} setitems={setitems} cantidad={timeinfo.dif} request={request} setidAmbiente={setidAmbiente} />
              <Col lg="12" className="mt-4">
                <Button color="success" className="btn btn-block">
                  Registrar
                </Button>
              </Col>
            </Row>
          </CardBody>
        </Form>
      </Card>
    </>
  );
}

const ReservasPick = ({ dateSelected, setdateSelected, request, setidAmbiente }) => {
  const [typeReservation, settypeReservation] = useState(null);
  return (
    <>
      {
        typeReservation === 1 ?
          <ReservaInterna changeType={settypeReservation} dateSelected={dateSelected} request={request} resetDate={()=>setdateSelected(null)} setidAmbiente={setidAmbiente}/> :
          typeReservation === 2 ?
            <ReservaExterna changeType={settypeReservation} dateSelected={dateSelected} request={request} resetDate={()=>setdateSelected(null)} setidAmbiente={setidAmbiente} /> :
            <div className="mb-3">
              <Button className="btn-block mx-0 px-0" onClick={() => settypeReservation(1)}>Reserva interna</Button>
              <Button className="btn-block mx-0 px-0" onClick={() => settypeReservation(2)}>Reserva externa</Button>
              <Button className="btn-block mx-0 px-0" onClick={() => setdateSelected(null)} outline color="danger">Cancelar</Button>
            </div>
      }
    </>
  );
}

const Disponibilidad = () => {
  const dispatch = useDispatch();
  const { reservationWeek, reservationMonth } = useSelector(({ reserva }) => reserva);
  const [dateSelected, setdateSelected] = useState(null);
  const handleChangeDate = (e) => {
    setdateSelected(e);
  }
  
  const [requestWeek, setrequestWeek] = useState(null);
  const [requestMonth, setrequestMonth] = useState(null);
  const [idAmbiente, setidAmbiente] = useState(null);

  return (
    <>
      <div className="header pb-8 pt-8 d-flex align-items-center">
        <span className="mask bg-gradient-info opacity-8" />
      </div>
      {/* Page content */}
      <Container className="mt--9" fluid>
        {/* Table */}
        <Row>
          <Col lg={`${dateSelected != null ? '8' : '12'}`} className="px-0">
            <CalendarMC
              defaultType={2}
              handleClickDay={handleChangeDate}
              selectable={true}
              dataWeek={reservationWeek}
              handleChangeWeek={(e) => {dispatch(listWeek(e)); console.log(e); setrequestWeek(e)}}
              dataMonth={reservationMonth}
              handleChangeMonth={(e) => {dispatch(listMonth(e)); setrequestMonth(e)}}
              CollapseChild={({ item }) =>
                <div className="text-center">
                <i className="ni ni-single-02 text-muted d-block"></i>
                <small>{item.person}</small>
                {
                item.motivo ?
                <>
                  <small className="font-weight-bold  d-block  mt-2">
                    "{item.motivo}""
                  </small>
                </>
                :
                ""
                }
                </div>}
            />
          </Col>
          <Collapse className="col-lg-4 px-lg-0 px-md-3" isOpen={dateSelected != null}>
            <ReservasPick dateSelected={dateSelected} setdateSelected={setdateSelected} request={{month:requestMonth,week:requestWeek, idConcepto:idAmbiente}} setidAmbiente={setidAmbiente} />
          </Collapse>
        </Row>
      </Container>
    </>
  );
};

export default Disponibilidad;