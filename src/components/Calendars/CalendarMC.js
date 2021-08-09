import React, { useState, useEffect } from "react";

// reactstrap components
import {
    Card,
    CardHeader,
    Row,
    Button,
    Col,
    CardBody,
    Collapse
} from "reactstrap";
// core components
import { useSelector } from "react-redux";
import Loading from "../Loaders/LoadingSmall";
import moment from "moment";
import 'moment/locale/es';
moment.locale('es');

var monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'];
var daysNames = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
var daysNamesSM = ["L", "M", "M", "J", "V", "S", "D"];

const CalendarMC = ({ defaultType = 1, dataWeek, handleChangeWeek, dataMonth, handleChangeMonth, CollapseChild, selectable = false, handleClickDay = () => { } }) => {
    const [typeCalendar, settypeCalendar] = useState(defaultType);
    return (
        <div className="col">
            {
                typeCalendar === 1 ?
                    <>
                        <WeekCalendar
                            selectable={selectable}
                            handleClickDay={handleClickDay}
                            typeCalendar={typeCalendar}
                            settypeCalendar={settypeCalendar}
                            data={dataWeek}
                            handleChange={handleChangeWeek}
                            CollapseChild={CollapseChild} />
                        <DayCalendar
                            handleClickDay={handleClickDay}
                            typeCalendar={typeCalendar}
                            settypeCalendar={settypeCalendar}
                            data={dataMonth}
                            handleChange={handleChangeMonth}
                            CollapseChild={CollapseChild} />
                    </>
                    :
                    <MonthCalendar
                        handleClickDay={handleClickDay}
                        typeCalendar={typeCalendar}
                        settypeCalendar={settypeCalendar}
                        data={dataMonth}
                        handleChange={handleChangeMonth}
                        CollapseChild={CollapseChild} />
            }
        </div>
    );
}

