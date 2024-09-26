import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppLayout from '../../components/AppLayout'; 
import notification from "../../components/Base/Notification"
import {
  approveNewLoan,
  getWaitListUsers,
  sendEmailToAllWaitlistUsers,
  deleteAllWaitListUsers,
} from '../../redux/users/action';
import EditIcon from '../../components/Base/Icon/EditIcon';
import moment from 'moment';
import { HandleModal } from '../../redux/modal/actions';
import Pagination from '../../components/Base/Pagination';


const WaitList = () => {
  const dispatch = useDispatch();
  const { waitList } = useSelector(state => state);
  const [page, setPage] = useState(1);
  const [checked, setChecked] = useState(false);
  const [actionLoader, setActionLoader] = useState(false);
  const [userIds, setUserIds] = useState([]);
  const [loader, setLoader] = useState(true);

  const {
    push,
    location: { pathname },
  } = useHistory();
  const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    dispatch(getWaitListUsers());
  }, []);

  useEffect(() => {
    dispatch(getWaitListUsers(page));
  }, [page]);

  useEffect(() => {
    if (waitList.data) {
      setLoader(false);
    }
  }, [waitList]);
  // console.log(waitList);
  const handleSetPage = ({ selected }) => {
    setPage(selected + 1);
    push(`${pathname}?page=${selected + 1}`);
  };

  const sendEmailToAllMethod = () => {
    //send mail to all
    setActionLoader(true);
    let data = {
      user_ids: userIds,
    };
    let payload = [...new Set(data.user_ids)];
 
    dispatch(sendEmailToAllWaitlistUsers(payload));
    dispatch(getWaitListUsers(page));
  };

  const selectSpecificIds = (e, id) => {
    setIsChecked(!isChecked);
    setUserIds([...userIds, id]);
  };

  const deleteAll = () => {
    let payload = {
      loan_queue_id: userIds,
    };
    dispatch(deleteAllWaitListUsers(payload));
    dispatch(getWaitListUsers(page));
  };
  const sendEmailToSpecificIDs = (id) => {
    let data = {
      loan_id: id,
    };
    let payload = data;
    dispatch(sendEmailToAllWaitlistUsers(payload));
    dispatch(getWaitListUsers(page));
    notification({
      type: 'success',
      message: 'Email has been sent.',
    });
  };

  const deleteSpecificIDs = (id) => {
    let data = {
      loan_id: id,
    };
    let payload = data;
    // dispatch(
    //   HandleModal({
    //     modal: 'DeleteLoan',
    //     modalData: {
    //       type: 'delete',
    //       message:
    //         'Are you sure you want to delete this loan?',
    //       id: payload,
    //       page,
    //     },
    //   }),
    // )
    dispatch(deleteAllWaitListUsers(payload));
    dispatch(getWaitListUsers(page));
    notification({
      type: 'success',
      message: 'Loan have been Deleted',
    });
  };

  return (
    <AppLayout>
      {loader ? (
        <div className="full-loader">
          <div className="lds-facebook">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <>
          <div className="title-block">
            <p className="title">Wait List</p>
          </div>
          <div className="emailAll-block">
            <button
              onClick={() => deleteAll()}
              className="button button--red"
              disabled={waitList.data && waitList.data.length < 1}
              type="button"
            >
              Delete All
            </button>
          </div>
          <div className="emailAll-block">
            <button
              onClick={() => sendEmailToAllMethod()}
              className="button"
              type="button"
              disabled={
                (waitList.data  && waitList.data.length < 1) || actionLoader
              }
            >
              Send Email to All
            </button>
          </div>
          <div className="table-block">
            <div className="table-wrapper">
              <table style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>Select</th>
                    <th>Username</th>
                    <th>E-mail</th>
                    <th>Loan Available Email Sent</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {waitList.data && waitList.data.length ? (
                    waitList.data.map((list,i )=> (
                      <tr key={list?.id}>                     
                        <td>
                          <label htmlFor={`check-${i}`}>  
                            &nbsp;
                            <input
                              type="checkbox" id={`check-${i}`}
                              onChange={e => selectSpecificIds(e, list.id)}
                              
                              // checked={userIds.includes(list.id) ? true : false}
                            />
                            <span className="checkmark"></span>
                          </label>
                        </td>
                        <td>
                          {' '}
                          {list?.user?.first_name} {list?.user?.last_name}
                        </td>
                        <td>
                          {' '}
                          <a
                            className="link"
                            href={`mailto:${list?.user?.email}`}
                          >
                            {list?.user?.email}
                          </a>
                        </td>
                        <td>{list?.email_sent === 1 ? 'Yes' : 'No'}</td>
                        <td>
                          <div className="actions-buttons">
                            <button
                              onClick={() => sendEmailToSpecificIDs(list.id)}
                              className="button button--smallest"
                              type="button"
                            >
                              Send Email
                            </button>
                            <button
                              onClick={() => deleteSpecificIDs(list.id)}
                              className="button button--smallest button--red"
                              type="button"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="not-found">
                      <td colSpan="5">No Data Found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="pagination-block">
            {waitList.last_page > 1 && (
              <Pagination
                onChange={handleSetPage}
                totalItems={waitList?.total}
                currentPage={page}
                itemsCountPerPage={waitList?.per_page}
              />
            )}
          </div>
        </>
      )}
    </AppLayout>
  );
};
export default WaitList;

/* <div className="table table--user-management-waitlist">
            <div className="table-header">
              <div className="tr">
                <div className="td">
                  <div className="td-name">
                    <p>Select</p>
                  </div>
                </div>
                <div className="td">
                  <div className="td-name">
                    <p>Username</p>
                  </div>
                </div>
                <div className="td">
                  <div className="td-name">
                    <p>E-mail</p>
                  </div>
                </div>
                <div className="td">
                  <div className="td-name">
                    <p>Loan Available Email Sent</p>
                  </div>
                </div>
                <div className="td">
                  <div className="td-name">
                    <p>Actions</p>
                  </div>
                </div>


              </div>
            </div>
            <div className="table-body">
              {waitList.data && waitList.data.length ? waitList.data.map((list) =>
                <div key={list?.id} className="tr">
                  <div className="td">
                    <label>&nbsp;
                      <input type="checkbox" onChange={(e) => selectSpecificIds(e, list.id)}
                        checked={userIds.includes(list.id) ? true : false}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="td">
                    <p>
                      {list?.user?.first_name} {list?.user?.last_name}
                    </p>
                  </div>
                  <div className="td">
                    <a className="link" href={`mailto:${list?.user?.email}`}>
                      {list?.user?.email}
                    </a>
                  </div>
                  <div className="td">
                    {list?.email_sent === 1 ? "Yes" : "No"}
                  </div>
                  <div className="td">
                    <div className="buttons-row">
                      <button
                        onClick={() => sendEmailToSpecificIDs()}
                        className="button button--smallest"
                        type="button"
                      >
                        Send Email
                      </button>
                      <button
                        onClick={() => deleteSpecificIDs()}
                        className="button button--smallest button--red"
                        type="button"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ) :
                <div className="tr">No Data Found</div>
              }            </div>
          </div> */
