import React from 'react'
import { useSelector } from "react-redux";

export default function Loading() {
    const loading = useSelector(({ commonData }) => commonData.loading);
    return (
        <div  style={{
            position: "absolute",
            zIndex: "9999",
            backgroundColor: "#00000087",
            width: "100%",
            height: "-webkit-fill-available",
            display: loading ? "block" : "none"
        }}>
            {loading}
            <div style={{
                display: "flex",
                justifyContent: "center",
                height: "inherit"
            }}>
                <i className="fa fa-spinner fa-spin fa-3x fa-fw" aria-hidden="true" style={{
                    color: "white",
                    height: "fit-content",
                    margin: "auto"
                }}></i>
            </div>
        </div>
    )
}
