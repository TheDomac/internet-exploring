import { useContext, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { doc, getDoc } from "firebase/firestore";

import Modal, { ButtonsWrapper, Text } from "../../common/components/Modal";
import { useToggle } from "../../common/services/useToggle";
import { db } from "../../common/firebase";
import {
  LOCAL_STORAGE_KEYS,
  RIDDLE_STATUSES,
  workshopCollectionName,
  clueTypes,
} from "../../common/consts";
import { Button } from "../../common/components/Button.styled";
import { AuthContext } from "../../common/services/AuthContext";
import Alert from "../../common/components/Alert.styled";
import ArrowBack from "../../common/components/ArrowBack";
import CommonPuzzle from "../../common/components/Puzzle";
import WorkshopBuilder from "../WorkshopBuilder";
import { WorkshopContext } from "../../common/services/WorkshopContext";
import getImageClueValues from "../../common/services/getImageClueValues";
import uploadImages from "../../common/services/uploadImages";
import deleteImages from "../../common/services/deleteImages";
import { PaymentContext } from "../../common/services/PaymentContext";

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
  const { user } = useContext(AuthContext);
  const { loginModal } = useContext(PaymentContext);
  const params = useParams();
  const saveModal = useToggle();
  const saveLoading = useToggle();
  const saveError = useToggle();
  const preview = useToggle();
  const fetchingError = useToggle();
  const oldPuzzle = useRef();

  const [userNickname, setUserNickname] = useState(initialUserNickname || "");
  const [userSocialMediaURL, setUserSocialMediaURL] = useState(
    initialUserSocialMediaURL || ""
  );

  const fetchAndInitPuzzle = async () => {
    try {
      const docRef = doc(db, workshopCollectionName, params.riddleId);
      const docSnap = await getDoc(docRef);
      const fetchedPuzzle = { id: docSnap.id, ...docSnap.data() };
      oldPuzzle.current = fetchedPuzzle;
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

    const imageClueValues = getImageClueValues(puzzle.rebuses);
    const oldImageClueValues = getImageClueValues(oldPuzzle.current.rebuses);

    const imagesToUpload = imageClueValues.filter(
      (cv) => !oldImageClueValues.find((ocv) => ocv.id === cv.id)
    );
    const imagesToDelete = oldImageClueValues.filter(
      (ocv) => !imageClueValues.find((cv) => cv.id === ocv.id)
    );
    try {
      saveLoading.setOn();
      saveError.setOff();
      const uploadedImages = await uploadImages(imagesToUpload, user.uid);

      const newPuzzle = {
        ...puzzle,
        status,
        userNickname,
        userSocialMediaURL,
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
              );
              return foundUploadedImage?.downloadURL
                ? {
                    ...cv,
                    value: foundUploadedImage.downloadURL,
                  }
                : cv;
            }),
          })),
        })),
      };

      await setDoc(doc(db, workshopCollectionName, puzzle.id), newPuzzle);
      await deleteImages(imagesToDelete, user.uid);
      saveLoading.setOff();
      navigate(`/play/workshop/my-riddles?successStatus=${status}`);
    } catch (error) {
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
        <Modal isModalShown={saveModal.isOn} onClose={saveModal.setOff}>
          <Text>{!user && "Please sign in first to save your riddle."}</Text>
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
                    onClick={loginModal.setOn}
                  >
                    Sign in
                  </Button>
                )}
                <Button
                  style={{ fontSize: 16 }}
                  disabled={saveLoading.isOn}
                  onClick={saveModal.setOff}
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

export default WorkshopBuilderEdit;
