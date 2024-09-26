import Head from "next/head";
import Modal from "../component/Base/Modal/Modal";
import constants from "../services/constants";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { axiosInterceptors } from "../services/axiosInterceptors";
import { setAuthorizationToken } from "../services/service";
import store from "../redux/store";
import ReactNotification from "react-notifications-component";
import Cookies from "js-cookie";
import { appWithTranslation } from "../services/i18n";
import "../public/styles/styles.min.css";
import "react-notifications-component/dist/theme.css";

const MyApp = ({ Component, pageProps }) => {
  const jwtToken = Cookies.get(constants.jwtToken);
  useEffect(() => {
    axiosInterceptors();
  }, []);
  if (jwtToken) {
    setAuthorizationToken(jwtToken);
  }

  return (
    <>
      <Head>
        <title>Crypto.Exchange</title>
        <meta name="theme-color" content="#fff" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/images/general/faviconBTCreditWeb.ico" />
        <script src="//code.tidio.co/y6glh7zejhc0381ant6qembe5lo8ruk2.js" async></script>
        <script defer data-domain="Crypto.Exchange" src="https://plausible.io/js/plausible.js"></script>
      </Head>
      <Provider store={store}>
        <Modal />
        <ReactNotification />
        <div className="wrapper">
          <div className="content">
            <Component {...pageProps} />
          </div>
        </div>
      </Provider>
    </>
  );
};

export default appWithTranslation(MyApp);
