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
          {console.log(profile.picture)}
          <div className="profile_camera_icon"></div>
        </div>
        
        <div className="profile_text">
          <div className="text"></div>
          <div className="counter"></div>
          <div className="followers_pic"></div>
        </div>
      </div>
      <div className="profile_right"></div>
    </div>
  );
};

export default ProfileImageInfo;
