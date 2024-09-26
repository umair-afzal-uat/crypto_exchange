import PopupArrowIcon from "../icon/PopupArrowIcon";

const PopUpContentItem = ({ children, fnOnClick, title }) => {
  return (
    <button onClick={fnOnClick} className="payment-btn" type="button">
      <div className="payment-btn__icon">{children}</div>
      <span className="payment-btn__text">{title}</span>
      <div className="payment-btn__arrow">
        <PopupArrowIcon />
      </div>
    </button>
  );
};
export default PopUpContentItem;
