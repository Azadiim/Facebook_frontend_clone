import FadeLoader from "react-spinners/FadeLoader";

const ActivateForm = ({ type, loading, text, header }) => {
  return (
    <div className="blur">
      <div className="popup">
        <div
          className={`popup-header ${
            type === "success" ? "success_text" : "error_text"
          }`}
        >
          {header}
        </div>
        <div className="popup-message">{text}</div>
        <FadeLoader color="#1876f2" loading={loading} size={10} />
      </div>
    </div>
  );
};

export default ActivateForm;
