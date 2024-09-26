import { NavLink } from "react-router-dom";
import routes from "../../routes";
const Sidebar = ({ changeStateSidebar }) => {
  return (
    <div className="sidebar">
      <button className="sidebar__action" onClick={changeStateSidebar}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.5 4.5L13.5 10.5L19.5 10.5"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M10.5 19.5L10.5 13.5L4.5 13.5"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M13.5 10.5L21 3"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M3 21L10.5 13.5"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </button>
      <nav className="sidebar-nav">
        <ul className="sidebar-nav__list">
          <li>
            <NavLink to={routes.UserManagement.path}>
              <span className="sidebar-nav__icon">
                <svg
                  className="stroke"
                  width="15"
                  height="16"
                  viewBox="0 0 15 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 8C9.22589 8 10.625 6.60089 10.625 4.875C10.625 3.14911 9.22589 1.75 7.5 1.75C5.77411 1.75 4.375 3.14911 4.375 4.875C4.375 6.60089 5.77411 8 7.5 8Z"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M12.8687 14.25C12.8687 11.8313 10.4625 9.875 7.49997 9.875C4.53747 9.875 2.13123 11.8313 2.13123 14.25"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>
              User Management
            </NavLink>
          </li>
          {/* <li>
            <NavLink to={routes.LoansManagement.path}>
              <span className="sidebar-nav__icon">
                <svg
                  className="stroke"
                  width="15"
                  height="16"
                  viewBox="0 0 15 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 8C9.22589 8 10.625 6.60089 10.625 4.875C10.625 3.14911 9.22589 1.75 7.5 1.75C5.77411 1.75 4.375 3.14911 4.375 4.875C4.375 6.60089 5.77411 8 7.5 8Z"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M12.8687 14.25C12.8687 11.8313 10.4625 9.875 7.49997 9.875C4.53747 9.875 2.13123 11.8313 2.13123 14.25"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>
              Loans Management
            </NavLink>
          </li>
          <li>
            <NavLink to={routes.TransactionsManagement.path}>
              <span className="sidebar-nav__icon">
                <svg
                  className="stroke"
                  width="15"
                  height="16"
                  viewBox="0 0 15 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.7625 3.72498H4.1125C3.075 3.72498 2.2375 4.56248 2.2375 5.59998V7.67498"
                    stroke="#808080"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M10.7875 1.75L12.7625 3.72498L10.7875 5.7"
                    stroke="#808080"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M2.2375 12.275H10.8875C11.925 12.275 12.7625 11.4375 12.7625 10.4V8.32495"
                    stroke="#808080"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M4.21252 14.2501L2.23752 12.2751L4.21252 10.3"
                    stroke="#808080"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>
              Transactions Management
            </NavLink>
          </li> */}
          <li>
            <NavLink to={routes.WithdrawalsManagement.path}>
              <span className="sidebar-nav__icon">
                <svg
                  className="stroke"
                  width="15"
                  height="16"
                  viewBox="0 0 15 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.9375 9.09377C5.9375 9.70002 6.40626 10.1875 6.98126 10.1875H8.15624C8.65624 10.1875 9.0625 9.76252 9.0625 9.23127C9.0625 8.66252 8.81251 8.45627 8.44376 8.32502L6.5625 7.66877C6.19375 7.53752 5.94376 7.33752 5.94376 6.76252C5.94376 6.23752 6.34999 5.80627 6.84999 5.80627H8.025C8.6 5.80627 9.06876 6.29377 9.06876 6.90002"
                    stroke="#808080"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M7.5 5.1875V10.8125"
                    stroke="#808080"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M13.75 8C13.75 11.45 10.95 14.25 7.5 14.25C4.05 14.25 1.25 11.45 1.25 8C1.25 4.55 4.05 1.75 7.5 1.75"
                    stroke="#808080"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M13.75 4.25V1.75H11.25"
                    stroke="#808080"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M10.625 4.875L13.75 1.75"
                    stroke="#808080"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>
              Withdrawals Management
            </NavLink>
          </li>
          <li>
            <NavLink to={routes.WaitList.path}>
              <span className="sidebar-nav__icon">
                <svg
                  className="stroke"
                  width="15"
                  height="16"
                  viewBox="0 0 15 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.9375 9.09377C5.9375 9.70002 6.40626 10.1875 6.98126 10.1875H8.15624C8.65624 10.1875 9.0625 9.76252 9.0625 9.23127C9.0625 8.66252 8.81251 8.45627 8.44376 8.32502L6.5625 7.66877C6.19375 7.53752 5.94376 7.33752 5.94376 6.76252C5.94376 6.23752 6.34999 5.80627 6.84999 5.80627H8.025C8.6 5.80627 9.06876 6.29377 9.06876 6.90002"
                    stroke="#808080"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M7.5 5.1875V10.8125"
                    stroke="#808080"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M13.75 8C13.75 11.45 10.95 14.25 7.5 14.25C4.05 14.25 1.25 11.45 1.25 8C1.25 4.55 4.05 1.75 7.5 1.75"
                    stroke="#808080"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M13.75 4.25V1.75H11.25"
                    stroke="#808080"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M10.625 4.875L13.75 1.75"
                    stroke="#808080"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>
              Wait List
            </NavLink>
          </li>
          {/* Commented by Adil <li>
            <NavLink to={routes.MissedPayments.path}>
              <span className="sidebar-nav__icon">
                <svg
                  className="stroke"
                  width="15"
                  height="16"
                  viewBox="0 0 15 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.9375 9.09377C5.9375 9.70002 6.40626 10.1875 6.98126 10.1875H8.15624C8.65624 10.1875 9.0625 9.76252 9.0625 9.23127C9.0625 8.66252 8.81251 8.45627 8.44376 8.32502L6.5625 7.66877C6.19375 7.53752 5.94376 7.33752 5.94376 6.76252C5.94376 6.23752 6.34999 5.80627 6.84999 5.80627H8.025C8.6 5.80627 9.06876 6.29377 9.06876 6.90002"
                    stroke="#808080"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M7.5 5.1875V10.8125"
                    stroke="#808080"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M13.75 8C13.75 11.45 10.95 14.25 7.5 14.25C4.05 14.25 1.25 11.45 1.25 8C1.25 4.55 4.05 1.75 7.5 1.75"
                    stroke="#808080"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M13.75 4.25V1.75H11.25"
                    stroke="#808080"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M10.625 4.875L13.75 1.75"
                    stroke="#808080"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>
              Missed Payments
            </NavLink>
          </li> */}
          {/* <li>
            <NavLink to={routes.FeeManagement.path}>
              <span className="sidebar-nav__icon">
                <svg
                  className="stroke"
                  width="15"
                  height="16"
                  viewBox="0 0 15 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.875 14.25H13.125"
                    stroke="#808080"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M3.49998 5.73755H2.5C2.15625 5.73755 1.875 6.0188 1.875 6.36255V11.75C1.875 12.0938 2.15625 12.375 2.5 12.375H3.49998C3.84373 12.375 4.12498 12.0938 4.12498 11.75V6.36255C4.12498 6.0188 3.84373 5.73755 3.49998 5.73755Z"
                    stroke="#808080"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M7.99998 3.74377H7C6.65625 3.74377 6.375 4.02502 6.375 4.36877V11.75C6.375 12.0938 6.65625 12.375 7 12.375H7.99998C8.34373 12.375 8.62498 12.0938 8.62498 11.75V4.36877C8.62498 4.02502 8.34373 3.74377 7.99998 3.74377Z"
                    stroke="#808080"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M12.5 1.75H11.5C11.1562 1.75 10.875 2.03125 10.875 2.375V11.75C10.875 12.0938 11.1562 12.375 11.5 12.375H12.5C12.8437 12.375 13.125 12.0938 13.125 11.75V2.375C13.125 2.03125 12.8437 1.75 12.5 1.75Z"
                    stroke="#808080"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>
              Fee and interest rate Management
            </NavLink>
          </li> */}
          <li>
            <NavLink to={routes.ReferralManagement.path}>
              <span className="sidebar-nav__icon">
                <svg
                  className="stroke"
                  width="15"
                  height="16"
                  viewBox="0 0 15 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.175 5.86252V10.1375C13.175 10.8375 12.8 11.4875 12.1937 11.8438L8.48123 13.9875C7.87498 14.3375 7.12498 14.3375 6.51248 13.9875L2.79998 11.8438C2.19373 11.4938 1.81873 10.8438 1.81873 10.1375V5.86252C1.81873 5.16252 2.19373 4.5125 2.79998 4.15625L6.51248 2.0125C7.11873 1.6625 7.86873 1.6625 8.48123 2.0125L12.1937 4.15625C12.8 4.5125 13.175 5.15627 13.175 5.86252Z"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M7.50001 7.37489C8.30428 7.37489 8.95626 6.72289 8.95626 5.91862C8.95626 5.11436 8.30428 4.4624 7.50001 4.4624C6.69575 4.4624 6.04376 5.11436 6.04376 5.91862C6.04376 6.72289 6.69575 7.37489 7.50001 7.37489Z"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M10 10.9125C10 9.78747 8.88125 8.875 7.5 8.875C6.11875 8.875 5 9.78747 5 10.9125"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>
              Referral Management
            </NavLink>
          </li>
          <li>
            <NavLink to={routes.FeeManagement.path}>
              <span className="sidebar-nav__icon">
                <svg
                  className="stroke"
                  width="15"
                  height="16"
                  viewBox="0 0 15 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.175 5.86252V10.1375C13.175 10.8375 12.8 11.4875 12.1937 11.8438L8.48123 13.9875C7.87498 14.3375 7.12498 14.3375 6.51248 13.9875L2.79998 11.8438C2.19373 11.4938 1.81873 10.8438 1.81873 10.1375V5.86252C1.81873 5.16252 2.19373 4.5125 2.79998 4.15625L6.51248 2.0125C7.11873 1.6625 7.86873 1.6625 8.48123 2.0125L12.1937 4.15625C12.8 4.5125 13.175 5.15627 13.175 5.86252Z"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M7.50001 7.37489C8.30428 7.37489 8.95626 6.72289 8.95626 5.91862C8.95626 5.11436 8.30428 4.4624 7.50001 4.4624C6.69575 4.4624 6.04376 5.11436 6.04376 5.91862C6.04376 6.72289 6.69575 7.37489 7.50001 7.37489Z"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M10 10.9125C10 9.78747 8.88125 8.875 7.5 8.875C6.11875 8.875 5 9.78747 5 10.9125"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>
              Adjustable Rates
            </NavLink>
          </li>
          {/* <li>
            <NavLink to={routes.HotWallets.path}>
              <span className="sidebar-nav__icon">
                <svg
                  className="stroke"
                  width="15"
                  height="16"
                  viewBox="0 0 15 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.175 5.86252V10.1375C13.175 10.8375 12.8 11.4875 12.1937 11.8438L8.48123 13.9875C7.87498 14.3375 7.12498 14.3375 6.51248 13.9875L2.79998 11.8438C2.19373 11.4938 1.81873 10.8438 1.81873 10.1375V5.86252C1.81873 5.16252 2.19373 4.5125 2.79998 4.15625L6.51248 2.0125C7.11873 1.6625 7.86873 1.6625 8.48123 2.0125L12.1937 4.15625C12.8 4.5125 13.175 5.15627 13.175 5.86252Z"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M7.50001 7.37489C8.30428 7.37489 8.95626 6.72289 8.95626 5.91862C8.95626 5.11436 8.30428 4.4624 7.50001 4.4624C6.69575 4.4624 6.04376 5.11436 6.04376 5.91862C6.04376 6.72289 6.69575 7.37489 7.50001 7.37489Z"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M10 10.9125C10 9.78747 8.88125 8.875 7.5 8.875C6.11875 8.875 5 9.78747 5 10.9125"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>
              Hot Wallets
            </NavLink>
          </li> */}
          <li>
            <NavLink to={routes.Settings.path}>
              <span className="sidebar-nav__icon">
                <svg
                  className="stroke"
                  width="15"
                  height="16"
                  viewBox="0 0 15 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 9.875C8.53553 9.875 9.375 9.03553 9.375 8C9.375 6.96447 8.53553 6.125 7.5 6.125C6.46447 6.125 5.625 6.96447 5.625 8C5.625 9.03553 6.46447 9.875 7.5 9.875Z"
                    stroke="#808080"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M1.25 8.55002V7.45002C1.25 6.80002 1.78125 6.26252 2.4375 6.26252C3.56875 6.26252 4.03125 5.46252 3.4625 4.48127C3.1375 3.91877 3.33125 3.18752 3.9 2.86252L4.98125 2.24377C5.475 1.95002 6.1125 2.12502 6.40625 2.61877L6.475 2.73752C7.0375 3.71877 7.9625 3.71877 8.53125 2.73752L8.6 2.61877C8.89375 2.12502 9.53125 1.95002 10.025 2.24377L11.1062 2.86252C11.675 3.18752 11.8687 3.91877 11.5437 4.48127C10.975 5.46252 11.4375 6.26252 12.5687 6.26252C13.2187 6.26252 13.7562 6.79377 13.7562 7.45002V8.55002C13.7562 9.20002 13.225 9.73752 12.5687 9.73752C11.4375 9.73752 10.975 10.5375 11.5437 11.5188C11.8687 12.0875 11.675 12.8125 11.1062 13.1375L10.025 13.7563C9.53125 14.05 8.89375 13.875 8.6 13.3813L8.53125 13.2625C7.96875 12.2813 7.04375 12.2813 6.475 13.2625L6.40625 13.3813C6.1125 13.875 5.475 14.05 4.98125 13.7563L3.9 13.1375C3.33125 12.8125 3.1375 12.0813 3.4625 11.5188C4.03125 10.5375 3.56875 9.73752 2.4375 9.73752C1.78125 9.73752 1.25 9.20002 1.25 8.55002Z"
                    stroke="#808080"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>
              Settings
            </NavLink>
          </li>
          <li>
            
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
