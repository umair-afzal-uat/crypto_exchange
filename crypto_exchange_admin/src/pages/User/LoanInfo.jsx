import { HandleModal } from '../../redux/modal/actions';
import LoansList from "../Loans/LoansList";
import LoansEmpty from "../Loans/LoansEmpty";
import Pagination from '../../components/Base/Pagination';
import { useHistory } from 'react-router-dom';
import classNames from "classnames";
import AppLayout from "../../components/AppLayout";
import { useEffect, useState } from 'react';
import { getLoansListAllUser, getLoansListActiveUser, getLoansListOldUser } from "../../redux/loans/actions";
import { useDispatch, useSelector } from "react-redux";
const LoanInfo = (props) => {


  const { user_loan } = useSelector(state => state);
  const [active, setActive] = useState("all");
  const [loader, setLoader] = useState(true)


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLoansListAllUser(parseInt(props.match.params.slug)));
  }, []);

  const openLoanData = () => {
    dispatch(getLoansListActiveUser(parseInt(props.match.params.slug)));
  }
  const closeLoanData = () => {
    dispatch(getLoansListOldUser(parseInt(props.match.params.slug)));
  }
  const AllLoanData = () => {
    dispatch(getLoansListAllUser(parseInt(props.match.params.slug)));
  }
  useEffect(() => {
    if (user_loan.data) {
        setLoader(false)
    }
}, [user_loan])

  return (
    <AppLayout>
{ loader ? <div className="full-loader">
				<div className="lds-facebook"><div></div><div></div><div></div></div>
			</div> :
			<>
      <div className="title-block">
        <p className="title">User Loan Info</p>
      </div>
      <div className="main__content">
        <div className="tabs">
          <div className="main__content-header">
            <ul className="tabs-nav">
              <li
                onClick={() => setActive("all")}
                className={classNames("tabs-nav__item", {
                  active: active === "all",
                })}
              >
                <button className="tabs-nav__btn" onClick={() => AllLoanData('old')} >Default</button>
              </li>
              <li
                onClick={() => setActive("active")}
                className={classNames("tabs-nav__item", {
                  active: active === "active",
                })}
              >
                <button
                  className="tabs-nav__btn"
                  onClick={() => openLoanData('open')}
                >Open</button>
              </li>
              <li
                onClick={() => setActive("archive")}
                className={classNames("tabs-nav__item", {
                  active: active === "archive",
                })}
              >
                <button className="tabs-nav__btn"
                  onClick={() => closeLoanData('old')}
                >Closed</button>
              </li>
              
            </ul>
          </div>
          <div className="tabs__content">


            {user_loan && user_loan.data ? (
              <LoansList status={active} data={user_loan.data} />
            ) : (
              <LoansEmpty />
            )}

          </div>
        </div>
      </div>
</>
}
    </AppLayout>
  );
};

export default LoanInfo;
