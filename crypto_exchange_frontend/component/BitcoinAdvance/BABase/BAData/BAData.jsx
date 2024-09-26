import { useEffect, useState } from "react";
import Select from "react-select";
import QuestionMarkIcon from "../../../Base/icon/QuestionMarkIcon";
import Link from "next/link";
import { amountFormat, optionsCurrency } from "../../../../services/service";
import { useDispatch, useSelector } from "react-redux";
import { clearCalcData, getStateCredit, setLoansData } from "../slice";
import { getCalcDataUser, getLimit, getPeriod } from "../actions";

const BAData = () => {

  const [currency, setCurrency] = useState({ value: "USD", label: "USD" });
  const [currencyAmount, setCurrencyAmount] = useState({
    value: "USD",
    label: "USD",
  });
  const [period, setPeriod] = useState({ value: null, label: "weeks" });
  const [amount, setAmount] = useState("");
  const dispatch = useDispatch();
  useEffect(()=>{

  })
  const { creditLimits, periods, calcData } = useSelector(getStateCredit);
  useEffect(() => {
    if (
      currencyAmount?.value === "BTC" &&
      amount > 0 &&
      period.value &&
      amount <= creditLimits.loan_max_btc
    ) {
      const amountTimeOut = setTimeout(
        () =>
          dispatch(
            getCalcDataUser(
              {
                btc: amount,
                asset_code: "usd",
                loan_period_id: period.id,
              },
              period.id
            )
          ),
        150
      );
      const interval = setInterval(() =>{
        setTimeout(
          () =>
            dispatch(
              getCalcDataUser(
                {
                  amount: amount,
                  asset_code: "usd",
                  loan_period_id: period.id,
                },
                period.id
              )
            ),
          150
        );
      }, 60000);
      return () => clearTimeout(amountTimeOut);
    }
    if (
      currencyAmount?.value === "USD" &&
      amount > 0 &&
      period.value &&
      amount <= creditLimits.loan_max_usd &&
      amount >= creditLimits.loan_min_usd
    ) {
      const amountTimeOut = setTimeout(
        () =>
          dispatch(
            getCalcDataUser(
              {
                amount: amount,
                asset_code: "usd",
                loan_period_id: period.id,
              },
              period.id
            )
          ),
        150
      );
      const interval = setInterval(() =>{
        setTimeout(
          () =>
            dispatch(
              getCalcDataUser(
                {
                  amount: amount,
                  asset_code: "usd",
                  loan_period_id: period.id,
                },
                period.id
              )
            ),
          150
        );
      }, 60000);
      return () => clearTimeout(amountTimeOut);
    } else {
      dispatch(clearCalcData());
    }
  }, [amount, period, currencyAmount]);
  useEffect(() => {
    dispatch(getPeriod());
  }, []);

  useEffect(() => {
    dispatch(getLimit());
  }, []);

  return (
    <div className="content-block content-block--smallest">
      <div className="content-block__inside">
        <div className="content-block__header">
          <h3 className="content-block__title content-block__title--medium">
            Bitcoin Advance
          </h3>
          {/* <Link href="/">
            <a className="link link--green">Go Back</a>
          </Link> */}
        </div>
        <div className="content-block__main">
          <div className="form form--regular">
            <div className="input">
              <label>
                <div className="input__header">
                  <p className="input__name">Advance Amount</p>
                  <div className="input-info">
                    <button className="input-info__btn" type="button">
                    </button>
                  </div>
                </div>
              </label>
              <div className="input-item input-item--dropdown">
                <input
                  className="input-amount"
                  type="text"
                  placeholder="Amount"
                  value={amount}
                  maxLength={10}
                  onChange={(event) =>
                    setAmount(amountFormat(event.target.value))
                  }
                />
                <Select
                  className={"select-block input-select select-amount"}
                  options={optionsCurrency}
                  defaultValue={currencyAmount}
                  isSearchable={false}
                  id="long-value-select4"
                  instanceId="long-value-select4"
                  onChange={(e) => {
                    dispatch(clearCalcData());
                    setCurrencyAmount(e);
                  }}
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                />
              </div>
              <p className="input-value">
                Maximum:{" "}
                <span className="input-value input-value--green">
                  ${parseFloat(creditLimits?.loan_max_usd).toFixed(2)} / BTC{" "}
                  {parseFloat(creditLimits?.loan_max_btc).toFixed(4)}
                </span>
              </p>
              <p className="input-value">
                Minimum:{" "}
                <span className="input-value input-value--green">
                  ${parseFloat(creditLimits?.loan_min_usd).toFixed(2)} / BTC{" "}
                  {parseFloat(creditLimits?.loan_min_btc).toFixed(4)}
                </span>
              </p>
            </div>
            <div className="input">
              <label>
                <div className="input__header">
                  <p className="input__name">Number of Weekly Payments</p>
                  <div className="input-info">
                    <button className="input-info__btn" type="button">
                      
                    </button>
                  </div>
                </div>
              </label>
              <Select
                className={"select select--white select--full-width"}
                defaultValue={period}
                dropdownIndicator={false}
                options={periods}
                id="long-value-select3"
                instanceId="long-value-select3"
                isSearchable={false}
                onChange={(e) => setPeriod(e)}
                components={{
                  IndicatorSeparator: () => null,
                }}
              />
            </div>
            <div className="input">
              <label>
                <div className="input__header">
                  <p className="input__name">Due Today</p>
                  <div className="input-info">
                    <button className="input-info__btn" type="button">
                      
                    </button>
                  </div>
                </div>
              </label>
              <div className="input-item input-item--dropdown">
                <span>
                  {currency.value === "USD"
                    ? calcData?.down_payment_amount || "N/A"
                    : calcData?.down_payment_btc || "N/A"}
                </span>
                <Select
                  className={"select-block input-select"}
                  defaultValue={currency}
                  options={optionsCurrency}
                  menuIsOpen={false}
                  isSearchable={false}
                  id="long-value-select2"
                  instanceId="long-value-select2"
                  onChange={(e) => setCurrency(e)}
                  components={{
                    IndicatorSeparator: () => null,
                    DropdownIndicator: () => null,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BAData;
