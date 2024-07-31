import React, { useRef } from "react";
import { useSelector } from "react-redux";
import useClickOutSide from "../../helpers/clickOutSide";

const OldPic = ({ photos, setOldPic, setCoverPicture, setShowUpdateCover }) => {
  const handleClick = (photo) => {
    setOldPic(false);
    setCoverPicture(photo.secure_url);
    setShowUpdateCover(false);
  };
  const refOld = useRef(null);
  useClickOutSide(refOld, () => {
    setOldPic(false);
  });
  const { user } = useSelector((state) => ({ ...state }));
  return (
    <div className="blur">
      <div className="create_post_box pictureBox" ref={refOld}>
        <div className="create_post_box_header">
          <span>Previous Old Pictures</span>
          <div className="small_circle_white" onClick={() => setOldPic(false)}>
            <i className="exit_icon"></i>
          </div>
        </div>
        <div className="oldPic_cover">
          {photos.resources &&
            photos.resources
              .filter((img) => img.folder === `${user.username}/profilePicture`)
              .slice(1, 10)
              .map((photo) => (
                <img
                  onClick={() => handleClick(photo)}
                  src={photo.secure_url}
                  key={photo.public_id}
                  alt="Old profile pictures"
                  style={{ width: "100px" }}
                />
              ))}
          {photos.resources && console.log("mmmmm",photos.resources)}
          {photos.resources &&
            photos.resources
              .filter((img) => img.folder === `${user.username}/coverPicture`)
              .slice(1, 10)
              .map((photo) => (
                <img
                  src={photo.secure_url}
                  key={photo.public_id}
                  alt="Old profile pictures"
                  style={{ width: "100px" }}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default OldPic;
