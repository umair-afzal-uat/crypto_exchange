import { useState } from "react";

const Notification = () => {
  const [active, setActive] = useState(true);
  return (
    <div className="tabs__content">
      <div className="content-block content-block--small">
        <div className="content-block__inside">
          <div className="content-block__header">
            <h3 className="content-block__title">E-mail notifications</h3>
          </div>
          <div className="content-block__main">
            <div className="notify content-block__row">
              <p className="content-block__desc notify__desc">
                If you do not want to receive email notifications, click the
                switch to the 'Off' position.
              </p>
              <div className="switch">
                <p className="switch__text">Off</p>
                <label className="switch__label">
                  <input
                    className="hidden"
                    onChange={() => setActive(!active)}
                    checked={active}
                    type="checkbox"
                  />
                  <div className="switch__toggler" />
                </label>
                <p className="switch__text">On</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Notification;
