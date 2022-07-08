import React from "react";
import { v4 as uuidv4 } from "uuid";

import { clueTypes } from "../../common/consts";

import ClueValue from "./ClueValue";

import { ClueWrapper } from "./Clue.styled";
import { ClueValuesWrapper } from "./ClueValue.styled";
import { DeleteButton, StyledInput, AddClueButton } from "./index.styled";

const Clue = ({
  clue,
  index,
  rebus,
  selectedClueId,
  setDeleteClueId,
  setSelectedClueId,
  updateClue,
  dependencyClueId,
  setDependencyClueId,
  setSelectedClueValueId,
  selectedClueValueId,
}) => {
  const handleSelectClue = () => {
    setSelectedClueId(clue.id);
    setDependencyClueId(null);
  };

  const handleDeleteClueClick = () => {
    setDeleteClueId(clue.id);
    setSelectedClueValueId(null);
  };

  const foundDependencyClue = rebus.clues.find(
    (c) => c.id === dependencyClueId
  );

  const handleDependencySelectClick = () => {
    const newClue = {
      ...foundDependencyClue,
      dependsOn: foundDependencyClue.dependsOn.concat({
        id: uuidv4(),
        value: clue.id,
      }),
    };
    updateClue({ rebusId: rebus.id, clueId: foundDependencyClue.id, newClue });
    setDependencyClueId(null);
  };

  const handleSubtextChange = (e) => {
    updateClue({
      rebusId: rebus.id,
      clueId: clue.id,
      key: "subtext",
      value: e.target.value,
    });
  };

  const handleAddClueValue = () => {
    const newClueValueId = uuidv4();
    const newClue = {
      ...clue,
      clueValues: clue.clueValues.concat({
        id: newClueValueId,
        value: "",
        type: clueTypes.NONE,
        subtext: "",
        style: { width: "calc(100% - 10px)" },
      }),
    };
    setSelectedClueValueId(newClueValueId);
    updateClue({ rebusId: rebus.id, clueId: clue.id, newClue });
  };

  const handleDeleteClueValueClick = (e) => {
    const newClue = {
      ...clue,
      clueValues: clue.clueValues.filter((cv) => cv.id !== e.target.name),
    };
    updateClue({ rebusId: rebus.id, clueId: clue.id, newClue });
  };

  const isDependencySelectActive =
    Boolean(dependencyClueId) &&
    clue.id !== dependencyClueId &&
    !foundDependencyClue.dependsOn.find((d) => d.value === clue.id);

  return (
    <ClueWrapper
      style={clue.style}
      onClick={
        isDependencySelectActive
          ? handleDependencySelectClick
          : handleSelectClue
      }
      $isSelected={selectedClueId === clue.id}
      $isDependencySelectActive={isDependencySelectActive}
    >
      <p>Clue {index + 1}</p>

      {clue.id === selectedClueId && (
        <DeleteButton
          style={{ top: "5px", right: "5px" }}
          onClick={handleDeleteClueClick}
        >
          X
        </DeleteButton>
      )}
      <ClueValuesWrapper>
        {clue.clueValues.map((clueValue) => (
          <ClueValue
            key={clueValue.id}
            clueValue={clueValue}
            handleDeleteClueValueClick={handleDeleteClueValueClick}
            setSelectedClueValueId={setSelectedClueValueId}
            updateClue={updateClue}
            clue={clue}
            rebusId={rebus.id}
            isSelected={selectedClueValueId === clueValue.id && selectedClueId === clue.id}
          />
        ))}
        <AddClueButton size={50} onClick={handleAddClueValue}>
          <span>+</span>
        </AddClueButton>
      </ClueValuesWrapper>
      <StyledInput
        type="text"
        value={clue.subtext}
        style={{ textAlign: "center", padding: "10px" }}
        placeholder="Subtext..."
        onChange={handleSubtextChange}
      />
    </ClueWrapper>
  );
};

export default Clue;
