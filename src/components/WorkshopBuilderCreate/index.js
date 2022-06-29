import { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import Modal, { ButtonsWrapper, Text } from "../../common/components/Modal";
import { useToggle } from "../../common/services/useToggle";
import { db } from "../../common/firebase";
import { LOCAL_STORAGE_KEYS, RIDDLE_STATUSES } from "../../common/consts";
import { Button } from "../../common/components/Button.styled";
import { AuthContext } from "../../common/services/AuthContext";
import Alert from "../../common/components/Alert.styled";
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

const WokrshopBuilderCreate = () => {
  const { initPuzzle, puzzle } = useContext(WorkshopContext);
  const { user, handleLoginClick } = useContext(AuthContext);

  const saveModal = useToggle();
  const saveLoading = useToggle();
  const saveError = useToggle();
  const navigate = useNavigate();

  const [userNickname, setUserNickname] = useState(initialUserNickname || "");
  const [userSocialMediaURL, setUserSocialMediaURL] = useState(
    initialUserSocialMediaURL || ""
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      uid: user.uid,
      status,
      userNickname,
      userSocialMediaURL,
      deniedReason: null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    try {
      saveLoading.setOn();
      saveError.setOff();
      await addDoc(collection(db, "workshopPuzzles"), newPuzzle);
      saveLoading.setOff();
      navigate(`/play/workshop/my-riddles`);
    } catch (error) {
      console.log(error);
      saveError.setOn();
      saveLoading.setOff();
    }
  };

  return (
    puzzle && (
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
                        style={{ marginRight: "10px" }}
                      >
                        Save as draft
                      </Button>
                      <Button
                        disabled={saveLoading.isOn || !userNickname}
                        onClick={handleSave}
                        style={{ marginRight: "10px" }}
                      >
                        Save
                      </Button>
                    </>
                  ) : (
                    <Button
                      style={{ marginRight: "10px" }}
                      onClick={handleLoginClick}
                    >
                      Log in
                    </Button>
                  )}
                  <Button
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
        <WorkshopBuilder puzzle={puzzle} handleSave={saveModal.setOn} />
      </>
    )
  );
};

export default WokrshopBuilderCreate;
