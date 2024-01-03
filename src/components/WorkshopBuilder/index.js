import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { solutionTypes } from "../../common/consts";
import Modal, { ModalConfirm, ModalInfo } from "../../common/components/Modal";
import { useToggle } from "../../common/services/useToggle";

import {
  Container,
  Content,
  RebusTabsWrapper,
  RebusTab,
  DeleteButton,
} from "./index.styled";

import Rebus from "./Rebus";
import Sidebar from "./Sidebar";
import { WorkshopContext } from "../../common/services/WorkshopContext";
import helpModalContents from "./HelpModalContents";
import { useNavigate } from "react-router-dom";

const WorkshopBuilder = ({ puzzle, handleSave, handlePreview }) => {
  const navigate = useNavigate();
  const { setPuzzle, selectedRebusId, setSelectedRebusId } =
    useContext(WorkshopContext);
  const [deleteRebusId, setDeleteRebusId] = useState(null);
  const [selectedClueId, setSelectedClueId] = useState(null);
  const [selectedClueValueId, setSelectedClueValueId] = useState(null);
  const [dependencyClueId, setDependencyClueId] = useState(null);
  const [validationModal, setValidationModal] = useState(null);
  const [helpModal, setHelpModal] = useState(null);
  const exitModal = useToggle();
  const imageSizeErrorModal = useToggle();

  const handleRebusTabClick = (rebusId) => () => {
    setSelectedClueId(null);
    setSelectedClueValueId(null);
    setSelectedRebusId(rebusId);
  };

  const handleAddRebusClick = () => {
    if (puzzle.rebuses.length < 10) {
      const newSelectedRebusId = uuidv4();
      const newPuzzle = {
        ...puzzle,
        rebuses: puzzle.rebuses.concat({
          id: newSelectedRebusId,
          clues: [],
          style: {},
          solutionInfo: {
            type: solutionTypes.TEXT,
            possibleSolutions: [],
            solvedText: "",
          },
        }),
      };

      setPuzzle(newPuzzle);
      setSelectedRebusId(newSelectedRebusId);
    }
  };

  const handleDeleteRebusConfirm = () => {
    const newPuzzle = {
      ...puzzle,
      rebuses: puzzle.rebuses.filter((rebus) => rebus.id !== deleteRebusId),
    };

    setSelectedRebusId(newPuzzle.rebuses[0].id);
    setPuzzle(newPuzzle);
    setDeleteRebusId(null);
  };

  const handleDeleteRebusCancel = () => {
    setDeleteRebusId(null);
  };

  const handleDeleteRebusClick = (rebusId) => () => {
    setDeleteRebusId(rebusId);
  };

  const handleExitModalConfirm = () => {
    exitModal.setOff();
    setPuzzle(null);
    navigate("/play/workshop");
  };

  const updateClue = ({ rebusId, clueId, key, value, newClue }) => {
    const newPuzzle = {
      ...puzzle,
      rebuses: puzzle.rebuses.map((r) =>
        r.id === rebusId
          ? {
              ...r,
              clues: r.clues.map((c) =>
                c.id === clueId
                  ? {
                      ...(newClue || {
                        ...c,
                        [key]: value,
                      }),
                    }
                  : c
              ),
            }
          : r
      ),
    };
    setPuzzle(newPuzzle);
  };

  const handleSetHelpModal = (e) => {
    const helpModal = e.target.getAttribute("name");
    setHelpModal(helpModal);
  };

  const selectedRebus = puzzle.rebuses.find((r) => r.id === selectedRebusId);

  return (
    <>
      <Modal isModalShown={exitModal.isOn} onClose={exitModal.setOff}>
        <ModalConfirm
          text="Are you sure you want to exit? Any unsaved changes will be lost."
          onClose={exitModal.setOff}
          onConfirm={handleExitModalConfirm}
        />
      </Modal>
      <Modal
        isModalShown={Boolean(deleteRebusId)}
        onClose={handleDeleteRebusCancel}
      >
        <ModalConfirm
          text="Are you sure you want to delete this riddle?"
          onClose={handleDeleteRebusCancel}
          onConfirm={handleDeleteRebusConfirm}
        />
      </Modal>
      <Modal
        isModalShown={Boolean(validationModal)}
        onClose={() => setValidationModal(null)}
      >
        <ModalInfo
          text={`Validation error: ${validationModal}`}
          onClose={() => setValidationModal(null)}
        />
      </Modal>
      <Modal
        isModalShown={imageSizeErrorModal.isOn}
        onClose={imageSizeErrorModal.setOff}
      >
        <ModalInfo
          text="Image size too large (max 1MB)."
          onClose={imageSizeErrorModal.setOff}
        />
      </Modal>
      <Modal
        widthLimit={false}
        isModalShown={Boolean(helpModal)}
        onClose={() => setHelpModal(null)}
      >
        <ModalInfo onClose={() => setHelpModal(null)}>
          <div style={{ marginBottom: "10px", textAlign: "center" }}>
            {helpModalContents[helpModal]}
          </div>
        </ModalInfo>
      </Modal>
      <Container>
        <Content>
          <RebusTabsWrapper>
            {puzzle.rebuses.map((rebus, i) => (
              <RebusTab
                $isSelected={rebus.id === selectedRebusId}
                key={rebus.id}
                onClick={handleRebusTabClick(rebus.id)}
              >
                {i + 1}

                {rebus.id === selectedRebusId && puzzle.rebuses.length > 1 && (
                  <DeleteButton
                    style={{
                      top: "50%",
                      transform: "translateY(-50%)",
                      right: "5px",
                    }}
                    onClick={handleDeleteRebusClick(rebus.id)}
                  >
                    X
                  </DeleteButton>
                )}
              </RebusTab>
            ))}
            <RebusTab
              $disabled={puzzle.rebuses.length >= 10}
              style={{ flex: 0, minWidth: "30px" }}
              onClick={handleAddRebusClick}
            >
              +
            </RebusTab>
          </RebusTabsWrapper>
          <Rebus
            puzzle={puzzle}
            rebus={selectedRebus}
            setPuzzle={setPuzzle}
            selectedClueId={selectedClueId}
            setSelectedClueId={setSelectedClueId}
            updateClue={updateClue}
            dependencyClueId={dependencyClueId}
            setDependencyClueId={setDependencyClueId}
            setSelectedClueValueId={setSelectedClueValueId}
            selectedClueValueId={selectedClueValueId}
            imageSizeErrorModal={imageSizeErrorModal}
          />
        </Content>
        <Sidebar
          puzzle={puzzle}
          setPuzzle={setPuzzle}
          selectedClueId={selectedClueId}
          rebus={selectedRebus}
          updateClue={updateClue}
          dependencyClueId={dependencyClueId}
          setDependencyClueId={setDependencyClueId}
          selectedClueValueId={selectedClueValueId}
          setValidationModal={setValidationModal}
          exitModal={exitModal}
          handleSetHelpModal={handleSetHelpModal}
          handleSave={handleSave}
          handlePreview={handlePreview}
        />
      </Container>
    </>
  );
};

export default WorkshopBuilder;
