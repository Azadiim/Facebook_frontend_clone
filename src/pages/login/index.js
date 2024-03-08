import "./style.css";

import RegisterForm from "../../components/login/RegisterForm";
import LoginForm from "../../components/login/LoginForm";
import { useState } from "react";
const Login = () => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className="login">
      <div className="login_wrapper">
        <LoginForm setIsVisible={setIsVisible} />
        {isVisible && <RegisterForm  setIsVisible={setIsVisible}   />}
      </div>
    </div>
  );
};

export default Login;
