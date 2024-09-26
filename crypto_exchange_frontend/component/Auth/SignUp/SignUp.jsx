import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation } from "swiper/core";
import SingUpData from "./SingUpData";
import SingUpPassword from "./SingUpPassword";
import { withTranslation } from "../../../services/i18n";
SwiperCore.use([Pagination, Navigation]);
const SingUp = ({ t }) => {
  return (
    <div className="auth">
      <h1 className="auth__title">{t("auth:singUp")}</h1>
      <Swiper
        className="auth-slider"
        spaceBetween={60}
        slidesPerView={1}
        autoHeight={true}
        allowTouchMove={false}
        pagination={{
          clickable: true,
           el: ".auth-pagination",
        }}
        navigation={{
          nextEl: ".nextStep",
        }}
      >
        <SwiperSlide>
          <SingUpData t={t} />
        </SwiperSlide>
        <SwiperSlide>
          <SingUpPassword t={t} />
        </SwiperSlide>
        <div className="auth-pagination" />
      </Swiper>
    </div>
  );
};
export default withTranslation(["auth"])(SingUp);
