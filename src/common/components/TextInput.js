import React, { useState } from "react";
import { motion } from "framer-motion";

import { Form } from "./Form.styled";
import { Input } from "./Input.styled";
import { useToggle } from "../services/useToggle";
import { SolvedBox } from "./SolvedBox.styled";
import Check from "./Check";
import SubmitButton from "./SubmitButton";

const TextInput = ({
  placeholder,
  autoFocus,
  id,
  possibleSolutions,
  small,
  isSolved,
  solvedText,
  markAsSolved,
  stateMaintenanceValue,
  updateMaintenance = () => {},
}) => {
  const [value, setValue] = useState(stateMaintenanceValue || "");

  const wrongAnswer = useToggle();

  const triggerWrongAnswer = async () => {
    wrongAnswer.setOn();
    await new Promise((res) => setTimeout(res, 150));
    wrongAnswer.setOff();
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    updateMaintenance(id, e.target.value);
  };

  const correctSolution = possibleSolutions.find(
    (s) =>
      s.value.toLowerCase().replace(/\s+/g, "") ===
      value.toLowerCase().replace(/\s+/g, "") // regex for removing spaces
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
    <Form
      $isWrongAnswer={wrongAnswer.isOn}
      onSubmit={handleSubmit}
      $small={small}
    >
      <Input
        type="text"
        autoComplete="off"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        autoFocus={autoFocus}
        name="value"
        $small={small}
      />
      <SubmitButton small={small} />
    </Form>
  );
};

export default TextInput;
