import { useEffect, useContext } from "react";

import WorkshopBuilder from "../WorkshopBuilder";
import { WorkshopContext } from "../../services/WorkshopContext";

const WokrshopBuilderEdit = () => {
  const puzzleId = 1;
  const { initPuzzle, puzzle } = useContext(WorkshopContext);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    initPuzzle(puzzleId);
  }, []);

  const handleSave = () => {};

  return puzzle && <WorkshopBuilder puzzle={puzzle} handleSave={handleSave} />;
};

export default WokrshopBuilderEdit;
