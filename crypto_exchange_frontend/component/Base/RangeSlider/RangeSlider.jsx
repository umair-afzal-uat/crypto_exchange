import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useEffect } from "react";
import { getPeriod } from "../../BitcoinAdvance/BABase/actions";
import { useDispatch, useSelector } from "react-redux";
import { getStateCredit } from "../../BitcoinAdvance/BABase/slice";

const RangeSlider = ({ setPeriodRange }) => {
  const dispatch = useDispatch();
  const { periods } = useSelector(getStateCredit);
  const periodData = periods.filter((e) => e.value).map((e) => e.value);
  const periodRange = periodData.reduce((result, item) => {
    result[item] = item;
    return result;
  }, {});
  useEffect(() => {
    dispatch(getPeriod());
  }, []);

  return (
    <Slider
      style={{ maxWidth: "300px" }}
      min={Math.min(...periodData)}
      max={Math.max(...periodData)}
      onChange={(value) => setPeriodRange(value)}
      marks={periodRange}
      step={null}
      defaultValue={Math.min(...periodData)}
      dotStyle={{ display: "none" }}
      railStyle={{ height: "8px" }}
      trackStyle={{ height: "8px", background: "#53C48A" }}
      handleStyle={{
        height: "20px",
        width: "20px",
        background: "#53C48A",
        border: "solid 2px #53C48A",
      }}
    />
  );
};
export default RangeSlider;
