import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { WorkshopContext } from "../../common/services/WorkshopContext";
import { PuzzleBox } from "../../common/components/PuzzleList.styled";
import Loading from "../../common/components/Loading.styled";
import Alert from "../../common/components/Alert.styled";
import { RIDDLE_STATUSES } from "../../common/consts";
import Modal, { Text } from "../../common/components/Modal";
import { Button } from "../../common/components/Button.styled";

import { CornerIcons, CornerIcon, MessageWrapper } from "./index.styled";

const List = () => {
  const navigate = useNavigate();
  const [selectedPuzzle, setSelectedPuzzle] = useState(null);
  const {
    setWorkshopPlayPuzzle,
    myWorkshopPuzzles,
    fetchMyWorkshopPuzzles,
    myWorkshopPuzzlesLoading,
    myWorkshopPuzzlesError,
  } = useContext(WorkshopContext);

  useEffect(() => {
    if (!myWorkshopPuzzles) {
      fetchMyWorkshopPuzzles();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePuzzlePlayClick = () => {
    setWorkshopPlayPuzzle(selectedPuzzle);
    navigate(`/play/workshop/${selectedPuzzle.id}`);
  };

  const handlePuzzleClick = (puzzle) => (e) => {
    setSelectedPuzzle(puzzle);
  };

  return (
    <>
      <Modal isModalShown={Boolean(selectedPuzzle)}>
        <Text style={{ margin: 0, marginBottom: 35 }}>
          {selectedPuzzle?.name}
        </Text>
        {selectedPuzzle?.message && (
          <MessageWrapper>
            <p style={{ margin: 0, marginBottom: 7 }}>
              Message from Internet Exploring:
            </p>
            <code>{selectedPuzzle?.message}</code>
          </MessageWrapper>
        )}
        <Button
          style={{ width: "100%", maxWidth: "100%", marginBottom: 15 }}
          onClick={handlePuzzlePlayClick}
        >
          Play
        </Button>
        <div style={{ display: "flex", marginBottom: 15 }}>
          <Button style={{ marginRight: 15 }} disabled>
            Edit
          </Button>
          <Button disabled>Delete</Button>
        </div>
        <Button
          style={{ width: "100%", maxWidth: "100%" }}
          onClick={() => setSelectedPuzzle(null)}
        >
          Close
        </Button>
      </Modal>
      {myWorkshopPuzzlesError.isOn && (
        <Alert>Sorry, something went wrong.</Alert>
      )}
      {myWorkshopPuzzlesLoading.isOn && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Loading />
        </div>
      )}

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {myWorkshopPuzzles?.map((puzzle) => (
          <PuzzleBox
            onClick={handlePuzzleClick(puzzle)}
            key={puzzle.id}
            title={puzzle.name}
          >
            <span style={{ wordBreak: "break-word" }}>
              {puzzle.name.length > 65
                ? `${puzzle.name.slice(0, 65)}...`
                : puzzle.name}
            </span>
            <CornerIcons>
              {puzzle.message && (
                <CornerIcon title="Message" $status={puzzle.status}>
                  !
                </CornerIcon>
              )}
            </CornerIcons>
          </PuzzleBox>
        ))}
      </div>
    </>
  );
};

export default List;
