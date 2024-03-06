import { useContext } from "react";
import { ModalsContext } from "../../services/ModalsContext";

import UpgradeModal from "./UpgradeModal";

const Modals = () => {
  const { upgradeModal } = useContext(ModalsContext);

  return <div>{upgradeModal.isOn && <UpgradeModal />}</div>;
};

export default Modals;
