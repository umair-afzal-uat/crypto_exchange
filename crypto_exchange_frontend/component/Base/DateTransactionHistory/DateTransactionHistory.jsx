import MaskedInput from "react-text-mask";
import DatePicker from "react-datepicker";
import moment from "moment";
import CalendarIcon from "../icon/CalendarIcon";
const DateTransactionHistory = ({ data, setData, id }) => {
  return (
    <div className="input-wrapper input-wrapper--flex">
      <MaskedInput
        mask={[/\d/, /\d/, ".", /\d/, /\d/, ".", /\d/, /\d/, /\d/, /\d/]}
        guide={false}
        value={moment(data).format("MM/DD/YYYY")}
        className="input-item input-item--width-auto input-item--right-icon"
        type="text"
      />
      <DatePicker
        id={id}
        className="custom-input-ref"
        dateFormat="MM/DD/YYYY"
        onChange={(value) => setData(value)}
        peekNextMonth={false}
        showMonthDropdown={true}
        showYearDropdown={true}
        dropdownMode="select"
        shouldCloseOnSelect={true}
        maxDate={new Date()} 
        
      />
      <div className="input-icon input-icon--right">
        <label className="custom-input-label" htmlFor={id}>
          <CalendarIcon />
        </label>
      </div>
    </div>
  );
};
export default DateTransactionHistory;
