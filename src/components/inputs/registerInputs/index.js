import { ErrorMessage, useField } from "formik";
import "./style.css";
import { useMediaQuery } from "react-responsive";

const RegisterInputs = ({ placeholder, bottom, ...props }) => {
  const [field, meta] = useField(props);
  const view1 = useMediaQuery({
    query: "(min-width:539px)",
  });
  const view2 = useMediaQuery({
    query: "(min-width:850px)",
  });
  const view3 = useMediaQuery({
    query: "(min-width:1170px)",
  });
  const test1 = view3 && field.name === "first_name";
  const test2 = view3 && field.name === "last_name";

  return (
    <div className="input_wrap register_input_wrap">
      <input
        className={meta.touched && meta.error ? "input_error_border" : ""}
        // style={{width:`${view1 ? "100%" :"300px"} `}}
        style={{
          width: `${
            view1 && (field.name === "first_name" || field.name === "last_name")
              ? "100%"
              : view1 && (field.name === "email" || field.name === "password")
              ? "370px"
              : "300px"
          } `,
        }}
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && (
        <div
        //  className={view3 ? "input_error input_error_desktop" : "input_error"}
         
          className={
            test1
          ? "input_error input_error_desktop view3_error_right"
          : test2
            ? "input_error input_error_desktop view3_error_left"
            : "input_error"
          }
        >
          <ErrorMessage name={field.name} />
          <div
            className={
              test1
                ? "error_register_left"
                : test2
                ? "error_register_right"
                : "error_arrow_bottom"
            }
          ></div>
        </div>
      )}
      {meta.touched && meta.error && (
        <i
          style={{
            right: `${!view1 ? "10%" : "15px"}`,
            top: `${!view1 ? "15%" : "15px"}`,
          }}
          className="error_icon"
        ></i>
      )}
    </div>
  );
};

export default RegisterInputs;

