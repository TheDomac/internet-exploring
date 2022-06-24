import styled from "styled-components";
import React, { useState } from "react";
import { motion } from "framer-motion";

import { useToggle } from "../services/useToggle";
import { Input } from "./Input.styled";
import { Form } from "./Form.styled";
import SubmitButton from "./SubmitButton";
import { SolvedBox } from "./SolvedBox.styled";
import Check from "./Check";

const DateForm = styled(Form)`
  display: flex;
  flex-direction: row;
  justify-content: center;

  & > ${Input}, * {
    width: 100%;
    margin-right: 5px;

    &:last-child {
      margin-right: 0;
    }
  }
`;

let daysOptions = [];
for (let i = 1; i <= 31; i++) {
  daysOptions.push(i);
}

const monthsOptions = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const initialDate = {
  place: "",
  day: "",
  month: "",
  year: "",
  hour: "",
  minute: "",
  second: "",
};

const DateInput = ({
  id,
  possibleSolutions,
  isSolved,
  solvedText,
  markAsSolved,
  small,
  stateMaintenanceValue,
  updateMaintenance,
}) => {
  const [date, setDate] = useState(stateMaintenanceValue || initialDate);

  const wrongAnswer = useToggle();

  const triggerWrongAnswer = async () => {
    wrongAnswer.setOn();
    await new Promise((res) => setTimeout(res, 150));
    wrongAnswer.setOff();
  };

  const handleChange = (e) => {
    const newDate = {
      ...date,
      [e.target.name]: e.target.value,
    };

    updateMaintenance(id, newDate);

    setDate(newDate);
  };
  const correctSolution = possibleSolutions.find((possibleSolution) =>
    Object.keys(possibleSolution.value).every((key) => {
      // ignore spaces
      const possibleSolutionValueWithoutSpaces = possibleSolution.value[key]
        .toLowerCase()
        .replace(/\s+/g, "");
      const dateWithoutSpaces = date[key].toLowerCase().replace(/\s+/g, "");

      if (key === "year") {
        // for year ignore dots too
        return (
          possibleSolutionValueWithoutSpaces.replace(/\.+/g, "") ===
          dateWithoutSpaces.replace(/\.+/g, "")
        );
      }

      return possibleSolutionValueWithoutSpaces === dateWithoutSpaces;
    })
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (correctSolution) {
      markAsSolved(id, correctSolution);
    } else {
      triggerWrongAnswer();
    }
  };

  if (isSolved) {
    return (
      <SolvedBox
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        $small={small}
      >
        {solvedText}
        <Check />
      </SolvedBox>
    );
  }

  return (
    <DateForm
      $isWrongAnswer={wrongAnswer.isOn}
      onSubmit={handleSubmit}
      $small={small}
    >
      {possibleSolutions[0].value.place && (
        <Input
          type="text"
          name="place"
          placeholder="Place"
          onChange={handleChange}
          value={date.place}
          $small={small}
        />
      )}
      {possibleSolutions[0].value.day && (
        <Input
          as="select"
          $small={small}
          value={date.day}
          onChange={handleChange}
          name="day"
        >
          <option value="" disabled>
            Day
          </option>
          {daysOptions.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </Input>
      )}
      {possibleSolutions[0].value.month && (
        <Input
          as="select"
          $small={small}
          value={date.month}
          style={{ minWidth: "86px" }}
          onChange={handleChange}
          name="month"
        >
          <option value="" disabled>
            Month
          </option>
          {monthsOptions.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </Input>
      )}
      {possibleSolutions[0].value.year && (
        <Input
          type="text"
          name="year"
          placeholder="Year"
          onChange={handleChange}
          value={date.year}
          $small={small}
        />
      )}
      {possibleSolutions[0].value.hour && (
        <Input
          type="text"
          name="hour"
          placeholder="Hour"
          onChange={handleChange}
          value={date.hour}
          $small={small}
        />
      )}
      {possibleSolutions[0].value.minute && (
        <Input
          type="text"
          name="minute"
          placeholder="Minute"
          onChange={handleChange}
          value={date.minute}
          $small={small}
        />
      )}
      {possibleSolutions[0].value.second && (
        <Input
          type="text"
          name="second"
          placeholder="Second"
          onChange={handleChange}
          value={date.second}
          $small={small}
        />
      )}
      <SubmitButton small={small} isStatic isBorderShown />
    </DateForm>
  );
};

export default DateInput;
