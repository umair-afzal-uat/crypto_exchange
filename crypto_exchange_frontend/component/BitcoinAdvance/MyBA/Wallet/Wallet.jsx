import MyWalletIcon from "../../../Base/icon/MyWalletIcon";
import WalletPayData from "./WalletPayData/WalletPayData";
import WalletData from "./WalletData/WalletData";
import constants from "../../../../services/constants";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoansDataUser } from "../actions";
import { getLoansData } from "../slice";
import { useRouter } from "next/router";
import { handleModal } from "../../../Base/Modal/slice";
const Wallets = () => {
  const { loansData } = useSelector(getLoansData);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    if (!Cookies.get(constants.jwtToken)) {
      router.push("/logIn");
    }
  }, []);
  useEffect(() => {
    if (Cookies.get(constants.jwtToken)) {
      dispatch(getLoansDataUser());
    }
  }, []);
  return (
    <main className="main">
      <div className="main__header">
        <h3 className="section-title">
          <div className="section-title__icon">
            <MyWalletIcon />
          </div>
          <span className="section-title__text">Wallet</span>
        </h3>
        {loansData?.balance > 0 ? 
        <button
          onClick={() =>
            dispatch(
              handleModal({
                modal: "WithdrawalActive",
                modalData: {
                  data: loansData?.balance,
                  min_withdraw: loansData?.min_withdraw,
                },
              })
            )
          }
          type="button"
          className="button wallet-item__withdrawal"
        >
          Withdrawal
        </button>
        : '' }
      </div>
      <div className="main__content">
        <WalletData />
        {loansData?.loans?.length > 0 && (
          <WalletPayData data={loansData.loans} />
        )}
      </div>
    </main>
  );
};
export default Wallets;