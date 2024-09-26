import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AppLayout from '../../components/AppLayout';
import {
  confirmWithdrawals,
  getWithdrawals,
  rejectWithdrawals,
} from '../../redux/withdrawals/action';
import Pagination from '../../components/Base/Pagination';
import { HandleModal } from '../../redux/modal/actions';
import moment from 'moment';
import EditIcon from '../../components/Base/Icon/EditIcon';

const WithdrawalsManagement = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { data } = useSelector(state => state.withdrawals);
  const [loader, setLoader] = useState(true);

  const {
    push,
    location: { pathname },
  } = useHistory();

  useEffect(() => {
    dispatch(getWithdrawals());
  }, []);

  useEffect(() => {
    dispatch(getWithdrawals(page));
  }, [page]);
  useEffect(() => {
    if (data) {
      setLoader(false);
    }
  }, [data]);
  const handleSetPage = ({ selected }) => {
    setPage(selected + 1);
    push(`${pathname}?page=${selected + 1}`);
  };

  const sendConfirm = id => {
    dispatch(confirmWithdrawals(id));
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
    dispatch(rejectWithdrawals(id, { message }));
  };

  const openReject = id => {
    dispatch(
      HandleModal({
        modal: 'Reject',
        modalData: { id, sendReject },
      }),
    );
  };
  const edit = id => {
    dispatch(
      HandleModal({
        modal: 'Reject',
        modalData: { id, sendReject },
      }),
    );
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
            <p className="title">Withdrawals Management</p>
          </div>
          <div className="table-block">
            <div className="table-wrapper">
              <table style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Full name</th>
                    <th>E-mail</th>
                    <th>Amount</th>
                    <th>Address</th>
                    <th>Hash</th>
                    <th>Staff</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data ? (
                    data.data.map(elem => (
                      <tr key={elem?.id}>
                        <td>{elem?.id}</td>
                        <td>
                          {moment(new Date(elem?.created_at)).format(
                            'MM/DD/YYYY',
                          )}
                        </td>
                        <td>
                          {elem?.user?.first_name} {elem?.user?.last_name}
                        </td>
                        <td>{elem?.user?.email}</td>
                        <td>BTC {elem?.amount}</td>
                        <td className="address">
                          <div className="table-adress">
                            <div className="table-adress__row">
                              <span className="table-adress__text">
                                <p className="w-200">{elem?.address}</p>
                              </span>
                              <button
                                onClick={() => {
                                  dispatch(
                                    HandleModal({
                                      modal: 'AddressAndHashActions',
                                      modalData: {
                                        title: 'Edit address',
                                        subTitle: 'Address',
                                        action: 'Save',
                                        typeAction: 'editAddress',
                                        id: elem?.id,
                                        value: elem?.address,
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
                        </td>
                        <td className="address">
                          {elem?.tx_hash ? (
                            <div className="table-adress">
                              <div className="table-adress__row">
                                <span className="table-adress__text">
                                  <p className="w-200">{elem?.tx_hash}</p>
                                </span>
                                <button
                                  onClick={() => {
                                    dispatch(
                                      HandleModal({
                                        modal: 'AddressAndHashActions',
                                        modalData: {
                                          title: 'Edit hash',
                                          subTitle: 'Hash',
                                          action: 'Save',
                                          typeAction: 'editHash',
                                          id: elem?.id,
                                          value: elem?.tx_hash,
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
                              onClick={() => {
                                dispatch(
                                  HandleModal({
                                    modal: 'AddressAndHashActions',
                                    modalData: {
                                      title: 'Add hash',
                                      subTitle: 'Hash',
                                      action: 'Add',
                                      typeAction: 'editHash',
                                      id: elem?.id,
                                      value: '',
                                    },
                                  }),
                                );
                              }}
                              className="button button--smallest"
                              type="button"
                            >
                              Add hash
                            </button>
                          )}
                        </td>
                        <td className="address">
                          <div className="table-adress">
                            <div className="table-adress__row">
                              <span className="table-adress__text">
                              <p className='w-200'>{elem?.staff_name}</p>
                              </span>
                              <button
                                onClick={() => {
                                  dispatch(
                                    HandleModal({
                                      modal: 'StaffNameActions',
                                      modalData: {
                                        title: 'Edit staff',
                                        subTitle: 'Staff',
                                        action: 'Add	',
                                        typeAction: 'editStaffName',
                                        id: elem?.id,
										value: elem?.staff_name,
                                        withdrawalsData: elem,
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
                        </td>
                        <td>
                          {elem?.status === 'processed' && (
                            <p className="status status--pending">
                              {elem?.status}
                            </p>
                          )}
                          {elem?.status === 'in_progress' && (
                            <p className="status status--verified">
                              In progress
                            </p>
                          )}
                          {elem?.status === 'pending' && (
                            <p className="status status--pending">
                              {elem?.status}
                            </p>
                          )}
                          {elem?.status === 'rejected' && (
                            <p className="status status--not-verified">
                              {elem?.status}
                            </p>
                          )}
                          {elem?.status === 'canceled' && (
                            <p className="status status--not-verified">
                              {elem?.status}
                            </p>
                          )}
                        </td>
                        <td>
                          <div className="actions-buttons">
                            {elem?.tx_hash != null &&
                            elem.staff_name != null ? (
                              <button
                                onClick={() => openConfirm(elem?.id)}
                                className="button button--smallest"
                                type="button"
                                disabled={elem?.status === 'processed'}
                              >
                                Complete
                              </button>
                            ) : (
                              <button
                                className="button button--smallest"
                                type="button"
                                disabled
                              >
                                Complete
                              </button>
                            )}
                            <button
                              onClick={() => openReject(elem?.id)}
                              className="button button--smallest button--red"
                              type="button"
                              disabled={elem?.status === 'processed'}
                            >
                              Deny
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="not-found">
                      <td colSpan="10">No Data Found</td>
                    </tr>
                  )}
                </tbody>
              </table>
              {/* <div className="table table--withdrawals">
						<div className="table-header">
							<div className="tr">
								<div className="td">
									<div className="td-name">
										<p>ID</p>
									</div>
								</div>
								<div className="td">
									<div className="td-name">
										<p>Date</p>
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
										<p>Amount</p>
									</div>
								</div>
								<div className="td">
									<div className="td-name">
										<p>Address</p>
									</div>
								</div>
								<div className="td">
									<div className="td-name">
										<p>Hash</p>
									</div>
								</div>
								<div className="td">
									<div className="td-name">
										<p>Staff</p>
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
										<p>№{elem?.wallet_id}</p>
									</div>
									<div className="td">
										<p className="td-hidden-name">Date</p>
										<p>
											{moment(new Date(elem?.created_at)).format('MM/DD/YY')}
										</p>
									</div>
									<div className="td">
										<p className="td-hidden-name">Full name</p>
										<p>
											{elem?.user?.first_name} {elem?.user?.last_name}
										</p>
									</div>
									<div className="td">
										<p className="td-hidden-name">E-mail</p>
										<p className="link">{elem?.user?.email}</p>
									</div>
									<div className="td">
										<p className="td-hidden-name">Amount</p>
										<p>${elem?.amount}</p>
									</div>
									<div className="td">
										<p className="td-hidden-name">Address</p>
										<div className="table-adress">
											<div className="table-adress__row">
												<span className="table-adress__text">
													{elem?.address}
												</span>
												<button
													onClick={() => {
														dispatch(
															HandleModal({
																modal: 'AddressAndHashActions',
																modalData: {
																	title: 'Edit address',
																	subTitle: 'Address',
																	action: 'Save',
																	typeAction: 'editAddress',
																	id: elem?.id,
																	value: elem?.address,
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
									</div>
									<div className="td">
										<p className="td-hidden-name">Hash</p>
										{elem?.tx_hash ? (
											<div className="table-adress">
												<div className="table-adress__row">
													<span className="table-adress__text">
														{elem?.tx_hash}
													</span>
													<button
														onClick={() => {
															dispatch(
																HandleModal({
																	modal: 'AddressAndHashActions',
																	modalData: {
																		title: 'Edit hash',
																		subTitle: 'Hash',
																		action: 'Save',
																		typeAction: 'editHash',
																		id: elem?.id,
																		value: elem?.tx_hash,
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
												onClick={() => {
													dispatch(
														HandleModal({
															modal: 'AddressAndHashActions',
															modalData: {
																title: 'Add hash',
																subTitle: 'Hash',
																action: 'Add',
																typeAction: 'editHash',
																id: elem?.id,
																value: '',
															},
														}),
													);
												}}
												className="button button--smallest"
												type="button"
											>
												Add hash
											</button>
										)}
									</div>

									<div className="td">
										<p className="td-hidden-name">Staff</p>
										<p className="link">{elem?.user?.id}</p>
									</div>
									<div className="td">
										<p className="td-hidden-name">Status</p>
										{elem?.status === 'processed' && (
											<p className="status status--pending">{elem?.status}</p>
										)}
										{elem?.status === 'in_progress' && (
											<p className="status status--verified">In progress</p>
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
									<div className="td">
										<p className="td-hidden-name">Action</p>
										<div className="buttons-row">
											<button
												onClick={() => openConfirm(elem?.id)}
												className="button button--smallest"
												type="button"
												disabled={elem?.status === 'processed'}
											>
												Complete
											</button>
											<button
												onClick={() => openReject(elem?.id)}
												className="button button--smallest button--red"
												type="button"
												disabled={elem?.status === 'processed'}
											>
												Deny
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					</div> */}
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
        </>
      )}
    </AppLayout>
  );
};

export default WithdrawalsManagement;
