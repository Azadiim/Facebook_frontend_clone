import { Formik, Form } from "formik";
import LoginInputs from "../../components/inputs/loginInputs";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
const CodeVerification = ({
  code,
  setCode,
  error,
  setError,
  setLoading,
  userInfo,
  setVisible,
}) => {
  const codeValidate = Yup.object({
    code: Yup.string()
      .required("Code is neccessary")
      .max("5", "The code is a number with 5 digits")
      .min("5", "The code is a number with 5 digits"),
  });
  const { email } = userInfo;
  const codeVerifyHandler = async () => {
    try {
      setLoading(true);
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/resetCodeValidations`,
        { email, code }
      );
      setLoading(false);
      setError("");
      setVisible(3);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <div className="reset_form">
      <div className="reset_form_header">Code Verification</div>
      <div className="reset_form_text">
        Please enter the code that have been sent to your email
        <Formik
          enableReinitialize
          initialValues={{ code }}
          validationSchema={codeValidate}
          onSubmit={() => {
            codeVerifyHandler();
          }}
        >
          {(formik) => (
            <Form>
              <LoginInputs
                type="text"
                name="code"
                onChange={(e) => setCode(e.target.value)}
                placeholder="Code"
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

export default CodeVerification;
