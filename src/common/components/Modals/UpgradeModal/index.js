import { useContext, useEffect } from "react";
import Modal from "../../Modal";

import upgradeImage from "./upgradeImage.png"
import { useToggle } from "../../../services/useToggle";
import { Button } from "../../Button.styled";
import { AuthContext } from "../../../services/AuthContext";
import { PaymentContext } from "../../../services/PaymentContext";
import LoginForm from "../../LoginForm";

const UpgradeModal = () => {
    const { user } = useContext(AuthContext)
    const { upgradeModal } = useContext(PaymentContext);
  const loginStep = useToggle()

    const handlePaymentClick = async () => {}

  useEffect(() => {
    if (user) {
        loginStep.setOff()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

    return ( 
<Modal
      isModalShown
    >
      <div style={{ textAlign: "center"}}>
        {
            loginStep.isOn ? (<LoginForm />) : (
            <>
            <img src={upgradeImage} alt="upgrade_img" />

        <p>By upgrading ($3.90) you get the following:</p>
        <p>Access to all existing riddles (20 at the moment) as well as all future riddles that will be added to the list!</p>
        <p>Access to Workshop where you can play riddles made by other players or create your own!</p>

        {user ? <Button  type="button" style={{ maxWidth: "100%", width: "100%", marginBottom: 20 }} onClick={handlePaymentClick}>Upgrade ($3.90)</Button> : <Button  type="button" style={{ maxWidth: "100%", width: "100%", marginBottom: 20 }} onClick={loginStep.setOn}>Log in to continue</Button>}
            </>
          )
        }
        
      
      <Button style={{ maxWidth: "100%", width: "100%" }} onClick={upgradeModal.setOff}>Close</Button>
      </div>    </Modal>

     );
}
 
export default UpgradeModal;