import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../../components/AppLayout";
import { getLoanDetail } from '../../redux/transactions/action'
import Pagination from "../../components/Base/Pagination";
import { useHistory } from "react-router-dom";
import { HandleModal } from '../../redux/modal/actions';
import moment from 'moment';
import { useParams } from 'react-router-dom';
  const MissedPayments = () => {
  const data = useSelector((state) => state.transactions);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    push,
    location: { pathname },
  } = useHistory();
  useEffect(() => {
    dispatch(getLoanDetail(id));
  }, [dispatch]);
  const handleSetPage = ({ selected }) => {
    setPage(selected + 1);
    push(`${pathname}?page=${selected + 1}`);
  };
  const navigateToRoute = (route) => {
    push(route)
  }
  return (
    <AppLayout>
      <div className="title-block">
        <p className="title">Loan Detail</p>
      </div>
      <div className="table-block">
        <div className="table-wrapper">

          <table style={{ width: '100%' }}>
            <tr>
              <th>ID </th>
              <th>User ID</th>
              <th>Loan in BTC</th>
              <th>Loan in USD</th>
              <th>Total Amount USD</th>
              <th>Fee</th>
              <th>Periods</th>
              <th>Rate</th>
              <th>Weekly Payment</th>
              <th>Status</th>
            </tr>
            {data && data.data ?
              <tr>
                <td>{data.data?.id}</td>
                <td>{data.data?.user_id}</td>
                <td> {data.data?.loaned_in_btc}</td>
                <td> {data.data?.loaned_in_usd}</td>
                <td> {data.data?.total_amount_usd}</td>
                <td> {data.data?.fee}</td>
                <td> {data.data?.periods}</td>
                <td> {data.data?.rate}</td>
                <td> {data.data?.weekly_payment}</td>
                <td> {data.data?.status}</td>
              </tr>
              :
              <div>No Data Found</div>
            }
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
    </AppLayout>
  );
};
export default MissedPayments;