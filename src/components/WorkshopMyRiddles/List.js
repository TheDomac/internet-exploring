import { useEffect, useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  query,
  orderBy,
  where,
  getDocs,
  limit,
  startAfter,
  deleteDoc,
  doc
} from "firebase/firestore";

import { WorkshopContext } from "../../common/services/WorkshopContext";
import { db } from "../../common/firebase";
import { AuthContext } from "../../common/services/AuthContext";
import { useToggle } from "../../common/services/useToggle";
import { PuzzleBox } from "../../common/components/PuzzleList.styled";
import Loading from "../../common/components/Loading.styled";
import Alert from "../../common/components/Alert.styled";
import { RIDDLE_STATUSES, RIDDLE_STATUSES_TITLES, workshopCollectionName } from "../../common/consts";
import Modal, { Text } from "../../common/components/Modal";
import { Button } from "../../common/components/Button.styled";

import { CornerIcons, CornerIcon, MessageWrapper } from "./index.styled";
import clockSVG from "./clock.svg";
import closeSVG from "./close.svg";
import checkSVG from "./check.svg";
import draftSVG from "./draft.svg";

const statusIcons = {
  [RIDDLE_STATUSES.DRAFT]: <img src={draftSVG} alt="done" />,
  [RIDDLE_STATUSES.NEEDS_APPROVAL]: <img src={clockSVG} alt="needs_approval" />,
  [RIDDLE_STATUSES.DENIED]: <img src={closeSVG} alt="rejected" />,
  [RIDDLE_STATUSES.DONE]: <img src={checkSVG} alt="done" />,
};

const LIMIT = 15;

const List = () => {
  const navigate = useNavigate();
  const [myWorkshopPuzzles, setMyWorkshopPuzzles] = useState(null);
  const myWorkshopPuzzlesLoading = useToggle();
  const myWorkshopPuzzlesError = useToggle();
  const [page, setPage] = useState(0);
  const myWorkshopPuzzlesLastRef = useRef(null);
  const { user } = useContext(AuthContext);

  const [selectedPuzzle, setSelectedPuzzle] = useState(null);
  const isLoadMoreButtonShown = useToggle(true);
  const deleteToggle = useToggle();
  const deleteLoading = useToggle();
  const deleteError = useToggle();

  const { setWorkshopPlayPuzzle } = useContext(WorkshopContext);

  const fetchMyWorkshopPuzzles = async (initialPuzzles = []) => {
    try {
      myWorkshopPuzzlesLoading.setOn();

      const q = myWorkshopPuzzlesLastRef.current ? 
      query(
        collection(db, workshopCollectionName),
        where("uid", "==", user.uid),
        orderBy("updatedAt", "desc"),
        startAfter(myWorkshopPuzzlesLastRef.current),
        limit(LIMIT),
      ) :
      query(
        collection(db, workshopCollectionName),
        where("uid", "==", user.uid),
        orderBy("updatedAt", "desc"),
        limit(LIMIT),
      );

      const querySnapshot = await getDocs(q);
      const newFetchedPuzzles = [];
      querySnapshot.forEach((doc) => {
        newFetchedPuzzles.push({ id: doc.id, ...doc.data() });
      });


      const newPage = page + 1;
      setPage(newPage)

      const newMyWorkshopPuzzles = (initialPuzzles).concat(
        newFetchedPuzzles
      );
      setMyWorkshopPuzzles(newMyWorkshopPuzzles);
      myWorkshopPuzzlesLoading.setOff();

      if (newFetchedPuzzles.length < LIMIT) {
        isLoadMoreButtonShown.setOff();
      }
    } catch (error) {
      console.log(error)
      myWorkshopPuzzlesError.setOn();
      myWorkshopPuzzlesLoading.setOff();
    }
  };

  useEffect(() => {
    fetchMyWorkshopPuzzles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePuzzlePlayClick = () => {
    setWorkshopPlayPuzzle(selectedPuzzle);
    navigate(`/play/workshop/${selectedPuzzle.id}`);
  };

  const handlePuzzleClick = (puzzle) => (e) => {
    setSelectedPuzzle(puzzle);
  };

  const handleEditClick = () => {
    navigate(`/play/workshop/edit/${selectedPuzzle.id}`);
  };

  const handleLoadMoreClick = () => {
    fetchMyWorkshopPuzzles(myWorkshopPuzzles)
  }

  const handleDeleteConfirm = async () => {
    try {
      deleteLoading.setOn()
      await deleteDoc(doc(db, workshopCollectionName, selectedPuzzle.id));
      setSelectedPuzzle(null);
      myWorkshopPuzzlesLastRef.current = null;
      deleteLoading.setOff();
      fetchMyWorkshopPuzzles();
    
    } catch (error) {
      deleteError.setOn();
      deleteLoading.setOff()
    }
  }


  return (
    <>
      <Modal isModalShown={Boolean(selectedPuzzle)}>
        <Text style={{ margin: 0, marginBottom: 7 }}>
          {selectedPuzzle?.name}
        </Text>
        <Text style={{ margin: 0, marginBottom: 25, fontSize: 14 }}>
          Status: {RIDDLE_STATUSES_TITLES[selectedPuzzle?.status]}
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
        {
          deleteToggle.isOn ? (
            <>
            {deleteError.isOn && <Alert>Sorry, something went wrong.</Alert>}
              <p style={{ textAlign: "center"}}>Are you sure you want to delete this riddle?</p>
            <div style={{ display: "flex", marginBottom: 15 }}>
          <Button
            style={{ marginRight: 15 }}
            onClick={handleDeleteConfirm}
            disabled={deleteLoading.isOn}
          >
            Yes
          </Button>
          <Button onClick={deleteToggle.setOff}
            disabled={deleteLoading.isOn}
            >No</Button>
        </div></>
          ) : (
            <div style={{ display: "flex", marginBottom: 15 }}>
          <Button
            style={{ marginRight: 15 }}
            onClick={handleEditClick}
            disabled={[
              RIDDLE_STATUSES.DONE,
              RIDDLE_STATUSES.NEEDS_APPROVAL,
            ].includes(selectedPuzzle?.status)}
          >
            Edit
          </Button>
          <Button onClick={deleteToggle.setOn}>Delete</Button>
        </div>
          )
        }
        
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
        {!myWorkshopPuzzlesLoading.isOn && myWorkshopPuzzles && (
          <>
            {myWorkshopPuzzles.map((puzzle) => (
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
                  {puzzle.message && <CornerIcon title="Message">!</CornerIcon>}
                  <CornerIcon
                    $status={puzzle.status}
                    title={RIDDLE_STATUSES_TITLES[puzzle.status]}
                  >
                    {statusIcons[puzzle.status]}
                  </CornerIcon>
                </CornerIcons>
              </PuzzleBox>
            ))}
            {isLoadMoreButtonShown.isOn && (
              <div
                style={{
                  display: "flex",
                  marginTop: "15px",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Button onClick={handleLoadMoreClick}>Load more</Button>
              </div>
            )}
          </>
        )}

        {!myWorkshopPuzzlesLoading.isOn && myWorkshopPuzzles?.length === 0 && (
          <p
            style={{
              textAlign: "center",
              color: "rgba(255,255,255,0.4)",
              width: "100%",
            }}
          >
            You don't have any riddles at the moment.
          </p>
        )}
      </div>
    </>
  );
};

export default List;
