const ProfileImageInfo = ({ profile }) => {
  return (
    <div className="profile_picture_wrap">
      <div className="profile_left">
        <div className="profile_camera">
          <div
            className="profile_pic"
            style={{
              backgroundSize: "cover",
              backgroundImage: `url(${profile.picture})`,
            }}
          ></div>
          <div className="profile_camera_icon hover_custom">
            <i className="camera_filled_icon"></i>
          </div>
        </div>

        <div className="profile_text">
          <div className="text">
            {profile.first_name} {profile.last_name}
            <div className="othername">Othername</div>
          </div>
          <div className="counter">4 friends</div>
          <div className="followers_pic"></div>
        </div>
      </div>
      <div className="profile_right">
        <div className="blue_btn">
          <img src="https://res.cloudinary.com/dbmrpcjnf/image/upload/v1714497436/pngs/plus_waq7pi.png" alt="" className="invert" />
          <span>Add to Story</span>
        </div>
        <div className="gray_btn">
          <div className="edit_icon"></div>
          <span>Edit Profile</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileImageInfo;