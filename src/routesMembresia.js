import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
//import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";

//Auth
import Login from "views/Auth/Login.js";

//Asociado
import Asociado from "views/Asociado/Asociado.js";
import NuevoAsociado from "views/Asociado/NuevoAsociado.js";

//Colaborador
import Colaborador from "views/Colaborador/Colaborador.js";
import NuevoColaborador from "views/Colaborador/NuevoColaborador.js";
import EditProfile from "views/Colaborador/EditProfile.js";

//Asistencia
import Asistencia from "views/Asistencia/Asistencia.js";
import MiAsistencia from "views/Asistencia/MiAsistencia.js";
import MarcarAsistencia from "views/Asistencia/MarcarAsistencia.js";

//Llamadas
import Llamada from "views/Llamada/Llamada.js";
import NuevaLlamada from "views/Llamada/NuevaLlamada.js";

//Cuentas
import Cobranza from "views/Cuenta/Cobranza.js";
import NuevaCobranza from "views/Cuenta/NuevaCobranza.js";
import Pendientes from "views/Cuenta/Pendientes.js";
import Membresia from "views/Cuenta/Membresia.js";

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
]

var routes = [
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: components[0],
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
    component: components[2],
    layout: "/admin",
    show: true,
    users: [0]
  },
  {
    path: "/nuevo-asociado",
    name: "Nuevo asociado",
    icon: "ni ni-single-02 text-green",
    component: components[3],
    layout: "/admin",
    show: true,
    users:[0]
  },
  {
    path: "/mi-perfil",
    name: "Mi perfil",
    icon: "ni ni-badge text-blue",
    component: components[6],
    layout: "/admin",
    show: false,
    users:[0]
  },
  {
    name: "Asistencia",
    icon: "fa fa-calendar text-blue",
    layout: "/admin",
    users:[0],
    routes: [
      {
        path: "/mi-asistencia",
        name: "Mi asistencia",
        icon: "fa fa-address-book text-blue",
        component: components[8],
        layout: "/admin",
        show: true,
        users:[0]
      },
      {
        path: "/registrar-asistencia",
        name: "Registrar asistencia",
        icon: "ni ni-active-40 text-success",
        component: components[9],
        layout: "/admin",
        show: true,
        users:[0]
      },
    ]
  },
  {
    path: "/llamadas",
    name: "Llamadas",
    icon: "fa fa-phone text-primary",
    component: components[10],
    layout: "/admin",
    show: true,
    users:[0]
  },
  {
    path: "/registro-llamada",
    name: "Registro de llamada",
    icon: "fa fa-phone text-primary",
    component: components[11],
    layout: "/admin",
    show: false,
    users:[0]
  },
  {
    name: "Cuentas",
    icon: "ni ni-credit-card text-blue",
    layout: "/admin",
    users:[1,3,11,13,18,19,20,23],
    routes: [
      {
        path: "/cuentas",
        name: "Cobranza",
        icon: "ni ni-credit-card text-blue",
        component: components[12],
        layout: "/admin",
        show: true,
        users:[1,3,11,13,18,19,20,23],
      },
      {
        path: "/registro-emision",
        name: "Nueva emisión",
        icon: "fa fa-file text-success",
        component: components[13],
        layout: "/admin",
        show: true,
        users:[1,13,20,23],
      },
      {
        path: "/pendientes",
        name: "Pendientes",
        icon: "fa fa-clock text-danger",
        component: components[14],
        layout: "/admin",
        show: true,
        users:[1,3,11,13,18,19,20,23],
      },
      {
        path: "/membresias",
        name: "Membresias",
        icon: "ni ni-calendar-grid-58 text-yellow",
        component: components[15],
        layout: "/admin",
        show: true,
        users:[1,3,11,13,18,19,20,23],
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
];

export default routes;
