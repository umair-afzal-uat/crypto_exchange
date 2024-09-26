import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../../components/AppLayout";
import { getFaqs, deleteFaq } from "../../redux/faqs/actions";
import Pagination from "../../components/Base/Pagination";
import { useHistory } from "react-router-dom";
import { HandleModal } from '../../redux/modal/actions';

const Faqs = () => {
  const { data } = useSelector((state) => state.faqs);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(true)

  const dispatch = useDispatch();
  const {
    push,
    location: { pathname },
  } = useHistory();
  useEffect(() => {
    dispatch(getFaqs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFaqs(page));
  }, [page]);
  useEffect(() => {
    if (data) {
      setLoader(false)
    }
  }, [data])
  const handleSetPage = ({ selected }) => {
    setPage(selected + 1);
    push(`${pathname}?page=${selected + 1}`);
  };

  const deleteFaqMethod = (id) => {
    dispatch(deleteFaq(id));
    dispatch(getFaqs());
  }

  return (
    <AppLayout>

{loader ? <div className="full-loader">
        <div className="lds-facebook"><div></div><div></div><div></div></div>
      </div> :
        <>

      <div className="title-block">
        <p className="title">Faqs</p>
        <button
          onClick={() =>
            dispatch(
              HandleModal({
                modal: "FaqAdd",
                modalData: {
                  title: 'Add Faq',
                  question: 'Question',
                  answer: 'Answer',
                  displayOrder: 'Display Order',
                  status: 'Active',
                  action: 'Save',
                  typeAction: 'addFaq',
                },
              })
            )
          }
          type="button"
          className="button wallet-item__withdrawal"
        >
          Add Faq
        </button>
      </div>

      <div className="table-block">
        <div className="table-wrapper">

          <table style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>ID </th>
                <th>Question</th>
                <th>Display Order</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data && data.data.length > 0 ? data.data.map((elem, index) =>
                <tr key={index}>
                  <td className="faq">{elem?.id}</td>
                  <td><p className="w-200">{elem?.question}</p></td>
                  <td className="faq"> {elem?.display_order}</td>
                  <td className="faq">{elem?.status === 1 ? "Active" : "Inactive"}</td>
                  <td className="faq">
                    <div className="actions-buttons">

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
                          className="button button--smallest wallet-item__withdrawal"
                        >
                          Edit Faq
                        </button>

                        <button
                          className="button--red button--smallest"
                          onClick={() => deleteFaqMethod(elem.id)}
                        >Delete</button>

                    </div>
                  </td>
                </tr>
              ) :
                <tr className="not-found"><td colSpan="5">No Data Found</td></tr>
              }
            </tbody>
          </table>
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

export default Faqs;
