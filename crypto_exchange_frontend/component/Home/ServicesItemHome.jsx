const ServicesItemHome = ({ title, children }) => {
  return (
    <div className="garants-item">
      <div className="garants-item__img">{children}</div>
      <p className="garants-item__desc">{title}</p>
    </div>
  );
};
export default ServicesItemHome;
