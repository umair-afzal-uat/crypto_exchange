import PreloaderIcon from "../../Base/icon/PreloaderIcon";

const PreLoader = () => {
  return (
    <div className="popup-window">
      <div className="popup-window__inside">
        <div className="preloader">
          <div className="preloader-img">
            <PreloaderIcon />
          </div>
          <div className="preloader-progress">
            <span className="preloader-progress__success" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreLoader;
