import { useEffect, useState } from 'react';
import TableHeaderItem from '../../components/Base/Table/TableHeaderItem';
import TableRowsItemDetail from '../../components/Base/Table/TableRowsItemDetail';
import { useRouter } from 'next/router';
import AppLayout from '../../components/AppLayout';
import Pagination from '../../components/Base/Pagination';
import { getPaymentInfo } from '../../redux/transactions/action';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import EditIcon from '../../components/Base/Icon/EditIcon';
import { HandleModal } from '../../redux/modal/actions';
import moment from 'moment';
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
  const payments = data && data.data;
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    dispatch(getPaymentInfo(slug));
  }, []);

  useEffect(() => {
    if (payments) {
      setLoader(false);
    }
  }, [payments]);
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
            <p className="title">Payment Details 2</p>
          </div>
          <div className="custom-view">
            <div className="content-block content-block--padding">
              <div className="content-block__inside">
                <div className="content-block__main content-block__main--padding wallet-detail">
                  <div
                    className="doughnut-wrapper"
                    style={{ width: 150, height: 150 }}
                  >
                    <CircularProgressbarWithChildren
                      strokeWidth="15"
                      value={percentage}
                      styles={buildStyles({
                        rotation: 0.25,
                        strokeLinecap: 'butt',
                        pathTransitionDuration: 0.5,
                        pathColor: `rgba(83, 196, 138, ${percentage / 100})`,
                        trailColor: '#d6d6d6',
                        backgroundColor: '#53C48A',
                      })}
                    >
                      <div class="progressbar__text">
                        3 of 4
                        <span class="progressbar__text progressbar__text--small">
                          Payments
                        </span>
                      </div>
                    </CircularProgressbarWithChildren>
                  </div>
                  <div className="wallet-detail__content">
                    <ul className="wallet-detail__list">
                      <li className="wallet-item wallet-detail__item">
                        <div className="wallet-item__icon">
                          <svg
                            width="56"
                            height="56"
                            viewBox="0 0 56 56"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M55.1218 34.7753C51.3822 49.7754 36.1895 58.9042 21.1876 55.1637C6.19193 51.4241 -2.93686 36.2304 0.804379 21.2315C4.54234 6.22969 19.7351 -2.89979 34.7323 0.839809C49.7332 4.57941 58.8614 19.7747 55.1214 34.7756L55.1217 34.7753H55.1218Z"
                              fill="#F7931A"
                            ></path>
                            <path
                              d="M40.3469 23.9917C40.9042 20.2655 38.0673 18.2626 34.1881 16.9264L35.4466 11.879L32.374 11.1134L31.149 16.0279C30.3412 15.8264 29.5117 15.6366 28.6873 15.4484L29.9212 10.5014L26.8506 9.73584L25.5915 14.7816C24.923 14.6295 24.2665 14.479 23.6295 14.3206L23.6331 14.3047L19.396 13.2466L18.5787 16.5283C18.5787 16.5283 20.8582 17.0508 20.8102 17.083C22.0544 17.3935 22.2794 18.2171 22.242 18.87L20.8086 24.6202C20.8942 24.642 21.0054 24.6734 21.128 24.7227C21.0255 24.6973 20.9164 24.6695 20.8032 24.6424L18.794 32.6976C18.6419 33.0756 18.256 33.6429 17.3861 33.4275C17.4169 33.4721 15.1529 32.8702 15.1529 32.8702L13.6274 36.3873L17.6258 37.384C18.3697 37.5706 19.0986 37.7657 19.8165 37.9493L18.545 43.0546L21.614 43.8202L22.8731 38.7691C23.7115 38.9967 24.5252 39.2066 25.3217 39.4045L24.0668 44.4319L27.1395 45.1975L28.4108 40.1017C33.6501 41.0933 37.5897 40.6935 39.2479 35.9545C40.5841 32.1391 39.1814 29.9384 36.425 28.5032C38.4326 28.0402 39.9448 26.7198 40.348 23.9921L40.347 23.9915L40.3469 23.9917ZM33.3269 33.8356C32.3773 37.6511 25.9533 35.5886 23.8706 35.0714L25.5578 28.3077C27.6404 28.8276 34.3192 29.8565 33.327 33.8356H33.3269ZM34.2771 23.9364C33.4109 27.407 28.0641 25.6438 26.3297 25.2114L27.8594 19.0772C29.5938 19.5095 35.1794 20.3165 34.2774 23.9364H34.2771Z"
                              fill="white"
                            ></path>
                          </svg>
                        </div>
                        <div className="wallet-item__info">
                          <span className="wallet-item__title">Bitcoin</span>
                          <span className="wallet-item__desc wallet-item__desc--big">
                            BTC
                          </span>
                        </div>
                      </li>
                      <li className="wallet-item wallet-detail__item">
                        <div className="wallet-item__info">
                          <span className="wallet-item__title">
                            Total amount
                          </span>
                          <span className="wallet-item__desc wallet-item__desc--right wallet-item__desc--big">
                            $1210
                          </span>
                        </div>
                      </li>
                      <li className="wallet-item wallet-detail__item">
                        <div className="wallet-item__info">
                          <span className="wallet-item__title">
                            Payed amount
                          </span>
                          <span className="wallet-item__desc wallet-item__desc--right wallet-item__desc--big">
                            $620
                          </span>
                        </div>
                      </li>
                      <li className="wallet-item wallet-detail__item">
                        <div className="wallet-item__info">
                          <span className="wallet-item__title">
                            Next payment amount
                          </span>
                          <span className="wallet-item__desc wallet-item__desc--right wallet-item__desc--big">
                            $600.00
                          </span>
                        </div>
                      </li>
                      <li className="wallet-item wallet-detail__item">
                        <div className="wallet-item__info">
                          <span className="wallet-item__title">
                            Next payment date
                          </span>
                          <span className="wallet-item__desc wallet-item__desc--right wallet-item__desc--big">
                            02/16/2022
                          </span>
                        </div>
                      </li>
                    </ul>
                    <div className="wallet-detail__footer">
                      <div className="table-block">
                        <div className="table-wrapper">
                          <table style={{ width: '100%' }}>
                            <thead>
                              <tr>
                                <th>Payment No</th>
                                <th>How much paid</th>
                                <th>Data</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {payments && payments ? (
                                payments.map(elem => (
                                  <tr>
                                    <td>{elem?.id}</td>
                                    <td> ${elem?.amount_usd}</td>
                                    <td>
                                      {moment(elem?.created_at).format(
                                        'MM/DD/YYYY',
                                      )}
                                    </td>
                                    <td className="td--flex">
                                      {elem?.status === 'processing'
                                        ? 'Processing'
                                        : elem?.status === 'admin_check'
                                        ? 'Admin Check'
                                        : elem?.status === 'completed'
                                        ? 'Completed'
                                        : elem?.status === 'canceled'
                                        ? 'Cancelled'
                                        : elem?.status === 'waiting_user'
                                        ? 'Waiting User'
                                        : elem?.status === 'waiting_admin'
                                        ? 'Waiting Admin'
                                        : ''}
                                      <button
                                        onClick={() => {
                                          dispatch(
                                            HandleModal({
                                              modal: 'PaymentInfoStatus',
                                              modalData: {
                                                title: 'Edit Status',
                                                subTitle: 'Select Status',
                                                action: 'Edit',
                                                typeAction: 'editStatus',
                                                id: elem?.id,
                                                value: elem?.status,
                                                slug,
                                              },
                                            }),
                                          );
                                        }}
                                        className="table-adress__btn"
                                        type="button"
                                      >
                                        <EditIcon />
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-block content-block--padding">
              <div className="content-block__inside">
                <div className="content-block__main content-block__main--padding wallet-detail">
                  <div
                    className="doughnut-wrapper"
                    style={{ width: 150, height: 150 }}
                  >
                    <CircularProgressbarWithChildren
                      strokeWidth="15"
                      value={percentage}
                      styles={buildStyles({
                        rotation: 0.25,
                        strokeLinecap: 'butt',
                        pathTransitionDuration: 0.5,
                        pathColor: `rgba(83, 196, 138, ${percentage / 100})`,
                        trailColor: '#d6d6d6',
                        backgroundColor: '#53C48A',
                      })}
                    >
                      <div class="progressbar__text">
                        3 of 4
                        <span class="progressbar__text progressbar__text--small">
                          Payments
                        </span>
                      </div>
                    </CircularProgressbarWithChildren>
                  </div>
                  <div className="wallet-detail__content">
                    <ul className="wallet-detail__list">
                      <li className="wallet-item wallet-detail__item">
                        <div className="wallet-item__icon">
                          <svg
                            width="56"
                            height="56"
                            viewBox="0 0 56 56"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M55.1218 34.7753C51.3822 49.7754 36.1895 58.9042 21.1876 55.1637C6.19193 51.4241 -2.93686 36.2304 0.804379 21.2315C4.54234 6.22969 19.7351 -2.89979 34.7323 0.839809C49.7332 4.57941 58.8614 19.7747 55.1214 34.7756L55.1217 34.7753H55.1218Z"
                              fill="#F7931A"
                            ></path>
                            <path
                              d="M40.3469 23.9917C40.9042 20.2655 38.0673 18.2626 34.1881 16.9264L35.4466 11.879L32.374 11.1134L31.149 16.0279C30.3412 15.8264 29.5117 15.6366 28.6873 15.4484L29.9212 10.5014L26.8506 9.73584L25.5915 14.7816C24.923 14.6295 24.2665 14.479 23.6295 14.3206L23.6331 14.3047L19.396 13.2466L18.5787 16.5283C18.5787 16.5283 20.8582 17.0508 20.8102 17.083C22.0544 17.3935 22.2794 18.2171 22.242 18.87L20.8086 24.6202C20.8942 24.642 21.0054 24.6734 21.128 24.7227C21.0255 24.6973 20.9164 24.6695 20.8032 24.6424L18.794 32.6976C18.6419 33.0756 18.256 33.6429 17.3861 33.4275C17.4169 33.4721 15.1529 32.8702 15.1529 32.8702L13.6274 36.3873L17.6258 37.384C18.3697 37.5706 19.0986 37.7657 19.8165 37.9493L18.545 43.0546L21.614 43.8202L22.8731 38.7691C23.7115 38.9967 24.5252 39.2066 25.3217 39.4045L24.0668 44.4319L27.1395 45.1975L28.4108 40.1017C33.6501 41.0933 37.5897 40.6935 39.2479 35.9545C40.5841 32.1391 39.1814 29.9384 36.425 28.5032C38.4326 28.0402 39.9448 26.7198 40.348 23.9921L40.347 23.9915L40.3469 23.9917ZM33.3269 33.8356C32.3773 37.6511 25.9533 35.5886 23.8706 35.0714L25.5578 28.3077C27.6404 28.8276 34.3192 29.8565 33.327 33.8356H33.3269ZM34.2771 23.9364C33.4109 27.407 28.0641 25.6438 26.3297 25.2114L27.8594 19.0772C29.5938 19.5095 35.1794 20.3165 34.2774 23.9364H34.2771Z"
                              fill="white"
                            ></path>
                          </svg>
                        </div>
                        <div className="wallet-item__info">
                          <span className="wallet-item__title">Bitcoin</span>
                          <span className="wallet-item__desc wallet-item__desc--big">
                            BTC
                          </span>
                        </div>
                      </li>
                      <li className="wallet-item wallet-detail__item">
                        <div className="wallet-item__info">
                          <span className="wallet-item__title">
                            Total amount
                          </span>
                          <span className="wallet-item__desc wallet-item__desc--right wallet-item__desc--big">
                            $1210
                          </span>
                        </div>
                      </li>
                      <li className="wallet-item wallet-detail__item">
                        <div className="wallet-item__info">
                          <span className="wallet-item__title">
                            Payed amount
                          </span>
                          <span className="wallet-item__desc wallet-item__desc--right wallet-item__desc--big">
                            $620
                          </span>
                        </div>
                      </li>
                      <li className="wallet-item wallet-detail__item">
                        <div className="wallet-item__info">
                          <span className="wallet-item__title">
                            Next payment amount
                          </span>
                          <span className="wallet-item__desc wallet-item__desc--right wallet-item__desc--big">
                            $600.00
                          </span>
                        </div>
                      </li>
                      <li className="wallet-item wallet-detail__item">
                        <div className="wallet-item__info">
                          <span className="wallet-item__title">
                            Next payment date
                          </span>
                          <span className="wallet-item__desc wallet-item__desc--right wallet-item__desc--big">
                            02/16/2022
                          </span>
                        </div>
                      </li>
                    </ul>
                    <div className="wallet-detail__footer">
                      <div className="table-block">
                        <div className="table-wrapper">
                          <table style={{ width: '100%' }}>
                            <thead>
                              <tr>
                                <th>Payment No</th>
                                <th>How much paid</th>
                                <th>Data</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {payments && payments ? (
                                payments.map(elem => (
                                  <tr>
                                    <td>{elem?.id}</td>
                                    <td> ${elem?.amount_usd}</td>
                                    <td>
                                      {moment(elem?.created_at).format(
                                        'MM/DD/YYYY',
                                      )}
                                    </td>
                                    <td className="td--flex">
                                      {elem?.status === 'processing'
                                        ? 'Processing'
                                        : elem?.status === 'admin_check'
                                        ? 'Admin Check'
                                        : elem?.status === 'completed'
                                        ? 'Completed'
                                        : elem?.status === 'canceled'
                                        ? 'Cancelled'
                                        : elem?.status === 'waiting_user'
                                        ? 'Waiting User'
                                        : elem?.status === 'waiting_admin'
                                        ? 'Waiting Admin'
                                        : ''}
                                      <button
                                        onClick={() => {
                                          dispatch(
                                            HandleModal({
                                              modal: 'PaymentInfoStatus',
                                              modalData: {
                                                title: 'Edit Status',
                                                subTitle: 'Select Status',
                                                action: 'Edit',
                                                typeAction: 'editStatus',
                                                id: elem?.id,
                                                value: elem?.status,
                                                slug,
                                              },
                                            }),
                                          );
                                        }}
                                        className="table-adress__btn"
                                        type="button"
                                      >
                                        <EditIcon />
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </AppLayout>
  );
};
export default LoansDetail;
