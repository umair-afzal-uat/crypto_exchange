import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { approveNewLoan, getWaitListUsers } from '../../redux/users/action';
import EditIcon from '../../components/Base/Icon/EditIcon';
import moment from 'moment';
import { HandleModal } from '../../redux/modal/actions';
import Pagination from '../../components/Base/Pagination';
const WaitList = () => {
  const dispatch = useDispatch();
  const { waitList } = useSelector(state => state);
  const [page, setPage] = useState(1);
  const {
    push,
    location: { pathname },
  } = useHistory();
  useEffect(() => {
    dispatch(getWaitListUsers());
  }, []);
  useEffect(() => {
    dispatch(getWaitListUsers(page));
  }, [page]);
  const handleSetPage = ({ selected }) => {
    setPage(selected + 1);
    push(`${pathname}?page=${selected + 1}`);
  };
  return (
    <>
      <div className="table-block">
        <div className="table-wrapper">
          <div className="table table--user-management-waitlist">
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
                    <p>Wallet adress</p>
                  </div>
                </div>
                <div className="td">
                  <div className="td-name">
                    <p>Phone number</p>
                  </div>
                </div>
                <div className="td">
                  <div className="td-name">
                    <p>Date of loan request</p>
                  </div>
                </div>
                <div className="td">
                  <div className="td-name">
                    <p>Active loan amount</p>
                  </div>
                </div>
                <div className="td">
                  <div className="td-name">
                    <p>Loan Available Email Sent</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="table-body">
              {waitList && waitList.data.length > 0 ? waitList.data.map((e) =>
                <div key={e?.id} className="tr">
                  <div className="td">
                    <p className="td-hidden-name">ID</p>
                    <p>№{e?.id}</p>
                  </div>
                  <div className="td">
                    <p className="td-hidden-name">Full name</p>
                    <p>
                      {e?.user?.first_name} {e?.user?.last_name}
                    </p>
                  </div>
                  <div className="td">
                    <p className="td-hidden-name">E-mail</p>
                    <a className="link" href={`mailto:${e?.user?.email}`}>
                      {e?.user?.email}
                    </a>
                  </div>
                  <div className="td">
                    <p className="td-hidden-name">Wallet adress </p>
                    {e?.user?.wallet?.address ? (
                      <div className="table-adress">
                        <div className="table-adress__row">
                          <span className="table-adress__text">
                            {e?.user?.wallet?.address}
                          </span>
                          <button
                            disabled={!e?.user?.email_confirmed}
                            onClick={() => {
                              dispatch(
                                HandleModal({
                                  modal: 'AddressAndHashActions',
                                  modalData: {
                                    title: 'Edit address',
                                    subTitle: 'Address',
                                    action: 'Save',
                                    typeAction: 'editAddressWaitList',
                                    id: e?.user?.id,
                                    value: e?.user?.wallet?.address,
                                    page,
                                  },
                                }),
                              );
                            }}
                            className="table-adress__btn"
                            type="button"
                          >
                            <EditIcon />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        disabled={!e?.user?.email_confirmed}
                        onClick={() => {
                          dispatch(
                            HandleModal({
                              modal: 'AddressAndHashActions',
                              modalData: {
                                title: 'Add address',
                                subTitle: 'Address',
                                action: 'Add',
                                typeAction: 'editAddressWaitList',
                                id: e?.user?.id,
                                value: e?.user?.wallet?.address,
                                page,
                              },
                            }),
                          );
                        }}
                        className="button button--smallest"
                        type="button"
                      >
                        Add adress
                      </button>
                    )}
                  </div>
                  <div className="td">
                    <p className="td-hidden-name">Phone number</p>
                    <p>{e?.user?.phone}</p>
                  </div>
                  <div className="td">
                    <p className="td-hidden-name">Date of loan request</p>
                    <p>
                      {e?.created_at
                        ? moment(new Date(e?.created_at)).format('DD/MM/YYYY')
                        : ''}
                    </p>
                  </div>
                  <div className="td">
                    <p className="td-hidden-name">Active loan amount</p>
                    <p>
                      {e?.loan_in_btc
                        ? parseFloat(e?.loan_in_btc).toFixed(8)
                        : ''}
                    </p>
                  </div>
                  <div className="td">
                    <p className="td-hidden-name">Loan Available Email Sent</p>
                    <div className="buttons-row">
                      <button
                        onClick={() => dispatch(approveNewLoan(e?.id, page))}
                        className="button button--smallest"
                        type="button"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => {
                          dispatch(
                            HandleModal({
                              modal: 'WalletsReject',
                              modalData: { id: e.id, page },
                            }),
                          );
                        }}
                        className="button button--smallest button--red"
                        type="button"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ) :
                <div className="tr">No Data Found</div>
              }
            </div>
          </div>
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
  );
};
export default WaitList;
