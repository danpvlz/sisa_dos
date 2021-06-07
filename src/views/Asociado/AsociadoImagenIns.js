import React, { useState, useEffect } from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  Container,
  Row,
  Button,
  Col,
  CardBody,
  Collapse
} from "reactstrap";
// core components
import { useDispatch, useSelector } from "react-redux";
import { listMonth, listWeek } from "../../redux/actions/Asociado";

var monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'];
var daysNames = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
var daysNamesSM = ["L", "M", "M", "J", "V", "S", "D"];

const Asociado = () => {
  const [typeCalendar, settypeCalendar] = useState(1);

  return (
    <>
      <div className="header pb-8 pt-8 d-flex align-items-center">
        <span className="mask bg-gradient-info opacity-8" />
      </div>
      {/* Page content */}
      <Container className="mt--9" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            {
              typeCalendar === 1 ?
                <>
                  <WeekCalendar typeCalendar={typeCalendar} settypeCalendar={settypeCalendar} />
                  <DayCalendar typeCalendar={typeCalendar} settypeCalendar={settypeCalendar} />
                </>
                :
                <MonthCalendar typeCalendar={typeCalendar} settypeCalendar={settypeCalendar} />
            }
          </div>
        </Row>
      </Container>
    </>
  );
};

const DayCalendar = ({ typeCalendar, settypeCalendar }) => {
  const [isOpen, setisOpen] = useState({});
  const dispatch = useDispatch();
  const { associatedMonthCalendar } = useSelector(({ asociado }) => asociado);
  const [firstDay, setfirstDay] = useState(new Date());
  const [prevMonth, setprevMonth] = useState(new Date().getMonth());

  const currentDay = () => {
    setfirstDay(new Date());
    if (new Date.getMonth() !== prevMonth) {
      setprevMonth(new Date.getMonth());
    }
  }

  const addDay = () => {
    let ini = new Date(firstDay);
    let newDate = new Date(ini.setDate(ini.getDate() + parseInt(1)));
    setfirstDay(newDate);
    if (newDate.getMonth() !== prevMonth) {
      setprevMonth(newDate.getMonth());
    }
  }

  const minusDay = () => {
    let ini = new Date(firstDay);
    let newDate = new Date(ini.setDate(ini.getDate() - parseInt(1)));
    setfirstDay(newDate);
    if (newDate.getMonth() !== prevMonth) {
      setprevMonth(newDate.getMonth());
    }
  }

  useEffect(() => {
    dispatch(listMonth({ month: prevMonth + 1 }));
  }, [prevMonth,dispatch]);

  return (

    <Card className="shadow d-sm-none">
      <CardHeader className="border-0">
        <Row className="m-auto">
          <Col lg={2}>
            <div className="d-block text-center">
              <Button color={typeCalendar === 1 ? "primary" : "white"} size="sm" type="button" onClick={() => settypeCalendar(1)}>Día</Button>
              <Button color={typeCalendar === 1 ? "white" : "primary"} size="sm" type="button" onClick={() => settypeCalendar(2)}>Mes</Button>
            </div>
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        <Row className="text-center pb-4 mx-auto">
          <Col className="d-flex">
            <Button
              className="icon icon-shape text-primary rounded-circle shadow"
              onClick={minusDay}
            >
              <i className="ni ni-bold-left " />
            </Button>
            <div className={`flex-column text-center mx-3`}>
              <h3 className="text-primary p-0 m-0">
                {daysNames[firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1]}
              </h3>
              <h3 className="text-primary p-0 m-0">
                {firstDay.getDate() + ' ' + monthNames[firstDay.getMonth()] +
                  ' ' + firstDay.getFullYear()}
              </h3>
              <Button color="secondary" outline size="sm" type="button" onClick={currentDay}>Hoy</Button>
            </div>
            <Button
              className="btn-sm  icon icon-shape text-primary rounded-circle shadow"
              onClick={addDay}
            >
              <i className="ni ni-bold-right" />
            </Button>
          </Col>
        </Row>
        <Row className="border rounded bg-secondary p-2">
          <Col className="text-center">
            {
              associatedMonthCalendar?.filter((calItem) => new Date(calItem.fecha + ' ').getDate() === firstDay.getDate())?.length === 0 &&
              <p className="mx-auto mt-3 text-muted">No hay eventos</p>
            }
            {
              associatedMonthCalendar?.filter((calItem) => new Date(calItem.fecha + ' ').getDate() === firstDay.getDate())?.map((item, key) =>
                <div
                  onClick={() => setisOpen({ ...isOpen, [item.fecha + key]: isOpen.hasOwnProperty(item.fecha + key) ? !isOpen[item.fecha + key] : true })}
                  key={key} className={`calendar-item ${item.codTipo === 1 ? 'item-aniversario' : item.codTipo === 2 ? 'item-fundacion' : 'item-onomastico'}`}>
                  <span className="type-calendar-item d-block">{item.tipo.toUpperCase()}</span>
                  <strong className="calendar-item-name my-2 d-block">
                    {item.nombres.toUpperCase()}
                  </strong>
                  <small>{item.fecha}</small>
                  <Collapse isOpen={isOpen[item.fecha + key]}>
                    <hr className="my-2" />
                    <div className="text-center">
                      {
                        item.empresa !== "-" &&
                        <>
                          <i className="ni ni-building d-block"></i>
                          <small>{item.empresa}</small>
                        </>
                      }
                      <i className="fa fa-at d-block"></i>
                      <small>{item.correo ? item.correo : '--No tiene--'}</small>
                    </div>
                  </Collapse>
                </div>
              )
            }
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}

const WeekCalendar = ({ typeCalendar, settypeCalendar }) => {
  const [isOpen, setisOpen] = useState({});
  const dispatch = useDispatch();
  const { associatedWeekCalendar } = useSelector(({ asociado }) => asociado);
  const [firstDay, setfirstDay] = useState(new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 1)));
  const getCalendarDate = (addDays) => {
    let ini = new Date(firstDay);
    return new Date(ini.setDate(ini.getDate() + parseInt(addDays)));
  }

  const currentWeek = () => {
    setfirstDay(new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 1)));
  }

  const addWeek = () => {
    let ini = firstDay;
    setfirstDay(new Date(ini.setDate(ini.getDate() + parseInt(7))));
  }

  const minusWeek = () => {
    let ini = firstDay;
    setfirstDay(new Date(ini.setDate(ini.getDate() - parseInt(7))));
  }

  const constructDate = (date) => {
    let month = date.getMonth() + 1;
    return date.getFullYear() + '-' + (month < 10 ? '0' + month : month) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
  }

  useEffect(() => {
    let ini = new Date(firstDay);
    let end = new Date(ini.setDate(ini.getDate() + parseInt(6)));
    dispatch(listWeek({ start: constructDate(firstDay), end: constructDate(end) }));
  }, [firstDay,dispatch]);

  return (
    <Card className="shadow d-none d-md-flex">
      <CardHeader className="border-0">
        <Row className="m-auto">
          <Col lg={10} className="d-flex mb-3">
            <Button
              className="icon icon-shape text-primary rounded-circle shadow"
              onClick={minusWeek}
            >
              <i className="ni ni-bold-left " />
            </Button>
            <div className="flex-column text-primary text-center mx-3">
              <h1 className="text-primary p-0 m-0">
                {monthNames[getCalendarDate(6).getMonth()] +
                  ', ' + getCalendarDate(6).getFullYear() + ' (' +
                  firstDay.getDate() + ' - ' +
                  (getCalendarDate(6).getDate()) + ')'}
              </h1>
              <Button color="secondary" outline size="sm" type="button" onClick={currentWeek}>Esta semana</Button>
            </div>
            <Button
              className="btn-sm  icon icon-shape text-primary rounded-circle shadow"
              onClick={addWeek}
            >
              <i className="ni ni-bold-right" />
            </Button>
          </Col>
          <Col lg={2}>
            <div className="d-block text-center">
              <Button color={typeCalendar === 1 ? "primary" : "white"} size="sm" type="button" onClick={() => settypeCalendar(1)}>Semana</Button>
              <Button color={typeCalendar === 1 ? "white" : "primary"} size="sm" type="button" onClick={() => settypeCalendar(2)}>Mes</Button>
            </div>
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        <Row className="text-center pb-4">
          {
            [...Array(7).keys()].map((day, i) =>
              <Col key={i}>
                <Row className={getCalendarDate(i).getDate() === new Date().getDate() ? 'text-primary' : 'day'}>
                  <Col className="col-12 mb-2 day-name">
                    {daysNames[i]}
                  </Col>
                  <Col className="col-12">
                    <span className="day-number">{getCalendarDate(i).getDate()}</span>
                  </Col>
                </Row>
              </Col>
            )
          }
        </Row>
        <div className="d-flex border rounded bg-secondary">{
          [...Array(7).keys()].map((day, i) =>
            <div key={i} className="m-0 p-0 day-container">
              {
                associatedWeekCalendar?.filter((calItem) => new Date(calItem.fecha + ' ').getDate() === getCalendarDate(i).getDate())?.map((item, key) =>
                  <div
                    onClick={() => setisOpen({ ...isOpen, [item.fecha + key]: isOpen.hasOwnProperty(item.fecha + key) ? !isOpen[item.fecha + key] : true })}
                    key={key} className={`calendar-item ${item.codTipo === 1 ? 'item-aniversario' : item.codTipo === 2 ? 'item-fundacion' : 'item-onomastico'}`}>
                    <span className="type-calendar-item d-block">{item.tipo.toUpperCase()}</span>
                    <strong className="calendar-item-name my-2 d-block">
                      {item.nombres.toUpperCase()}
                    </strong>
                    <small>{item.fecha}</small>
                    <Collapse isOpen={isOpen[item.fecha + key]}>
                      <hr className="my-2" />
                      <div className="text-center">
                        {
                          item.empresa !== "-" &&
                          <>
                            <i className="ni ni-building d-block"></i>
                            <small>{item.empresa}</small>
                          </>
                        }
                        <i className="fa fa-at d-block"></i>
                        <small>{item.correo ? item.correo : '--No tiene--'}</small>
                      </div>
                    </Collapse>
                  </div>
                )
              }
            </div>
          )
        }
        </div>
      </CardBody>
    </Card>
  );
}

