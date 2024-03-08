import { ErrorMessage, useField } from "formik";
import "./style.css";
import { useMediaQuery } from "react-responsive";

const LoginInputs = ({ placeholder, bottom, ...props }) => {
  const [field, meta] = useField(props);
  const desktopView = useMediaQuery({
    query: "(min-width:850px)",
  });

  return (
    <div className="input_wrap">
      {meta.touched && meta.error && !bottom && (
        <div
          className={
            desktopView ? "input_error input_error_desktop" : "input_error"
          }
          style={{ transform: "translateY(5px)" }}
        >
          <ErrorMessage name={field.name} />
          <div
            className={desktopView ? "error_arrow_right_1" : "error_arrow_top"}
          ></div>
        </div>
      )}

      <input
        className={meta.touched && meta.error ? "input_error_border" : ""}
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && bottom && (
        <div
          className={
            desktopView ? "input_error input_error_desktop" : "input_error"
          }
        >
          <ErrorMessage name={field.name} />
          <div
            className={
              desktopView
                ? "error_arrow_bottom error_arrow_right_2 "
                : "error_arrow_bottom"
            }
          ></div>
        </div>
      )}
      {meta.touched && meta.error && (
        <i
          className="error_icon"
          style={{ top: `${!bottom && !desktopView ? "63%" : "15px"}` }}
        ></i>
      )}
    </div>
  );
};

export default LoginInputs;
