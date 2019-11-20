import React, { useState, useEffect } from "react";
import styled from "styled-components";

import * as styles from "../styles";
import RunInputTitle from "./shared/RunInputTitle";
import moment from "moment";

const monthsAndDays = [
  { Jan: { val: 1, days: 31 } },
  { Feb: { val: 2, days: 28 } },
  { Mar: { val: 3, days: 31 } },
  { Apr: { val: 4, days: 30 } },
  { May: { val: 5, days: 31 } },
  { Jun: { val: 6, days: 30 } },
  { Jul: { val: 7, days: 31 } },
  { Aug: { val: 8, days: 31 } },
  { Sep: { val: 9, days: 30 } },
  { Oct: { val: 10, days: 31 } },
  { Nov: { val: 11, days: 30 } },
  { Dec: { val: 12, days: 31 } }
];

const validYears = () => {
  let years = [];
  for (var i = 1970; i <= 2070; i++) {
    years.push(i);
  }

  return years;
};

const currentMonthInfo = month => {
  return monthsAndDays.find(
    currentMonth => Object.keys(currentMonth)[0] === month
  )[month];
};

const daysForMonth = month => {
  const selectedMonthInfo = currentMonthInfo(month);

  const dayCount = selectedMonthInfo.days;
  return [...Array(dayCount).keys()].map(num => (num += 1));
};

const DateInputs = ({ dateSetter }) => {
  const [day, setDay] = useState(moment().format("DD"));
  const [month, setMonth] = useState(moment().format("MMM"));
  const [year, setYear] = useState(moment().format("YYYY"));

  useEffect(() => {
    const monthIndex = currentMonthInfo(month).val;
    const selectedDate = new Date(year, monthIndex - 1, day);
    dateSetter(selectedDate);
  }, [day, month, year, dateSetter]);

  return (
    <DateContainerWrapper>
      <DayWrapper day={day} month={month} setDay={setDay} />
      <MonthWrapper month={month} setMonth={setMonth} />
      <YearWrapper year={year} setYear={setYear} />
    </DateContainerWrapper>
  );
};

export default DateInputs;

const DayWrapper = ({ day, month, setDay }) => {
  const days = daysForMonth(month);
  return (
    <DateContainer>
      <RunInputTitle>Day</RunInputTitle>
      <>
        <DateInput
          placeholder={day}
          onChange={event => {
            setDay(event.target.value);
          }}
          type="number"
          value={day}
        >
          {days.map(day => (
            <option key={day}>{day}</option>
          ))}
        </DateInput>
      </>
    </DateContainer>
  );
};

const MonthWrapper = ({ month, setMonth }) => {
  return (
    <DateContainer>
      <RunInputTitle>Month</RunInputTitle>
      <>
        <DateInput
          placeholder="Nov"
          onChange={event => setMonth(event.target.value)}
          type="text"
          value={month}
        >
          {monthsAndDays.map(mapping => (
            <option key={mapping[Object.keys(mapping)[0]]["val"]}>
              {Object.keys(mapping)[0]}
            </option>
          ))}
        </DateInput>
      </>
    </DateContainer>
  );
};

const YearWrapper = ({ year, setYear }) => {
  return (
    <DateContainer>
      <RunInputTitle>Year</RunInputTitle>
      <DateInput
        placeholder={2019}
        onChange={event => setYear(event.target.value)}
        type="number"
        value={year}
      >
        {validYears().map(year => (
          <option key={year}>{year}</option>
        ))}
      </DateInput>
    </DateContainer>
  );
};

const DateContainerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 70px;
`;

const DateContainer = styled.div`
  margin-right: 20px;
`;

const DateInput = styled.select`
  height: 45px;
  width: 60px;
  font-size: 16px;
  font-weight: bold;
  text-align: right;
  padding-right: 10px;
  box-shadow: ${styles.boxShadow};
  border-style: none;
  -webkit-appearance: textfield;
  border-radius: 0px;
  color: ${styles.textColor};
  cursor: pointer;

  &:focus {
    outline: 0;
  }

  &:active {
    outline: 0;
  }

  @media (max-width: 420px) {
    -webkit-appearance: none;
  }
`;
