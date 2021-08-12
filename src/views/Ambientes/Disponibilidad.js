import React, {useState} from "react";

// reactstrap components
import {
  Container,
  Row,
  Col,
  FormGroup
} from "reactstrap";

// core components
import { useDispatch, useSelector } from "react-redux";
import { listMonth, listWeek } from "../../redux/actions/Reserva";
import CalendarMC from "../../components/Calendars/CalendarMC";
import SearchAmbientes from "components/Selects/SearchAmbientes";
import moment from "moment";
import 'moment/locale/es';
moment.locale('es');

const Disponibilidad = () => {
  const dispatch = useDispatch();
  const { reservationWeek, reservationMonth } = useSelector(({ reserva }) => reserva);
  const [filterCalendar, setfilterCalendar] = useState({
    idConcepto: null,
    month: null,
    start: null,
    end: null,
  });

  return (
    <>
      <div className="header pb-8 pt-8 d-flex align-items-center">
        <span className="mask bg-gradient-info opacity-8" />
      </div>
      <Container className="mt--9" fluid>
        <Row>
          <Col lg="6">
            <FormGroup className="mb-0 pb-3">
              <SearchAmbientes
                setSelected={(e)=>{dispatch(listWeek({...filterCalendar,idConcepto:e.idAmbiente})); dispatch(listMonth({...filterCalendar,idConcepto:e.ididAmbiente})); setfilterCalendar({...filterCalendar,idConcepto:e.idAmbiente}); }}
              />
            </FormGroup >
          </Col>
          <Col lg='12' className="px-0">
            <CalendarMC
              defaultType={2}
              dataWeek={reservationWeek}
              handleChangeWeek={(e) => { dispatch(listWeek({...e,idConcepto:filterCalendar.idConcepto})); setfilterCalendar({...filterCalendar,start:e.start,end:e.end}) }}
              dataMonth={reservationMonth}
              handleChangeMonth={(e) => { dispatch(listMonth({...e,idConcepto:filterCalendar.idConcepto})); setfilterCalendar({...filterCalendar,month:e.month}) }}
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