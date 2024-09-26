import Link from "next/link";
const LoansEmpty = () => {
  return (
    <div className="content-block loans-empty">
      <div className="content-block__inside">
        <div className="content-block__main loans-empty__content">
          <div className="loans-empty__img">
            <img src="images/content/loans-img.svg" alt="" />
          </div>
          <div className="loans-empty__info">
            <h1 className="loans-empty__title">Your First Loan</h1>
            <p className="loans-empty__desc">
              Don't sell crypto assets for cash. Instead, take a crypto-backed
              loan and let them grow. The rest happens automatically.
            </p>
            <div className="loans-empty__footer">
              <Link href={"/bitcoinAdvance"}>
                <a className="button button--regular">Get loan</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoansEmpty;