const MonthCalendar = ({ typeCalendar, settypeCalendar }) => {
  const dispatch = useDispatch();
  const { associatedMonthCalendar } = useSelector(({ asociado }) => asociado);
  const [startMonth, setstartMonth] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const [endMonth, setendMonth] = useState(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0));
  const [selectedDay, setselectedDay] = useState(null);
  const [selectedDate, setselectedDate] = useState(null);

  const currentMonth = () => {
    setstartMonth(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
    setendMonth(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0));
  }

  const addMonth = () => {
    let ini = startMonth;
    let newIni = new Date(ini.setMonth(ini.getMonth() + parseInt(1)));
    setstartMonth(newIni);
    setendMonth(new Date(newIni.getFullYear(), newIni.getMonth() + 1, 0));
  }

  const minusMonth = () => {
    let ini = startMonth;
    let newIni = new Date(ini.setMonth(ini.getMonth() - parseInt(1)));
    setstartMonth(newIni);
    setendMonth(new Date(newIni.getFullYear(), newIni.getMonth() + 1, 0));
  }

  const getDayMonth = (key, i) => {
    let returnDay = startMonth.getDate() + i + (7 * (key - 1) + (7 - (startMonth.getDay() - 1)));
    return returnDay > endMonth.getDate() ? '' : returnDay;
  }

  const checkCurrent = (d) => {
    let ini = new Date();

    return ini.getMonth() + '-' + ini.getDate() === startMonth.getMonth() + '-' + d;
  }

  useEffect(() => {
    dispatch(listMonth({ month: startMonth.getMonth() + 1 }));
    setselectedDate(null);
    setselectedDay(null);
  }, [startMonth,dispatch]);

  const getSelected = (key, i) => {
    let day = startMonth.getDate() + i + (7 * (key - 1) + (7 - (startMonth.getDay() - 1)));
    let returnDate = startMonth.getFullYear() + '-' + (startMonth.getMonth() < 10 ? '0' + startMonth.getMonth() : startMonth.getMonth()) + '-' + (day < 10 ? '0' + day : day);
    return day > endMonth.getDate() ? '' : returnDate;
  }

  const getSelectedByDate = (i) => {
    return startMonth.getFullYear() + '-' + (startMonth.getMonth() < 10 ? '0' + startMonth.getMonth() : startMonth.getMonth()) + '-' + (startMonth.getDate() + i < 10 ? '0' + (startMonth.getDate() + parseInt(i)) : (startMonth.getDate() + parseInt(i)));
  }

  return (
    <>
      <Card className="shadow">
        <CardHeader className="border-0">
          <Row className="m-auto">
            <Col lg={10} className="d-flex mb-3">
              <Button
                className="icon icon-shape text-primary rounded-circle shadow"
                onClick={minusMonth}
              >
                <i className="ni ni-bold-left " />
              </Button>
              <div className="flex-column text-primary text-center mx-3">
                <h2 className="text-primary p-0 m-0">
                  {monthNames[startMonth.getMonth()] + ', ' + startMonth.getFullYear()}
                </h2>
                <Button color="secondary" outline size="sm" type="button" onClick={currentMonth}>Este mes</Button>
              </div>
              <Button
                className="btn-sm  icon icon-shape text-primary rounded-circle shadow"
                onClick={addMonth}
              >
                <i className="ni ni-bold-right" />
              </Button>
            </Col>
            <Col lg={2}>
              <div className="d-block text-center">
                <Button color={typeCalendar === 1 ? "primary" : "white"} size="sm" type="button" onClick={() => settypeCalendar(1)}><span className="d-none d-md-flex">Semana</span><span className="d-sm-none">Día</span></Button>
                <Button color={typeCalendar === 1 ? "white" : "primary"} size="sm" type="button" onClick={() => settypeCalendar(2)}>Mes</Button>
              </div>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Row className="pb-4 d-none d-md-flex">
            {
              daysNames.map((day, i) =>
                <Col key={i} className="text-center">
                  {day}
                </Col>
              )
            }
          </Row>
          <Row className="pb-4 d-sm-none">
            {
              daysNamesSM.map((day, i) =>
                <Col key={i} className="text-center">
                  {day}
                </Col>
              )
            }
          </Row>
          {[...Array(Math.ceil((startMonth.getDay() - 1 + endMonth.getDate()) / 7))].map((week, key) =>
            <Row key={key}>
              {
                key === 0 &&
                [...Array(startMonth.getDay() === 0 ? 6 : startMonth.getDay() - 1).keys()].map((empty, i) =>
                  <Col className="text-center m-0 p-0 my-2" key={i}></Col>
                )
              }
              {
                key === 0 ?
                  [...Array(7 - (startMonth.getDay() === 0 ? 6 : startMonth.getDay() - 1)).keys()].map((day, i) =>
                    <Col className={`text-center m-0 p-0`} key={i}>
                      <div className="d-flex flex-column my-2">
                        {
                          checkCurrent(startMonth.getDate() + i) ? 
                          <strong className="calendar-number-month text-primary" onClick={() => { setselectedDay(startMonth.getDate() + i); setselectedDate(getSelectedByDate(i)); }}>{startMonth.getDate() + i}</strong>
                          :
                          <p className="calendar-number-month " onClick={() => { setselectedDay(startMonth.getDate() + i); setselectedDate(getSelectedByDate(i)); }}>{startMonth.getDate() + i}</p>
                        }
                        <div className="d-flex justify-content-center">
                          {
                            associatedMonthCalendar.filter(item => new Date(item.fecha + ' ').getDate() === (startMonth.getDate() + i) && item.codTipo === 1).length > 0 &&
                            <span className="calendar-indicator calendar-indicator-aniversario"></span>
                          }
                          {
                            associatedMonthCalendar.filter(item => new Date(item.fecha + ' ').getDate() === (startMonth.getDate() + i) && item.codTipo === 2).length > 0 &&
                            <span className="calendar-indicator calendar-indicator-fundacion"></span>
                          }
                          {
                            associatedMonthCalendar.filter(item => new Date(item.fecha + ' ').getDate() === (startMonth.getDate() + i) && item.codTipo === 3).length > 0 &&
                            <span className="calendar-indicator calendar-indicator-onomastico"></span>
                          }
                        </div>
                      </div>
                    </Col>
                  )
                  :
                  [...Array(7).keys()].map((day, i) =>
                    <Col className={`${checkCurrent(getDayMonth(key, i)) ? "text-primary font-weight-bold" : ""} text-center m-0 p-0`} key={i}>
                      <div className="d-flex flex-column my-2">
                        {getDayMonth(key, i) === "" ?
                          ""
                          :
                          <>
                            <p className="calendar-number-month " onClick={() => { setselectedDay(getDayMonth(key, i)); setselectedDate(getSelected(key, i)); }}>{getDayMonth(key, i)}</p>
                            <div className="d-flex justify-content-center">
                              {
                                associatedMonthCalendar.filter(item => new Date(item.fecha + ' ').getDate() === getDayMonth(key, i) && item.codTipo === 1).length > 0 &&
                                <span className="calendar-indicator calendar-indicator-aniversario"></span>
                              }
                              {
                                associatedMonthCalendar.filter(item => new Date(item.fecha + ' ').getDate() === getDayMonth(key, i) && item.codTipo === 2).length > 0 &&
                                <span className="calendar-indicator calendar-indicator-fundacion"></span>
                              }
                              {
                                associatedMonthCalendar.filter(item => new Date(item.fecha + ' ').getDate() === getDayMonth(key, i) && item.codTipo === 3).length > 0 &&
                                <span className="calendar-indicator calendar-indicator-onomastico"></span>
                              }
                            </div>
                          </>
                        }
                      </div>
                    </Col>
                  )
              }
            </Row>
          )
          }
        </CardBody>
      </Card>
      <DetailMonth items={associatedMonthCalendar} selected={selectedDay} date={selectedDate} />
    </>
  );
}

