import TableRowsItem from "../../Base/Table/TableRowsItem";
import moment from "moment";
import { round } from "../../../services/service";

const AffiliateProgramList = ({ data }) => {
  const { user } = data;
  return (
    <>
      {
        user !== null  ? (
          <tr className="tr">
            <TableRowsItem
              title="Users"
              data={`${user?.first_name} ${user?.last_name}`}
            />
          <TableRowsItem
            title="Advance Amount"
            data = {
              user?.first_loan?.loanperiod[0]?.amount_usd_paid && user?.first_loan?.loaned_in_btc
              ? `${round(user?.first_loan?.loaned_in_usd, 2)} USD`: "" }
          />
          <TableRowsItem
            title="Commision (2.5%)"
            data={
              user?.first_loan?.loanperiod[0]?.amount_usd_paid && user?.first_loan?.amount_btc_reward
                ? `${round(user?.first_loan?.amount_btc_reward, 2)} USD`
                : ""
            }
          />
          <TableRowsItem
            title="Reward Date"
            data={
              user?.first_loan?.loanperiod[0]?.amount_usd_paid && user?.first_loan?.referral_payment?.updated_at
                ? moment(user?.first_loan?.referral_payment?.updated_at).format(
                    "MM/DD/YYYY"
                  )
                :user?.first_loan?.loanperiod[0]?.amount_usd_paid && user?.first_loan?.last_loan_period?.payment_date
                ? moment(
                  user?.first_loan?.loanperiod[0]?.amount_usd_paid && user?.first_loan?.last_loan_period?.payment_date
                  ).format("MM/DD/YYYY")
                : ""
            }
          />
        </tr>
      ) : (
        ""
      )}
    </>
  );
};
export default AffiliateProgramList;
