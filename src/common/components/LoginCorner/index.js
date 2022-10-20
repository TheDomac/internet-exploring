import styled, { keyframes } from "styled-components";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

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

const spin = keyframes`
  0% {
    transform: rotate(0deg); 
  }
  100% {
    transform: rotate(360deg); 
  }
`;

const LoginLoading = styled.div`
  position: fixed;
  top: 25px;
  right: 45px;
  border: 7px solid #f3f3f3;
  border-top: 7px solid #1a744a;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  animation: ${spin} 1s linear infinite;
`;

const shortenString = (string) =>
  string.length > 10 ? `${string.slice(0, 10)}...` : string;

const LoginCorner = ({ redirectAfterLogout = true }) => {
  const { handleLogOutClick, user, loadedAuth } = useContext(AuthContext);
  const { loginModal } = useContext(PaymentContext);
  const navigate = useNavigate();

  const handleClick = () => {
    if (redirectAfterLogout) {
      navigate("/");
    }
    handleLogOutClick();
  };

  if (!loadedAuth.isOn) {
    return <LoginLoading />;
  }

  return user ? (
    <Button title={user.email} onClick={handleClick}>
      <span style={{ fontSize: 16 }}>Sign out</span> <br />{" "}
      <span style={{ fontSize: 12 }}>
        {user.displayName
          ? shortenString(user.displayName)
          : shortenString(user.email)}
      </span>
    </Button>
  ) : (
    <Button title="Sign in" onClick={loginModal.setOn}>
      Sign in
    </Button>
  );
};

export default LoginCorner;
