import { clueTypes } from "../../common/consts";

import { StyledClueValue, StyledFileInputLabel } from "./ClueValue.styled";
import { ButtonGroup, DeleteButton, StyledInput, StyledSelect, Button } from "./index.styled";
import Image from "../../common/components/Image";

const ClueValue = ({
  clueValue,
  handleDeleteClueValueClick,
  updateClue,
  clue,
  rebusId,
  setSelectedClueValueId,
  isSelected
}) => {
  const handleSubtextChange = (e) => {
    const newClue = {
      ...clue,
      clueValues: clue.clueValues.map((cv) =>
        cv.id === clueValue.id ? { ...cv, subtext: e.target.value } : cv
      ),
    };

    updateClue({ rebusId, clueId: clue.id, newClue });
  };

  const handleTypeChange = (e) => {
    const newType = e.target.name;

    const newClue = {
      ...clue,
      clueValues: clue.clueValues.map((cv) =>
        cv.id === clueValue.id ? { ...cv, type: newType, value: "" } : cv
      ),
    };

    updateClue({ rebusId, clueId: clue.id, newClue });
  };

  const handleTextValueChange = (e) => {
    const newClue = {
      ...clue,
      clueValues: clue.clueValues.map((cv) =>
        cv.id === clueValue.id ? { ...cv, value: e.target.value } : cv
      ),
    };

    updateClue({ rebusId, clueId: clue.id, newClue });
  };

  const handleImageValueChange = (e) => {
    const imageObjectURL = URL.createObjectURL(e.target.files[0]);
    const newClue = {
      ...clue,
      clueValues: clue.clueValues.map((cv) =>
        cv.id === clueValue.id ? { ...cv, value: imageObjectURL } : cv
      ),
    };

    updateClue({ rebusId, clueId: clue.id, newClue });
  };

  const handleClueValueClick = () => {
    setSelectedClueValueId(clueValue.id);
  };

  return (
    <StyledClueValue 
    $isSelected={isSelected}
     style={clueValue.style} onClick={handleClueValueClick}>
      <div style={{ marginBottom: "5px", fontSize: "12px" }}>Clue Value</div>
      {clueValue.type === clueTypes.NONE && (
        <>
          <Button style={{ marginBottom: 7}} name={clueTypes.TEXT} onClick={handleTypeChange}>Text</Button>
          <Button name={clueTypes.IMAGE} onClick={handleTypeChange}>Image</Button>
          </>
      )}
      {clueValue.type === clueTypes.TEXT && (
        <StyledInput
          type="text"
          value={clueValue.value}
          style={{ textAlign: "center", padding: "7px" }}
          placeholder="Value..."
          onChange={handleTextValueChange}
        />
      )}
      {clueValue.type === clueTypes.IMAGE && !clueValue.value && (
        <StyledFileInputLabel>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageValueChange}
          />
          Browse
        </StyledFileInputLabel>
      )}
      {clueValue.type === clueTypes.IMAGE && clueValue.value && (
        <Image fileName={clueValue.value} alt="clueValueImage" />
      )}
      {clueValue.type !== clueTypes.NONE && <StyledInput
        type="text"
        value={clueValue.subtext}
        style={{ textAlign: "center", padding: "7px" }}
        placeholder="Subtext..."
        onChange={handleSubtextChange}
      />}

      <DeleteButton
        style={{ top: "5px", right: "5px" }}
        name={clueValue.id}
        onClick={handleDeleteClueValueClick}
      >
        X
      </DeleteButton>
    </StyledClueValue>
  );
};

export default ClueValue;
