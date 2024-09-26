import { useEffect, useState } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import TableHeaderItem from '../../components/Base/Table/TableHeaderItem';
import TableRowsItemDetail from '../../components/Base/Table/TableRowsItemDetail';
import { useRouter } from 'next/router';
import moment from 'moment';
import AppLayout from '../../components/AppLayout';
import Pagination from '../../components/Base/Pagination';
import { getPaymentInfo } from '../../redux/transactions/action';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import EditIcon from '../../components/Base/Icon/EditIcon';
import { HandleModal } from '../../redux/modal/actions';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const LoansDetail = () => {
  const router = useRouter();
  const { slug } = useParams();
  const dispatch = useDispatch();
  const data = useSelector(state => state.transactions.data);
  const payment = data && data.data && data.data.loans;
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    dispatch(getPaymentInfo(slug));
  }, []);

  useEffect(() => {
    if (payment) {
      setLoader(false);
    }
  }, [payment]);
  const percentage = 75;

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
            <p className="title">Payment Details</p>
          </div>
          {payment.map((e, i) => (
            <div className="custom-view">
              <div key={e.id} className="content-block content-block--padding">
                <div className="content-block__inside">
                  <div className="content-block__main content-block__main--padding wallet-detail">
                    <div
                      className="doughnut-wrapper"
                      style={{ width: 150, height: 150 }}
                    >
                      <CircularProgressbarWithChildren
                        strokeWidth="15"
                        // value={e?.loan_period?.periods?.old?.length}
                        value={
                          (e?.loan_period?.periods?.old?.length / e.periods) *
                          100
                        }
                        styles={buildStyles({
                          rotation: 0.0,
                          strokeLinecap: 'butt',
                          pathTransitionDuration: 0.5,
                          pathColor: `rgba(83, 196, 138, ${percentage / 100})`,
                          trailColor: '#d6d6d6',
                          backgroundColor: '#53C48A',
                        })}
                      >
                        <div class="progressbar__text">
                          {e?.loan_period?.periods?.old?.length} of {e?.periods}
                          <span class="progressbar__text progressbar__text--small">
                            Payments
                          </span>
                        </div>
                      </CircularProgressbarWithChildren>
                    </div>
                    <div className="wallet-detail__content">
                      <ul className="wallet-detail__list">
                        <li className="wallet-item wallet-detail__item">
                          <div className="wallet-item__info">
                            <span className="wallet-item__title">
                              Start date
                            </span>
                            <span className="wallet-item__desc wallet-item__desc--right wallet-item__desc--big">
                              {moment(e?.created_at).format('MM/DD/YYYY')}
                            </span>
                          </div>
                        </li>
                        <li className="wallet-item wallet-detail__item">
                          <div className="wallet-item__info">
                            <span className="wallet-item__title">
                              Loan amount (BTC)
                            </span>
                            <span className="wallet-item__desc wallet-item__desc--big">
                              {e?.loaned_in_btc}
                            </span>
                          </div>
                        </li>
                        <li className="wallet-item wallet-detail__item">
                          <div className="wallet-item__info">
                            <span className="wallet-item__title">
                              Loan amount (USD)
                            </span>
                            <span className="wallet-item__desc wallet-item__desc--right wallet-item__desc--big">
                              ${Math.round(e?.loaned_in_usd)}
                            </span>
                          </div>
                        </li>
                        <li className="wallet-item wallet-detail__item">
                          <div className="wallet-item__info">
                            <span className="wallet-item__title">
                              Total amount
                            </span>
                            <span className="wallet-item__desc wallet-item__desc--right wallet-item__desc--big">
                              ${Math.round(e?.total_amount_usd)}
                            </span>
                          </div>
                        </li> 
                        <li className="wallet-item wallet-detail__item">
                          <div className="wallet-item__info">
                            <span className="wallet-item__title">
                              Payed amount
                            </span>
                            <span className="wallet-item__desc wallet-item__desc--right wallet-item__desc--big">
                            $
                              {e?.down_payment > 0
                                ? Math.round(e?.loan_period.amount_paid*100)/100
                                : 0}
                            </span>
                          </div>
                        </li>
                        <li className="wallet-item wallet-detail__item">
                          <div className="wallet-item__info">
                            <span className="wallet-item__title">
                              Next payment amount
                            </span>
                            <span className="wallet-item__desc wallet-item__desc--right wallet-item__desc--big">
                              $
                              {e?.next_payment_amount > 0
                                ? Math.round(e?.next_payment_amount*100)/100
                                : 0}
                            </span>
                          </div>
                        </li>
                        <li className="wallet-item wallet-detail__item">
                          <div className="wallet-item__info">
                            <span className="wallet-item__title">
                              Next payment date
                            </span>
                            <span className="wallet-item__desc wallet-item__desc--right wallet-item__desc--big">
                              {moment(e?.next_payment_date).format(
                                'MM/DD/YYYY',
                              )}
                            </span>
                          </div>
                        </li>
                        <li className="wallet-item wallet-detail__item">
                          <div className="wallet-item__info">
                            <span className="wallet-item__title">
                              Remaining to Pay
                            </span>
                            <span className="wallet-item__desc wallet-item__desc--right wallet-item__desc--big">
                              ${Math.round((e?.total_amount_usd-e?.loan_period.amount_paid)*100)/100}
                            </span>
                          </div>
                        </li>
                      </ul>
                      <Accordion>
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>
                           
                            Details
                            
                          </Accordion.Header>
                          <Accordion.Body>
                              <div className="table-block">
                                <div className="table-wrapper">
                                  <table style={{ width: '100%' }}>
                                    <thead>
                                      <tr>
                                        <th>Payment No</th>
                                        <th>How much paid</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {payment && payment ? (
                                        payment[i].payments.map((a, j) => (
                                          <tr>
                                            <td>{j+1}</td>
                                            <td> ${a?.amount_usd}</td>
                                            <td>
                                              {moment(a?.created_at).format(
                                                'MM/DD/YYYY',
                                              )}
                                            </td>
                                            <td className="td--flex">
                                              {a?.status === 'processing'
                                                ? 'Processing'
                                                : a?.status === 'admin_check'
                                                ? 'Admin Check'
                                                : a?.status === 'completed'
                                                ? 'Completed'
                                                : a?.status === 'canceled'
                                                ? 'Cancelled'
                                                : a?.status === 'waiting_user'
                                                ? 'Waiting User'
                                                : a?.status === 'waiting_admin'
                                                ? 'Waiting Admin'
                                                : ''}
                                              <button
                                                onClick={() => {
                                                  dispatch(
                                                    HandleModal({
                                                      modal:
                                                        'PaymentInfoStatus',
                                                      modalData: {
                                                        title: 'Edit Status',
                                                        subTitle:
                                                          'Select Status',
                                                        action: 'Edit',
                                                        typeAction:
                                                          'editStatus',
                                                        id: a?.id,
                                                        value: a?.status,
                                                        slug,
                                                      },
                                                    }),
                                                  );
                                                }}
                                                className="table-adress__btn"
                                                type="button"
                                              >
                                                <EditIcon/>
                                              </button>
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
                                </div>
                              </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </AppLayout>
  );
};
export default LoansDetail;
// const FaqItem = ({ title, text, text2, activ = false }) => {
//   const [active, setActive] = useState(false);
//   return (
//     <div className="faq-item accordion">
//       <button
//         className={("faq-item__header accordion__header", {
//           "accordion__header--active": active,
//         })}
//         type="button"
//       >
//         <span className="faq-item__title">{title}</span>
//         <div onClick={() => setActive(!active)} className="faq-item__close" />
//       </button>
//       <div
//         className="faq-item__main accordion__main"
//         style={{ maxHeight: `${active ? "161px" : 0}` }}
//       >
//         <div className="accordion__main-content">
//           <p className="faq-item__desc">{text}</p>
//           <br/>
//           <p className="faq-item__desc"> {text2}</p>
//         </div>
//       </div>
//     </div>
//   );
// };
