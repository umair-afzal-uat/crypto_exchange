import ChangingUserData from "./ChangingUserData/ChangingUserData";
import ChangePassword from "./ChangePassword/ChangePassword";
const GeneralSettings = () => {
  return (
    <div className="tabs__content">
      <div className="content-block">
        <div className="content-block__inside content-block__inside--small">
          <div className="content-block__header">
            <h3 className="content-block__title">General account settings</h3>
          </div>
          <div className="content-block__main">
            <p className="content-block__desc">
              For security purposes, withdrawals will be on hold for 24 hours
              after you complete this action.
            </p>
          </div>
        </div>
      </div>
      <div className="content-row content-row--stretch">
        <ChangingUserData />
        <ChangePassword />
      </div>
    </div>
  );
};
export default GeneralSettings;
