import { useContext } from "react";
import { useLocation } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { Button } from "../../common/components/Button.styled";
import { CheckboxButton } from "../../common/components/CheckboxButton.styled";
import { Wrapper } from "../../common/components/PuzzleList.styled";

import ArrowBack from "../../common/components/ArrowBack";
import { RIDDLE_STATUSES } from "../../common/consts";
import Alert from "../../common/components/Alert.styled";
import List from "./List";
import { WorkshopContext } from "../../common/services/WorkshopContext";
import LoginCorner from "../../common/components/LoginCorner";

const successAlertText = {
  [RIDDLE_STATUSES.DRAFT]: "Riddle saved successfully.",
  [RIDDLE_STATUSES.NEEDS_APPROVAL]:
    "Riddle submitted for review successfully. You can send an explanation of the riddle to contact@internetexploring.io for faster approval. Make sure that you include the name of the riddle.",
};

const WorkshopMyRiddles = () => {
  const { initPuzzle } = useContext(WorkshopContext);
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const successAlertStatus = params.get("successStatus");

  const handleCreateNewRiddleClick = () => {
    initPuzzle();
    navigate("/play/workshop/new");
  };

  return (
    <>
      <Link to="/play">
        <ArrowBack />
      </Link>
      <LoginCorner />
      <Wrapper
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ maxWidth: 900 }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 15,
          }}
        >
          <Button
            style={{ maxWidth: "100%" }}
            onClick={handleCreateNewRiddleClick}
          >
            Create new riddle
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 15,
          }}
        >
          <Link to="/play/workshop">
            <CheckboxButton style={{ width: 245 }}>Workshop</CheckboxButton>
          </Link>
          <Link to="/play/workshop/my-riddles">
            <CheckboxButton $isChecked style={{ width: 245 }}>
              My riddles
            </CheckboxButton>
          </Link>
        </div>
        {successAlertStatus && (
          <Alert style={{ marginBottom: 15 }} $type="success">
            {successAlertText[successAlertStatus]}
          </Alert>
        )}
        <List />
      </Wrapper>
    </>
  );
};

export default WorkshopMyRiddles;
