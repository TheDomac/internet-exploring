import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import Modal, { ButtonsWrapper } from "../../common/components/Modal";
import { useToggle } from "../../common/services/useToggle";
import getImageClueValues from "../../common/services/getImageClueValues";
import uploadImages from "../../common/services/uploadImages";
import { db } from "../../common/firebase";
import {
  LOCAL_STORAGE_KEYS,
  RIDDLE_STATUSES,
  workshopCollectionName,
  clueTypes,
} from "../../common/consts";
import { Button } from "../../common/components/Button.styled";
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

const MOCKED_USER_ID = "mockedUserId";

const WorkshopBuilderCreate = () => {
  const { initPuzzle, puzzle } = useContext(WorkshopContext);

  const saveModal = useToggle();
  const saveLoading = useToggle();
  const saveError = useToggle();
  const preview = useToggle();
  const navigate = useNavigate();

  const [userNickname, setUserNickname] = useState(initialUserNickname || "");
  const [userSocialMediaURL, setUserSocialMediaURL] = useState(
    initialUserSocialMediaURL || ""
  );

  useEffect(() => {
    initPuzzle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUserNicknameChange = (e) => {
    setUserNickname(e.target.value);
  };
  const handleUserSocialMediaURLChange = (e) => {
    setUserSocialMediaURL(e.target.value);
  };

  // const handleSave = () => {
  //   console.log(puzzle)
  // }

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

    try {
      saveLoading.setOn();
      saveError.setOff();

      const imageClueValues = getImageClueValues(puzzle.rebuses);
      const uploadedImages = await uploadImages(
        imageClueValues,
        MOCKED_USER_ID
      );
      const newPuzzle = {
        ...puzzle,
        uid: MOCKED_USER_ID,
        status,
        userNickname,
        userSocialMediaURL,
        message: "",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        rebuses: puzzle.rebuses.map((r) => ({
          ...r,
          clues: r.clues.map((c) => ({
            ...c,
            clueValues: c.clueValues.map((cv) => {
              if (cv.type !== clueTypes.IMAGE) {
                return cv;
              }
              const foundUploadedImage = uploadedImages.find(
                (icv) => icv.id === cv.id
              ).downloadURL;
              return {
                ...cv,
                value: foundUploadedImage,
              };
            }),
          })),
        })),
      };

      await addDoc(collection(db, workshopCollectionName), newPuzzle);
      saveLoading.setOff();
      navigate(`/play/workshop/my-riddles?successStatus=${status}`);
    } catch (error) {
      saveError.setOn();
      saveLoading.setOff();
    }
  };

  const handleCloseModal = () => {
    saveModal.setOff();
    saveError.setOff();
  };

  if (!puzzle) {
    return null;
  }

  if (preview.isOn) {
    return (
      <>
        <CommonPuzzle
          selectedPuzzle={puzzle}
          handleFinishClick={preview.setOff}
        />
        <ArrowBack onClick={preview.setOff} />
      </>
    );
  }

  return (
    <>
      {saveModal.isOn && (
        <Modal isModalShown={saveModal.isOn} onClose={handleCloseModal}>
          {saveError.isOn ? (
            <>
              <Alert style={{ marginBottom: "7px" }}>
                Sorry, something went wrong.
              </Alert>
              <Button
                style={{ fontSize: 16, width: "100%", maxWidth: "100%" }}
                onClick={handleCloseModal}
              >
                Close
              </Button>
            </>
          ) : (
            <>
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
              <ButtonsWrapper>
                <Button
                  disabled={saveLoading.isOn || !userNickname}
                  onClick={handleSave}
                  style={{ marginRight: "10px", flex: 1, fontSize: 16 }}
                >
                  Save for review
                </Button>

                <Button
                  disabled={saveLoading.isOn || !userNickname}
                  name="draft"
                  onClick={handleSave}
                  style={{ marginRight: "10px", flex: 1, fontSize: 16 }}
                >
                  Save as draft
                </Button>
                <Button
                  style={{ fontSize: 16, flex: 1 }}
                  disabled={saveLoading.isOn}
                  onClick={handleCloseModal}
                >
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

export default WorkshopBuilderCreate;
