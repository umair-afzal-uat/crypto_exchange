const TransactionHistoryEmptyList = () => {
  return (
    <div className="data-empty">
      <div className="data-empty__img">
        <img src="images/content/note-remove.svg" alt="" />
      </div>
      <p className="data-empty__text">
        No transactions found.
        <span className="data-empty__text data-empty__text--regular">
          Try to adjust your filters.
        </span>
      </p>
    </div>
  );
};
export default TransactionHistoryEmptyList;