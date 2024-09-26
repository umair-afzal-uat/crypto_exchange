import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../../components/AppLayout';
import General from './General';
import WaitList from './WaitList';
import {
  getQueuedUsers,
  getUsers,
  setQueuedUsers,
} from '../../redux/users/action';
import { isQueued } from '../../redux/users/reducer';

const UserManagement = () => {
  const [active, setActive] = useState(true);
  const { users, isQueued } = useSelector(state => state);
  const dispatch = useDispatch();
  const setTabs = () => {
    setActive(!active);
  };
  useEffect(() => {
    dispatch(getQueuedUsers());
  }, []);

  return (
    <AppLayout>
     
      <div className="title-block">
        <p className="title">User Management</p>
      </div>
      <div className="main-header">
        <p className="count-label">All users ({users.total})</p>
        <div className="user-toggle">
          <span className="user-toggle__title">Queue:</span>
          <div className="switch">
            <p className="switch__text">Off</p>
            <label className="switch__label">
              <input
                className="hidden"
                type="checkbox"
                checked={isQueued?.queued}
                onChange={() =>
                  isQueued?.queued
                    ? dispatch(setQueuedUsers(0))
                    : dispatch(setQueuedUsers(1))
                }
              />
              <span className="switch__toggler" />
            </label>
            <p className="switch__text">On</p>
          </div>
        </div>
      </div>
      {/* <div className="tabs">
        <ul className="tabs-nav">
          <li className={`tabs-nav__item ${active ? 'active' : ''}`}>
            <button onClick={setTabs} type="button" className="tabs-nav__btn">
              General
            </button>
          </li>
          <li className={`tabs-nav__item ${!active ? 'active' : ''}`}>
            <button onClick={setTabs} type="button" className="tabs-nav__btn">
              Waitlist
            </button>
          </li>
        </ul>
      </div>*/}
      {/*{active ? <General users={users} /> : <WaitList />}*/}
      <General users={users} />
    </AppLayout>
  );
};

export default UserManagement;
