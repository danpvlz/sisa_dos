import React from 'react';


export default function LoadingPage() {
    return (
        <div >
        <img
          className="loading-logo"
          alt="logo"
          src={
            require("../../assets/img/brand/loadinglogo.png").default
          }
        />
        </div>
    )
}
