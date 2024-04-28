import React, { useRef, useState } from "react";
import useClickOutSide from "../../helpers/clickOutSide";

const Cover = ({ cover }) => {
  const [showUpdateCover, setShowUpdateCover] = useState(false);
  const coverRef = useRef(null);
  useClickOutSide(coverRef, () => {
    setShowUpdateCover(false);
  });
  return (
    <div className="profile_cover">
      {cover && <img src={cover} className="cover" alt="" />}
      <div className="update_cover_wrapper" ref={coverRef}>
        <div
          className="open_cover"
          onClick={() => {
            setShowUpdateCover((prev) => !prev);
          }}
        >
          <i className="camera_filled_icon"></i>
          Add cover photo
        </div>
        {showUpdateCover && (
          <div className="open_cover_menu ">
            <div className="open_cover_menu_item hover1 ">
              <i className="photo_icon"></i>
              Select photo
            </div>
            <div className="open_cover_menu_item hover1 ">
              <i className="upload_icon"></i>
              Upload photo
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cover;