const DetailMonth = ({ items, selected, date }) => {
  const [isOpen, setisOpen] = useState({});
  return (
    <Card className={selected ? 'shadow' : 'd-none'}>
      <CardBody>
        <Row className="border rounded bg-secondary p-2  mx-auto">
          <Col className="col-12 my-2">
            <small className="d-flex"><i className="fa fa-calendar text-muted my-auto mr-2" /> {date}</small>
          </Col>
          {
            items?.filter((calItem) => new Date(calItem.fecha + ' ').getDate() === selected)?.length === 0 &&
            <p className="mx-auto mt-3 text-muted">No hay eventos</p>
          }
          {
            items?.filter((calItem) => new Date(calItem.fecha + ' ').getDate() === selected)?.map((item, key) =>
              <Col
                onClick={() => setisOpen({ ...isOpen, [item.fecha + key]: isOpen.hasOwnProperty(item.fecha + key) ? !isOpen[item.fecha + key] : true })}
                lg={3} key={key} className="px-0">
                <div className={`calendar-item ${item.codTipo === 1 ? 'item-aniversario' : item.codTipo === 2 ? 'item-fundacion' : 'item-onomastico item-month-detail'}`}>

                  <span className="type-calendar-item d-block">{item.tipo.toUpperCase()}</span>
                  <strong className="calendar-item-name my-2 d-block">
                    {item.nombres.toUpperCase()}
                  </strong>
                  <small>{item.fecha}</small>
                  <Collapse isOpen={isOpen[item.fecha + key]}>
                    <hr className="my-2" />
                    <div className="text-center">
                      {
                        item.empresa !== "-" &&
                        <>
                          <i className="ni ni-building d-block"></i>
                          <small>{item.empresa}</small>
                        </>
                      }
                      <i className="fa fa-at d-block"></i>
                      <small>{item.correo ? item.correo : '--No tiene--'}</small>
                    </div>
                  </Collapse>
                </div>
              </Col>
            )
          }
        </Row>
      </CardBody>
    </Card>
  );
}

export default Asociado;