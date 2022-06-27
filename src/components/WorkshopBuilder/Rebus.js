import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

import { solutionTypes, clueTypes } from "../../common/consts";
import Modal, { ModalConfirm } from "../../common/components/Modal";

import Clue from "./Clue";
import { RebusWrapper } from "./Rebus.styled";
import { AddClueButton, AddClueButtonWrapper } from "./index.styled";

const Rebus = ({
  puzzle,
  rebus,
  setPuzzle,
  selectedClueId,
  setSelectedClueId,
  updateClue,
  dependencyClueId,
  setDependencyClueId,
  setSelectedClueValueId,
}) => {
  const [deleteClueId, setDeleteClueId] = useState(null);

  const handleAddClueClick = () => {
    const newClueId = uuidv4();
    const newClueValueId = uuidv4();
    const newClue = {
      id: newClueId,
      clueValues: [
        {
          id: newClueValueId,
          value: "",
          type: clueTypes.TEXT,
          subtext: "",
          style: { width: "calc(100% - 10px)" },
        },
      ],
      helperText: "",
      subtext: "",
      clueGroup: 0,
      style: {
        width: "calc(33% - 10px)",
      },
      dependsOn: [],
      solutionInfo: {
        type: solutionTypes.TEXT,
        possibleSolutions: [],
        solvedText: "",
      },
    };

    const newPuzzle = {
      ...puzzle,
      rebuses: puzzle.rebuses.map((r) =>
        r.id === rebus.id
          ? {
              ...r,
              clues: r.clues.concat(newClue),
            }
          : r
      ),
    };

    setSelectedClueId(newClueId);
    setSelectedClueValueId(newClueValueId);
    setPuzzle(newPuzzle);
  };

  const handleDeleteClueConfirm = () => {
    const newPuzzle = {
      ...puzzle,
      rebuses: puzzle.rebuses.map((r) =>
        r.id === rebus.id
          ? {
              ...r,
              clues: r.clues
                .filter((clue) => clue.id !== deleteClueId)
                .map((c) => ({
                  ...c,
                  dependsOn: c.dependsOn.filter(
                    (d) => d.value !== deleteClueId
                  ),
                })),
            }
          : r
      ),
    };

    setPuzzle(newPuzzle);
    setSelectedClueId(null);
    setDeleteClueId(null);
  };

  return (
    <>
      <Modal isModalShown={Boolean(deleteClueId)}>
        <ModalConfirm
          text="Are you sure you want to delete this clue?"
          onClose={() => {
            setDeleteClueId(null);
          }}
          onConfirm={handleDeleteClueConfirm}
        />
      </Modal>
      <RebusWrapper>
        {rebus.clues.map((clue, index) => (
          <Clue
            key={clue.id}
            clue={clue}
            rebus={rebus}
            selectedClueId={selectedClueId}
            setDeleteClueId={setDeleteClueId}
            setSelectedClueId={setSelectedClueId}
            updateClue={updateClue}
            index={index}
            dependencyClueId={dependencyClueId}
            setDependencyClueId={setDependencyClueId}
            setSelectedClueValueId={setSelectedClueValueId}
          />
        ))}
        <AddClueButtonWrapper>
          <AddClueButton size={100} onClick={handleAddClueClick}>
            <span>+</span>
          </AddClueButton>
        </AddClueButtonWrapper>
      </RebusWrapper>
    </>
  );
};

export default Rebus;
