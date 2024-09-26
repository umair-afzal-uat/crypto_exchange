import BAWrapperIcon from "../../Base/icon/BAWrapperIcon";
import BAData from "./BAData/BAData";
import BASummary from "./BASummary/BASummary";
import { useEffect } from "react";
import Cookies from "js-cookie";
import constants from "../../../services/constants";
import { useRouter } from "next/router";
const BABase = () => {
  const router = useRouter();
  useEffect(() => {
    if (!Cookies.get(constants.jwtToken)) {
      router.push("/logIn");
    }
  }, []);
  return (
    <main className="main">
      <h3 className="section-title">
        <div className="section-title__icon">
          <BAWrapperIcon />
        </div>
        <span className="section-title__text">Bitcoin Advance</span>
      </h3>
      <div className="main__content">
        <div className="content-row content-row--stretch">
          <BAData />
          <BASummary />
        </div>
      </div>
    </main>
  );
};
export default BABase;