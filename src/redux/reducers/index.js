import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import Common from "./Common";
import Auth from "./Auth";
import Asistencia from './Asistencia';
import Colaborador from './Colaborador';

export default (history) =>
combineReducers({
  router: connectRouter(history),
  commonData: Common,
  auth: Auth,
  asistencia: Asistencia,
  colaborador: Colaborador,
})