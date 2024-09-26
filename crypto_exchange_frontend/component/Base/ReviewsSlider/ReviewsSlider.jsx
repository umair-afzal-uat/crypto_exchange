import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation } from "swiper/core";
import { homeSliderEn } from "../../../services/service";
SwiperCore.use([Navigation, Pagination]);

const ReviewsSlider = () => {
  return (
    <>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={30}
        pagination={{
          el: ".reviews-slider__pagination",
        }}
        navigation={{
          prevEl: ".reviews__prev",
          nextEl: ".reviews__next",
        }}
      >
        {homeSliderEn?.map((e) => (
          <SwiperSlide key={e.id}>
            <div className="swiper-slide reviews-item">
              <div className="reviews-item__img">
                <img src={e.images} alt="" />
              </div>
              <p className="reviews-item__desc">{e.text}</p>
              <span className="link link--green reviews-item__link">
                {e.name}
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        style={{ paddingBottom: "0", paddingTop: "35px" }}
        className="slider-pagination reviews-slider__pagination"
      />
    </>
  );
};

export default ReviewsSlider;
