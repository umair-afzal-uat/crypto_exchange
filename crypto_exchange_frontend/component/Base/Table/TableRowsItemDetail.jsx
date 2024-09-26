import classNames from "classnames";
import moment from "moment";

const TableRowsItemDetail = ({ data }) => {
  if(data.o_status !== "deffered"){
  return (
    <tr className="tr">
      <ItemRow title="Payment No" data={data?.id} />
      <ItemRow title="How much paid" data={`$${data?.amount_usd}`} />
      <ItemRow
        title="Data"
        data={moment(data?.payment_date).format("MM/DD/YYYY")}
      />
      <ItemRow
        title="Status"
        data={data?.o_status == 'deffered'? "deffered" : data?.status === "paid" ? "payed" : "not payed"}
      />
    </tr>
  );
  }
  else {
  return(
<></>
  )
  }
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
