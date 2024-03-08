import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import SearchAccount from "./SearchAccount";
import SendEmail from "./SendEmail";
import CodeVerification from "./CodeVerification";
import ChangePassword from "./CangePassword";

const Reset = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confPass, setConfPass] = useState("");
  const [visible, setVisible] = useState(0);
  const [userInfo, setUserInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogOut = () => {
    Cookies.set("user", "");
    dispatch({
      type: "LOGOUT",
    });
    navigate("/login");
  };
  return (
    <div className="reset">
      <div className="reset_header">
        <img src="../../../icons/facebook.svg" />
        {user ? (
          <div className="right_reset">
            <Link to="/profile">
              <img
                src={require("../../postBackgrounds/default_pic.png")}
                alt="pic"
              />
            </Link>
            <button className="blue_btn" onClick={() => handleLogOut()}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="right_reset">
            <button className="blue_btn"> Login</button>
          </Link>
        )}
      </div>
      <div className="reset_wrap">
        {visible === 0 && (
          <SearchAccount
            email={email}
            error={error}
            setError={setError}
            setEmail={setEmail}
            setLoading={setLoading}
            setUserInfo={setUserInfo}
            setVisible={setVisible}
          />
        )}
        {visible === 1 && (
          <SendEmail
            userInfo={userInfo}
            email={email}
            setError={setError}
            setLoading={setLoading}
            setVisible={setVisible}
            error={error}
          />
        )}
        {visible === 2 && (
          <CodeVerification
            error={error}
            code={code}
            setCode={setCode}
            userInfo={userInfo}
            email={email}
            setError={setError}
            setLoading={setLoading}
            setVisible={setVisible}
          />
        )}
        {visible === 3 && (
          <ChangePassword
            password={password}
            setPassword={setPassword}
            confPass={confPass}
            setConfPass={setConfPass}
            error={error}
            setCode={setCode}
            userInfo={userInfo}
            setError={setError}
            setLoading={setLoading}
            setVisible={setVisible}
          />
        )}
      </div>
    </div>
  );
};

export default Reset;
