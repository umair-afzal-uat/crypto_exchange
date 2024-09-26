import { useDispatch, useSelector } from "react-redux";
import ItemSummary from "../../../Base/ItemSummary/ItemSummary";
import ChekcIcon from "../../../Base/icon/ChekcIcon";
import { useState } from "react";
import { getStateCredit } from "../slice";
import { round } from "../../../../services/service";
import moment from "moment";
import { isQueuedUser } from "../actions";
const BASummary = () => {
  const { calcData, loansData } = useSelector(getStateCredit);
  const [state, setState] = useState(false);
  let a = 0;
  const dispatch = useDispatch();
  return (
    <div className="content-block content-block--smallest summry">
      <div className="content-block__inside">
        <div className="content-block__header">
          <h3 className="content-block__title content-block__title--medium">
            Summary
          </h3>
        </div>
        <div className="content-block__main">
          <form className="form form--regular">
            <ul className="info-list">
              <ItemSummary
                title={"Bitcoin Advance Amount"}
                data={`${
                  calcData?.value_btc ? round(calcData?.value_btc, 4) : "0.0000"
                } BTC`}
              />
              <ItemSummary
                title={"Number of Payments"}
                data={calcData?.periods_count || "N/A"}
              />
              <ItemSummary
                title={"Finance Fee"}
                data={`${round(calcData?.fee_rate || "0.00", 2)} %`}
              />
              <ItemSummary
                title={"Bitcoin rate"}
                data={`$ ${round(calcData?.btc_amount_rate || "0.00", 2)}`}
              />
              <ItemSummary
                title={"Origination Fee"}
                data={`$ ${round(calcData?.fee_rate ? 10 : 0, 2)}`}
              />
              <ItemSummary
                title={ "Next Payment Due"}
                data={
                  calcData?.value_btc
                    ? moment(new Date() ).locale("ru").add(30, 'days').format("MMM DD, YYYY")
                    : "N/A"
                }
              />
              <ItemSummary
                title={"Weekly Payment"}
                data={
                  calcData?.weekly_payment
                    ? round(calcData?.weekly_payment, 2)
                    : "N/A"
                }
                // data={
                //   calcData?.amount_by_period
                //     ? round(calcData?.amount_by_period, 2)
                //     : "N/A"
                // }
              />
              <ItemSummary
                title={"Total Advance Cost"}
                data={
                  calcData?.total_amount
                    ? round(calcData?.total_amount, 2)
                    : "N/A"
                }
              />
            </ul>
            <div className="checkbox">
              <label className="checkbox__label">
                <input
                  className="hidden"
                  type="checkbox"
                  onChange={() => setState(!state)}
                />
                <div className="checkbox__item">
                  <span className="checkbox__item-icon">
                    <ChekcIcon />
                  </span>
                </div>
                <p className="checkbox__text">
                  I have read and agreed to the <a target="_blank" href="/termsOfService">Terms and Conditions.</a>
                </p>
              </label>
            </div>
            <button
              onClick={() => {a++; return a==1 ? dispatch(isQueuedUser(loansData)) : ''}}
              disabled={!state || !calcData}
              className="button button--full-width"
              type="button"
            >
              Get loan now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default BASummary;
