import { useContext } from "react";
import { AuthContext } from "../../services/AuthContext";
import { PaymentContext } from "../../services/PaymentContext";

import UpgradeModal from "./UpgradeModal";
import LoginModal from "./LoginModal";

const Modals = () => {
  const { upgradeModal, loginModal } = useContext(PaymentContext);
  // const { loginModal } = useContext(AuthContext);

  return (
    <div>
      {upgradeModal.isOn && <UpgradeModal />}
      {loginModal.isOn && <LoginModal />}
    </div>
  );
};

export default Modals;
