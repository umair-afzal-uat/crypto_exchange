const ItemSummary = ({ title, data }) => {
  return (
    <li className="info-list__item">
      <div className="d-flex"><span className="info-list__title">{title}</span>
      {title=="Bitcoin Advance Amount"?<div title="" className="HW-20"><span>?</span></div>:""}</div>
      <span className="info-list__desc">{data}</span>
    </li>
  );
};
export default ItemSummary;