const WeekCalendar = ({ typeCalendar, settypeCalendar, data, handleChange, CollapseChild, selectable, handleClickDay }) => {
    const { loading } = useSelector(({ commonData }) => commonData);
    const [isOpen, setisOpen] = useState({});
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
        handleChange({ start: constructDate(firstDay), end: constructDate(end) });
        // eslint-disable-next-line
    }, [firstDay]);

    return (
        <Card className="shadow d-none d-sm-flex">
            <CardHeader className="border-0">
                <Row className="m-auto">
                    <div className="col-10 d-flex mb-3">
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
                    </div>
                    <div className="col-2">
                        <div className="d-block text-center">
                            <Button color={typeCalendar === 1 ? "primary" : "white"} size="sm" type="button" onClick={() => settypeCalendar(1)}>Semana</Button>
                            <Button color={typeCalendar === 1 ? "white" : "primary"} size="sm" type="button" onClick={() => settypeCalendar(2)}>Mes</Button>
                        </div>
                    </div>
                </Row>
            </CardHeader>
            <CardBody className="body-week overflow-auto styled-scroll">
                <div className="body-week-content">
                    {
                        !loading ?
                            <>
                                <div className="text-center d-flex justify-content-between">
                                    {
                                        [...Array(7).keys()].map((day, i) =>
                                            <div key={i} className={`day-container${selectable ? '-selectable' : ''} pb-3`} onClick={() => handleClickDay(getCalendarDate(i).toISOString().slice(0, 10))}>
                                                <Row className={getCalendarDate(i).getDate() === new Date().getDate() ? 'text-primary' : 'day'}>
                                                    <Col className="col-12 mb-2 day-name">
                                                        {daysNames[i]}
                                                    </Col>
                                                    <Col className="col-12">
                                                        <span className="day-number">{getCalendarDate(i).getDate()}</span>
                                                    </Col>
                                                </Row>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="d-flex container-week border-top">
                                    {
                                        [...Array(7).keys()].map((day, i) =>
                                            <div key={i} className={`m-0 p-0 day-container${selectable ? '-selectable' : ''}`} onClick={() => handleClickDay(getCalendarDate(i).toISOString().slice(0, 10))}>
                                                {
                                                    data?.filter((calItem) => new Date(calItem.fecha + ' ').getDate() === getCalendarDate(i).getDate())?.map((item, key) =>
                                                        <div
                                                            key={key} className={`calendar-item ${item.codTipo === 1 ? 'item-uno' : item.codTipo === 2 ? 'item-dos' : 'item-tres'}`}>
                                                            <div
                                                                className={!isOpen[item.fecha + key] ? 'break-calendar-content' : ''}
                                                                onClick={() => setisOpen({ ...isOpen, [item.fecha + key]: isOpen.hasOwnProperty(item.fecha + key) ? !isOpen[item.fecha + key] : true })}>
                                                                <span className="type-calendar-item d-block">{item.tipo.toUpperCase()}</span>
                                                                <strong className="calendar-item-name my-2 d-block">
                                                                    {item.description.toUpperCase()}
                                                                </strong>
                                                                <small>{item.small}</small>
                                                            </div>
                                                            <Collapse isOpen={isOpen[item.fecha + key]}>
                                                                <hr className="my-2" />
                                                                <CollapseChild item={item} />
                                                            </Collapse>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            </>
                            :
                            <Loading />
                    }
                </div>
            </CardBody>
        </Card>
    );
}

const DayCalendar = ({ typeCalendar, settypeCalendar, data, handleChange, CollapseChild, handleClickDay }) => {
    const [isOpen, setisOpen] = useState({});
    const [firstDay, setfirstDay] = useState(new Date());
    const [prevMonth, setprevMonth] = useState(new Date().getMonth());

    const currentDay = () => {
        setfirstDay(new Date());
        handleClickDay(moment().format('YYYY-MM-DD'));
        if (new Date().getMonth() !== prevMonth) {
            setprevMonth(new Date().getMonth());
        }
    }

    const addDay = () => {
        let ini = new Date(firstDay);
        let newDate = new Date(ini.setDate(ini.getDate() + parseInt(1)));
        setfirstDay(newDate);
        handleClickDay(moment(newDate).format('YYYY-MM-DD'));
        if (newDate.getMonth() !== prevMonth) {
            setprevMonth(newDate.getMonth());
        }
    }

    const minusDay = () => {
        let ini = new Date(firstDay);
        let newDate = new Date(ini.setDate(ini.getDate() - parseInt(1)));
        setfirstDay(newDate);
        handleClickDay(moment(newDate).format('YYYY-MM-DD'));
        if (newDate.getMonth() !== prevMonth) {
            setprevMonth(newDate.getMonth());
        }
    }

    useEffect(() => {
        handleChange({ month: prevMonth + 1 });
        // eslint-disable-next-line
    }, [prevMonth]);

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
                    <Col className="d-flex justify-content-center">
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
                <Row className="border-top p-2">
                    <Col className="text-center">
                        {
                            data?.filter((calItem) => new Date(calItem.fecha + ' ').getDate() === firstDay.getDate())?.length === 0 &&
                            <p className="mx-auto mt-3 text-muted">No hay eventos</p>
                        }
                        {
                            data?.filter((calItem) => new Date(calItem.fecha + ' ').getDate() === firstDay.getDate())?.map((item, key) =>
                                <div
                                    key={key} className={`calendar-item ${item.codTipo === 1 ? 'item-uno' : item.codTipo === 2 ? 'item-dos' : 'item-tres'}`}
                                >
                                    <div onClick={() => setisOpen({ ...isOpen, [item.fecha + key]: isOpen.hasOwnProperty(item.fecha + key) ? !isOpen[item.fecha + key] : true })}>
                                        <span className="type-calendar-item d-block">{item.tipo.toUpperCase()}</span>
                                        <strong className="calendar-item-name my-2 d-block">
                                            {item.description.toUpperCase()}
                                        </strong>
                                        <small>{item.small}</small>
                                    </div>
                                    <Collapse isOpen={isOpen[item.fecha + key]}>
                                        <hr className="my-2" />
                                        <CollapseChild item={item} />
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

const MonthCalendar = ({ typeCalendar, settypeCalendar, data, handleChange, CollapseChild, handleClickDay }) => {
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

    const getDayMonth = (key, i) => { //1-0
        // daystart:4
        //(key*7)-(startMonth.getDay()===0 ? 5 : startMonth.getDay()-2)+i
        let returnDay = (key*7)-(startMonth.getDay()===0 ? 5 : startMonth.getDay()-2)+i;
        return returnDay > endMonth.getDate() ? '' : returnDay;
    }

    const checkCurrent = (d) => {
        let ini = new Date();

        return ini.getMonth() + '-' + ini.getDate() === startMonth.getMonth() + '-' + d;
    }

    useEffect(() => {
        handleChange({ month: startMonth.getMonth() + 1 });
        setselectedDate(null);
        setselectedDay(null);
        // eslint-disable-next-line
    }, [startMonth]);

    const getSelected = (key, i) => {
        let day = (key*7)-(startMonth.getDay()===0 ? 5 : startMonth.getDay()-2)+i;
        let returnDate = startMonth.getFullYear() + '-' + ((startMonth.getMonth() + 1) < 10 ? '0' + (startMonth.getMonth() + 1) : (startMonth.getMonth() + 1)) + '-' + (day < 10 ? '0' + day : day);
        return day > endMonth.getDate() ? '' : returnDate;
    }

    const getSelectedByDate = (i) => {
        return startMonth.getFullYear() + '-' + ((startMonth.getMonth() + 1) < 10 ? '0' + (startMonth.getMonth() + 1) : (startMonth.getMonth() + 1)) + '-' + (startMonth.getDate() + i < 10 ? '0' + (startMonth.getDate() + parseInt(i)) : (startMonth.getDate() + parseInt(i)));
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
                    {[...Array(Math.ceil((endMonth.getDate() + (7 - startMonth.getDay()) + (7 - endMonth.getDay())) / 7))].map((week, keyWeek) =>
                            <Row key={keyWeek}>
                                {
                                    keyWeek === 0 &&
                                    [...Array(startMonth.getDay() === 0 ? 6 : startMonth.getDay() - 1).keys()].map((empty, i) =>
                                        <Col className="text-center m-0 p-0 my-2" key={i}></Col>
                                    )
                                }
                                {
                                    keyWeek === 0 ?
                                        [...Array(7 - (startMonth.getDay() === 0 ? 6 : startMonth.getDay() - 1)).keys()].map((day, i) =>
                                            <Col className={`text-center m-0 p-0`} key={i}>
                                                <div className="d-flex flex-column my-2">
                                                    {
                                                        checkCurrent(startMonth.getDate() + i) ?
                                                            <strong className="calendar-number-month text-primary" onClick={() => { setselectedDay(startMonth.getDate() + i); setselectedDate(getSelectedByDate(i)); handleClickDay(getSelectedByDate(i)) }}>{startMonth.getDate() + i}</strong>
                                                            :
                                                            <p className="calendar-number-month " onClick={() => { setselectedDay(startMonth.getDate() + i); setselectedDate(getSelectedByDate(i)); handleClickDay(getSelectedByDate(i)) }}>{startMonth.getDate() + i}</p>
                                                    }
                                                    <div className="d-flex justify-content-center">
                                                        {
                                                            data.filter(item => new Date(item.fecha + ' ').getDate() === (startMonth.getDate() + i) && item.codTipo === 1).length > 0 &&
                                                            <span className="calendar-indicator calendar-indicator-uno"></span>
                                                        }
                                                        {
                                                            data.filter(item => new Date(item.fecha + ' ').getDate() === (startMonth.getDate() + i) && item.codTipo === 2).length > 0 &&
                                                            <span className="calendar-indicator calendar-indicator-dos"></span>
                                                        }
                                                        {
                                                            data.filter(item => new Date(item.fecha + ' ').getDate() === (startMonth.getDate() + i) && item.codTipo === 3).length > 0 &&
                                                            <span className="calendar-indicator calendar-indicator-tres"></span>
                                                        }
                                                    </div>
                                                </div>
                                            </Col>
                                        )
                                        :
                                        [...Array(7).keys()].map((day, i) =>
                                            <Col className={`${checkCurrent(getDayMonth(keyWeek, i)) ? "text-primary font-weight-bold" : ""} text-center m-0 p-0`} key={i}>
                                                <div className="d-flex flex-column my-2">
                                                    {getDayMonth(keyWeek, i) === "" ?
                                                        ""
                                                        :
                                                        <>
                                                            <p className="calendar-number-month " onClick={() => { setselectedDay(getDayMonth(keyWeek, i)); setselectedDate(getSelected(keyWeek, i)); handleClickDay(getSelected(keyWeek, i)) }}>{getDayMonth(keyWeek, i)}</p>
                                                            <div className="d-flex justify-content-center">
                                                                {
                                                                    data.filter(item => new Date(item.fecha + ' ').getDate() === getDayMonth(keyWeek, i) && item.codTipo === 1).length > 0 &&
                                                                    <span className="calendar-indicator calendar-indicator-uno"></span>
                                                                }
                                                                {
                                                                    data.filter(item => new Date(item.fecha + ' ').getDate() === getDayMonth(keyWeek, i) && item.codTipo === 2).length > 0 &&
                                                                    <span className="calendar-indicator calendar-indicator-dos"></span>
                                                                }
                                                                {
                                                                    data.filter(item => new Date(item.fecha + ' ').getDate() === getDayMonth(keyWeek, i) && item.codTipo === 3).length > 0 &&
                                                                    <span className="calendar-indicator calendar-indicator-tres"></span>
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
            <DetailMonth items={data} selected={selectedDay} date={selectedDate} CollapseChild={CollapseChild} />
        </>
    );
}

const DetailMonth = ({ items, selected, date, CollapseChild }) => {
    const [isOpen, setisOpen] = useState({});
    return (
        <Card className={selected ? 'shadow' : 'd-none'}>
            <CardBody>
                <strong>Detalle</strong>
                <Row className="p-2  mx-auto">
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
                                lg={3} key={key} className="px-0 m-1">
                                <div className={`calendar-item ${item.codTipo === 1 ? 'item-uno' : item.codTipo === 2 ? 'item-dos' : 'item-tres '}`}>
                                    <div
                                        onClick={() => setisOpen({ ...isOpen, [item.fecha + key]: isOpen.hasOwnProperty(item.fecha + key) ? !isOpen[item.fecha + key] : true })}>
                                        <span className="type-calendar-item d-block">{item.tipo.toUpperCase()}</span>
                                        <strong className="calendar-item-name my-2 d-block">
                                            {item.description.toUpperCase()}
                                        </strong>
                                        <small>{item.small}</small>
                                    </div>
                                    <Collapse isOpen={isOpen[item.fecha + key]}>
                                        <hr className="my-2" />
                                        <CollapseChild item={item} />
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

export default CalendarMC
