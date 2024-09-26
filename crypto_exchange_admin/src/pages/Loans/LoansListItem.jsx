import { NavLink } from "react-router-dom";
import TableRowsItem from '../../components/Base/Table/TableRowsItem';
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { markCompleted } from '../../redux/loans/actions'


const LoansListItem = ({ data }) => {

  const { id, user_id, created_at, loaned_in_btc, loaned_in_usd, periods, fee, rate } =
    data;

  const dispatch = useDispatch();

  const markCompletedMethod = (id) => {
    let payload = { loan_id: id }
    dispatch(markCompleted(payload));
  }


  return (
    <tr className="tr">
      <TableRowsItem title="No" data={id} />
      <TableRowsItem
        title="Start date"
        data={moment(created_at).format("DD.MM.YYYY")}
      />
      <TableRowsItem title="Loan amount" data={`BTC ${loaned_in_btc}`} />
      <TableRowsItem title="Total amount" data={`USD ${loaned_in_usd}`} />
      <TableRowsItem title="Loan period" data={`${periods} week`} />
      <TableRowsItem title="Interest rate" data={`${rate}%`} />
      <TableRowsItem title="Origination Fee" data={`${fee}%`} />
      <button
        className="button button--smallest mark-completed"
        onClick={() => markCompletedMethod(id)}
      >Mark as Completed</button>
      {/* <td className="td">
        <p className="td-hidden-name" />
        <div className="td-name">
        <NavLink to={`/user_management/payment_info/${user_id}`}>Payments Info</NavLink>
        </div>
      </td> */}
    </tr>
  );
};

export default LoansListItem;
