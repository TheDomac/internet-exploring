import { useContext, useState, useEffect } from "react";
import styled from "styled-components";

import Modal, { ButtonsWrapper } from "../../common/components/Modal";
import { useToggle } from "../../common/services/useToggle";
import {
  LOCAL_STORAGE_KEYS,
  RIDDLE_STATUSES,
} from "../../common/consts";
import { Button } from "../../common/components/Button.styled";
import Alert from "../../common/components/Alert.styled";
import ArrowBack from "../../common/components/ArrowBack";
import CommonPuzzle from "../../common/components/Puzzle";
import WorkshopBuilder from "../WorkshopBuilder";
import { WorkshopContext } from "../../common/services/WorkshopContext";
import { AuthContext } from "../../common/services/AuthContext";

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

const initialUserSocialMediaURL = localStorage.getItem(
  LOCAL_STORAGE_KEYS.USER_SOCIAL_MEDIA_URL
);

const WorkshopBuilderCreate = () => {
  const { initPuzzle, puzzle } = useContext(WorkshopContext);
  const { user } = useContext(AuthContext);

  const saveModal = useToggle();
  const saveLoading = useToggle();
  const saveError = useToggle();
  const preview = useToggle();

  const [userNickname, setUserNickname] = useState(user.nickname);
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
      uid: user.id,
      status,
      userNickname,
      userSocialMediaURL,
      message: "",
    };

    console.log("newPuzzle")
    console.log(newPuzzle)
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
