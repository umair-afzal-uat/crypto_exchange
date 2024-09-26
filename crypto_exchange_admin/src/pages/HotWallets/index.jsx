import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AppLayout from "../../components/AppLayout";
import { getHotWallets, setHotWallets } from "../../redux/hotWallets/action";
import Pagination from "../../components/Base/Pagination";
import { HandleModal } from "../../redux/modal/actions";
import moment from "moment";

const HotWallets = () => {
  const dispatch = useDispatch();
  const { wallet, transactions } = useSelector((state) => state.hotWallet);
  const [isRead, setIsRead] = useState("readonly");
  const ref = useRef(null);
  const [value, setValue] = useState(null);

  const [page, setPage] = useState(1);
  const {
    push,
    location: { pathname },
  } = useHistory();

  useEffect(() => {
    dispatch(getHotWallets());
  }, []);

  useEffect(() => {
    dispatch(getHotWallets(page));
  }, [page]);

  const handleSetPage = ({ selected }) => {
    setPage(selected + 1);
    push(`${pathname}?page=${selected + 1}`);
  };

  const openModalDeposit = () => {
    dispatch(
      HandleModal({
        modal: "Deposit",
        modalData: { address: wallet?.address, balance: wallet?.balance },
      })
    );
  };

  const handleReadFalse = () => {
    setIsRead(null);
    ref.current.focus();
    setValue(wallet?.min_withdraw);
  };

  const handleChangeWithdraw = ({ target: { value } }) => {
    setValue(value);
  };

  const send = () => {
    setIsRead("readonly");
    dispatch(setHotWallets({ min_withdraw: value }));
  };
  return (
    <AppLayout>
      <div className="main-content">
        <div className="title-block">
          <p className="title">Hot Wallets</p>
        </div>
        <div className="hot-wallets">
          <div className="table-block">
            <div className="table-wrapper">
              <div className="table table--five">
                <div className="table-header">
                  <div className="tr">
                    <div className="td">
                      <div className="td-name">
                        <p>Currency</p>
                      </div>
                    </div>
                    <div className="td">
                      <div className="td-name">
                        <p>Balance</p>
                      </div>
                    </div>
                    <div className="td">
                      <div className="td-name">
                        <p>Action</p>
                      </div>
                    </div>
                    <div className="td">
                      <div className="td-name">
                        <p>Min Withdrawal amount</p>
                      </div>
                    </div>
                    <div className="td">
                      <div className="td-name"></div>
                    </div>
                  </div>
                </div>
                <div className="table-body">
                  <div className="tr">
                    <div className="td">
                      <p className="td-hidden-name">Currency</p>
                      <p>BTC</p>
                    </div>
                    <div className="td">
                      <p className="td-hidden-name">Balance</p>
                      <p>{wallet?.balance}</p>
                    </div>
                    <div className="td">
                      <p className="td-hidden-name">Action</p>
                      <button
                        className="link link--green link--left"
                        onClick={openModalDeposit}
                      >
                        Deposit
                      </button>
                    </div>
                    <div className="td">
                      <p className="td-hidden-name">Min Withdrawal amount</p>
                      <div className="input-wrapper">
                        <input
                          className="input-item hot-wallets__input"
                          type="number"
                          value={value ?? wallet?.min_withdraw}
                          readonly={isRead}
                          ref={ref}
                          onChange={handleChangeWithdraw}
                        />
                      </div>
                    </div>
                    <div className="td td--right td--right-flex">
                      <p className="td-hidden-name"></p>
                      {isRead ? (
                        <button
                          className="edit-btn"
                          type="button"
                          onClick={handleReadFalse}
                        >
                          <svg
                            width="15"
                            height="16"
                            viewBox="0 0 15 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8.28756 2.75001L3.15631 8.18126C2.96256 8.38751 2.77506 8.79376 2.73756 9.07501L2.50631 11.1C2.42506 11.8313 2.95006 12.3313 3.67506 12.2063L5.68756 11.8625C5.96881 11.8125 6.36256 11.6063 6.55631 11.3938L11.6876 5.96251C12.5751 5.02501 12.9751 3.95626 11.5938 2.65001C10.2188 1.35626 9.17506 1.81251 8.28756 2.75001Z"
                              stroke="black"
                              strokeMiterlimit="10"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M7.4313 3.65625C7.70005 5.38125 9.10006 6.7 10.8376 6.875"
                              stroke="black"
                              strokeMiterlimit="10"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M1.87506 14.25H13.1251"
                              stroke="black"
                              strokeMiterlimit="10"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                        </button>
                      ) : (
                        <button className="check-btn " type="button" onClick={send}>
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1.875 8.82812L4.94318 11.875L13.125 3.75"
                              stroke="#53C48A"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section-block">
          <div className="title-block">
            <p className="title title--small">History</p>
          </div>
          <div className="table-block">
            <div className="table-wrapper">
              <div className="table table--history">
                <div className="table-header">
                  <div className="tr">
                    <div className="td">
                      <div className="td-name">
                        <p>ID</p>
                      </div>
                    </div>
                    <div className="td">
                      <div className="td-name">
                        <p>Date</p>
                      </div>
                    </div>
                    <div className="td">
                      <div className="td-name">
                        <p>Coin</p>
                      </div>
                    </div>
                    <div className="td">
                      <div className="td-name">
                        <p>Amount</p>
                      </div>
                    </div>
                    <div className="td">
                      <div className="td-name">
                        <p>Type</p>
                      </div>
                    </div>
                    <div className="td">
                      <div className="td-name">
                        <p>Address to</p>
                      </div>
                    </div>
                    <div className="td">
                      <div className="td-name">
                        <p>Hash</p>
                      </div>
                    </div>
                    <div className="td">
                      <div className="td-name">
                        <p>Address from</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="table-body">
                  {transactions?.data?.map((elem) => (
                    <div className="tr">
                      <div className="td">
                        <p className="td-hidden-name">ID</p>
                        <p>№{elem?.id} </p>
                      </div>
                      <div className="td">
                        <p className="td-hidden-name">Date</p>
                        <p>
                          {moment(new Date(elem?.created_at)).format(
                            "MM/DD/YY"
                          )}
                        </p>
                      </div>
                      <div className="td">
                        <p className="td-hidden-name">Coin</p>
                        <a className="link" href="/">
                          {elem?.code}
                        </a>
                      </div>
                      <div className="td">
                        <p className="td-hidden-name">Amount</p>
                        <p>{elem?.amount}</p>
                      </div>
                      <div className="td">
                        <p className="td-hidden-name">Type</p>
                        <p>{elem?.asset?.type}</p>
                      </div>
                      <div className="td">
                        <p className="td-hidden-name">Address to</p>
                        <p>{elem?.address_to}</p>
                      </div>
                      <div className="td">
                        <p className="td-hidden-name">Hash</p>
                        <p>{elem?.tx_hash}</p>
                      </div>
                      <div className="td">
                        <p className="td-hidden-name">Address from</p>
                        <p>{elem?.address_from}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pagination-block">
          {transactions?.last_page > 1 && (
            <Pagination
              onChange={handleSetPage}
              totalItems={transactions?.total}
              currentPage={page}
              itemsCountPerPage={transactions?.per_page}
            />
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default HotWallets;
