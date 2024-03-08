import { Formik, Form } from "formik";
import LoginInputs from "../../components/inputs/loginInputs";
import { Link } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
const SearchAccount = ({
  email,
  setEmail,
  error,
  setError,
  setLoading,
  setUserInfo,
  setVisible,
}) => {
  const validateEmail = Yup.object({
    email: Yup.string()
      .required("Email address is required")
      .email("You must enter a valid email address"),
  });
  const handleSearch = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/findUser`,
        { email }
      );
      setUserInfo(data);
      setError("");
      setVisible(1);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="reset_form">
      <div className="reset_form_header">Find your account</div>
      <div className="reset_form_text">
        Please enter your email address or phone number to search for your
        account
        <Formik
          enableReinitialize
          initialValues={{ email }}
          validationSchema={validateEmail}
          onSubmit={() => {
            handleSearch();
          }}
        >
          {(formik) => (
            <Form>
              <LoginInputs
                type="text"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address or phone number"
              />
              {error && <div className="error_text">{error}</div>}
              <div className="reset_form_btns">
                <Link to="/login" className="gray_btn">
                  Cancel
                </Link>
                <button type="submit" className="blue_btn">
                  Search
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SearchAccount;
