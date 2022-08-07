import React, { useEffect, useState } from "react";
import ChooseDate from "../ChooseDateComponent/ChooseDate";

function toUnixConverter(date) {
  return Math.floor(new Date(date).getTime() / 1000);
}

const DateRange = ({ setDateRange }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  startDate.setHours(3, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);

  useEffect(() => {
    const startDateToUnix = toUnixConverter(startDate);
    const endDateToUnix = toUnixConverter(endDate);
    setDateRange([startDateToUnix, endDateToUnix]);
  }, [startDate, endDate, setDateRange]);

  if (startDate > endDate) {
    setEndDate(startDate);
  }

  return (
    <div>
      <div>Start Date:</div>
      <ChooseDate date={startDate} setDate={setStartDate} />
      <div>End Date:</div>
      <ChooseDate date={endDate} setDate={setEndDate} minDate={startDate} />
    </div>
  );
};

export default DateRange;
