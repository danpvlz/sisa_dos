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

//Asociado 6
import Asociado from "views/Asociado/Asociado.js";
import AsociadoImagenIns from "views/Asociado/AsociadoImagenIns.js";
import AsociadoCobranza from "views/Asociado/AsociadoCobranza.js";
import NuevoAsociado from "views/Asociado/NuevoAsociado.js";
import EditarAsociado from "views/Asociado/EditarAsociado.js";
import EditarAsociadoCobranza from "views/Asociado/EditarAsociadoCobranza.js";
import VerMas from "views/Asociado/VerMas.js";
import EditarAsociadoSA from "views/Asociado/EditarAsociadoSA.js";
import Afiliacion from "views/Asociado/Afiliacion.js";

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

//Cuentas 4
import Cobranza from "views/Cuenta/Cobranza";
import Cuentas from "views/Cuenta/Cuentas";
import NuevaCobranza from "views/Cuenta/NuevaCobranza.js";
import Pendientes from "views/Cuenta/Pendientes.js";
import Membresia from "views/Cuenta/Membresia.js";

//Servicios 2
import Servicio from "views/Servicio/Servicio.js";
import NuevoServicio from "views/Servicio/NuevoServicio.js";

var components=[
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
  Cobranza,
  NuevaCobranza,
  Pendientes,
  Membresia,
  EditarAsociado,
  Servicio,
  NuevoServicio,
  Dashboard2016,
  Dashboard2020,
  Dashboard2021,
  Afiliacion,//22
  EditarAsociadoCobranza,
  EditarAsociadoSA,
  AsociadoCobranza, //25
  Cuentas, //26
  AsociadoImagenIns,
  VerMas,
]
//6
export const routesAdmin = [
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
    name: "KPI",
    icon: "ni ni-chart-bar-32 text-blue",
    layout: "/admin",
    routes: [
      {
        path: "/kpi-2016-2019",
        name: "2016-2019",
        icon: "ni ni-chart-bar-32 text-blue",
        component: components[19],
        layout: "/admin",
        show: true
      },
      {
        path: "/kpi-2020",
        name: "2020",
        icon: "ni ni-chart-bar-32 text-danger",
        component: components[20],
        layout: "/admin",
        show: true
      },
      {
        path: "/kpi",
        name: "2021",
        icon: "ni ni-chart-bar-32 text-blue",
        component: components[21],
        layout: "/admin",
        show: true
      },
    ]
  },
  {
    path: "/index",
    name: "Inicio",
    icon: "ni ni-tv-2 text-primary",
    component: components[21],
    layout: "/admin",
    show: false
  },
  {
    path: "/asociado-co",
    name: "Asociado",
    icon: "ni ni-single-02 text-blue",
    component: components[2],
    layout: "/admin",
    show: true
  },
  {
    path: "/nuevo-asociado",
    name: "Nuevo asociado",
    icon: "ni ni-single-02 text-green",
    component: components[3],
    layout: "/admin",
    show: false
  },
  {
    path: "/editar-asociado-co",
    name: "Editar asociado",
    icon: "ni ni-single-02 text-green",
    component: components[23],
    layout: "/admin",
    show: false,
  },
  {
    path: "/colaborador",
    name: "Colaborador",
    icon: "ni ni-badge text-blue",
    component: components[4],
    layout: "/admin",
    show: true
  },
  {
    path: "/nuevo-colaborador",
    name: "Nuevo colaborador",
    icon: "ni ni-badge text-blue",
    component: components[5],
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
    path: "/editar-colaborador",
    name: "Editar colaborador",
    icon: "ni ni-badge text-blue",
    component: components[5],
    layout: "/admin",
    show: false
  },
  {
    name: "Asistencia",
    icon: "fa fa-calendar text-blue",
    layout: "/admin",
    routes: [
      {
        path: "/asistencia",
        name: "Asistencias",
        icon: "ni ni-calendar-grid-58 text-primary",
        component: components[7],
        layout: "/admin",
        show: true
      },
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
    name: "Cobranza",
    icon: "ni ni-credit-card text-blue",
    layout: "/admin",
    routes: [
      {
        path: "/registro-emision",
        name: "Nueva emisión",
        icon: "fa fa-file text-success",
        component: components[13],
        layout: "/admin",
        show: true
      },
      {
        path: "/cuentas",
        name: "Cuentas",
        icon: "ni ni-credit-card text-blue",
        component: components[12],
        layout: "/admin",
        show: true,
        
      },
      {
        path: "/pendientes",
        name: "Pendientes",
        icon: "fa fa-clock text-danger",
        component: components[14],
        layout: "/admin",
        show: true,
        
      },
      {
        path: "/membresias",
        name: "Membresias",
        icon: "ni ni-calendar-grid-58 text-blue",
        component: components[15],
        layout: "/admin",
        show: true,
      }
    ]
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
        path: "/asociado-sa",
        name: "Asociado",
        icon: "ni ni-single-02 text-blue",
        component: components[2],
        layout: "/admin",
        show: true
      },
      {
        path: "/editar-asociado-sa",
        name: "Modificar datos",
        icon: "ni ni-single-02 text-blue",
        component: components[24],
        layout: "/admin",
        show: false
      },
      {
        path: "/servicios",
        name: "Servicios",
        icon: "ni ni-satisfied text-yellow",
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
      {
        path: "/registro-llamada",
        name: "Registro de llamada",
        icon: "fa fa-phone text-primary",
        component: components[11],
        layout: "/admin",
        show: false
      },
    ]
  },
];
//8
export const routesCuentasVer = [
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
    path: "/index",
    name: "Inicio",
    icon: "ni ni-tv-2 text-primary",
    component: components[8],
    layout: "/admin",
    show: false
  },
  {
    path: "/asociado-co",
    name: "Asociado",
    icon: "ni ni-single-02 text-blue",
    component: components[25],
    layout: "/admin",
    show: true
  },
  {
    path: "/nuevo-asociado",
    name: "Nuevo asociado",
    icon: "ni ni-single-02 text-green",
    component: components[3],
    layout: "/admin",
    show: false
  },
  {
    path: "/editar-asociado-co",
    name: "Editar asociado",
    icon: "ni ni-single-02 text-green",
    component: components[23],
    layout: "/admin",
    show: false,
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
    name: "Cobranza",
    icon: "ni ni-credit-card text-blue",
    layout: "/admin",
    routes: [
      {
        path: "/cuentas",
        name: "Cuentas",
        icon: "ni ni-credit-card text-blue",
        component: components[26],
        layout: "/admin",
        show: true,
        
      },
      {
        path: "/membresias",
        name: "Membresias",
        icon: "ni ni-calendar-grid-58 text-blue",
        component: components[15],
        layout: "/admin",
        show: true,
        
      }
    ]
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
      {
        path: "/registro-llamada",
        name: "Registro de llamada",
        icon: "fa fa-phone text-primary",
        component: components[11],
        layout: "/admin",
        show: false
      },
    ]
  },
];
//7
export const routesImagenInstitucional = [
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
    path: "/index",
    name: "Inicio",
    icon: "ni ni-tv-2 text-primary",
    component: components[8],
    layout: "/admin",
    show: false
  },
  {
    path: "/asociado",
    name: "Asociado",
    icon: "ni ni-single-02 text-blue",
    component: components[27],
    layout: "/admin",
    show: true
  },
  {
    path: "/nuevo-asociado",
    name: "Nuevo asociado",
    icon: "ni ni-single-02 text-green",
    component: components[3],
    layout: "/admin",
    show: false
  },
  {
    path: "/ver-asociado",
    name: "Ver asociado",
    icon: "ni ni-single-02 text-green",
    component: components[28],
    layout: "/admin",
    show: false,
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
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin",
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
      {
        path: "/registro-llamada",
        name: "Registro de llamada",
        icon: "fa fa-phone text-primary",
        component: components[11],
        layout: "/admin",
        show: false
      },
    ]
  },
];
//5
export const routesDirectivos = [
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
    name: "KPI",
    icon: "ni ni-chart-bar-32 text-blue",
    layout: "/admin",
    routes: [
      {
        path: "/kpi-2016-2019",
        name: "2016-2019",
        icon: "ni ni-chart-bar-32 text-blue",
        component: components[19],
        layout: "/admin",
        show: true
      },
      {
        path: "/kpi-2020",
        name: "2020",
        icon: "ni ni-chart-bar-32 text-danger",
        component: components[20],
        layout: "/admin",
        show: true
      },
      {
        path: "/kpi",
        name: "Actual",
        icon: "ni ni-chart-bar-32 text-green",
        component: components[21],
        layout: "/admin",
        show: true
      },
    ]
  },
  {
    path: "/index",
    name: "Inicio",
    icon: "ni ni-tv-2 text-primary",
    component: components[21],
    layout: "/admin",
    show: false
  },
  {
    path: "/asociado-co",
    name: "Asociado",
    icon: "ni ni-single-02 text-blue",
    component: components[25],
    layout: "/admin",
    show: true
  },
  {
    path: "/colaborador",
    name: "Colaborador",
    icon: "ni ni-badge text-blue",
    component: components[4],
    layout: "/admin",
    show: true
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
    path: "/asistencia",
    name: "Asistencia",
    icon: "ni ni-calendar-grid-58 text-primary",
    component: components[7],
    layout: "/admin",
    show: true
  },
  {
    name: "Cobranza",
    icon: "ni ni-credit-card text-blue",
    layout: "/admin",
    routes: [
      {
        path: "/cuentas",
        name: "Cuentas",
        icon: "ni ni-credit-card text-blue",
        component: components[12],
        layout: "/admin",
        show: true,
        
      },
      {
        path: "/pendientes",
        name: "Pendientes",
        icon: "fa fa-clock text-danger",
        component: components[14],
        layout: "/admin",
        show: true,
      },
      {
        path: "/membresias",
        name: "Membresias",
        icon: "ni ni-calendar-grid-58 text-blue",
        component: components[15],
        layout: "/admin",
        show: true,
      }
    ]
  },
  {
    name: "Servicio al asociado",
    icon: "ni ni-like-2 text-blue",
    layout: "/admin",
    routes: [
      {
        path: "/servicios",
        name: "Servicios",
        icon: "ni ni-satisfied text-yellow",
        component: components[17],
        layout: "/admin",
        show: true
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
//4
export const routesContabilidad = [
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
    path: "/index",
    name: "Inicio",
    icon: "ni ni-tv-2 text-primary",
    component: components[8],
    layout: "/admin",
    show: false
  },
  {
    path: "/asociado-co",
    name: "Asociado",
    icon: "ni ni-single-02 text-blue",
    component: components[25],
    layout: "/admin",
    show: true
  },
  {
    path: "/nuevo-asociado",
    name: "Nuevo asociado",
    icon: "ni ni-single-02 text-green",
    component: components[3],
    layout: "/admin",
    show: false
  },
  {
    path: "/editar-asociado-co",
    name: "Editar asociado",
    icon: "ni ni-single-02 text-green",
    component: components[23],
    layout: "/admin",
    show: false,
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
    path: "/colaborador",
    name: "Colaborador",
    icon: "ni ni-badge text-blue",
    component: components[4],
    layout: "/admin",
    show: true
  },
  {
    path: "/nuevo-colaborador",
    name: "Nuevo colaborador",
    icon: "ni ni-badge text-blue",
    component: components[5],
    layout: "/admin",
    show: false
  },
  {
    name: "Asistencia",
    icon: "fa fa-calendar text-blue",
    layout: "/admin",
    routes: [
      {
        path: "/asistencia",
        name: "Asistencias",
        icon: "ni ni-calendar-grid-58 text-primary",
        component: components[7],
        layout: "/admin",
        show: true
      },
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
    name: "Cobranza",
    icon: "ni ni-credit-card text-blue",
    layout: "/admin",
    routes: [
      {
        path: "/registro-emision",
        name: "Nueva emisión",
        icon: "fa fa-file text-success",
        component: components[13],
        layout: "/admin",
        show: true
      },
      {
        path: "/cuentas",
        name: "Cuentas",
        icon: "ni ni-credit-card text-blue",
        component: components[12],
        layout: "/admin",
        show: true,
        
      },
      {
        path: "/pendientes",
        name: "Pendientes",
        icon: "fa fa-clock text-danger",
        component: components[14],
        layout: "/admin",
        show: true,
        
      },
      {
        path: "/membresias",
        name: "Membresias",
        icon: "ni ni-calendar-grid-58 text-blue",
        component: components[15],
        layout: "/admin",
        show: true,
        
      }
    ]
  },
  {
    name: "Servicio al asociado",
    icon: "ni ni-like-2 text-blue",
    layout: "/admin",
    routes: [
      {
        path: "/servicios",
        name: "Servicios",
        icon: "ni ni-satisfied text-yellow",
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
      {
        path: "/registro-llamada",
        name: "Registro de llamada",
        icon: "fa fa-phone text-primary",
        component: components[11],
        layout: "/admin",
        show: false
      },
    ]
  },
];
//3
export const routesCobranza = [
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
    path: "/index",
    name: "Inicio",
    icon: "ni ni-tv-2 text-primary",
    component: components[8],
    layout: "/admin",
    show: false
  },
  {
    path: "/asociado-co",
    name: "Asociado",
    icon: "ni ni-single-02 text-blue",
    component: components[25],
    layout: "/admin",
    show: true
  },
  {
    path: "/nuevo-asociado",
    name: "Nuevo asociado",
    icon: "ni ni-single-02 text-green",
    component: components[3],
    layout: "/admin",
    show: false
  },
  {
    path: "/editar-asociado-co",
    name: "Editar asociado",
    icon: "ni ni-single-02 text-green",
    component: components[23],
    layout: "/admin",
    show: false,
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
    name: "Cobranza",
    icon: "ni ni-credit-card text-blue",
    layout: "/admin",
    routes: [
      {
        path: "/registro-emision",
        name: "Nueva emisión",
        icon: "fa fa-file text-success",
        component: components[13],
        layout: "/admin",
        show: true
      },
      {
        path: "/cuentas",
        name: "Cuentas",
        icon: "ni ni-credit-card text-blue",
        component: components[12],
        layout: "/admin",
        show: true,
        
      },
      {
        path: "/pendientes",
        name: "Pendientes",
        icon: "fa fa-clock text-danger",
        component: components[14],
        layout: "/admin",
        show: true,
        
      },
      {
        path: "/membresias",
        name: "Membresias",
        icon: "ni ni-calendar-grid-58 text-blue",
        component: components[15],
        layout: "/admin",
        show: true,
        
      }
    ]
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
      {
        path: "/registro-llamada",
        name: "Registro de llamada",
        icon: "fa fa-phone text-primary",
        component: components[11],
        layout: "/admin",
        show: false
      },
    ]
  },
];
//2
export const routesServicioAsociado = [
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
    name: "Servicio al asociado",
    icon: "ni ni-like-2 text-blue",
    layout: "/admin",
    routes: [
      {
        path: "/asociado-sa",
        name: "Asociado",
        icon: "ni ni-single-02 text-blue",
        component: components[2],
        layout: "/admin",
        show: true
      },
      {
        path: "/editar-asociado-sa",
        name: "Modificar datos",
        icon: "ni ni-single-02 text-blue",
        component: components[24],
        layout: "/admin",
        show: false
      },
      {
        path: "/servicios",
        name: "Servicios",
        icon: "ni ni-satisfied text-yellow",
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
      {
        path: "/registro-llamada",
        name: "Registro de llamada",
        icon: "fa fa-phone text-primary",
        component: components[11],
        layout: "/admin",
        show: false
      },
    ]
  },
];
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