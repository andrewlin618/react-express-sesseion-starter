import React, {useEffect} from "react";
import Nav from "../../components/Nav";
import LoginWindow from "../../components/LoginWindow.js";

const LoginPage = () => {
  useEffect(() => {
    document.title = 'login page'
  })
  return (
    <>
      <Nav active="login"/>
      <h1>This is LoginPage</h1>
      <LoginWindow />
    </>
  );
};
export default LoginPage;
