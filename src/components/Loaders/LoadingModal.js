import React from 'react'
import { useSelector } from "react-redux";
import {
    Modal,
  } from "reactstrap";

export default function Loading() {
    const loading = useSelector(({ commonData }) => commonData.loading);
    return (
        <Modal
            className="modal-dialog-centered"
            contentClassName={"modal-loading-content"}
            fade={false}
            isOpen={loading}
        >
            <div >
                <i className="fa fa-spinner fa-spin fa-3x fa-fw" aria-hidden="true" style={{
                    color: "white",
                    height: "fit-content",
                    margin: "auto"
                }}></i>
            </div>
        </Modal>
    )
}
