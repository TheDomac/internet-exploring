import styled from "styled-components";
import { useContext } from "react";
import { AuthContext } from "../../services/AuthContext";
import { PaymentContext } from "../../services/PaymentContext";

const Button = styled.button`
cursor: pointer;
position: fixed;
top: 10px;
right: 10px;
border: none;
background: transparent;
color: white;
padding: 10px;
font-family: "Fredoka";
box-sizing: border-box;
`;

const shortenString = (string) => string.length > 10 ? `${string.slice(0, 10)}...` : string

const LoginCorner = () => {
    const { handleLogOutClick, user  } = useContext(AuthContext);
    const {loginModal} = useContext(PaymentContext);

    return user ? (
        <Button title={user.email} onClick={handleLogOutClick}>
          <span style={{ fontSize: 16 }}>Sign out</span> <br />{" "}
          <span style={{ fontSize: 12 }}>{user.displayName ? shortenString(user.displayName) : shortenString(user.email)}</span>
        </Button>
      ) : (
        <Button  title="Sign in" onClick={loginModal.setOn}>
          Sign in
        </Button>
      );
}
 
export default LoginCorner;