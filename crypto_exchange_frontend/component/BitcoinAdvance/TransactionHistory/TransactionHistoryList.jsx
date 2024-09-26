import TableHeaderItem from "../../Base/Table/TableHeaderItem";
import TransactionHistoryListItem from "./TransactionHistoryListItem";
const TransactionHistoryList = ({ data }) => {
  return (
    <div className="table-block table-block--big">
      <div className="table-wrapper">
        <table className="table table--wallet">
          <thead className="table-header">
            <tr className="tr">
              <TableHeaderItem title="Amount" />
              <TableHeaderItem title="Crypto Wallet Address" />
              {/*<TableHeaderItem title="Payment method" />*/}
              <TableHeaderItem title="Date" />
              {/*<TableHeaderItem title="Status" />*/}
            </tr>
          </thead>
          <tbody className="table-body">
            {data?.map((e) => (
              <TransactionHistoryListItem key={e.id} dataHistory={e} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default TransactionHistoryList;
