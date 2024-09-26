const BtnAuth = ({ title, addClass, ...props }) => {
  return (
    <button
      className={`button button--black button--full-width ${addClass}`}
      type="submit"
      {...props}
    >
      {title}
    </button>
  );
};

export default BtnAuth;
