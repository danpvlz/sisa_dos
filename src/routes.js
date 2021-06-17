import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
//import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";

//Auth
import Login from "views/Auth/Login.js";

//Dashboards 3
import Dashboard2016 from "views/Dashboards/Dashboard2016.js";
import Dashboard2020 from "views/Dashboards/Dashboard2020.js";
import Dashboard2021 from "views/Dashboards/Dashboard2021.js";
import AreaDashboardAdmin from "views/Dashboards/AreaDashboard.js";

//Asociado 6
import Asociado from "views/Asociado/Asociado.js";
import AsociadoImagenIns from "views/Asociado/AsociadoImagenIns.js";
import AsociadoCobranza from "views/Asociado/AsociadoCobranza.js";
import NuevoAsociado from "views/Asociado/NuevoAsociado.js";
import EditarAsociado from "views/Asociado/EditarAsociado.js";
import EditarAsociadoCobranza from "views/Asociado/EditarAsociadoCobranza.js";
import VerMas from "views/Asociado/VerMas.js";
import EditarAsociadoSA from "views/Asociado/EditarAsociadoSA.js";

//Colaborador 3
import Colaborador from "views/Colaborador/Colaborador.js";
import NuevoColaborador from "views/Colaborador/NuevoColaborador.js";
import EditProfile from "views/Colaborador/EditProfile.js";

//Asistencia 3
import Asistencia from "views/Asistencia/Asistencia.js";
import MiAsistencia from "views/Asistencia/MiAsistencia.js";
import MarcarAsistencia from "views/Asistencia/MarcarAsistencia.js";

//Llamadas 2
import Llamada from "views/Llamada/Llamada.js";
import NuevaLlamada from "views/Llamada/NuevaLlamada.js";

//Cobranza 4
import CobranzaDashboard from "views/Cobranza/Dashboard";
import CuentasAdmin from "views/Cobranza/CuentasAdmin";
import CuentasVer from "views/Cobranza/CuentasVer";
import NuevaEmision from "views/Cobranza/NuevaEmision.js";
import Pendientes from "views/Cobranza/Pendientes.js";
import Membresia from "views/Cobranza/Membresia.js";
import Ocurrencias from "views/Ocurrencias/index.js";
import CuentasCobranza from "views/Cobranza/CuentasCobranza";

//Caja 4
import CajaAdmin from "views/Caja/CajaAdmin";
import NuevaEmisionCaja from "views/Caja/NuevaEmision";
import CajaDashboard from "views/Caja/Dashboard";

//Concepto
import Concepto from "views/Concepto/Concepto.js";

//Servicios 2
import Servicio from "views/Servicio/Servicio.js";
import NuevoServicio from "views/Servicio/NuevoServicio.js";

//Servicios
import Cliente from "views/Cliente/Cliente.js";

//Formalización y desarrollo
import NuevaInscripcion from "views/FormalizacionYDesarrollo/Inscripcion/new";
import Inscripcion from "views/FormalizacionYDesarrollo/Inscripcion/index";
import Curso from "views/FormalizacionYDesarrollo/Curso/index";
import Participante from "views/FormalizacionYDesarrollo/Participante/index";

import Notificaciones from "views/Notificaciones/index";

//Indexes
import AreaDashbord from "views/Indexes/AreaDashbord";

//Public
import Afiliacion from "views/Public/Afiliacion.js";
import PublicInscripcion from "views/Public/Inscripcion.js";

//Contabilidad
import Pagos from "views/Contabilidad/Pagos.js";

//Ambientes
import Disponibilidad from "views/Ambientes/Disponibilidad";

export const components=[
  Login,
  Index,
  Asociado,
  NuevoAsociado,
  Colaborador,
  NuevoColaborador,
  EditProfile,
  Asistencia,
  MiAsistencia,
  MarcarAsistencia,
  Llamada,
  NuevaLlamada,
  CuentasAdmin, //12
  NuevaEmision,
  Pendientes,
  Membresia,
  EditarAsociado, //16
  Servicio,
  NuevoServicio,
  Dashboard2016,
  Dashboard2020,
  Dashboard2021,
  Afiliacion,//22
  EditarAsociadoCobranza, //23
  EditarAsociadoSA, //24
  AsociadoCobranza, //25
  CuentasVer, //26
  AsociadoImagenIns,
  VerMas,//28
  CajaAdmin,//29
  NuevaEmisionCaja,//30
  CajaDashboard,//31
  Concepto, //32
  Cliente, //33
  Tables, //34
  Icons, //35
  Register, //36
  Profile, //37
  Inscripcion,//38
  Curso,//39
  Participante,//40
  Notificaciones,//41
  CobranzaDashboard,//42
  NuevaInscripcion, //43
  AreaDashbord,//44
  AreaDashboardAdmin,//45
  Ocurrencias, //46
  PublicInscripcion, //47
  Pagos, //48
  CuentasCobranza, //49
  Disponibilidad, //50
]
//1
export const routesSimple = [
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: components[0],
    layout: "/auth",
    show: false
  },
  {
    path: "/afiliacion",
    name: "Afiliacion",
    icon: "ni ni-key-25 text-info",
    component: components[22],
    layout: "/auth",
    show: false
  },
  {
    path: "/afiliacion",
    name: "Afiliacion",
    icon: "ni ni-key-25 text-info",
    component: components[22],
    layout: "/public",
    show: false
  },
  {
    path: "/inscripcion/:cursoId",
    name: "Inscripción",
    icon: "ni ni-key-25 text-info",
    component: components[47],
    layout: "/public",
    show: false
  },
  {
    path: "/index",
    name: "Inicio",
    icon: "ni ni-tv-2 text-primary",
    component: components[8],
    layout: "/admin",
    show: false
  },
  {
    path: "/mi-perfil",
    name: "Mi perfil",
    icon: "ni ni-badge text-blue",
    component: components[6],
    layout: "/admin",
    show: false
  },
  {
    name: "Asistencia",
    icon: "fa fa-calendar text-blue",
    layout: "/admin",
    routes: [
      {
        path: "/mi-asistencia",
        name: "Mi asistencia",
        icon: "fa fa-address-book text-blue",
        component: components[8],
        layout: "/admin",
        show: true
      },
      {
        path: "/registrar-asistencia",
        name: "Registrar asistencia",
        icon: "ni ni-active-40 text-success",
        component: components[9],
        layout: "/admin",
        show: true
      },
    ]
  },
  {
    path: "/registro-llamada",
    name: "Registro de llamada",
    icon: "fa fa-phone text-primary",
    component: components[11],
    layout: "/admin",
    show: false
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin",
    show: false
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
    show: false
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin",
    show: false
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
    show: false
  },
  {
    name: "Servicio al asociado",
    icon: "ni ni-like-2 text-blue",
    layout: "/admin",
    routes: [
      {
        path: "/servicios",
        name: "Servicios",
        icon: "ni ni-satisfied text-blue",
        component: components[17],
        layout: "/admin",
        show: true
      },
      {
        path: "/registro-servicio",
        name: "Registro de servicio",
        icon: "ni ni-satisfied text-primary",
        component: components[18],
        layout: "/admin",
        show: false,
      },
      {
        path: "/llamadas",
        name: "Llamadas",
        icon: "fa fa-phone text-primary",
        component: components[10],
        layout: "/admin",
        show: true
      },
    ]
  },
];