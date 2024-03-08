import axios from "axios";
import { Link } from "react-router-dom";

const SendEmail = ({
  userInfo,
  email,
  setError,
  setLoading,
  setVisible,
  error,
}) => {
  const handleSendCode = async () => {
    try {
      setLoading(true);
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/sendResetPasswordCode`,
        { email }
      );
      setError("");
      setVisible(2);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <div className="reset_form dynamic_hills">
      <div className="reset_form_header">Reset Your Password</div>
      <div className="reset_body_password">
        <div className="left_reset_pass">
          <span className="span_pass_header">
            How do you want to receive the code to reset your password
          </span>
          <label className="label_col" htmlFor="email">
            <input type="radio" name="" id="email" checked readOnly />
            <div className="span_pass">
              <span>Send code via email</span>
              <span>{userInfo.email}</span>
            </div>
          </label>
        </div>
        <div className="right_reset_pass">
          <img src={require("../../postBackgrounds/default_pic.png")} />
          <span>{userInfo.email}</span>
          <span>Facebook User</span>
        </div>
      </div>
      {error && (
        <div className="error_text" style={{ padding: "10px" }}>
          {error}
        </div>
      )}
      <div className="reset_form_btns">
        <Link to="/login" className="gray_btn">
          Not You?
        </Link>
        <button
          type="text"
          className="blue_btn"
          onClick={() => {
            handleSendCode();
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default SendEmail;
