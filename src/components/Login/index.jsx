import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { NxtWatchContext } from "../../context/NxtWatchContext";
import {
  LoginPageContainer,
  LoginFormContainer,
  NxtWatchImage,
  UsernameInputFieldContainer,
  LabelElement,
  UsernameInputElement,
  ShowPasswordCheckbox,
  ShowPasswordContainer,
  ShowPasswordLabel,
  LoginButton,
  PrefillMsg,
  ErrorMSg,
} from "./styledComponents";

const Login = () => {
  const [username, setUsername] = useState("rahul");
  const [password, setPassword] = useState("rahul@2021");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { isLightTheme } = useContext(NxtWatchContext);

  const navigate = useNavigate();

  const getUsername = (event) => {
    setUsername(event.target.value);
  };
  const getPassword = (event) => {
    setPassword(event.target.value);
  };
  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const renderUsernameInputField = () => (
    <UsernameInputFieldContainer theme={isLightTheme}>
      <LabelElement htmlFor="username" theme={isLightTheme}>
        USERNAME
      </LabelElement>
      <UsernameInputElement
        type="text"
        id="username"
        placeholder="Username"
        value={username}
        onChange={getUsername}
        theme={isLightTheme}
        autoComplete="true"
      />
    </UsernameInputFieldContainer>
  );

  const renderPasswordInputField = () => (
    <UsernameInputFieldContainer theme={isLightTheme}>
      <LabelElement htmlFor="password" theme={isLightTheme}>
        PASSWORD
      </LabelElement>
      <UsernameInputElement
        type={showPassword ? "text" : "password"}
        id="password"
        placeholder="Password"
        value={password}
        onChange={getPassword}
        theme={isLightTheme}
        autoComplete="true"
      />
      <ShowPasswordContainer>
        <ShowPasswordCheckbox
          type="checkbox"
          id="pwdCheckbox"
          onChange={toggleShowPassword}
        />
        <ShowPasswordLabel htmlFor="pwdCheckbox" theme={isLightTheme}>
          Show Password
        </ShowPasswordLabel>
      </ShowPasswordContainer>
    </UsernameInputFieldContainer>
  );

  return (
    <LoginPageContainer theme={isLightTheme}>
      <LoginFormContainer onSubmit={onFormSubmit} theme={isLightTheme}>
        <NxtWatchImage
          src={
            isLightTheme
              ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              : "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
          }
          alt="website logo"
        />
        {renderUsernameInputField()}
        {renderPasswordInputField()}
        <LoginButton type="submit" theme={isLightTheme}>
          Login
        </LoginButton>
        <PrefillMsg>Login and explore with pre-filled credentials</PrefillMsg>
        {errorMsg && <ErrorMSg>*{errorMsg}</ErrorMSg>}
      </LoginFormContainer>
    </LoginPageContainer>
  );
};
