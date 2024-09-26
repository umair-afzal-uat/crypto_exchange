import UasCalculatorIcon from "../Base/icon/UasCalculatorIcon";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCalcData, getStateCredit } from "../BitcoinAdvance/BABase/slice";
import { getCalcDataUser, getLimit } from "../BitcoinAdvance/BABase/actions";
import { amountFormat, round, warningMessage } from "../../services/service";
import RangeSlider from "../Base/RangeSlider/RangeSlider";
const CalculatorNew = () => {
  const [periodRange, setPeriodRange] = useState(5);
  const [loan, setLoan] = useState("");
  const dispatch = useDispatch();
  const { creditLimits, periods, calcData } = useSelector(getStateCredit);
  const period = periods?.find((e) => e.value === periodRange);
  const inputLoan = useRef(null);

  useEffect(() => {
    dispatch(getLimit());
  }, []);

  // useEffect(() => {
  //   inputLoan.current.focus();
  // }, []);

  useEffect(() => {
    if (
      loan > 0 &&
      period &&
      loan <= creditLimits.loan_max_usd &&
      loan >= creditLimits.loan_min_usd
    ) {
      const amountTimeOut = setTimeout(
        () =>
          dispatch(
            getCalcDataUser({
              amount: loan,
              asset_code: "usd",
              loan_period_id: period.id,
            })
          ),
        150
      );
      return () => clearTimeout(amountTimeOut);
    }
  }, [loan, periodRange]);
  const checkAndSetLoan = (amount) => {
    setLoan(amount);
    if (
      amount > 0 &&
      period &&
      amount <= creditLimits.loan_max_usd &&
      amount >= creditLimits.loan_min_usd
    ) {
       //alert('in');
    } else {
       //alert('else');
      warningMessage('Amount must be between 1000$ and 10,000$')
      dispatch(clearCalcData());
    }
  }
  return (
    <div className="calculator select_big">
      <div className="calculator__main"> 
        <div className="calculator-data">
          <div className="calculator-data__row">
            <span className="calculator-data__title">Loan Amount</span>
            <div className="calculator-data__main">
              <div className="calculator-data__main-row">
                <div className="input-wrapper input-wrapper--flex input-wrapper--d-flex">
                  <input
                    className="input-item input-item--biggest"
                    type="Number"
                    ref={inputLoan}
                    maxLength={10}
                    onBlur={(event) =>
                      checkAndSetLoan(amountFormat(event.target.value))
                    }
                    placeholder="Loan Amount"
                  />
                  <div className="select-block select-block--margin">
                    <div className="select select--big select--white select--transparent">
                      <button className="select__header" type="button">
                        <div className="select__icon">
                          <UasCalculatorIcon />
                        </div>
                        <span className="select__current">USD</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="calculator-data__row mb_50">
          <span className="calculator-data__title ">Loan Period</span>
          <div className="calculator-data__main">
            <div className="calculator-data__main-row">
              <div className="range-slider">
                <RangeSlider setPeriodRange={setPeriodRange} />
              </div>
              <span className="calculator-data__text">
                {periodRange} weeks
              </span>
            </div>
          </div>
        </div>
          <div className="calculator-data__row">
            <span className="calculator-data__title">Weekly Payments</span>
            <div className="calculator-data__main">
              <div className="calculator-data__main-row">
                <div className="input-wrapper input-wrapper--flex input-wrapper--d-flex">
                  <input
                    style={{
                      backgroundColor: "#eff4fb",
                      border: "1px solid #eff4fb",
                    }}
                    className="input-item input-item--biggest"
                    type="text"
                    readOnly={true}
                    defaultValue={
                      calcData?.weekly_payment >= 0
                        ?  round(calcData?.weekly_payment, 2)
                        : ""
                    }
                    placeholder="Weekly payments"
                  />
                  <div className="select-block select-block--margin">
                    <div className="select select--big select--white select--transparent">
                      <button className="select__header" type="button">
                        <div className="select__icon">
                          <UasCalculatorIcon />
                        </div>
                        <span className="select__current">USD</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="calculator-info">
          <div className="calculator-info__row">
            <span className="calculator-info__title">Finance Fee</span>
            <span className="calculator-info__num">
              {calcData?.fee_rate ? round(calcData?.fee_rate, 2) : "0.00"}%
            </span>
          </div>
          <div className="calculator-info__row">
            <span className="calculator-info__title">Origination Fee</span>
            <span className="calculator-info__num">10.00 USD</span>
          </div>
        </div>
      </div>
      <div className="calculator__total">
        <span className="calculator__total-title">Due Today <small>(Next payment due in 30 days)</small></span>
        <span className="calculator__total-price">
          {" "}
          {calcData?.down_payment_amount ? round(calcData?.down_payment_amount, 2) : "0.00"}{" "}
          USD
         
        </span>
      </div>
      <div className="calculator__cost">
        <span className="calculator__cost-text">
          Total Loan Cost:{" "}
          {calcData?.total_amount ? round(calcData?.total_amount, 2) : "0.00"}{" "}
          USD
        </span>
      </div>
    </div>
  );
};
export default CalculatorNew;
