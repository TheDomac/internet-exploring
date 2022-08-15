import styled from "styled-components";
import { useContext } from "react";
import { AuthContext } from "../../services/AuthContext";

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

const LoginCorner = () => {
    const { handleLogOutClick, user } = useContext(AuthContext);

    return user ? (
        <Button title={user.email} onClick={handleLogOutClick}>
          <span style={{ fontSize: 16 }}>Log out</span> <br />{" "}
          <span style={{ fontSize: 12 }}>{user.displayName}</span>
        </Button>
      ) : (
        <Button title="Login" onClick={() => {}}>
          Login
        </Button>
      );
}
 
export default LoginCorner;