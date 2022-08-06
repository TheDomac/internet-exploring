import { useContext} from "react";
import { getProducts } from "@stripe/firestore-stripe-payments";

import { AuthContext } from "../../common/services/AuthContext";
import { PaymentContext } from "../../common/services/PaymentContext";
import PuzzleList from "./PuzzleList";
import { payments } from "../../common/firebase";
const USER_PAID_FULL_LIST = false;

const PuzzleListPage = () => {

  const {stripePromise} = useContext(PaymentContext);
  const fetchProducts = async () => {
    console.log("before payments")
    console.log(payments)
    console.log("before products")
    const products = await getProducts(payments, {
      includePrices: true,
      activeOnly: true,
    });
    console.log(products)
    console.log("after products")
  }

  const {
    user,
    handleLoginClick
  } = useContext(AuthContext);

  if (user && USER_PAID_FULL_LIST) {
    return <PuzzleList />
  }

  if (!user) {
    return <button type="button" onClick={handleLoginClick}>login</button>
  }
  return <div>

      <div>weeeeeeeeeee</div>
      <button type="button" onClick={fetchProducts}>Submit</button>
  </div>
}
 
export default PuzzleListPage;