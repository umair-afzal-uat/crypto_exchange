import Link from "next/link";
import DoughnutDiagram from "../../../Base/DoughnutDiagram/DoughnutDiagram";
import { handleModal } from "../../../Base/Modal/slice";
import { useDispatch, useSelector } from "react-redux";
import GoToBackIcon2 from "../../../Base/icon/GoToBackIcon2";
import TableHeaderItem from "../../../Base/Table/TableHeaderItem";
import TableRowsItemDetail from "../../../Base/Table/TableRowsItemDetail";
import { useRouter } from "next/router";
import { getLoansData } from "../slice";
import { useEffect } from "react";
import { getLoansDetailUser,deferPaymentDetail } from "../actions";
import { round } from "../../../../services/service";

const LoansDetail = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loansDetail } = useSelector(getLoansData);
  useEffect(() => {
    dispatch(getLoansDetailUser(router?.query?.id));
  }, []);

  return (
    <main className="main">
      <h3 className="section-title">
        <Link href="/myLoans">
          <button type="button" className="section-title__icon">
            <GoToBackIcon2 />
          </button>
        </Link>

        <span className="section-title__text">Details </span>
      </h3>
      <div className="main__content details details--top">
        <div className="details-stats">
          <div className="details-stats__header">
            <span className="details-stats__title">Loan Summary</span>
            <br />
              <span className="details-stats__status" style={{"text-transform":"uppercase"}}>
                {loansDetail?.loan?.status}
              </span>

          </div>
          <div className="details-stats__main">
            <div className="my-loans_diagram">
              <DoughnutDiagram
                data2={loansDetail?.loan?.periods}
                data1={loansDetail?.payed_period}
              />
            </div>
            <div className="wallet-detail details-stats__list">
              <ul className="wallet-detail__list">
                <li className="wallet-item wallet-detail__item">
                  <div className="wallet-item__info">
                    <span className="wallet-item__title">Total amount</span>
                    <span className="wallet-item__desc wallet-item__desc--big">
                      ${loansDetail?.loan?.total_amount_usd}
                    </span>
                  </div>
                </li>
                <li className="wallet-item wallet-detail__item">
                  <div className="wallet-item__info">
                    <span className="wallet-item__title">Weekly payment</span>
                    <span className="wallet-item__desc wallet-item__desc--big">
                      ${round(loansDetail?.weekly_payment, 2)}
                    </span>
                  </div>
                </li>
                <li className="wallet-item wallet-detail__item">
                  <div className="wallet-item__info">
                    <span className="wallet-item__title">Next payment</span>
                    <span className="wallet-item__desc wallet-item__desc--big">
                      ${round(loansDetail?.next_payment, 2)}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="content-block content-block--padding content-block--margin-none">
          <div className="content-block__inside">
            <div className="content-block__main content-block__main--padding">
              <div className="details-header">
                <span className="details-header__title">Payment details</span>
                <p className="details-header__price">
                  Remaining to pay{" "}
                  <span className="details-header__num">
                    ${round(loansDetail?.remaining_pay, 2)}
                  </span>
                </p>
              </div>
              <div className="table-block table-block--small">
                <div className="table-wrapper">
                  <table className="table table--four">
                    <thead className="table-header">
                      <tr className="tr">
                        <TableHeaderItem title="Payment No" />
                        <TableHeaderItem title="Payment Amount" />
                        <TableHeaderItem title="Date" />
                        <TableHeaderItem title="Status" />
                      </tr>
                    </thead>
                    <tbody className="table-body">
                      {loansDetail &&
                        loansDetail?.loan?.loan_period.map((e) => (
                          <TableRowsItemDetail key={e.id} data={e} />
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default LoansDetail;
