import React, { useState } from "react";
import Public from "../../svg/public";
import PulseLoader from "react-spinners/PulseLoader";

const Bio = ({
  setShowBio,
  handleBio,
  max,
  handleUpdatedBio,
  name,
  placeholder,
  setShowNic,
  showNic,
  showBio,
  setVisible,
  loading,
  setLoading,
  intro,
  rel,
}) => {
  const color = "#65676b"; //var(--color-secondary)

  const handleShow = () => {
    if (showBio) setShowBio(false);
    if (showNic) setShowNic(false);
    setVisible(0);
  };
  const handleSave = async () => {
    setLoading(true);
    await handleUpdatedBio();
    if (!loading) setShowNic(false);
    if (!loading) setVisible(0);
  };
  return (
    <div className="bio_wrap">
      {rel ? (
        <select name={name} value={intro?.relationship} onChange={handleBio} className="rel_profile">
          <option value="Single">Single</option>
          <option value="Married">Married</option>
          <option value="In a relationship">In a relationship</option>
          <option value="Complicated">Complicated</option>
        </select>
      ) : (
        <textarea
          name={name}
          value={intro?.[name]}
          className="textarea_blue"
          maxLength={max ? max : ""}
          placeholder={placeholder}
          onChange={handleBio}
        ></textarea>
      )}

      {max ? (
        <div className="bio_remaining">{`${max}`} characters remaining</div>
      ) : (
        ""
      )}
      <div className="bio_save">
        <div className="left">
          <Public color={color} />
          <span>Public</span>
        </div>
        <div className="right">
          <button
            className="gray_btn"
            onClick={() => {
              handleShow();
            }}
          >
            Cancel
          </button>
          <button
            className="blue_btn"
            onClick={() => handleSave()}
            disabled={loading}
          >
            {loading ? <PulseLoader color="#fff" size={5} /> : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bio;
