import classNames from "classnames";
import moment from "moment";

const TableRowsItemDetail = ({ data }) => {
  return (
    <tr className="tr">
      <ItemRow title="Payment No" data={data?.id} />
      <ItemRow title="How much paid" data={`$${data?.amount_usd}`} />
      <ItemRow
        title="Data"
        data={moment(data?.payment_date).format("DD.MM.YYYY")}
      />
      <ItemRow
        title="Status"
        data={data?.status === "paid" ? "payed" : "not payed"}
      />
    </tr>
  );
};
export default TableRowsItemDetail;

const ItemRow = ({ title, data }) => {
  return (
    <td className="td">
      <p className="td-hidden-name">{title} </p>
      <div
        className={classNames(
          "td-name",
          {
            "td-name--green": data === "payed",
          },
          {
            "td-name--orange": data === "pending",
          },
          {
            "td-name--red": data === "not payed",
          }
        )}
      >
        <p>{data}</p>
      </div>
    </td>
  );
};
