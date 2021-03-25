import React, {useCallback} from "react";
import { Link, useHistory } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media,
  Button
} from "reactstrap";

import { userSignOut } from "../../redux/actions/Auth";
import {useDispatch, useSelector} from "react-redux";

const AdminNavbar = (props) => {
  const { authUser } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleBack = useCallback(() => history.goBack(), [history]);
  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <p
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"  
            onClick={handleBack}
            style={{cursor:'pointer'}}
          >
           <i className="fa fa-chevron-left mr-2" aria-hidden="true"></i>{props.brandText}
          </p>
          <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <FormGroup className="mb-0">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Buscar" type="text" />
              </InputGroup>
            </FormGroup>
          </Form>
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt={authUser.nombres+" "+authUser.paterno+" "+authUser.materno}
                      src={authUser.foto}
                    />
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      {authUser.nombres+" "+authUser.paterno+" "+authUser.materno}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Bienvenido!</h6>
                </DropdownItem>
                <DropdownItem to="/admin/editar-perfil" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>Mi perfil</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-settings-gear-65" />
                  <span>Settings</span>
                </DropdownItem>
                <DropdownItem to="/admin/mi-asistencia" tag={Link}>
                  <i className="ni ni-calendar-grid-58" />
                  <span>Mi asistencia</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-support-16" />
                  <span>Support</span>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => dispatch(userSignOut())}>
                  <i className="ni ni-user-run" />
                  <span>Cerrar sesión</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
