import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  RowWrapper,
  WrapperForm,
  ClickableNumber,
  Number,
  InputWrapper,
} from "./index.styled";

import SubmitButton from "../../../SubmitButton";
import { useToggle } from "../../../../services/useToggle";
import { SolvedBox } from "../../../SolvedBox.styled";
import Check from "../../../Check";

const Counter = ({
  solution,
  isNegative,
  dotIndex,
  onFinish,
  solved,
  renderContent,
  isInputShown = true,
  id,
  updateMaintenance,
  stateMaintenanceValue,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(
    stateMaintenanceValue?.selectedIndex || 0
  );
  const [number, setNumber] = useState(
    stateMaintenanceValue?.number || solution.map((n) => null)
  );
  const wrongAnswer = useToggle();

  const triggerWrongAnswer = async () => {
    wrongAnswer.setOn();
    await new Promise((res) => setTimeout(res, 150));
    wrongAnswer.setOff();
  };

  const handleSetNumber = (n) => () => {
    const newNumber = [
      ...number.slice(0, selectedIndex),
      n,
      ...number.slice(selectedIndex + 1),
    ];
    setNumber(newNumber);

    const canGoNextIndex = selectedIndex + 1 <= newNumber.length - 1;

    const newSelectedIndex = canGoNextIndex ? selectedIndex + 1 : selectedIndex;
    setSelectedIndex(newSelectedIndex);
    updateMaintenance(id, {
      selectedIndex: newSelectedIndex,
      number: newNumber,
    });
  };

  const handleSetSelectedIndex = (index) => () => {
    setSelectedIndex(index);
    updateMaintenance(id, {
      selectedIndex: index,
      number: stateMaintenanceValue?.number || solution.map((n) => null),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (number.every((n, i) => n === solution[i])) {
      onFinish();
    } else {
      triggerWrongAnswer();
    }
  };

  return (
    <WrapperForm onSubmit={handleSubmit} $isWrongAnswer={wrongAnswer.isOn}>
      {renderContent(selectedIndex)}
      <InputWrapper $isInputShown={isInputShown}>
        <RowWrapper>
          {Array.from(Array(10).keys()).map((n) => (
            <ClickableNumber type="button" onClick={handleSetNumber(n)} key={n}>
              {n}
            </ClickableNumber>
          ))}
        </RowWrapper>

        <RowWrapper>
          {isNegative && <Number $notClickable>-</Number>}
          {Array.from(Array(dotIndex).keys()).map((i) => (
            <Number
              key={i}
              onClick={handleSetSelectedIndex(i)}
              $selected={i === selectedIndex}
            >
              {number[i] === null ? "_" : number[i]}
            </Number>
          ))}
          <Number $bottom $notClickable>
            .
          </Number>
          {Array.from(Array(number.length).keys())
            .slice(dotIndex)
            .map((i) => (
              <Number
                key={i}
                onClick={handleSetSelectedIndex(i)}
                $selected={i === selectedIndex}
              >
                {number[i] === null ? "_" : number[i]}
              </Number>
            ))}
        </RowWrapper>
        <RowWrapper>
          {solved ? (
            <SolvedBox
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              $small
            >
              <span>
                {isNegative && "-"}
                {solution.slice(0, dotIndex).join("")}.
                {solution.slice(dotIndex)}
              </span>
              <Check />
            </SolvedBox>
          ) : (
            <SubmitButton isStatic />
          )}
        </RowWrapper>
      </InputWrapper>
    </WrapperForm>
  );
};

export default Counter;
