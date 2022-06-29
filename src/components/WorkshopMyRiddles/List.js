import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";

import { WorkshopContext } from "../../common/services/WorkshopContext";
import { PuzzleBox } from "../../common/components/PuzzleList.styled";
import Loading from "../../common/components/Loading.styled";
import Alert from "../../common/components/Alert.styled";

const List = () => {
  const navigate = useNavigate();
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

  const handlePuzzleClick = (puzzle) => () => {
    setWorkshopPlayPuzzle(puzzle);
    navigate(`/play/workshop/${puzzle.id}`);
  };

  return (
    <>
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
          </PuzzleBox>
        ))}
      </div>
    </>
  );
};

export default List;
