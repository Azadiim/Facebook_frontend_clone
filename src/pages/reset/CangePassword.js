import { Formik, Form } from "formik";
import LoginInputs from "../../components/inputs/loginInputs";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
const ChangePassword = ({
  password,
  setPassword,
  confPass,
  setConfPass,
  error,
  setError,
  loading,
  setLoading,
  userInfo,
}) => {
  const navigate = useNavigate();
  const validatePass = Yup.object({
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long")
      .max(36, "Password could not be longer than 36 characters"),
    confPass: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "password must match"),
  });
  const { email } = userInfo;
  const changePasswords = async () => {
    try {
      setLoading(true);
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/changePasswords`, {
        email,
        password,
      });

      setLoading(false);
      setError("");
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <div className="reset_form" style={{ height: "340px" }}>
      <div className="reset_form_header">Code Verification</div>
      <div className="reset_form_text">
        Please enter the code that have been sent to your email
        <Formik
          enableReinitialize
          initialValues={{ password, confPass }}
          validationSchema={validatePass}
          onSubmit={() => {
            changePasswords();
          }}
        >
          {(formik) => (
            <Form>
              <LoginInputs
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New password"
              />
              <LoginInputs
                type="password"
                name="confPass"
                onChange={(e) => setConfPass(e.target.value)}
                placeholder="confirm New password"
              />
              {error && <div className="error_text">{error}</div>}
              <div className="reset_form_btns">
                <Link to="/login" className="gray_btn">
                  Cancel
                </Link>
                <button type="submit" className="blue_btn">
                  Continue
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ChangePassword;
