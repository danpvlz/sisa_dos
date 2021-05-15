import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';

import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle
} from "reactstrap";

import { useSelector } from "react-redux";

import moment from "moment";
import 'moment/locale/es'  // without this line it didn't work
moment.locale('es')

export default function NotificationsIndicator() {
  const { notifications } = useSelector(({ firebase }) => firebase);
  const history = useHistory();

  return (
    <UncontrolledDropdown nav>
      <DropdownToggle nav className="nav-link-icon">
        {
          notifications.filter(n => n.seen == 0).length > 0 ?
            <span className="fa-stack " data-count={notifications.filter(n => n.seen == 0).length}>
              <i className="ni ni-bell-55" style={{ fontSize: '1.2rem' }} />
            </span>
            :
            <i className="ni ni-bell-55" style={{ fontSize: '1.2rem' }} />
        }
      </DropdownToggle>
      <DropdownMenu
        aria-labelledby="navbar-default_dropdown_1"
        className="dropdown-menu-arrow notifications-container"
        right
      >
        {
          notifications.length > 0 ?
            notifications.sort((a, b) => moment(b.timestamp).diff(a.timestamp)).map((notification, key) =>
              <div key={key} className={notification.seen==1 ? 'seen' : 'not-seen'}>
                <DropdownItem
                  onClick={() => {
                    history.push({
                      pathname: '/admin/notificaciones',
                      state: { notifSelected: notification.key }
                    });
                  }}>
                  <div className="notification-nav-bar d-flex">
                    <div style={{ padding: '0 .8rem 0 0', fontSize: '1.2rem' }}>
                      <i className="ni ni-bell-55 text-danger" />
                    </div>
                    <div>
                      <strong style={{ display: 'block' }}>{notification.title}</strong>
                      <span>{notification.description}</span>
                      <small className="d-block">{moment(notification.timestamp, "YYYY-MM-DD h:m:s").fromNow()}</small>
                    </div>
                  </div>
                </DropdownItem>
                <DropdownItem divider />
              </div >
            )
            :
            <div className="text-center">
              <small className="text-muted p-1 user-select-none">No tienes notificaciones</small>
            </div>
        }
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}
