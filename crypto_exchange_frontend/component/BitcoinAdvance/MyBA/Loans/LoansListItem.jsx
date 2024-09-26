import Link from "next/link";
import TableRowsItem from "../../../Base/Table/TableRowsItem";
import moment from "moment";
const LoansListItem = ({ data }) => {
  const { id, created_at, loaned_in_btc, loaned_in_usd, periods, fee, rate, total_amount_usd,no_of_weeks} =
    data;
  return (
    <tr className="tr">
      <TableRowsItem title="No" data={id} />
      <TableRowsItem
        title="Start date"
        data={moment(created_at).format("MM/DD/YYYY")}
      />
      <TableRowsItem title="Loan amount" data={`BTC ${loaned_in_btc}`} />
      {/* <TableRowsItem title="Total amount" data={`USD ${loaned_in_usd}`} /> */}
      <TableRowsItem title="Total amount" data={`USD ${total_amount_usd}`} />
      <TableRowsItem title="Loan period" data={`${no_of_weeks} weeks`} />
      <TableRowsItem title="Finance Fee" data={`${fee}%`} />
      <TableRowsItem title="Origination Fee" data="10 USD" />     
      <td className="td">
        <p className="td-hidden-name" />
        <div className="td-name">
          <Link href={`/myLoans/${id}`}>
            <button type="button" className="link link--green">
              Details
            </button>
          </Link>
        </div>
      </td>
    </tr>
  );
};
export default LoansListItem;
