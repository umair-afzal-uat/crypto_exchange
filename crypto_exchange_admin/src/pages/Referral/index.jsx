import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../../components/AppLayout';
import { getReferrals } from '../../redux/referrals/action';
import Pagination from '../../components/Base/Pagination';
import { useHistory } from 'react-router-dom';
import { HandleModal } from '../../redux/modal/actions';
import moment from 'moment';
import round from 'round';
import { ReferralStatus } from '../../redux/fee/action';
const StatusInitialStates = {
  Payment_Status:"",
  Payout_Status:"",
}
const ReferralManagement = () => {
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.referrals);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(true);
  const [Status, setStatus] = useState(StatusInitialStates);
  const {
    push,
    location: { pathname },
  } = useHistory();
  useEffect(() => {
    dispatch(getReferrals());
  }, []);
  useEffect(() => {
    dispatch(getReferrals(page));
  }, [page]);
  useEffect(() => {
    if (data || !data) {
      setLoader(false);
    }
  }, [data]);
  // console.log(data)
  useEffect(() => {
    {dispatch(ReferralStatus(Status,)); dispatch(getReferrals())}
  }, [Status]);

  const select =(e, id)=>{
    const { name, value } = e.target;
        setStatus({
          ...Status,
          [name]: value,
          id
        });
  }
  const handleSetPage = ({ selected }) => {
    setPage(selected + 1);
    push(`${pathname}?page=${selected + 1}`);
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
            <p className="title">Referral Management</p>
          </div>
          <div className="table-block">
            <div className="table-wrapper">
              <table style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>Due Date</th>
                    <th>Referrer Name</th>
                    <th>Referrals Name</th>
                    <th>2nd Payment Complete</th>
                    <th>Commission</th>
                    <th>Staff</th>
                    <th>Payout Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data ? (
                    data.data.map((elem, i) => (
                     (elem.user !== null)?
                      <tr key={i} >
                        <td>
                          {(elem?.user?.first_loan?.loanperiod[0]?.amount_usd_paid && elem?.user?.first_loan?.referral_payment?.updated_at)?moment(new Date(elem?.user?.first_loan?.referral_payment?.updated_at)).format(
                            'MM/DD/YYYY',
                          ):(elem?.user?.first_loan?.loanperiod[0]?.amount_usd_paid && elem?.user?.first_loan?.last_loan_period?.payment_date)?moment(new Date(elem?.user?.first_loan?.last_loan_period?.payment_date)).format(
                            'MM/DD/YYYY',
                          ):"N/A"}
                        </td>
                        <td>
                          {elem?.parent?.first_name} {elem?.parent?.last_name}
                        </td>
                        <td>
                          {elem?.user?.first_name} {elem?.user?.last_name}
                        </td>
                        <td >
                          {
                            (elem?.user?.first_loan?.loanperiod[0]?.amount_usd_paid && elem?.user?.first_loan?.last_loan_period?.payment_date)?
                            <select
                            className="drop-down"
                              name="Payment_Status"
                              onChange={(event, id) => select(event, elem?.user?.first_loan?.referral_payment.id)}
                              value={elem?.user?.first_loan?.referral_payment?.payment_status}
                            >
                              <option selected hidden >
                              Select
                              </option>
                              <option name="Yes" value="Yes">
                              Yes
                              </option>
                              <option name="No" value="No">
                               No
                              </option>
                            </select>:"N/A"
                          }
                        </td>
                        <td>{(elem?.user?.first_loan?.loanperiod[0]?.amount_usd_paid && elem?.user?.first_loan?.last_loan_period?.payment_date)? elem?.user?.first_loan?.amount_btc_reward +" USD":"N/A"} </td>
                        <td>{(elem?.user?.first_loan?.loanperiod[0]?.amount_usd_paid && elem?.user?.first_loan?.last_loan_period?.payment_date)? elem?.user?.rr+"%":"N/A"}</td>
                        <td>
                          {(
                            elem?.user?.first_loan?.loanperiod[0]?.amount_usd_paid && elem?.user?.first_loan?.last_loan_period?.payment_date)?
                            <select
                              name="Payout_Status"
                              className="drop-down"
                              value={elem?.user?.first_loan?.referral_payment?.payout_status}
                              onChange={(event, id) => select(event, elem?.user?.first_loan?.referral_payment?.id)}
                            >
                               <option selected hidden >
                              Select
                              </option>
                             <option name="Pending" value="Pending">
                               Pending
                              </option>
                              <option name="Denied" value="Denied">
                                Denied
                              </option>
                              <option name="Complete" value="Complete">
                                Complete
                              </option>
                            </select>:"N/A"
                          }
                        </td>
                      </tr>
                      :""
                    ))
                  ) : (
                    <tr className="not-found">
                      <td colSpan="6">No Data Found</td>
                    </tr>
                  )}
                </tbody>
              </table>
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

export default ReferralManagement;
