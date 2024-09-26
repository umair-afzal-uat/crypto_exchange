import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AppLayout from '../../components/AppLayout';
import {
  getTransactions,
  confirmTransactions,
  rejectTransactions,
} from '../../redux/transactions/action';
import Pagination from '../../components/Base/Pagination';
import { HandleModal } from '../../redux/modal/actions';
import moment from 'moment';

const TransactionsManagement = () => {
  const dispatch = useDispatch();

  const { data } = useSelector(state => state.transactions);
  const {
    push,
    location: { pathname, search },
  } = useHistory();
  const [page, setPage] = useState(search?.replace('?page=', '') || 1);

  const getData = () => {
    dispatch(getTransactions(page));

  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData(page);
  }, [page]);

  const handleSetPage = ({ selected }) => {
    setPage(selected + 1);
    push(`${pathname}?page=${selected + 1}`);
  };

  const sendConfirm = id => {
    dispatch(confirmTransactions(id, getData));
  };

  const openConfirm = id => {
    dispatch(
      HandleModal({
        modal: 'Confirm',
        modalData: { id, sendConfirm },
      }),
    );
  };

  const sendReject = (id, message) => {
    dispatch(rejectTransactions(id, { message }, getData));
  };

  const openReject = id => {
    dispatch(
      HandleModal({
        modal: 'Reject',
        modalData: { id, sendReject },
      }),
    );
  };

  const openChange = elem => {
    dispatch(
      HandleModal({
        modal: 'ChangeTransaction',
        modalData: { id: elem.id, amount: elem.amount_usd, getData },
      }),
    );
  };
  return (
    <AppLayout>
      <div className="title-block">
        <p className="title">Transactions Management</p>
      </div>
      <div className="table-block">
        <div className="table-wrapper">
          <div className="table table--transactions">
            <div className="table-header">
              <div className="tr">
                <div className="td">
                  <div className="td-name">
                    <p>ID</p>
                  </div>
                </div>
                <div className="td">
                  <div className="td-name">
                    <p>Full name</p>
                  </div>
                </div>
                <div className="td">
                  <div className="td-name">
                    <p>E-mail</p>
                  </div>
                </div>
                <div className="td">
                  <div className="td-name">
                    <p>Sum</p>
                  </div>
                </div>
                <div className="td">
                  <div className="td-name">
                    <p>Address</p>
                  </div>
                </div>
                <div className="td">
                  <div className="td-name">
                    <p>Payment method</p>
                  </div>
                </div>
                <div className="td">
                  <div className="td-name">
                    <p>Date</p>
                  </div>
                </div>
                <div className="td">
                  <div className="td-name">
                    <p>Status</p>
                  </div>
                </div>
                <div className="td">
                  <div className="td-name">
                    <p>Action</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="table-body">
              {data?.data?.map(elem => (
                <div key={elem?.id} className="tr">
                  <div className="td">
                    <p className="td-hidden-name">ID</p>
                    <p>№{elem?.id}</p>
                  </div>
                  <div className="td">
                    <p className="td-hidden-name">Full name</p>
                    <p>
                      {elem?.user?.first_name} {elem?.user?.last_name}
                    </p>
                  </div>
                  <div className="td">
                    <p className="td-hidden-name">E-mail</p>
                    <a className="link" href="/">
                      {elem?.user?.email}
                    </a>
                  </div>
                  <div className="td">
                    <p className="td-hidden-name">Sum</p>
                    <p>${elem?.amount_usd}</p>
                  </div>
                  <div className="td">
                    <p className="td-hidden-name">Address</p>
                    <p>{elem?.user?.address}</p>
                  </div>
                  <div className="td">
                    <p className="td-hidden-name">Payment method</p>
                    <p>
                      {elem?.payment_system === 'Plisio'
                        ? 'Pay with Crypto'
                        : 'Other method'}
                    </p>
                  </div>
                  <div className="td">
                    <p className="td-hidden-name">Data</p>
                    <p>
                      {moment(new Date(elem?.created_at)).format('MM/DD/YY')}
                    </p>
                  </div>
                  <div className="td">
                    <p className="td-hidden-name">Status</p>
                    {elem?.status === 'completed' && (
                      <p className="status status--verified">{elem?.status}</p>
                    )}
                    {elem?.status === 'waiting_user' && (
                      <p className="status status--pending">waiting user</p>
                    )}
                    {elem?.status === 'waiting_admin' && (
                      <p className="status status--pending">waiting admin</p>
                    )}
                    {elem?.status === 'pending' && (
                      <p className="status status--pending">{elem?.status}</p>
                    )}
                    {elem?.status === 'rejected' && (
                      <p className="status status--not-verified">{elem?.status}</p>
                    )}
                    {elem?.status === 'canceled' && (
                      <p className="status status--not-verified">{elem?.status}</p>
                    )}
                  </div>
                  {elem?.status === 'waiting_admin' && (
                    <div className="td">
                      <p className="td-hidden-name">Action</p>
                      <div className="table-buttons">
                        <button onClick={() => openChange(elem)}>
                          <svg
                            width="15"
                            height="16"
                            viewBox="0 0 15 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8.28756 2.75001L3.15631 8.18126C2.96256 8.38751 2.77506 8.79376 2.73756 9.07501L2.50631 11.1C2.42506 11.8313 2.95006 12.3313 3.67506 12.2063L5.68756 11.8625C5.96881 11.8125 6.36256 11.6063 6.55631 11.3938L11.6876 5.96251C12.5751 5.02501 12.9751 3.95626 11.5938 2.65001C10.2188 1.35626 9.17506 1.81251 8.28756 2.75001Z"
                              stroke="black"
                              strokeMiterlimit="10"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M7.4313 3.65625C7.70005 5.38125 9.10006 6.7 10.8376 6.875"
                              stroke="black"
                              strokeMiterlimit="10"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M1.87506 14.25H13.1251"
                              stroke="black"
                              strokeMiterlimit="10"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>

                        <button onClick={() => openConfirm(elem?.id)}>
                          <svg
                            width="13"
                            height="10"
                            viewBox="0 0 13 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0.875 6.32822L3.94318 9.37509L12.125 1.25009"
                              stroke="#53C48A"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                        </button>
                        <button onClick={() => openReject(elem?.id)}>
                          <svg
                            width="15"
                            height="16"
                            viewBox="0 0 15 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M2.5 13.0001L12.5 3.00009"
                              stroke="#292D32"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M12.5 13.0001L2.5 3.00009"
                              stroke="#292D32"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="pagination-block">
        {data?.last_page > 1 && (
          <Pagination
            onChange={handleSetPage}
            totalItems={data?.total}
            currentPage={page}
            itemsCountPerPage={data?.per_page}
          />
        )}
      </div>
    </AppLayout>
  );
};

export default TransactionsManagement;
