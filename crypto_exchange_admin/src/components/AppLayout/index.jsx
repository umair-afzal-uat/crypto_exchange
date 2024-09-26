import React, { useState } from "react";
import Modal from "../Base/Modal";

import Header from "../Header";
import Sidebar from "../Sidebar";

const AppLayout = (props) => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const changeStateSidebar = () => {
    setIsOpenSidebar(!isOpenSidebar);
  };
  return (
    <div className="wrapper">
      <div className="content">
        <Header changeStateSidebar={changeStateSidebar} />
        <main className="main">
          <section className={`main-section ${isOpenSidebar && "minimized"}`}>
            <Sidebar changeStateSidebar={changeStateSidebar} />
            <div className="main-content">{props.children}</div>
          </section>
          <Modal />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
