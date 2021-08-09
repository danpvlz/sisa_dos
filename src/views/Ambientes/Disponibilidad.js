import React from "react";

// reactstrap components
import {
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import { useDispatch, useSelector } from "react-redux";
import { listMonth, listWeek } from "../../redux/actions/Reserva";
import CalendarMC from "../../components/Calendars/CalendarMC";
import moment from "moment";
import 'moment/locale/es';
moment.locale('es');

const Disponibilidad = () => {
  const dispatch = useDispatch();
  const { reservationWeek, reservationMonth } = useSelector(({ reserva }) => reserva);

  return (
    <>
      <div className="header pb-8 pt-8 d-flex align-items-center">
        <span className="mask bg-gradient-info opacity-8" />
      </div>
      {/* Page content */}
      <Container className="mt--9" fluid>
        {/* Table */}
        <Row>
          <Col lg='12' className="px-0">
            <CalendarMC
              defaultType={2}
              dataWeek={reservationWeek}
              handleChangeWeek={(e) => {dispatch(listWeek(e)); console.log(e);}}
              dataMonth={reservationMonth}
              handleChangeMonth={(e) => {dispatch(listMonth(e));}}
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
        </Row>
      </Container>
    </>
  );
};

export default Disponibilidad;