import { createCheckoutSession } from "@stripe/firestore-stripe-payments";

import Modal, { ButtonsWrapper} from "../../common/components/Modal";

import upgradeImage from "./upgradeImage.png"
import { useToggle } from "../../common/services/useToggle";
import { Button } from "../../common/components/Button.styled";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../common/services/AuthContext";
import { PaymentContext } from "../../common/services/PaymentContext";
import { payments } from "../../common/firebase";

const UpgradeModal = ({ onClose }) => {
    const { user, handleGoogleLoginClick } = useContext(AuthContext)
    const { priceId } = useContext(PaymentContext);
  const loginStep = useToggle()

    const handlePaymentClick = async () => {
        console.log("starting");
        try {
            const session = await createCheckoutSession(payments, {
                price: priceId,
                success_url: "https://internetexploring.io/play/puzzles",
                cancel_url: "https://internetexploring.io",
              });
              console.log("session", session)
              window.location.assign(session.url);

        } catch (err) {
            console.log("error")
            console.log(err)
        }
    }

  // useEffect(() => {
  //   if (user) {
  //       loginStep.setOff()
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [user])

    return ( 
<Modal
      isModalShown
    >
      <div style={{ textAlign: "center"}}>
        {
            loginStep.isOn ? (
                <>
              <p>Log in with</p>
            <ButtonsWrapper style={{ marginLeft: 17, marginRight: 17, marginBottom: 10}}>
                <Button type="button" style={{ marginRight: 10}} onClick={handleGoogleLoginClick}>Google</Button>
                <Button  type="button">Facebook</Button>
            </ButtonsWrapper></>
          ) : (
            <>
            <img src={upgradeImage} alt="upgrade_img" />

        <p>By upgrading ($3.99) you get the following:</p>
        <p>Access to all existing riddles as well as all future riddles that will be added to the list!</p>
        <p>Access to Workshop where you can play riddles made by other players or create your own!</p>

        {user ? <Button  type="button" style={{ maxWidth: "100%", marginBottom: 20 }} onClick={handlePaymentClick}>Upgrade ($3.99)</Button> : <Button  type="button" style={{ maxWidth: "100%", marginBottom: 20 }} onClick={loginStep.setOn}>Log in to continue</Button>}
            </>
          )
        }
        
      
      <Button style={{ maxWidth: "100%" }} onClick={onClose}>Close</Button>
      </div>
    </Modal>

     );
}
 
export default UpgradeModal;