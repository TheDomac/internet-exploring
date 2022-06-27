import { clueTypes } from "../../common/consts";

import { StyledClueValue, StyledFileInputLabel } from "./ClueValue.styled";
import { DeleteButton, StyledInput, StyledSelect } from "./index.styled";
import Image from "../../common/components/Image";

const ClueValue = ({
  clueValue,
  handleDeleteClueValueClick,
  updateClue,
  clue,
  rebusId,
  setSelectedClueValueId,
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
    const newType = e.target.value;

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
    <StyledClueValue style={clueValue.style} onClick={handleClueValueClick}>
      <div style={{ marginBottom: "5px", fontSize: "12px" }}>Clue Value</div>
      <StyledSelect
        value={clueValue.type}
        onChange={handleTypeChange}
        style={{ textTransform: "capitalize" }}
      >
        {[clueTypes.TEXT, clueTypes.IMAGE].map((o) => (
          <option key={o} value={o}>
            {o[0].toUpperCase()}
            {o.slice(1)}
          </option>
        ))}
      </StyledSelect>

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
      <StyledInput
        type="text"
        value={clueValue.subtext}
        style={{ textAlign: "center", padding: "7px" }}
        placeholder="Subtext..."
        onChange={handleSubtextChange}
      />

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
