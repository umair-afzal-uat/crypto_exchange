import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/auth/action';

const Header = ({ changeStateSidebar }) => {
  const { data } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logout());
  };

  const isLogin = axios.defaults.headers.common.authorization;
  return (
    <header className="header">
      <button className="mob-nav-btn" type="button" onClick={changeStateSidebar}>
        <svg className="fill" viewBox="0 0 448 512">
          <path
            fill="#ffffff"
            d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
          ></path>
        </svg>
      </button>
      <a className="logo" href="/">
        <div className="logo__icon">
          <img src="images/content/logo.svg" alt="" />
        </div>
        <span className="logo__text">
          <span className="logo__tex logo__text--bold">BTC</span>advance.
          <span className="logo__text logo__text--green logo__text--small">
            Credit
          </span>
        </span>
      </a>
      {isLogin && (
        <div className="admin">
          <p className="admin__name">
            {data.firstName} {data.lastName}
          </p>
          <button className="admin__logout" onClick={handleLogOut}>
            <svg
              className="stroke"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              data-darkreader-inline-fill=""
              style={{ '--darkreader-inline-fill': 'none' }}
            >
              <path
                d="M15.1998 8.00005L11.5998 11.9M15.1998 8.00005L11.5998 4.40005M15.1998 8.00005L3.7998 8.00005M8.5998 15.2L0.799805 15.2L0.799805 0.800049L8.5998 0.800049"
                stroke="white"
                data-darkreader-inline-stroke=""
                style={{ '--darkreader-inline-stroke': '#ffffff' }}
              ></path>
            </svg>
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
