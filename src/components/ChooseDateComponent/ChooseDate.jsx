import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ChooseDate({ date, setDate, minDate = 0 }) {
  return (
    <DatePicker
      selected={date}
      onChange={(date) => {
        const changedDate = new Date(date);
        setDate(changedDate);
      }}
      value={date}
      minDate={minDate}
    />
  );
}

export default ChooseDate;
