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
import { getLoansDetailUser } from "../actions";
import { round } from "../../../../services/service";

const LoansDetail = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loansDetail } = useSelector(getLoansData);
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    dispatch(getLoansDetailUser(router?.query?.id));
  }, []);
  useEffect(() => {
    if (loansDetail) {
        setLoader(false)
    }
}, [loansDetail])
  return (

    <AppLayout>
 { loader ? <div className="full-loader">
				<div className="lds-facebook"><div></div><div></div><div></div></div>
			</div> :
			<>

      <div className="main__content details details--top">

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
                        <TableHeaderItem title="How much paid" />
                        <TableHeaderItem title="Data" />
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
    </>
}
    </AppLayout>
  );
};
export default LoansDetail;
