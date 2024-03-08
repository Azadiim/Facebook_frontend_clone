import { Form, Formik } from "formik";
import RegisterInputs from "../inputs/registerInputs";
import { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import DateOfBirthSelect from "./DateOfBirthSelect";
import GenderSelect from "./GenderSelect";
import FadeLoader from "react-spinners/FadeLoader";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const RegisterForm = ({ setIsVisible }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    bYear: new Date().getFullYear(),
    bDay: new Date().getDate(),
    bMonth: new Date().getMonth() + 1,
    gender: "",
  };

  const [user, setUser] = useState(userInfo);
  const [dateError, setDateError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    first_name,
    last_name,
    email,
    password,
    bYear,
    bDay,
    bMonth,
    gender,
  } = user;
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleClosingForm = () => {
    setIsVisible(false);
  };
  const hardcodedYear = new Date().getFullYear();
  const years = Array.from(
    new Array(109),
    (value, index) => hardcodedYear - index
  );
  const months = Array.from(new Array(12), (value, index) => 1 + index);
  const getDays = () => {
    return new Date(bYear, bMonth, 0).getDate();
  };
  const days = Array.from(new Array(getDays()), (value, index) => 1 + index);
  console.log(user);
  const registerValidation = Yup.object({
    first_name: Yup.string()
      .required("What is your first name?")
      .min(3, "the first name must be at least 3 characters")
      .max(16, "the first name must be at most 16 characters")
      .matches(
        /^[aA-zZ\s]+$/, //-->\s is for accepting spaces
        "your first name should not have spaces or special characters"
      ),
    last_name: Yup.string()
      .required("What is your last name?")
      .min(3, "the last name must be at least 3 characters")
      .max(16, "the last name must be at most 16 characters")
      .matches(
        /^[aA-zZ\s]+$/, //-->\s is for accepting spaces
        "your first name should not have spaces or special characters"
      ),
    email: Yup.string()
      .required("the email is necessary")
      .email("Your email address must be valid"),
    password: Yup.string()
      .required("the password is necessary")
      .min(6, "Your password must at least 6 characters")
      .max(36, "the password must be at most 36 characters"),
  });
  const registerSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/register`,
        {
          first_name,
          last_name,
          email,
          password,
          bYear,
          bDay,
          bMonth,
          gender,
        }
      );
      if (data) {
        setLoading(false);
      }
      setError("");
      setSuccess(data.message);
      const { message, ...rest } = data;
      setTimeout(() => {
        dispatch({ type: "LOGIN", payload: rest });
        Cookies.set("user", JSON.stringify(rest));
        navigate("/");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setError(error.response.data.message);
    }
  };

  return (
    <div className="blur">
      <div className="register">
        <div className="register_header">
          <i className="exit_icon" onClick={handleClosingForm}></i>
          <span className="signup">Sign Up </span>
          <span>it's quick and easy </span>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            first_name,
            last_name,
            email,
            password,
            bYear,
            bDay,
            bMonth,
            gender,
          }}
          validationSchema={registerValidation}
          onSubmit={() => {
            let currentDate = new Date();
            let pickDate = new Date(bYear, bMonth - 1, bDay);
            let atleast14 = new Date(1970 + 14, 0, 1);
            let atmost70 = new Date(1970 + 70, 0, 1);
            if (currentDate - pickDate < atleast14) {
              setDateError("It's looks like you entered wrong info!");
            } else if (currentDate - pickDate > atmost70) {
              setDateError("It's looks like you entered wrong info!");
            } else if (gender === "") {
              setDateError("");
              setGenderError(
                "You must select a gender. You can change it later if you want!"
              );
            } else {
              setDateError("");
              setGenderError("");
              registerSubmit();
            }
          }}
        >
          {(formik) => (
            <Form className="register_form">
              <div className="reg_line">
                <RegisterInputs
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  onChange={handleRegisterChange}
                />
                <RegisterInputs
                  type="text"
                  name="last_name"
                  placeholder="Surname"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInputs
                  type="text"
                  name="email"
                  placeholder="Mobile Number or email address"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInputs
                  type="password"
                  name="password"
                  placeholder="New password"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  date of birth <i className="info_icon"></i>
                </div>
                <DateOfBirthSelect
                  bDay={bDay}
                  bMonth={bMonth}
                  bYear={bYear}
                  days={days}
                  years={years}
                  months={months}
                  handleRegisterChange={handleRegisterChange}
                  dateError={dateError}
                />
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  gender <i className="info_icon"></i>
                </div>
                <GenderSelect
                  handleRegisterChange={handleRegisterChange}
                  genderError={genderError}
                />
              </div>
              <div className="reg_col">
                <div className="reg_infos">
                  {" "}
                  some information that a am to tired to copy them!
                </div>
              </div>
              <div className="reg_btn_wrapper">
                <button className="blue_btn open_signup" type="submit">
                  Sign Up
                </button>
              </div>
              <FadeLoader color="#1876f2" loading={loading} size={10} />
              {error && <div className="error_text">{error}</div>}
              {success && <div className="success_text">{success}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterForm;
