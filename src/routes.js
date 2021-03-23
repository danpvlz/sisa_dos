import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
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

//Asistencia
import Asistencia from "views/Asistencia/Asistencia.js";
import MiAsistencia from "views/Asistencia/MiAsistencia.js";
import MarcarAsistencia from "views/Asistencia/MarcarAsistencia.js";

var routes = [
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
    show: false
  },
  {
    path: "/index",
    name: "Inicio",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
    show: true
  },
  {
    path: "/asociado",
    name: "Asociado",
    icon: "ni ni-single-02 text-blue",
    component: Asociado,
    layout: "/admin",
    show: true
  },
  {
    path: "/nuevo-colaborador",
    name: "Nuevo colaborador",
    icon: "ni ni-badge text-blue",
    component: NuevoColaborador,
    layout: "/admin",
    show: false
  },
  {
    path: "/editar-perfil",
    name: "Editar perfil",
    icon: "ni ni-badge text-blue",
    component: NuevoColaborador,
    layout: "/admin",
    show: false
  },
  {
    path: "/editar-colaborador",
    name: "Editar colaborador",
    icon: "ni ni-badge text-blue",
    component: NuevoColaborador,
    layout: "/admin",
    show: false
  },
  {
    path: "/colaborador",
    name: "Colaborador",
    icon: "ni ni-badge text-orange",
    component: Colaborador,
    layout: "/admin",
    show: true
  },
  {
    path: "/asistencia",
    name: "Asistencia",
    icon: "ni ni-calendar-grid-58 text-blue",
    component: Asistencia,
    layout: "/admin",
    show: true
  },
  {
    path: "/mi-asistencia",
    name: "Mi asistencia",
    icon: "ni ni-calendar-grid-58 text-blue",
    component: MiAsistencia,
    layout: "/admin",
    show: true
  },
  {
    path: "/registrar-asistencia",
    name: "Registrar asistencia",
    icon: "ni ni-calendar-grid-58 text-blue",
    component: MarcarAsistencia,
    layout: "/admin",
    show: true
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin",
    show: true
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/admin",
    show: true
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
    show: true
  },
  {
    path: "/nuevo-asociado",
    name: "Nuevo asociado",
    icon: "ni ni-single-02 text-yellow",
    component: NuevoAsociado,
    layout: "/admin",
    show: false
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin",
    show: true
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
    show: true
  },
];

export default routes;
