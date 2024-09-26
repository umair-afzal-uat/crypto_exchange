import './App.css';
import { Suspense } from 'react';
import { Switch } from 'react-router-dom';
import NotAuthWrap from './components/Base/NotAuthWrap';
import routes from './routes';
import AuthWrapper from './components/Base/AuthWrapper';
import { useSelector } from 'react-redux';

function App() {
  const { isLoading } = useSelector(state => state.auth);
  return (
    <Suspense fallback={<></>}>
      <Switch>
        <NotAuthWrap
          path={routes.Auth.path}
          component={routes.Auth.component}
          exact
        />
        <AuthWrapper
          path={routes.UserManagement.path}
          component={routes.UserManagement.component}
          exact
        />
        <AuthWrapper
          path={routes.WaitList.path}
          component={routes.WaitList.component}
          exact
        />
        <AuthWrapper
          path={routes.TransactionsManagement.path}
          component={routes.TransactionsManagement.component}
          exact
        />
        <AuthWrapper
          path={routes.LoansManagement.path}
          component={routes.LoansManagement.component}
          exact
        />
        <AuthWrapper
          path={routes.WithdrawalsManagement.path}
          component={routes.WithdrawalsManagement.component}
          exact
        />
        <AuthWrapper
          path={routes.FeeManagement.path}
          component={routes.FeeManagement.component}
          exact
        />
        <AuthWrapper
          path={routes.Settings.path}
          component={routes.Settings.component}
          exact
        />
        <AuthWrapper
          path={routes.ReferralManagement.path}
          component={routes.ReferralManagement.component}
          exact
        />
        <AuthWrapper
          path={routes.HotWallets.path}
          component={routes.HotWallets.component}
          exact
        />
        <AuthWrapper
          path={routes.CompleteProfile.path}
          component={routes.CompleteProfile.component}
        />
        <AuthWrapper
          path={routes.LoanInfo.path}
          component={routes.LoanInfo.component}
        />
        <AuthWrapper
          path={routes.Payments.path}
          component={routes.Payments.component}
        />
        <AuthWrapper
          path={routes.Payments2.path}
          component={routes.Payments2.component}
        />
        {/* <AuthWrapper
          path={routes.Faqs.path}
          component={routes.Faqs.component}
          exact
        /> */}
        <AuthWrapper
          path={routes.MissedPayments.path}
          component={routes.MissedPayments.component}
          exact
        />
        <AuthWrapper
          path={routes.LoanDetail.path}
          component={routes.LoanDetail.component}
          exact
        />
      </Switch>
    </Suspense>
  );
}

export default App;
