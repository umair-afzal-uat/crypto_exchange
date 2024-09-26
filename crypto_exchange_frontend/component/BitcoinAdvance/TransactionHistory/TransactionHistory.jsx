import MyWalletIcon from "../../Base/icon/MyWalletIcon";
import TransactionHistoryList from "./TransactionHistoryList";
import TransactionHistoryEmptyList from "./TransactionHistoryEmptyList";
import { useEffect, useState } from "react";
import DateTransactionHistory from "../../Base/DateTransactionHistory/DateTransactionHistory";
import { getWithdrawalsHistoryUser } from "../MyBA/actions";
import { useDispatch, useSelector } from "react-redux";
import { getLoansData } from "../MyBA/slice";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import constants from "../../../services/constants";
import Paginate from "../../Base/Paginate/Paginate";
import moment from "moment";
const TransactionHistory = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { withdrawalHistory } = useSelector(getLoansData);
  const [page, setPage] = useState(1);
  const [startData, setStartData] = useState(new Date());
  const [toData, setToData] = useState(
    new Date(startData - 1000 * 60 * 60 * 24 * 10)
  );

  useEffect(() => {
    if (!Cookies.get(constants.jwtToken)) {
      router.push("/logIn");
    }
  }, []);

  useEffect(() => {
    if (startData && toData && startData >= toData) {
      dispatch(
        getWithdrawalsHistoryUser(
          page,
          moment(toData).format("YYYY-MM-DD"),
          moment(startData).format("YYYY-MM-DD")
        )
      );
    }
  }, [startData, toData, page]);

  return (
    <main className="main">
      <h3 className="section-title">
        <div className="section-title__icon">
          <MyWalletIcon />
        </div>
        <span className="section-title__text">Withdrawal History</span>
      </h3>
      <div className="main__content">
        <div className="tabs">
          <div className="content-block content-block--padding">
            <div className="content-block__inside">
              <div className="content-block__main content-block__main--padding">
                <div className="input">
                  <label>
                    <p className="input__name">Date</p>
                    <div className="input-row">
                      <DateTransactionHistory
                        id="toData"
                        data={toData}
                        setData={(e) => setToData(e)}
                      />
                      <span className="input-line">-</span>
                      <DateTransactionHistory
                        id="startData"
                        data={startData}
                        setData={(e) => setStartData(e)}
                      />
                    </div>
                  </label>
                </div>
                {withdrawalHistory?.data?.length > 0 ? (
                  <TransactionHistoryList data={withdrawalHistory?.data} />
                ) : (
                  <TransactionHistoryEmptyList />
                )}
              </div>
            </div>
          </div>
          <div className="pagination-block">
            {withdrawalHistory?.data?.length > 0 && (
              <Paginate
                onChange={({ selected }) => setPage(selected + 1)}
                totalItems={withdrawalHistory?.total}
                currentPage={page}
                itemsCountPerPage={withdrawalHistory?.per_page}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
export default TransactionHistory;
