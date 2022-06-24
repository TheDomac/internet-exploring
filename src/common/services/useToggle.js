import { useState } from "react";

export const useToggle = (initialState = false) => {
  const [isOn, _setIsOn] = useState(initialState);

  const toggle = () => {
    _setIsOn((s) => !s);
  };

  const setOn = () => {
    _setIsOn(true);
  };

  const setOff = () => {
    _setIsOn(false);
  };

  const set = (state) => {
    _setIsOn(state);
  };

  return { isOn, set, toggle, setOn, setOff };
};
