import LoansListItem from "./LoansListItem";
import TableHeaderItem from '../../components/Base/Table/TableHeaderItem';
import { markCompleted } from '../../redux/loans/actions'
import moment from "moment";
const LoansList = ({ status, data }) => {

  return (
    <div className="content-block content-block--padding">
      <div className="content-block__inside">
        <div className="content-block__main content-block__main--padding">
          <div className="content-block__main content-block__main--padding">
            <div className="table-block table-block--big">
              <div className="table-wrapper">
                <table style={{ width: '100%' }}>
                  <thead>
                    <tr>
                      <th>ID </th>
                      <th>Date</th>
                      <th>Loan in BTC</th>
                      <th>Loan in USD</th>
                      <th>Total Amount USD</th>
                      <th>Fee</th>
                      <th>Payments</th>
                      <th>Status</th>
                      <th>Weekly Payment</th>
                      <th>Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data && data.data ? data.data.map((elem, index) =>
                      <tr>
                        <td>{elem?.id}</td>
                        <td> {moment(elem?.created_at).format("MM/DD/YYYY")} </td>
                        <td> {elem?.loaned_in_btc}</td>
                        <td> {elem?.loaned_in_usd}</td>
                        <td> {elem?.total_amount_usd}</td>
                        <td> {elem?.fee}</td>
                        <td> {elem?.periods}</td>
                        <td> {elem?.status == 'active' || elem?.stauts == 'initialized' || elem?.status == 'tobewithdrawals'
                          ? 'Opened' : "Closed"
                        }</td>
                        <td> {elem?.weekly_payment}</td>

                        <td> {elem?.rate}</td>
                      </tr>
                    ) :

                    <tr className="not-found"><td colSpan="10">No Data Found</td></tr>
                    }
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

