import { useState } from "react";
import { RoutesEnum } from "../../routsEnum";
import LoginForm from "../../components/Client/LoginForm";
import "../../styles/Client.css";
function Login() {
  return (
   /* <section className="page">*/
    <section className="d-flex justify-content-center align-items-center vh-100">
      <LoginForm />
    </section>
  );
}
export default Login;
