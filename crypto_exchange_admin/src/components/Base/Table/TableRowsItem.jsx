import classNames from "classnames";

const TableRowsItem = ({ title, data }) => {
  return (
    <td className="td">
      <p className="td-hidden-name">{title}</p>

      <div
        className={classNames(
          "td-name",
          {
            "td-name--orange": data === "pending",
          },
          {
            "td-name--green": data === "confirmed",
          }
        )}
      >
        <p>{data}</p>
      </div>
    </td>
  );
};
export default TableRowsItem;
