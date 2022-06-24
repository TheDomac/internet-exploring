import { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import Modal, {
  ButtonsWrapper,
  Text,
} from "@rebus-mono/common/src/components/Modal";
import { useToggle } from "@rebus-mono/common/src/services/useToggle";
import { db } from "@rebus-mono/common/src/firebase";
import { LOCAL_STORAGE_KEYS } from "@rebus-mono/common/src/consts";
import { Button } from "@rebus-mono/common/src/components/Button.styled";
import { AuthContext } from "@rebus-mono/common/src/services/AuthContext";

import WorkshopBuilder from "../WorkshopBuilder";
import { WorkshopContext } from "../../services/WorkshopContext";

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

const WokrshopBuilderCreate = () => {
  const { initPuzzle, puzzle } = useContext(WorkshopContext);
  const { user, handleLoginClick } = useContext(AuthContext);

  const saveModal = useToggle();
  const saveLoading = useToggle();
  const saveError = useToggle();
  const navigate = useNavigate();

  const [userNickname, setUserNickname] = useState(initialUserNickname || "");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    initPuzzle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUserNicknameChange = (e) => {
    setUserNickname(e.target.value);
  };

  const handleSave = async (e) => {
    const isDraft = e.target.name === "draft";
    const collectionName = isDraft ? "workshopPuzzlesDraft" : "workshopPuzzles";

    localStorage.setItem(LOCAL_STORAGE_KEYS.USER_NICKNAME, userNickname);
    const puzzleWithUserNickname = {
      ...puzzle,
      userNickname,
    };

    try {
      saveLoading.setOn();
      saveError.setOff();
      await addDoc(collection(db, collectionName), puzzleWithUserNickname);
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
              <div
                style={{
                  padding: 10,
                  boxSizing: "border-box",
                  color: "white",
                  background: "#b74848",
                }}
              >
                Sorry, something went wrong.
              </div>
            ) : (
              <>
                {user && (
                  <StyledInput
                    type="text"
                    value={userNickname}
                    onChange={handleUserNicknameChange}
                    placeholder="Your nickname"
                  />
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
