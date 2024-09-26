import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../../components/AppLayout";
import { getMissedTransactions } from '../../redux/transactions/action'
import Pagination from "../../components/Base/Pagination";
import { useHistory } from "react-router-dom";
import { HandleModal } from '../../redux/modal/actions';
import moment from 'moment';

const LoanDetail = () => {
  const { data } = useSelector((state) => state.transactions);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(true)

  const dispatch = useDispatch();
  const {
    push,
    location: { pathname },
  } = useHistory();
  useEffect(() => {
    dispatch(getMissedTransactions());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setLoader(false)
    }
  }, [data])
  const handleSetPage = ({ selected }) => {
    setPage(selected + 1);
    push(`${pathname}?page=${selected + 1}`);
  };

  const navigateToRoute = (route) => {
    push(route)
  }




  return (
    <AppLayout>
       {loader ? <div className="full-loader">
        <div className="lds-facebook"><div></div><div></div><div></div></div>
      </div> :
        <>

      <div className="title-block">
        <p className="title">Missed Payments</p>
      </div>
      <div className="table-block">
        <div className="table-wrapper">

          <table style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>ID </th>
                <th>Loan ID</th>
                <th>Amount USD</th>
                <th>Amount USD Paid</th>
                <th>Down Period</th>
                <th>Fee Period Amount</th>
                <th>Payment Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data && data.data ? data.data.map((elem, index) =>
                <tr>
                  <td>{elem?.id}</td>
                  <td>{elem?.loan_id}</td>
                  <td> {elem?.amount_usd}</td>
                  <td> {elem?.amount_usd_paid}</td>
                  <td> {elem?.down_period}</td>
                  <td> {elem?.fee_period_amount}</td>
                  <td> {moment(new Date(elem?.payment_date)).format("MM/DD/YYYY")}</td>
                  <td> {elem?.status}</td>
                  <td> <button
                    className="button button--smallest"
                    onClick={() => navigateToRoute(`/loan-detail/${elem?.loan_id}`)}
                  >View Payment</button></td>
                </tr>
              ) :
              <tr className="not-found"><td colSpan="9">No Data Found</td></tr>
              }
            </tbody>
          </table>


          {/* <div className="table table--loans_list">
            <div className="table-header">
              <div className="tr">
                <div className="td">
                  <div className="td-name">
                    <p>ID</p>
                  </div>
                </div>
                <div className="td">
                  <div className="td-name">
                    <p>Question</p>
                  </div>
                </div>
                <div className="td">
                  <div className="td-name">
                    <p>Display Order</p>
                  </div>
                </div>
                <div className="td">
                  <div className="td-name">
                    <p>Status</p>
                  </div>
                </div>
                <div className="td">
                  <div className="td-name">
                    <p>Action</p>
                  </div>
                </div>


              </div>
            </div>
            <div className="table-body">
              {data && data.data.length > 0 ? data.data.map((elem, index) =>
                <div className="tr" key={index}>
                  <div className="td">
                    <p className="td-hidden-name">ID</p>
                    <p>{elem?.id}</p>
                  </div>
                  <div className="td">
                    <p className="td-hidden-name">Question</p>
                    <p>
                      {elem?.question}

                    </p>
                  </div>
                  <div className="td">
                    <p className="td-hidden-name">Display Order</p>

                    {elem?.display_order}

                  </div>
                  <div className="td">
                    <p className="td-hidden-name">Status</p>
                    <p>
                      {elem?.status === 1 ? "Active" : "Inactive"}
                    </p>
                  </div>
                  <div className="td">
                    <p className="td-hidden-name">Action</p>
                    <p>
                      <button onClick={() =>
                        dispatch(
                          HandleModal({
                            modal: "FaqAdd",
                            modalData: {
                              title: 'Edit Faq',
                              question: 'Question',
                              answer: 'Answer',
                              displayOrder: 'Display Order',
                              status: 'Active',
                              action: 'Update',
                              typeAction: 'editFaq',
                              faqData: elem
                            },
                          })
                        )
                      }
                        type="button"
                        className="button wallet-item__withdrawal"
                      >
                        Edit Faq
                      </button>
                    </p>
                    <p>
                      <button
                        className="button button--smallest"
                        onClick={() => deleteFaqMethod(elem.id)}
                      >Delete</button>
                    </p>
                  </div>
                </div>
              ) :
                <div className="tr">No Data Found</div>
              }
            </div>
          </div> */}
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
    </>
}

    </AppLayout>
  );
};

export default LoanDetail;
