import { useRef, useState } from "react";
import ProfilePicture from "../../components/profilePicture";

const ProfileImageInfo = ({ profile, yourPage, photos }) => {
  const [show, setShow] = useState(false);
  const ppRef = useRef(null);
  return (
    <div className="profile_picture_wrap">
      <div className="profile_left">
        {show && <ProfilePicture setShow={setShow} ppRef={ppRef} />}
        <div className="profile_camera" onClick={() => setShow(true)}>
          <div
            className="profile_pic"
            ref={ppRef}
            style={{
              backgroundSize: "cover",
              backgroundImage: `url(${profile.picture})`,
            }}
          ></div>
          {yourPage && (
            <div className="profile_camera_icon hover_custom">
              <i className="camera_filled_icon"></i>
            </div>
          )}
        </div>

        <div className="profile_text">
          <div className="text">
            {profile.first_name} {profile.last_name}
            <div className="othername">{profile?.details?.otherName}</div>
          </div>
          <div className="counter">4 friends</div>
          <div className="followers_pic"></div>
        </div>
      </div>
      {yourPage ? (
        <div className="profile_right">
          <div className="blue_btn">
            <img
              src="https://res.cloudinary.com/dbmrpcjnf/image/upload/v1714497436/pngs/plus_waq7pi.png"
              alt=""
              className="invert"
            />
            <span>Add to Story</span>
          </div>
          <div className="gray_btn">
            <div className="edit_icon"></div>
            <span>Edit Profile</span>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProfileImageInfo;
