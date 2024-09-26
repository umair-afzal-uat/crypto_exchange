const SocialLinkItem = ({ link, children }) => {
  return (
    <a target="_blank" href={link} className="button social__link">
      <div className="social__icons">{children}</div>
    </a>
  );
};
export default SocialLinkItem;
