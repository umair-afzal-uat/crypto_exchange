import React from "react";
import Modal from "../Base/Modal";
import Header from "../Header";

const LoginLayout = (props) => {
  return (
    <div className="wrapper">
      <div className="content">
        <Header />
        <main className="main">{props.children}</main>
        <Modal />
      </div>
    </div>
  );
};

export default LoginLayout;
