import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import Common from "./Common";
import Auth from "./Auth";
import Asistencia from './Asistencia';
import Colaborador from './Colaborador';
import Asociado from './Asociado';
import Cobrador from './Cobrador';
import Llamada from './Llamada';

export default (history) =>
combineReducers({
  router: connectRouter(history),
  commonData: Common,
  auth: Auth,
  asistencia: Asistencia,
  colaborador: Colaborador,
  asociado: Asociado,
  cobrador: Cobrador,
  llamada: Llamada,
})