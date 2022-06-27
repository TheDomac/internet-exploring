import { useEffect, useContext } from "react";

import WorkshopBuilder from "../WorkshopBuilder";
import { WorkshopContext } from "../../common/services/WorkshopContext";

const WokrshopBuilderEdit = () => {
  const puzzleId = 1;
  const { initPuzzle, puzzle } = useContext(WorkshopContext);

  useEffect(() => {
    initPuzzle(puzzleId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = () => {};

  return puzzle && <WorkshopBuilder puzzle={puzzle} handleSave={handleSave} />;
};

export default WokrshopBuilderEdit;
