import { HandleModal } from '../../redux/modal/actions';
import Pagination from '../../components/Base/Pagination';
import { useHistory } from 'react-router-dom';
import AppLayout from '../../components/AppLayout';
import { useEffect, useState } from 'react';
import { getUser } from '../../redux/users/action';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '../../components/Base/Icon/EditIcon';
const CompleteProfile = props => {
  const { user } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(parseInt(props.match.params.slug)));
  }, []);
  return (
    <AppLayout>
      <div className="title-block">
        <p className="title">Complete Profile</p>
      </div>
      <div className="table-block">
        <div className="table-wrapper">
          <table className="complete_profile_tbl" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Date of Birth</th>
                <th>Address</th>
                <th>City</th>
                <th>State</th>
                <th>Zip</th>
                <th>Wallet Address</th>
                <th>BTC Address</th>
                <th>Social Security Number</th>
                <th>Debit Card Number</th>
                <th>Security Code</th>
                <th>Debit Card Expiry Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{user.first_name ? user.first_name : 'N/A'}</td>
                <td>{user.last_name ? user.last_name : 'N/A'}</td>
                <td>{user.email ? user.email : 'N/A'}</td>
                <td>{user.phone ? user.phone : 'N/A'}</td>
                <td>{user.date_birth ? user.date_birth : 'N/A'}</td>
                <td>{user.address ? user.address : 'N/A'}</td>
                <td>{user.city ? user.city  : 'N/A'}</td>
                <td>{user.state ? user.state : 'N/A'}</td>
                <td>{user.zip ? user.zip : 'N/A'}</td>
                <td className="td">
                  <p className="td-hidden-name">Wallet address </p> 
                  {user?.wallet?.address ? (
                    <div className="table-adress">
                      <div className="table-adress__row">
                        <span className="table-adress__text">
                          {user?.wallet?.address}
                        </span>
                        <button
                          disabled={!user?.email_confirmed}
                          onClick={() => {
                            dispatch(
                              HandleModal({
                                modal: 'AddressAndHashActions',
                                modalData: {
                                  title: 'Edit address',
                                  subTitle: 'Address',
                                  action: 'Save',
                                  typeAction: 'editAddressGeneral',
                                  id: user.id,
                                  value: user?.wallet?.address,
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
                      disabled={!user?.email_confirmed}
                      onClick={() => {
                        dispatch(
                          HandleModal({
                            modal: 'AddressAndHashActions',
                            modalData: {
                              title: 'Add address',
                              subTitle: 'Address',
                              action: 'Add',
                              typeAction: 'editAddressGeneral',
                              id: user.id,
                            },
                          }),
                        );
                      }}
                      className="button button--smallest"
                      type="button"
                    >
                      Add address
                    </button>
                  )}
                </td>
                <td>{user.btc_address ? user.btc_address : 'N/A'}</td>
                <td>
                  {user.social_security_number
                    ? user.social_security_number
                    : 'N/A'}
                </td>
                <td>
                  {user.debit_card_number ? user.debit_card_number : 'N/A'}
                </td>
                <td>
                  {user.debit_card_sec_number
                    ? user.debit_card_sec_number
                    : 'N/A'}
                </td>
                <td>
                  {user.debit_card_expiry_date
                    ? user.debit_card_expiry_date
                    : 'N/A'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
      </div>
    </AppLayout>
  );
};

export default CompleteProfile;
