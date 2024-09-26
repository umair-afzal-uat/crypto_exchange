import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../../components/AppLayout";
import { getLoans } from "../../redux/loans/actions";
import Pagination from "../../components/Base/Pagination";
import { useHistory } from "react-router-dom";
const LoansManagement = () => {
  const { data } = useSelector((state) => state.loans);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const {
    push,
    location: { pathname },
  } = useHistory();
  useEffect(() => {
    dispatch(getLoans());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getLoans(page));
  }, [page]);
  const handleSetPage = ({ selected }) => {
    setPage(selected + 1);
    push(`${pathname}?page=${selected + 1}`);
  };
  return (
    <AppLayout>
      <div className="title-block">
        <p className="title">Loans Management</p>
      </div>
      <div className="table-block">
        <div className="table-wrapper">
          <div className="table table--loans_list">
            <div className="table-header">
              <div className="tr">
                <div className="td">
                  <div className="td-name">
                    <p>ID</p>
                  </div>
                </div>
                <div className="td">
                  <div className="td-name">
                    <p>Full name</p>
                  </div>
                </div>
                <div className="td">
                  <div className="td-name">
                    <p>E-mail</p>
                  </div>
                </div>
                <div className="td">
                  <div className="td-name">
                    <p>Sum</p>
                  </div>
                </div>
                <div className="td">
                  <div className="td-name">
                    <p>Amount</p>
                  </div>
                </div>
                <div className="td">
                  <div className="td-name">
                    <p>Rate</p>
                  </div>
                </div>
                <div className="td">
                  <div className="td-name">
                    <p>Date</p>
                  </div>
                </div>
                <div className="td">
                  <div className="td-name">
                    <p>Status</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="table-body">
              {data?.data?.map((elem) => (
                <div className="tr">
                  <div className="td">
                    <p className="td-hidden-name">ID</p>
                    <p>№{elem?.id}</p>
                  </div>
                  <div className="td">
                    <p className="td-hidden-name">Full name</p>
                    <p>
                      {elem?.user?.first_name}
                      {elem?.user?.last_name}
                    </p>
                  </div>
                  <div className="td">
                    <p className="td-hidden-name">E-mail</p>
                    <a className="link" href="/">
                      {elem?.user?.email}
                    </a>
                  </div>
                  <div className="td">
                    <p className="td-hidden-name">Sum</p>
                    <p>
                      {elem?.loaned_in_btc}/${elem?.loaned_in_usd}
                    </p>
                  </div>
                  <div className="td">
                    <p className="td-hidden-name">Amount</p>
                    <p>{elem?.total_amount_usd}</p>
                  </div>
                  <div className="td">
                    <p className="td-hidden-name">Rate</p>
                    <p>{elem?.rate}</p>
                  </div>
                  <div className="td">
                    <p className="td-hidden-name">Data</p>
                    <p>{elem?.periods}</p>
                  </div>
                  <div className="td">
                    <p className="td-hidden-name">Status</p>
                    <p className="status status--verified">{elem?.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="pagination-block">
        {data?.last_page > 1 && (
          <Pagination
            onChange={handleSetPage}
            totalItems={data?.total}
            currentPage={page}
            itemsCountPerPage={data?.per_page}
          />
        )}
      </div>
    </AppLayout>
  );
};
export default LoansManagement;
