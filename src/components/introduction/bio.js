import React from "react";
import Public from "../../svg/public";

const Bio = ({ setShowBio, handleBio, max, handleUpdatedBio }) => {
 
  const color = "#65676b"; //var(--color-secondary)

  return (
    <div className="bio_wrap">
      <textarea
        name="bio"
        className="textarea_blue"
        maxLength={100}
        placeholder="programming is cool"
        onChange={handleBio}
      ></textarea>
      <div className="bio_remaining">{`${max}`} characters remaining</div>
      <div className="bio_save">
        <div className="left">
          <Public color={color} />
          <span>Public</span>
        </div>
        <div className="right">
          <button
            className="gray_btn"
            onClick={() => {
              setShowBio(false);
            }}
          >
            Cancel
          </button>
          <button className="blue_btn" onClick={() => handleUpdatedBio()}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bio;
