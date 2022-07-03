import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { doc, getDoc } from "firebase/firestore";

import Modal, { ButtonsWrapper, Text } from "../../common/components/Modal";
import { useToggle } from "../../common/services/useToggle";
import { db } from "../../common/firebase";
import { LOCAL_STORAGE_KEYS, RIDDLE_STATUSES, workshopCollectionName } from "../../common/consts";
import { Button } from "../../common/components/Button.styled";
import { AuthContext } from "../../common/services/AuthContext";
import Alert from "../../common/components/Alert.styled";
import ArrowBack from "../../common/components/ArrowBack";
import CommonPuzzle from "../../common/components/Puzzle";
import WorkshopBuilder from "../WorkshopBuilder";
import { WorkshopContext } from "../../common/services/WorkshopContext";

const StyledInput = styled.input`
  background: transparent;
  color: white;
  padding: 10px 10px 10px 0;
  font-family: "Fredoka";
  display: block;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 2px solid #355e65;
  margin-bottom: 15px;
  text-align: center;
`;

const initialUserNickname = localStorage.getItem(
  LOCAL_STORAGE_KEYS.USER_NICKNAME
);
const initialUserSocialMediaURL = localStorage.getItem(
  LOCAL_STORAGE_KEYS.USER_SOCIAL_MEDIA_URL
);

const WorkshopBuilderEdit = () => {
  const navigate = useNavigate();
  const { initPuzzle, puzzle } = useContext(WorkshopContext);
  const { user, handleLoginClick } = useContext(AuthContext);
  const params = useParams();
  const saveModal = useToggle();
  const saveLoading = useToggle();
  const saveError = useToggle();
  const preview = useToggle();
  const fetchingError = useToggle();

  const [userNickname, setUserNickname] = useState(initialUserNickname || "");
  const [userSocialMediaURL, setUserSocialMediaURL] = useState(
    initialUserSocialMediaURL || ""
  );

  const fetchAndInitPuzzle = async () => {
    try {
      const docRef = doc(db, workshopCollectionName, params.riddleId);
      const docSnap = await getDoc(docRef);
      const fetchedPuzzle = { id: docSnap.id, ...docSnap.data() };
      initPuzzle(fetchedPuzzle);
    } catch (err) {
      fetchingError.setOn();
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchAndInitPuzzle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUserNicknameChange = (e) => {
    setUserNickname(e.target.value);
  };
  const handleUserSocialMediaURLChange = (e) => {
    setUserSocialMediaURL(e.target.value);
  };

  const handleSave = async (e) => {
    const isDraft = e.target.name === "draft";
    const status = isDraft
      ? RIDDLE_STATUSES.DRAFT
      : RIDDLE_STATUSES.NEEDS_APPROVAL;

    localStorage.setItem(LOCAL_STORAGE_KEYS.USER_NICKNAME, userNickname);
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.USER_SOCIAL_MEDIA_URL,
      userSocialMediaURL
    );
    const newPuzzle = {
      ...puzzle,
      status,
      userNickname,
      userSocialMediaURL,
      updatedAt: serverTimestamp(),
    };

    try {
      saveLoading.setOn();
      saveError.setOff();
      await setDoc(doc(db, workshopCollectionName, puzzle.id), newPuzzle);
      saveLoading.setOff();
      navigate(`/play/workshop/my-riddles?successStatus=${status}`);
    } catch (error) {
      console.log(error);
      saveError.setOn();
      saveLoading.setOff();
    }
  };

  if (!puzzle) {
    return null;
  }
  if (fetchingError.isOn) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Sorry, something went wrong
      </div>
    );
  }

  if (preview.isOn) {
    return (
      <>
        <ArrowBack onClick={preview.setOff} />
        <CommonPuzzle
          selectedPuzzle={puzzle}
          handleFinishClick={preview.setOff}
        />
      </>
    );
  }

  return (
    <>
      {saveModal.isOn && (
        <Modal isModalShown={saveModal.isOn}>
          <Text>{!user && "Please log in first to save your riddle."}</Text>
          {saveError.isOn ? (
            <Alert>Sorry, something went wrong.</Alert>
          ) : (
            <>
              {user && (
                <>
                  <StyledInput
                    type="text"
                    value={userNickname}
                    onChange={handleUserNicknameChange}
                    placeholder="Your nickname"
                  />
                  <StyledInput
                    type="text"
                    value={userSocialMediaURL}
                    onChange={handleUserSocialMediaURLChange}
                    placeholder="Your social media link"
                  />
                </>
              )}
              <ButtonsWrapper>
                {user ? (
                  <>
                    <Button
                      disabled={saveLoading.isOn || !userNickname}
                      name="draft"
                      onClick={handleSave}
                      style={{ marginRight: "10px", fontSize: 16 }}
                    >
                      Save as draft
                    </Button>
                    <Button
                      disabled={saveLoading.isOn || !userNickname}
                      onClick={handleSave}
                      style={{ marginRight: "10px", fontSize: 16 }}
                    >
                      Save for review
                    </Button>
                  </>
                ) : (
                  <Button
                    style={{ marginRight: "10px", fontSize: 16 }}
                    onClick={handleLoginClick}
                  >
                    Log in
                  </Button>
                )}
                <Button style={{ fontSize: 16 }} disabled={saveLoading.isOn} onClick={saveModal.setOff}>
                  Cancel
                </Button>
              </ButtonsWrapper>
            </>
          )}
        </Modal>
      )}
      <WorkshopBuilder
        puzzle={puzzle}
        handlePreview={preview.setOn}
        handleSave={saveModal.setOn}
      />
    </>
  );
};

export default WorkshopBuilderEdit;
