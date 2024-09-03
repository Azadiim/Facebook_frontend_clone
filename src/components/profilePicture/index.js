import { useEffect, useRef, useState } from "react";
import "./style.css";
import UpdateProfilePicture from "./UpdateProfilePicture";
import useClickOutSide from "../../helpers/clickOutSide";
import { useSelector } from "react-redux";
<<<<<<< HEAD
const ProfilePicture = ({ setShow, ppRef, pics }) => {
=======
const ProfilePicture = ({ setShow, ppRef }) => {
  let photos = {};
  const { pics } = useSelector((pics) => ({ ...pics }));
  if (pics[0].resources && pics[0].resources.length !== 0) {
    photos = pics[0].resources;
  }
  
>>>>>>> 0610212a830c0b772976ce7e7011f93a4c8cc893
  const refInput = useRef(null);
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const refProf = useRef(null);
  useClickOutSide(refProf, () => {
    setShow(false);
  });
  const { user } = useSelector((state) => ({ ...state }));
  const handleImage = (e) => {
    let file = e.target.files[0];
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/webp" && 
      file.type !== "image.gif" &&
      file.type !== "image.png"
    ) {
      setError(`${file.name} format is not supported`);
      return;
    } else if (file.size > 1024 * 1024 * 5) {
      setError("The file is too large. max size 5mb is allowed");
      return;
    }
    console.log(pics[0]);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setImage(event.target.result);
    };
  };

  return (
    <div className="blur">
      <input
        type="file"
        ref={refInput}
        hidden
        onChange={handleImage}
        accept="image/png,image/jpeg,image/gif,image/webp"
      />
      <div className="create_post_box pictureBox" ref={refProf}>
        <div className="div create_post_box_header">
          <span>Update Profile Picture</span>
          <div className="small_circle" onClick={() => setShow(false)}>
            <i className="exit_icon"></i>
          </div>
        </div>
        <div className="update_picture_wrap">
          <div className="update_picture_buttons">
            <div
              className="blue_btn"
              onClick={() => {
                refInput.current.click();
              }}
            >
              <i className="plus_icon filter_blue"></i>
              Upload Photo
            </div>
            <div className="gray_btn">
              <i className="frame_icon"></i>
              Add Frame
            </div>
          </div>
        </div>
        {error && (
          <div className="error_post comment_error">
            <div className="postError_error">{error}</div>
            <button
              className="blue_btn"
              onClick={() => {
                setError("");
              }}
            >
              Try again
            </button>
          </div>
        )}
        <div className="old_picture_wrap">
          <span>Old profile Picture</span>
          <div className="pptuned_profile">
<<<<<<< HEAD
            {pics
              ?.filter(
                (img) => img.folder === `${user.username}/profilePicture`
              )
              .map((photo) => (
                <img
                  onClick={() => setImage(photo.secure_url)}
                  src={photo.secure_url}
                  key={photo.public_id}
                  alt="Old profile pictures"
                  style={{ width: "100px" }}
                />
              ))}
=======
            {photos &&
              photos.length &&
              photos
                .filter(
                  (img) => img.folder === `${user.username}/profilePicture`
                )
                .map((photo) => (
                  <img
                    onClick={() => setImage(photo.secure_url)}
                    src={photo.secure_url}
                    key={photo.public_id}
                    alt="Old profile pictures"
                    style={{ width: "100px" }}
                  />
                ))}
>>>>>>> 0610212a830c0b772976ce7e7011f93a4c8cc893
          </div>
          <div className="splitter"></div>
          <span>Old Other Picture</span>
          <div className="pptuned_non_profile">
            {pics
              ?.filter(
                (img) => img.folder !== `${user.username}/profilePicture`
              )
              .map((photo) => (
                <img
                  onClick={() => setImage(photo.secure_url)}
                  src={photo.secure_url}
                  key={photo.public_id}
                  alt="Old profile pictures"
                  style={{ width: "100px", height: "100px" }}
                />
              ))
              .slice(0, 5)}
          </div>
        </div>
        {image && (
          <UpdateProfilePicture
            setImage={setImage}
            image={image}
            setError={setError}
            setShow={setShow}
            ppRef={ppRef}
          />
        )}
      </div>
    </div>
  );
};

export default ProfilePicture;
