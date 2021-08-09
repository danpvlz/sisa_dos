import React from "react";

// reactstrap components
import {
  Container,
  Row,
} from "reactstrap";
// core components
import { useDispatch, useSelector } from "react-redux";
import { listMonth, listWeek } from "../../redux/actions/Asociado";
import CalendarMC from "../../components/Calendars/CalendarMC";
import moment from "moment";
import 'moment/locale/es';
moment.locale('es')

const Asociado = () => {
  const dispatch = useDispatch();
  const { associatedWeekCalendar, associatedMonthCalendar } = useSelector(({ asociado }) => asociado);

  return (
    <>
      <div className="header pb-8 pt-8 d-flex align-items-center">
        <span className="mask bg-gradient-info opacity-8" />
      </div>
      {/* Page content */}
      <Container className="mt--9" fluid>
        {/* Table */}
        <Row>
          <CalendarMC 
            dataWeek={associatedWeekCalendar}
            handleChangeWeek={(e)=>dispatch(listWeek(e))}
            dataMonth={associatedMonthCalendar}
            handleChangeMonth={(e)=>dispatch(listMonth(e))}
            CollapseChild={({item}) =>
            <div className="text-center">
            <i className="fa fa-calendar text-muted d-block"></i>
            <small>{moment(item.fecha).format("D MMM Y")}</small>
                {
                    item.empresa !== "-" &&
                    <>
                        <i className="ni ni-building text-muted d-block mt-2"></i>
                        <small>{item.empresa}</small>
                    </>
                }
                <i className="fa fa-at d-block text-muted mt-2"></i>
                <small>{item.correo ? item.correo : '--No tiene--'}</small>
            </div>}
          />
        </Row>
      </Container>
    </>
  );
};

export default Asociado;