import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { logEvent } from "firebase/analytics";

import { Button } from "../Button.styled";
import { AuthContext } from "../../services/AuthContext";
import { PaymentContext } from "../../services/PaymentContext";
import { CheckboxButton } from "../CheckboxButton.styled";
import { Input } from "../Input.styled";
import Alert from "../Alert.styled";
import { statuses } from "../../consts";
import { analytics } from "../../firebase";
import googleLogo from "../../../images/googleLogo.svg";

const ForgotPasswordButton = styled.button`
  cursor: pointer;
  border: none;
  background: transparent;
  color: white;
  padding: 10px;
  font-family: "Fredoka";
  box-sizing: border-box;
`;

const steps = {
  SIGN_IN: "signIn",
  REGISTER: "register",
  FORGOT_PASSWORD: "forgotPassword",
};

const LoginForm = () => {
  const {
    handleGoogleLoginClick,
    registerUser,
    loginUser,
    registrationStatus,
    logInStatus,
    user,
    resetPassword,
    passwordResetStatus,
  } = useContext(AuthContext);
  const { loginModal } = useContext(PaymentContext);

  useEffect(() => {
    if (user) {
      loginModal.setOff();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    logEvent(analytics, "login_form_shown");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [step, setStep] = useState(steps.SIGN_IN);
  const handleStepChange = (e) => {
    setStep(e.target.name);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    loginUser(data.get("email"), data.get("password"));
  };
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    registerUser(data.get("email"), data.get("password"));
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    resetPassword(data.get("email"));
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Button
        type="button"
        style={{ width: "100%", maxWidth: "100%", marginBottom: 30 }}
        onClick={handleGoogleLoginClick}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "-20px",
          }}
        >
          <img
            style={{
              display: "inline-block",
              marginLeft: 3,
              marginRight: 10,
            }}
            src={googleLogo}
            alt="reddit"
          />
          <span>Sign in with Google</span>
        </div>
      </Button>
      <div style={{ display: "flex", marginBottom: 20 }}>
        <CheckboxButton
          style={{ width: "100%", margin: "0 20px 0 0" }}
          $isChecked={step === steps.SIGN_IN}
          name={steps.SIGN_IN}
          onClick={handleStepChange}
        >
          Sign In
        </CheckboxButton>
        <CheckboxButton
          style={{ width: "100%", margin: 0 }}
          $isChecked={step === steps.REGISTER}
          name={steps.REGISTER}
          onClick={handleStepChange}
        >
          Create new account
        </CheckboxButton>
      </div>
      {step === steps.SIGN_IN && (
        <form onSubmit={handleLoginSubmit}>
          <Input
            style={{ marginTop: 0, marginBottom: 20 }}
            name="email"
            placeholder="Email"
            type="email"
          />
          <Input
            style={{ marginTop: 0, marginBottom: 20 }}
            name="password"
            placeholder="Password"
            type="password"
          />
          <Button
            disabled={logInStatus === statuses.LOADING}
            style={{ width: "100%", maxWidth: "100%", marginBottom: 10 }}
            type="submit"
          >
            Sign in
          </Button>
          {logInStatus === statuses.ERROR && (
            <Alert style={{ marginBottom: 10 }}>
              Sorry, something went wrong.
            </Alert>
          )}
          <ForgotPasswordButton
            style={{ marginTop: 0, marginBottom: 20, fontSize: 18 }}
            name={steps.FORGOT_PASSWORD}
            onClick={handleStepChange}
          >
            Forgot password?
          </ForgotPasswordButton>
        </form>
      )}
      {step === steps.REGISTER && (
        <form onSubmit={handleRegisterSubmit}>
          <Input
            style={{ marginTop: 0, marginBottom: 20 }}
            name="email"
            placeholder="Email"
            type="email"
          />
          <Input
            style={{ marginTop: 0, marginBottom: 20 }}
            name="password"
            placeholder="Password"
            type="password"
          />
          <Button
            disabled={registrationStatus === statuses.LOADING}
            style={{ width: "100%", maxWidth: "100%", marginBottom: 20 }}
            type="submit"
          >
            Create account
          </Button>
          {registrationStatus === statuses.ERROR && (
            <Alert style={{ marginBottom: 10 }}>
              Sorry, something went wrong.
            </Alert>
          )}
        </form>
      )}
      {step === steps.FORGOT_PASSWORD && (
        <form onSubmit={handleForgotPasswordSubmit}>
          <Input
            style={{ marginTop: 0, marginBottom: 20 }}
            name="email"
            placeholder="Your Email"
            type="email"
          />
          <Button
            disabled={passwordResetStatus === statuses.LOADING}
            style={{ width: "100%", maxWidth: "100%", marginBottom: 20 }}
            type="submit"
          >
            Submit
          </Button>
          {passwordResetStatus === statuses.ERROR && (
            <Alert style={{ marginBottom: 10 }}>
              Sorry, something went wrong.
            </Alert>
          )}
          {passwordResetStatus === statuses.SUCCESS && (
            <Alert $type="success" style={{ marginBottom: 10 }}>
              Password reset email sent.
            </Alert>
          )}
        </form>
      )}
    </div>
  );
};

export default LoginForm;
