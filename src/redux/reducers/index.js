import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import Common from "./Common";
import Auth from "./Auth";
import Asistencia from './Asistencia';
import Colaborador from './Colaborador';
import Asociado from './Asociado';
import Cobrador from './Cobrador';
import Llamada from './Llamada';
import Cuenta from './Cuenta';
import Promotor from './Promotor';
import ComiteGremial from './ComiteGremial';
import Servicio from './Servicio';
import Cliente from './Cliente';
import Concepto from './Concepto';
import Caja from './Caja';
import Inscripcion from './Inscripcion';
import Curso from './Curso';
import Participante from './Participante';
import Firebase from './Firebase';
import Pago from './Pago';

const reducers = (history) =>
combineReducers({
  router: connectRouter(history),
  commonData: Common,
  auth: Auth,
  asistencia: Asistencia,
  colaborador: Colaborador,
  asociado: Asociado,
  cobrador: Cobrador,
  llamada: Llamada,
  cuenta: Cuenta,
  promotor: Promotor,
  comite: ComiteGremial,
  servicio: Servicio,
  cliente: Cliente,
  concepto: Concepto,
  caja: Caja,
  inscripcion: Inscripcion,
  curso: Curso,
  participante: Participante,
  firebase: Firebase,
  pago: Pago,
})

export default reducers;