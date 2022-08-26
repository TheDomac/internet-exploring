import { useContext } from "react";

import Modal from "../../Modal";
import LoginForm from "../../LoginForm";
import { Button } from "../../Button.styled";
import { PaymentContext } from "../../../services/PaymentContext";

const LoginModal = () => {
  const { loginModal } = useContext(PaymentContext);

  return (
    <Modal isModalShown>
      <LoginForm />

      <Button
        style={{ maxWidth: "100%", width: "100%" }}
        onClick={loginModal.setOff}
      >
        Close
      </Button>
    </Modal>
  );
};

export default LoginModal;
