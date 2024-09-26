import TableRowsItem from "../../Base/Table/TableRowsItem";
import moment from "moment";
const TransactionHistoryListItem = ({ dataHistory }) => {
  const { amount, payment_system, created_at, status , user} = dataHistory;
  return (
    <tr className="tr">
      <TableRowsItem title="Amount" data={`BTC ${amount}`} />
      <TableRowsItem title="Crypto Wallet Address" data={`${user?.wallet?.address}`} />
      {/*<TableRowsItem
        title="Payment method"
        data={payment_system === "Plisio" ? "Pay with Crypto" : "Other method"}
      />*/}
      <TableRowsItem
        title="Date"
        data={moment(created_at).format("MM/DD/YYYY")}
      />
    {/*  <TableRowsItem
        title="Status"
        data={status === "completed" ? "confirmed" : "pending"}
      />*/}
    </tr>
  );
};
export default TransactionHistoryListItem;
