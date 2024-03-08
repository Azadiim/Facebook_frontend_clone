import LoginInputs from "../inputs/loginInputs/index";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import { useState } from "react";
import * as Yup from "yup";
import FadeLoader from "react-spinners/FadeLoader";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const loginInfo = {
  email: "",
  password: "",
};

const LoginForm = ({ setIsVisible }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, setLogin] = useState(loginInfo);
  const { email, password } = login;
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };
  const loginSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        { email, password }
      );
      if (data) {
        setLoading(false);
      }
      setError("");
      dispatch({ type: "LOGIN", payload: data });
      Cookies.set("user", JSON.stringify(data));
      navigate("/");
    } catch (error) {
      setLoading(false);

      setError(error.response.data.msg);
    }
  };
  const loginValidation = Yup.object({
    email: Yup.string()
      .required("You should enter email or phone number")
      .email("Email must be a valid email address"),
    password: Yup.string().required("Password is necessary").min(4).max(40),
  });
  const handleCreateAccount = () => {
    setIsVisible(true);
  };

  return (
    <div className="login_wrap">
      <div className="login_1">
        <img src="../../icons/facebook.svg" alt="" />
        <span>
          Facebook helps you connect and share with the people in your life
        </span>
      </div>
      <div className="login_2">
        <div className="login_2_wrap">
          <Formik
            enableReinitialize
            initialValues={{ email, password }}
            validationSchema={loginValidation}
            onSubmit={() => {
              loginSubmit();
            }}
          >
            {(formik) => (
              <Form>
                <LoginInputs
                  type="text"
                  name="email"
                  placeholder="Email address or phone number"
                  onChange={handleLoginChange}
                />
                <LoginInputs
                  type="password"
                  name="password"
                  placeholder="password"
                  onChange={handleLoginChange}
                  bottom
                />
                <button type="submit" className="blue_btn">
                  Log In
                </button>
              </Form>
            )}
          </Formik>
          <Link to="/reset" className="forgot_password">
            Forgotten password?
          </Link>
          <FadeLoader color="#1876f2" loading={loading} size={10} />
          {error && <div className="error_text">{error}</div>}
          <div className="sign_splitter"></div>
          <button
            className="blue_btn open_signup"
            onClick={handleCreateAccount}
          >
            Create Account
          </button>
        </div>
        <Link to="/" className="sign-extra">
          <b>Create a Page </b>
          for a celebrity,brand or business.
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
