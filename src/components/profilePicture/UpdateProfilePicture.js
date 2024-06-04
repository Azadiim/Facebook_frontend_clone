import { useState } from "react";

const UpdateProfilePicture = ({ setImage }) => {
  const [description, setDescription] = useState("");
  return (
    <div className="create_post_box update_img">
      <div className="div create_post_box_header">
        <span>Update Profile Picture</span>
        <div
          className="small_circle"
          onClick={() => {
            setImage("");
          }}
        >
          <i className="exit_icon"></i>
        </div>
      </div>
      <div className="update_image_description">
        <textarea
          className="textarea_blue details_input"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="update_center">
        <div className="cooper"></div>
      </div>
    </div>
  );
};

export default UpdateProfilePicture;
