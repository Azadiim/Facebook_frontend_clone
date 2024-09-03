import React, { useRef } from "react";
import { useSelector } from "react-redux";
import useClickOutSide from "../../helpers/clickOutSide";

const OldPic = ({ setOldPic, setCoverPicture, setShowUpdateCover }) => {
  const { pics } = useSelector((pics) => ({ ...pics }));
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
        <div className="cover_info">Old Profile Pictures</div>
        <div className="oldPic_cover_profile">
          {pics[0]?.resources.filter((img) => img.folder === `${user.username}/profilePicture`)
            .slice(0, 10)
            .map((photo) => (
              <img
                onClick={() => handleClick(photo)}
                src={photo.secure_url}
                key={photo.public_id}
                alt="Old profile pictures"
                style={{ width: "100px" }}
              />
            ))}
        </div>
        <div className="splitter"></div>
        <div className="cover_info">Old Cover Pictures</div>
        <div className="oldPic_cover_cover">
          {pics[0]?.resources.filter((img) => img.folder === `${user.username}/coverPicture`)
            .slice(0, 10)
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
