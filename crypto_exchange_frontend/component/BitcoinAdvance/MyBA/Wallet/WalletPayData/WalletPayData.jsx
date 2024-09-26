import BTCIcon from "../../../../Base/icon/BTCIcon";
import DoughnutDiagram from "../../../../Base/DoughnutDiagram/DoughnutDiagram";
import { handleModal } from "../../../../Base/Modal/slice";
import { useDispatch } from "react-redux";
import moment from "moment";
import { round } from "../../../../../services/service";
import { deferPayment } from "../../actions"

const WalletPayData = ({ data }) => {
  const dispatch = useDispatch();
  return (
    <>
      {data?.map((e) => (
        <div key={e.id} className="content-block content-block--padding">
          <div className="content-block__inside">
            <div className="content-block__main content-block__main--padding wallet-detail">
              <DoughnutDiagram
                // data1={e?.loan_period?.periods?.old?.length != 0 ? e?.loan_period?.periods?.old?.length - 1 : e?.loan_period?.periods?.old?.length}
                data1={e?.loan_period?.periods?.old?.length}
                data2={e?.periods}
              />
              <div className="wallet-detail__content">
                <ul className="wallet-detail__list">
                  <li className="wallet-item wallet-detail__item">
                    <div className="wallet-item__icon">
                      <BTCIcon />
                    </div>
                    <div className="wallet-item__info">
                      <span className="wallet-item__title">Bitcoin</span>
                      <span className="wallet-item__desc wallet-item__desc--big">
                       {e?.loaned_in_btc} BTC
                      </span>
                    </div>
                  </li>
                  <WalletPayItem
                    title="Total amount"
                    data={`$${e?.total_amount_usd}`}
                  />
                  <WalletPayItem
                    title="Payed amount"
                    data={`$${e?.loan_period?.amount_paid}`}
                  />
                  {Math.round(e?.loan_period?.amount_paid) < Math.round(e?.total_amount_usd)
                    ?
                    <>
                      <WalletPayItem
                        title="Next payment amount"
                        data={`$${round(e?.next_payment_amount, 2)}`}
                      />
                      <WalletPayItem
                        title="Next payment date"
                        data={moment(e?.next_payment_date).format("MM/DD/YYYY")}
                      />
                    </>
                    : ''}
                </ul>

                {Math.round(e?.loan_period?.amount_paid) < Math.round(e?.total_amount_usd)
                  ?
                  <div className="wallet-detail__footer">
                    {/* Downpayment button */}
                    {e?.loan_period?.amount_paid == 0 ?
                      <>
                        <button
                          onClick={() =>
                            dispatch(
                              handleModal({
                                modal: "Delete",
                                modalData: {
                                  loan_id: e.id,
                                  is_full: 0,
                                  is_down: 1,
                                  amount: round(e?.next_payment_amount, 2)
                                },
                              })
                            )}
                      className="button button--second-red defer-button"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() =>
                            dispatch(
                              handleModal({
                                modal: "PaymentMethod",
                                modalData: {
                                  loan_id: e.id,
                                  is_full: 0,
                                  is_down: 1,
                                  amount: round(e?.next_payment_amount, 2)
                                },
                              })
                            )
                          }
                          className="button button--second-green wallet-detail__btn"
                        >
                          Pay 1st Payment
                        </button>

                      </> :
                      <>
                        {/* Pay Next Payment Button */}
                        {e?.is_deffered < e?.periods - 1 ?
                          <button
                            onClick={() => dispatch(deferPayment(e.id))
                            }
                            className="button button--second-red defer-button"
                          >
                            Defer Payment
                          </button>
                          : ''}
                        <button
                          onClick={() =>
                            dispatch(
                              handleModal({
                                modal: "PaymentMethod",
                                modalData: {
                                  loan_id: e.id,
                                  is_full: 0,
                                  is_down: 0,
                                  amount: round(e?.next_payment_amount, 2)
                                },
                              })
                            )
                          }
                          className="button button--second-green wallet-detail__btn"
                        >
                          Pay next payment
                        </button>
                        {/* Pay Full Payment */}
                        <button
                          onClick={() =>
                            dispatch(
                              handleModal({
                                modal: "PaymentMethod",
                                modalData: {
                                  loan_id: e.id,
                                  is_full: 1,
                                  is_down: 0,
                                  total: e.total_amount_usd,
                                  remaining: e?.loan_period?.amount_paid,
                                },
                              })
                            )
                          }
                          type="button"
                          className="button wallet-detail__btn"
                        >
                          Pay in full
                        </button>
                      </>
                    }
                  </div>
                  : ''}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
export default WalletPayData;

const WalletPayItem = ({ title, data }) => {
  return (
    <li className="wallet-item wallet-detail__item">
      <div className="wallet-item__info">
        <span className="wallet-item__title">{title}</span>
        <span className="wallet-item__desc wallet-item__desc--right wallet-item__desc--big">
          {data}
        </span>
      </div>
    </li>
  );
};
