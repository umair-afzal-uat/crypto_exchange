import { HandleModal } from '../../redux/modal/actions';
import Pagination from '../../components/Base/Pagination';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUsers, searchUser } from '../../redux/users/action';
import { useDispatch } from 'react-redux';
import EditIcon from '../../components/Base/Icon/EditIcon';
import routes from '../../routes';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import { user } from '../../redux/users/reducer';

const General = ({ users }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [checkbox, setDueToday] = useState(false);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(true);
  const {
    push,
    location: { pathname },
  } = useHistory();
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    let payload = { name, email};
    dispatch(getUsers(page, payload));
  }, [page]);

  useEffect(() => {
    if (users.data) {
      setLoader(false);
    }
  }, [users]);

  const handleSetPage = ({ selected }) => {
    setPage(selected + 1);
    push(`${pathname}?page=${selected + 1}`);
  };

  const navigateToRoute = route => {
    push(route);
  };
  const Click = async e => {
    setDueToday(!checkbox);
  };
  const search = () => {
    let payload = { name, email, checkbox};

    dispatch(getUsers(page, payload));
  };

  const reset = () => {
    let payload = { name: '', email: '', checkbox: '' };
    dispatch(getUsers(page, payload));
    setName('');
    setEmail('');
    setDueToday(false);
  };

  return (
    <>
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
          <div className="table-block">
            <div className="td table-top-bar">
              <div className="display-flex">
                <div className='margin-right'>
                  <label>Name: </label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                  </div>
                  <div className='margin-right'>
                  <label>E-mail: </label>
                  <input
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                 
                </div>
                <div className="user-toggle">
                  <span className="user-toggle__title">Due Today:</span>
                  <div className="switch">
                    <p className="switch__text">Off</p>
                    <label className="switch__label">
                      <input
                        className="due_today"
                        name="checkbox"
                        // defaultChecked={checkbox == 'true' ? true : false}
                        type="checkbox"
                        checked={checkbox}
                        onChange={e => {
                          Click(e);
                        }}
                        // onChange={e => setCheckbox(e.target.value)}
                        //   onChange={() =>
                        //     isQueued?.queued
                        //       ? dispatch(setQueuedUsers(0))
                        //       : dispatch(setQueuedUsers(1))
                        //   }
                      />
                      <span className="switch__toggler" />
                    </label>
                    <p className="switch__text">On</p>
                  </div>
                </div>
              </div>
              <div className="actions-buttons">
                <button
                  className="button button--smallest"
                  onClick={() => search()}
                >
                  Search
                </button>
                <button
                  onClick={() => reset()}
                  className=" button--smallest button--red"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
          <div className="table-block">
            <div className="table-wrapper">
              <table style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>E-mail</th>
                    <th>User Details</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.data ? (
                    users.data.map((user, index) => (
                      <tr key={index}>
                        <td>
                          {user.first_name} {user.last_name}
                        </td>
                        <td>
                          <a className="link" href={`mailto:${user.email}`}>
                            {user.email}
                          </a>
                        </td>
                        <td>
                          <div className="actions-buttons">
                            <button
                              className="button button--smallest"
                              onClick={() =>
                                navigateToRoute(
                                  `/user_management/complete_profile/${user.id}`,
                                )
                              }
                            >
                              Profile
                            </button>
                            <button
                              className="button button--smallest"
                              onClick={() =>
                                navigateToRoute(
                                  `/user_management/loan_info/${user.id}`,
                                )
                              }
                            >
                              Loan Details
                            </button>
                            <button
                              className="button button--smallest"
                              onClick={() =>
                                navigateToRoute(
                                  `/user_management/payment_info/${user.id}`,
                                )
                              }
                            >
                              Payment Details
                            </button>
                          </div>
                        </td>
                        <td>
                          <div className="table-buttons table-buttons--left">
                            {!!user.blocked ? (
                              <button
                                type="button"
                                onClick={() =>
                                  dispatch(
                                    HandleModal({
                                      modal: 'UserActions',
                                      modalData: {
                                        type: 'blocked',
                                        message:
                                          'Are you sure you want to unblock this user?',
                                        id: user.id,
                                        page,
                                      },
                                    }),
                                  )
                                }
                              >
                                <svg
                                  width="15"
                                  height="15"
                                  viewBox="0 0 15 15"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M3.75 6.25012V5.00012C3.75 2.93137 4.375 1.25012 7.5 1.25012C10.625 1.25012 11.25 2.93137 11.25 5.00012V6.25012"
                                    stroke="#808080"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M7.5 11.5626C8.36294 11.5626 9.0625 10.8631 9.0625 10.0001C9.0625 9.13718 8.36294 8.43762 7.5 8.43762C6.63706 8.43762 5.9375 9.13718 5.9375 10.0001C5.9375 10.8631 6.63706 11.5626 7.5 11.5626Z"
                                    stroke="#808080"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M10.625 13.7501H4.375C1.875 13.7501 1.25 13.1251 1.25 10.6251V9.37512C1.25 6.87512 1.875 6.25012 4.375 6.25012H10.625C13.125 6.25012 13.75 6.87512 13.75 9.37512V10.6251C13.75 13.1251 13.125 13.7501 10.625 13.7501Z"
                                    stroke="#808080"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() =>
                                  dispatch(
                                    HandleModal({
                                      modal: 'UserActions',
                                      modalData: {
                                        type: 'blocked',
                                        message:
                                          'Are you sure you want to block this user?',
                                        id: user.id,
                                        page,
                                      },
                                    }),
                                  )
                                }
                              >
                                <svg
                                  width="15"
                                  height="15"
                                  viewBox="0 0 15 15"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M10.625 13.75H4.375C1.875 13.75 1.25 13.125 1.25 10.625V9.375C1.25 6.875 1.875 6.25 4.375 6.25H10.625C13.125 6.25 13.75 6.875 13.75 9.375V10.625C13.75 13.125 13.125 13.75 10.625 13.75Z"
                                    stroke="#808080"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M3.75 5.625V4.375C3.75 2.30625 4.375 0.625 7.5 0.625C10.3125 0.625 11.25 2.1875 11.25 3.75"
                                    stroke="#808080"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M7.5 11.5625C8.36294 11.5625 9.0625 10.8629 9.0625 10C9.0625 9.13706 8.36294 8.4375 7.5 8.4375C6.63706 8.4375 5.9375 9.13706 5.9375 10C5.9375 10.8629 6.63706 11.5625 7.5 11.5625Z"
                                    stroke="#808080"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>
                            )}

                            <button
                              className="delete"
                              onClick={() =>
                                dispatch(
                                  HandleModal({
                                    modal: 'UserActions',
                                    modalData: {
                                      type: 'delete',
                                      message:
                                        'Are you sure you want to delete this user?',
                                      id: user.id,
                                      page,
                                    },
                                  }),
                                )
                              }
                            >
                              <svg
                                width="15"
                                height="15"
                                viewBox="0 0 15 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M13.125 3.73767C11.0438 3.53142 8.95 3.42517 6.8625 3.42517C5.625 3.42517 4.3875 3.48767 3.15 3.61267L1.875 3.73767"
                                  stroke="#53C48A"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M5.3125 3.10637L5.45 2.28762C5.55 1.69387 5.625 1.25012 6.68125 1.25012H8.31875C9.375 1.25012 9.45625 1.71887 9.55 2.29387L9.6875 3.10637"
                                  stroke="#53C48A"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M11.7812 5.71265L11.375 12.0064C11.3062 12.9876 11.25 13.7501 9.50625 13.7501H5.49375C3.75 13.7501 3.69375 12.9876 3.625 12.0064L3.21875 5.71265"
                                  stroke="#53C48A"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M6.45624 10.3126H8.53749"
                                  stroke="#53C48A"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M5.9375 7.81262H9.0625"
                                  stroke="#53C48A"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="not-found">
                      <td colSpan="4">No Data Found</td>
                    </tr>
                  )}
                </tbody>
              </table>
              {/* <div className="table table--user-management">
							<div className="table-header">

									<div className="td">
										<div className="td-name">
											<p>Name</p>
										</div>
									</div>
									<div className="td">
										<div className="td-name">
											<p>E-mail</p>
										</div>
									</div>
									<div className="td">
										<div className="td-name">
											<p>User Details</p>
										</div>
									</div>

									<div className="td td--right">
										<div className="td-name">
											<p>Actions</p>
										</div>
									</div>
								</div>
							</div>
							<div className="table-body">
								{users?.data?.map((user, index) => (
									<div className="tr" key={index}>

										<div className="td">
											<p className="td-hidden-name">Full name</p>
											<p>
												{user.first_name} {user.last_name}
											</p>
										</div>
										<div className="td">
											<p className="td-hidden-name">E-mail</p>
											<a className="link" href={`mailto:${user.email}`}>
												{user.email}
											</a>
										</div>

										<div className="td user-details">
											<button className="button button--smallest" onClick={() => navigateToRoute(`/user_management/complete_profile/${user.id}`)}>Complete Profile</button>
											<button className="button button--smallest" onClick={() => navigateToRoute(`/user_management/loan_info/${user.id}`)}>Loan Details</button>
											<button className="button button--smallest" onClick={() => navigateToRoute(`/user_management/payment_info/${user.id}`)}>Payment Details</button>
										</div>

										<div className="td td--right">
											<p className="td-hidden-name">Action</p>
											<div className="table-buttons table-buttons--right">



												{!!user.blocked ? (
													<button
														type="button"
														onClick={() =>
															dispatch(
																HandleModal({
																	modal: 'UserActions',
																	modalData: {
																		type: 'blocked',
																		message:
																			'Are you sure you want to unblock this user?',
																		id: user.id,
																		page,
																	},
																}),
															)
														}
													>
														<svg
															width="15"
															height="15"
															viewBox="0 0 15 15"
															fill="none"
															xmlns="http://www.w3.org/2000/svg"
														>
															<path
																d="M3.75 6.25012V5.00012C3.75 2.93137 4.375 1.25012 7.5 1.25012C10.625 1.25012 11.25 2.93137 11.25 5.00012V6.25012"
																stroke="#808080"
																strokeLinecap="round"
																strokeLinejoin="round"
															/>
															<path
																d="M7.5 11.5626C8.36294 11.5626 9.0625 10.8631 9.0625 10.0001C9.0625 9.13718 8.36294 8.43762 7.5 8.43762C6.63706 8.43762 5.9375 9.13718 5.9375 10.0001C5.9375 10.8631 6.63706 11.5626 7.5 11.5626Z"
																stroke="#808080"
																strokeLinecap="round"
																strokeLinejoin="round"
															/>
															<path
																d="M10.625 13.7501H4.375C1.875 13.7501 1.25 13.1251 1.25 10.6251V9.37512C1.25 6.87512 1.875 6.25012 4.375 6.25012H10.625C13.125 6.25012 13.75 6.87512 13.75 9.37512V10.6251C13.75 13.1251 13.125 13.7501 10.625 13.7501Z"
																stroke="#808080"
																strokeLinecap="round"
																strokeLinejoin="round"
															/>
														</svg>
													</button>
												) : (
													<button
														type="button"
														onClick={() =>
															dispatch(
																HandleModal({
																	modal: 'UserActions',
																	modalData: {
																		type: 'blocked',
																		message:
																			'Are you sure you want to block this user?',
																		id: user.id,
																		page,
																	},
																}),
															)
														}
													>
														<svg
															width="15"
															height="15"
															viewBox="0 0 15 15"
															fill="none"
															xmlns="http://www.w3.org/2000/svg"
														>
															<path
																d="M10.625 13.75H4.375C1.875 13.75 1.25 13.125 1.25 10.625V9.375C1.25 6.875 1.875 6.25 4.375 6.25H10.625C13.125 6.25 13.75 6.875 13.75 9.375V10.625C13.75 13.125 13.125 13.75 10.625 13.75Z"
																stroke="#808080"
																strokeLinecap="round"
																strokeLinejoin="round"
															/>
															<path
																d="M3.75 5.625V4.375C3.75 2.30625 4.375 0.625 7.5 0.625C10.3125 0.625 11.25 2.1875 11.25 3.75"
																stroke="#808080"
																strokeLinecap="round"
																strokeLinejoin="round"
															/>
															<path
																d="M7.5 11.5625C8.36294 11.5625 9.0625 10.8629 9.0625 10C9.0625 9.13706 8.36294 8.4375 7.5 8.4375C6.63706 8.4375 5.9375 9.13706 5.9375 10C5.9375 10.8629 6.63706 11.5625 7.5 11.5625Z"
																stroke="#808080"
																strokeLinecap="round"
																strokeLinejoin="round"
															/>
														</svg>
													</button>
												)}

												<button
													onClick={() =>
														dispatch(
															HandleModal({
																modal: 'UserActions',
																modalData: {
																	type: 'delete',
																	message:
																		'Are you sure you want to delete this user?',
																	id: user.id,
																	page,
																},
															}),
														)
													}
												>
													<svg
														width="15"
														height="15"
														viewBox="0 0 15 15"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															d="M13.125 3.73767C11.0438 3.53142 8.95 3.42517 6.8625 3.42517C5.625 3.42517 4.3875 3.48767 3.15 3.61267L1.875 3.73767"
															stroke="#53C48A"
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
														<path
															d="M5.3125 3.10637L5.45 2.28762C5.55 1.69387 5.625 1.25012 6.68125 1.25012H8.31875C9.375 1.25012 9.45625 1.71887 9.55 2.29387L9.6875 3.10637"
															stroke="#53C48A"
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
														<path
															d="M11.7812 5.71265L11.375 12.0064C11.3062 12.9876 11.25 13.7501 9.50625 13.7501H5.49375C3.75 13.7501 3.69375 12.9876 3.625 12.0064L3.21875 5.71265"
															stroke="#53C48A"
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
														<path
															d="M6.45624 10.3126H8.53749"
															stroke="#53C48A"
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
														<path
															d="M5.9375 7.81262H9.0625"
															stroke="#53C48A"
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
													</svg>
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
            {users.last_page > 1 && (
              <Pagination
                onChange={handleSetPage}
                totalItems={users?.total}
                currentPage={page}
                itemsCountPerPage={users?.per_page}
              />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default General;
