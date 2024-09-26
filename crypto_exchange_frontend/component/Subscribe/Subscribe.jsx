import ArrowRight from "../Base/icon/ArrowRight";

const Subscribe = ({ t }) => {
  return (
    <div className="footer__side-content">
      <form className="subscribe-form">
        <div className="input input--margin-none">
          <label>
            <div className="input-wrapper">
              <input
                className="input-item input-item--dark input-item--big"
                type="email"
                placeholder={t("layout.subscribePlaceholder")}
              />
              <button className="button button--square button--gradient subscribe-form__btn">
                <ArrowRight />
              </button>
            </div>
          </label>
        </div>
      </form>
    </div>
  );
};
export default Subscribe;
