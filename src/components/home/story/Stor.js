import React from "react";

const Stor = ({ story }) => {
  return (
    <div className="stor">
      <div className="stor_image">
        <img src={story.image} alt="profile pic" />
      </div>
      <div className="stor_profile_image">
        <img src={story.profile_picture} alt="profile pic" />
      </div>
      <div className="stor_profile_name">{story.profile_name}</div>
    </div>
  );
};

export default Stor;
