import LoansListItem from "./LoansListItem";
import TableHeaderItem from "../../../Base/Table/TableHeaderItem";
const LoansList = ({ status, data }) => {
  return (
    <div className="content-block content-block--padding">
      <div className="content-block__inside">
        <div className="content-block__main content-block__main--padding">
          <div className="content-block__main content-block__main--padding">
            <div className="table-block table-block--big">
              <div className="table-wrapper">
                <table className="table table--loans">
                  <thead className="table-header">
                    <tr className="tr">
                      <TableHeaderItem title="No" />
                      <TableHeaderItem title="Start date" />
                      <TableHeaderItem title="Loan amount" />
                      <TableHeaderItem title="Total amount" />
                      <TableHeaderItem title="Loan period" />
                      {/* <TableHeaderItem title="Interest rate" /> */}
                      <TableHeaderItem title="Finance Fee" />
                      <TableHeaderItem title="Origination Fee" />
                      <td className="td" />
                    </tr>
                  </thead>
                  <tbody className="table-body">
                    {status === "all" &&
                      data?.map((e) => <LoansListItem key={e.id} data={e} />)}
                    {status === "active" &&
                      data
                        .filter(
                          (e) =>
                            // e?.status === "active" ||
                            // e?.status === "initialized"
                            e?.status === "active"
                        )
                        .map((e) => <LoansListItem key={e.id} data={e} />)}
                    {status === "archive" &&
                      data
                        .filter(
                          (e) =>
                            e?.status === "closed" || e?.status === "finished" || e?.status == "tobewithdrawals"
                        )
                        .map((e) => <LoansListItem key={e.id} data={e} />)}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoansList;