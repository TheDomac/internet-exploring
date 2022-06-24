import { Fragment } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

import {
  DEFAULT_SOLUTION_VALUES,
  solutionTypes,
} from "@rebus-mono/common/src/consts";
import {
  StyledSidebar,
  SaveButton,
  PreviewButton,
  ExitButton,
} from "./Sidebar.styled";
import {
  StyledInput,
  DeleteButton,
  ButtonGroup,
  Button,
  HelpText,
} from "./index.styled";
import DateInput from "./DateInput";
import validate from "./utils/validate";
import cleanUp from "./utils/cleanUp";

const Sidebar = ({
  puzzle,
  rebus,
  setPuzzle,
  selectedClueId,
  updateClue,
  dependencyClueId,
  setDependencyClueId,
  selectedClueValueId,
  setValidationModal,
  exitModal,
  handleSetHelpModal,
  handleSave,
}) => {
  const navigate = useNavigate();
  const selectedClue =
    selectedClueId && rebus.clues.find((clue) => clue.id === selectedClueId);

  const selectedClueValue =
    selectedClueValueId &&
    selectedClue?.clueValues.find((cv) => cv.id === selectedClueValueId);

  const handleNameChange = (e) => {
    const newPuzzle = {
      ...puzzle,
      name: e.target.value,
    };

    setPuzzle(newPuzzle);
  };

  const handleSolvedTextChange = (e) => {
    const newPuzzle = {
      ...puzzle,
      rebuses: puzzle.rebuses.map((r) =>
        r.id === rebus.id
          ? {
              ...r,
              solutionInfo: {
                ...r.solutionInfo,
                solvedText: e.target.value,
              },
            }
          : r
      ),
    };

    setPuzzle(newPuzzle);
  };

  const handleClueWidthChange = (e) => {
    if (!Number(e.target.value)) return;

    const newClue = {
      ...selectedClue,
      style: {
        ...selectedClue.style,
        width: `calc(${e.target.value}% - 10px)`,
      },
    };

    updateClue({ rebusId: rebus.id, clueId: selectedClue.id, newClue });
  };

  const handleClueValueWidthChange = (e) => {
    if (!Number(e.target.value)) return;

    const newClue = {
      ...selectedClue,
      clueValues: selectedClue.clueValues.map((cv) =>
        cv.id === selectedClueValueId
          ? {
              ...cv,
              style: {
                ...cv.style,
                width: `calc(${e.target.value}% - 10px)`,
              },
            }
          : cv
      ),
    };
    updateClue({ rebusId: rebus.id, clueId: selectedClue.id, newClue });
  };

  const handleAddRebusSolution = () => {
    const newPuzzle = {
      ...puzzle,
      rebuses: puzzle.rebuses.map((r) =>
        r.id === rebus.id
          ? {
              ...r,
              solutionInfo: {
                ...r.solutionInfo,
                possibleSolutions: r.solutionInfo.possibleSolutions.concat({
                  id: uuidv4(),
                  value: DEFAULT_SOLUTION_VALUES[r.solutionInfo.type],
                }),
              },
            }
          : r
      ),
    };

    setPuzzle(newPuzzle);
  };

  const handleRebusSolutionChange = (solutionId, newSolution) => {
    const newPuzzle = {
      ...puzzle,
      rebuses: puzzle.rebuses.map((r) =>
        r.id === rebus.id
          ? {
              ...r,
              solutionInfo: {
                ...r.solutionInfo,
                possibleSolutions: r.solutionInfo.possibleSolutions.map((s) =>
                  s.id === solutionId
                    ? {
                        ...s,
                        value: newSolution,
                      }
                    : s
                ),
              },
            }
          : r
      ),
    };

    setPuzzle(newPuzzle);
  };

  const handleRebusTextSolutionChange = (solutionId) => (e) => {
    const newRebusSolution = e.target.value;
    handleRebusSolutionChange(solutionId, newRebusSolution);
  };

  const handleRebusDateSolutionChange = (solutionId, name, value) => {
    const foundSolution = rebus.solutionInfo.possibleSolutions.find(
      (s) => s.id === solutionId
    );
    const newRebusSolution = {
      ...foundSolution.value,
      [name]: value,
    };
    handleRebusSolutionChange(solutionId, newRebusSolution);
  };

  const handleDeleteRebusSolution = (solutionId) => () => {
    const newPuzzle = {
      ...puzzle,
      rebuses: puzzle.rebuses.map((r) =>
        r.id === rebus.id
          ? {
              ...r,
              solutionInfo: {
                ...r.solutionInfo,
                possibleSolutions: r.solutionInfo.possibleSolutions.filter(
                  (s) => s.id !== solutionId
                ),
              },
            }
          : r
      ),
    };

    setPuzzle(newPuzzle);
  };

  const handleDeleteClueSolution = (solutionId) => () => {
    const newClue = {
      ...selectedClue,
      solutionInfo: {
        ...selectedClue.solutionInfo,
        possibleSolutions: selectedClue.solutionInfo.possibleSolutions.filter(
          (s) => s.id !== solutionId
        ),
      },
    };

    updateClue({ rebusId: rebus.id, clueId: selectedClue.id, newClue });
  };

  const handleRebusSolutionTypeChange = (e) => {
    const newType = e.target.name;
    const newPuzzle = {
      ...puzzle,
      rebuses: puzzle.rebuses.map((r) =>
        r.id === rebus.id
          ? {
              ...r,
              solutionInfo: {
                ...r.solutionInfo,
                type: newType,
                possibleSolutions:
                  r.solutionInfo.type === newType
                    ? r.solutionInfo.possibleSolutions
                    : [],
              },
            }
          : r
      ),
    };

    setPuzzle(newPuzzle);
  };

  const handleHelperTextChange = (e) => {
    updateClue({
      rebusId: rebus.id,
      clueId: selectedClue.id,
      key: "helperText",
      value: e.target.value,
    });
  };

  const handleClueSolutionTypeChange = (e) => {
    const newType = e.target.name;
    const newClue = {
      ...selectedClue,
      solutionInfo: {
        ...selectedClue.solutionInfo,
        type: newType,
        possibleSolutions:
          selectedClue.solutionInfo.type === newType
            ? selectedClue.solutionInfo.possibleSolutions
            : [],
      },
    };

    updateClue({ rebusId: rebus.id, clueId: selectedClue.id, newClue });
  };

  const handleClueSolutionChange = (solutionId, newSolution) => {
    const newClue = {
      ...selectedClue,
      solutionInfo: {
        ...selectedClue.solutionInfo,
        possibleSolutions: selectedClue.solutionInfo.possibleSolutions.map(
          (possibleSolution) =>
            possibleSolution.id === solutionId
              ? {
                  ...possibleSolution,
                  value: newSolution,
                }
              : possibleSolution
        ),
      },
    };
    updateClue({ rebusId: rebus.id, clueId: selectedClue.id, newClue });
  };
  const handleClueTextSolutionChange = (solutionId) => (e) => {
    handleClueSolutionChange(solutionId, e.target.value);
  };

  const handleClueDateSolutionChange = (solutionId, name, value) => {
    const foundSolution = selectedClue.solutionInfo.possibleSolutions.find(
      (possibleSolution) => possibleSolution.id === solutionId
    );
    const newClueSolution = {
      ...foundSolution.value,
      [name]: value,
    };
    handleClueSolutionChange(solutionId, newClueSolution);
  };

  const handleAddClueSolution = () => {
    const newClue = {
      ...selectedClue,
      solutionInfo: {
        ...selectedClue.solutionInfo,
        possibleSolutions: selectedClue.solutionInfo.possibleSolutions.concat({
          id: uuidv4(),
          value: DEFAULT_SOLUTION_VALUES[selectedClue.solutionInfo.type],
        }),
      },
    };

    updateClue({ clueId: selectedClue.id, rebusId: rebus.id, newClue });
  };

  const handleAddDependencyClick = () => {
    setDependencyClueId(selectedClue.id);
  };

  const handleCancelDependencyClick = () => {
    setDependencyClueId(null);
  };

  const handleDependencyDelete = (dependencyId) => () => {
    const newClue = {
      ...selectedClue,
      dependsOn: selectedClue.dependsOn.filter((d) => d.id !== dependencyId),
    };
    updateClue({ clueId: selectedClue.id, rebusId: rebus.id, newClue });
  };

  const handleClueGroupChange = (e) => {
    updateClue({
      clueId: selectedClue.id,
      rebusId: rebus.id,
      key: "clueGroup",
      value: Number(e.target.name),
    });
  };

  const handleClueSolvedTextChange = (e) => {
    const newClue = {
      ...selectedClue,
      solutionInfo: {
        ...selectedClue.solutionInfo,
        solvedText: e.target.value,
      },
    };
    updateClue({ clueId: selectedClue.id, rebusId: rebus.id, newClue });
  };

  const handleSaveClick = () => {
    const cleanedUpPuzzle = cleanUp(puzzle);
    const error = validate(cleanedUpPuzzle);
    if (error) {
      setValidationModal(error);
    } else {
      handleSave();
    }
  };

  const handlePreviewClick = () => {
    const cleanedUpPuzzle = cleanUp(puzzle);
    const error = validate(cleanedUpPuzzle);
    if (error) {
      setValidationModal(error);
    } else {
      navigate("/play/workshop/preview");
    }
  };

  const isDependencySelectActive = Boolean(dependencyClueId);

  const selectedClueWidthValue = selectedClue?.style.width
    .slice(5)
    .split("%")[0]; // removes calc( and splits by %
  const selectedClueValueWidthValue = selectedClueValue?.style.width
    .slice(5)
    .split("%")[0]; // removes calc( and splits by %

  return (
    <StyledSidebar>
      <HelpText
        name="name"
        onClick={handleSetHelpModal}
        style={{ fontSize: "20px", margin: 0 }}
      >
        Name
      </HelpText>
      <StyledInput
        type="text"
        value={puzzle.name}
        placeholder="Name..."
        onChange={handleNameChange}
      />
      <p style={{ fontSize: "20px" }}>Riddle settings</p>
      <HelpText
        name="rebusSolvedText"
        onClick={handleSetHelpModal}
        style={{ margin: 0 }}
      >
        Solved text:
      </HelpText>
      <StyledInput
        type="text"
        value={rebus.solutionInfo.solvedText}
        placeholder="Solved text..."
        onChange={handleSolvedTextChange}
      />
      <HelpText
        name="rebusSolutions"
        onClick={handleSetHelpModal}
        style={{ margin: 0 }}
      >
        Solutions:
      </HelpText>
      <ButtonGroup>
        <Button
          style={{ margin: "5px" }}
          $isSelected={rebus.solutionInfo.type === solutionTypes.TEXT}
          name={solutionTypes.TEXT}
          onClick={handleRebusSolutionTypeChange}
        >
          Text
        </Button>
        <Button
          style={{ margin: "5px" }}
          $isSelected={rebus.solutionInfo.type === solutionTypes.DATE}
          name={solutionTypes.DATE}
          onClick={handleRebusSolutionTypeChange}
        >
          Date/Place
        </Button>
      </ButtonGroup>
      {rebus.solutionInfo.possibleSolutions.map((possibleSolution) => (
        <Fragment key={possibleSolution.id}>
          {rebus.solutionInfo.type === solutionTypes.TEXT && (
            <div key={possibleSolution.id} style={{ position: "relative" }}>
              <StyledInput
                type="text"
                value={possibleSolution.value}
                style={{ paddingRight: "25px" }}
                placeholder="Solution..."
                onChange={handleRebusTextSolutionChange(possibleSolution.id)}
              />
              <DeleteButton
                style={{
                  top: "50%",
                  transform: "translateY(-50%)",
                  right: "5px",
                }}
                onClick={handleDeleteRebusSolution(possibleSolution.id)}
              >
                X
              </DeleteButton>
            </div>
          )}
          {rebus.solutionInfo.type === solutionTypes.DATE && (
            <DateInput
              value={possibleSolution.value}
              updateFunc={handleRebusDateSolutionChange}
              solutionId={possibleSolution.id}
              handleDeleteSolution={handleDeleteRebusSolution}
            />
          )}
        </Fragment>
      ))}
      <Button onClick={handleAddRebusSolution} style={{ marginBottom: "5px" }}>
        Add Solution
      </Button>
      {selectedClue && (
        <div>
          <p style={{ fontSize: "20px", marginBottom: "5px" }}>Clue settings</p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "5px",
            }}
          >
            <HelpText
              name="clueWidth"
              onClick={handleSetHelpModal}
              style={{ margin: 5 }}
            >
              Width:
            </HelpText>
            <StyledInput
              type="text"
              value={selectedClueWidthValue}
              onChange={handleClueWidthChange}
              style={{ width: "28px", margin: "0 7px", padding: 0 }}
            />
            <span>%</span>
          </div>
          <HelpText
            name="clueSolutions"
            onClick={handleSetHelpModal}
            style={{ margin: 0, fontSize: "20px" }}
          >
            Solutions:
          </HelpText>
          {selectedClue.solutionInfo.possibleSolutions.length > 0 && (
            <>
              <HelpText
                name="clueSolvedText"
                onClick={handleSetHelpModal}
                style={{ marginTop: "5px", marginBottom: "0px" }}
              >
                Solved text:
              </HelpText>

              <StyledInput
                type="text"
                value={selectedClue.solutionInfo.solvedText}
                placeholder="Solved text..."
                onChange={handleClueSolvedTextChange}
              />
            </>
          )}
          <ButtonGroup>
            <Button
              style={{ margin: "5px" }}
              $isSelected={
                selectedClue.solutionInfo.type === solutionTypes.TEXT
              }
              name={solutionTypes.TEXT}
              onClick={handleClueSolutionTypeChange}
            >
              Text
            </Button>
            <Button
              style={{ margin: "5px" }}
              $isSelected={
                selectedClue.solutionInfo.type === solutionTypes.DATE
              }
              name={solutionTypes.DATE}
              onClick={handleClueSolutionTypeChange}
            >
              Date/Place
            </Button>
          </ButtonGroup>
          {selectedClue.solutionInfo.possibleSolutions.map(
            (possibleSolution) => (
              <Fragment key={possibleSolution.id}>
                {selectedClue.solutionInfo.type === solutionTypes.TEXT && (
                  <div
                    key={possibleSolution.id}
                    style={{ position: "relative" }}
                  >
                    <StyledInput
                      type="text"
                      value={possibleSolution.value}
                      style={{ paddingRight: "25px" }}
                      placeholder="Solution..."
                      onChange={handleClueTextSolutionChange(
                        possibleSolution.id
                      )}
                    />
                    <DeleteButton
                      style={{
                        top: "50%",
                        transform: "translateY(-50%)",
                        right: "5px",
                      }}
                      onClick={handleDeleteClueSolution(possibleSolution.id)}
                    >
                      X
                    </DeleteButton>
                  </div>
                )}
                {selectedClue.solutionInfo.type === solutionTypes.DATE && (
                  <DateInput
                    value={possibleSolution.value}
                    updateFunc={handleClueDateSolutionChange}
                    solutionId={possibleSolution.id}
                    handleDeleteSolution={handleDeleteClueSolution}
                  />
                )}
              </Fragment>
            )
          )}
          <Button
            onClick={handleAddClueSolution}
            style={{ marginBottom: "5px" }}
          >
            Add Solution
          </Button>
          <HelpText
            name="helpText"
            onClick={handleSetHelpModal}
            style={{ margin: 0 }}
          >
            Help text:
          </HelpText>
          <StyledInput
            type="text"
            value={selectedClue.helperText}
            placeholder="Help text..."
            onChange={handleHelperTextChange}
          />
          <HelpText
            name="clueGroup"
            onClick={handleSetHelpModal}
            style={{ margin: 0 }}
          >
            Clue group:
          </HelpText>
          <ButtonGroup>
            {[0, 1, 2, 3, 4].map((clueGroup) => (
              <Button
                key={clueGroup}
                onClick={handleClueGroupChange}
                name={clueGroup}
                $isSelected={selectedClue.clueGroup === clueGroup}
                style={{ margin: "5px" }}
              >
                {clueGroup || "None"}
              </Button>
            ))}
          </ButtonGroup>
          {(rebus.clues.length > 1 || selectedClue.dependsOn.length > 0) && (
            <HelpText
              name="dependencies"
              onClick={handleSetHelpModal}
              style={{ marginBottom: "5px" }}
            >
              Dependencies:
            </HelpText>
          )}
          {selectedClue.dependsOn.length > 0 &&
            selectedClue.dependsOn.map((d) => {
              const foundIndex = rebus.clues.findIndex((c) => c.id === d.value);
              return (
                <div
                  style={{ margin: "5px 0", position: "relative" }}
                  key={d.id}
                >
                  {`Clue ${foundIndex + 1}`}
                  <DeleteButton
                    style={{
                      top: "50%",
                      transform: "translateY(-50%)",
                      right: "5px",
                    }}
                    onClick={handleDependencyDelete(d.id)}
                  >
                    X
                  </DeleteButton>
                </div>
              );
            })}
          {rebus.clues.length > 1 &&
            selectedClue.dependsOn.length !== rebus.clues.length - 1 && (
              <Button
                style={{ marginBottom: "5px" }}
                onClick={
                  isDependencySelectActive
                    ? handleCancelDependencyClick
                    : handleAddDependencyClick
                }
              >
                {isDependencySelectActive ? "Cancel" : "Add Dependency"}
              </Button>
            )}
        </div>
      )}
      {selectedClueValue && (
        <div>
          <p style={{ fontSize: "20px" }}>Clue value settings</p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "5px",
            }}
          >
            <HelpText
              style={{ margin: 0 }}
              name="clueValueWidth"
              onClick={handleSetHelpModal}
            >
              Width:
            </HelpText>
            <StyledInput
              type="text"
              value={selectedClueValueWidthValue}
              onChange={handleClueValueWidthChange}
              style={{ width: "28px", margin: "0 7px", padding: 0 }}
            />
            <span>%</span>
          </div>
        </div>
      )}
      <div style={{ display: "flex" }}>
        <PreviewButton onClick={handlePreviewClick}>Preview</PreviewButton>
      </div>
      <div style={{ display: "flex", marginTop: 5 }}>
        {<SaveButton onClick={handleSaveClick}>Save</SaveButton>}
        <ExitButton onClick={exitModal.setOn}>Exit</ExitButton>
      </div>
    </StyledSidebar>
  );
};

export default Sidebar;
