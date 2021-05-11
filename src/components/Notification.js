import React, { useEffect, useState } from 'react'
import { Row, Col } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

import { setNotifications, setLoadedOldNotifications } from "../redux/actions/Firebase";
import DataService from "../firebase/services/notifications";
import moment from "moment";
import 'moment/locale/es';
moment.locale('es')


const Notification = ({ notification, setOnClick }) => {
    return (
        <Col className="notification bg-danger" style={{cursor: 'pointer'}} onClick={setOnClick} >
            <Row className="text-white">
                <Col className="col-2">
                    <i className="ni ni-bell-55 r icon-alert"></i>
                </Col>
                <Col className="col-10 description">
                    {notification.description}
                    <small className="d-block">{moment(notification.timestamp, "YYYY-MM-DD h:m:s").fromNow()}</small>
                </Col>
            </Row>
        </Col>
    );
}

export default function NotificationContainer() {
    const dispatch = useDispatch();
    const { authUser } = useSelector(({ auth }) => auth);
    const { loadedOldNotifications } = useSelector(({ firebase }) => firebase);
    const [newNotifications, setnewNotifications] = useState([]);
    const firebaseNotif=new DataService(authUser?.idColaborador);
    useEffect(() => {
        firebaseNotif.getAll().on("value", onDataChange);
        firebaseNotif.getAll().on("child_added", onNewAdded);

        return () => {
            dispatch(setLoadedOldNotifications(false));
            firebaseNotif.getAll().off("value", onDataChange);
            firebaseNotif.getAll().off("child_added", onNewAdded);
            setnewNotifications([]);
        }
    }, []);

    const onDataChange = (items) => {
        let notifications = [];

        items.forEach((item) => {
            let key = item.key;
            let data = item.val();
            notifications.push({
                key: key,
                title: data.title,
                description: data.description,
                seen: data.seen,
                clicked: data.clicked,
                numoperacion: data.operacion,
                numsofdoc: data.numsofdoc,
                detail: data.detail,
                timestamp: data.timestamp,
            });
        });
        dispatch(setNotifications(notifications))
        /*this.setState({
          tutorials: tutorials,
        });*/
    }

    const onNewAdded = (snapshot) => {
        let key = snapshot.key;
        let data = snapshot.val();
        if(data.seen==0){
            setnewNotifications(newNotifications.concat({
                key: key,
                description: data.description,
                seen: data.seen,
                clicked: data.clicked,
                timestamp: data.timestamp,
            }));
    
            setTimeout(() => {
                firebaseNotif.update(key,{
                    ...data,
                    seen: 1,
                })
                setnewNotifications(newNotifications.filter(n => n.key != key));
            }, 7000);
        }

    }

    return (
        <div className="notification-container">
            {
                loadedOldNotifications && newNotifications.map((notification, key) =>
                    <Notification key={key} notification={notification} setOnClick={()=>{
                            firebaseNotif.update(notification.key,{
                                ...notification,
                                seen: 1,
                            })
                            setnewNotifications(newNotifications.filter(n=>n.key != notification.key))
                        }
                    } />
                )
            }
        </div>
    )
}
