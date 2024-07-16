import React, { useRef, useState } from "react";
import useClickOutSide from "../../helpers/clickOutSide";

const Cover = ({ cover, yourPage }) => {
  const [showUpdateCover, setShowUpdateCover] = useState(false);
  const [coverPicture, setCoverPicture] = useState("");
  const [error, setError] = useState("");
  const coverRef = useRef(null);
  const refCoverIn = useRef(null);
  useClickOutSide(coverRef, () => {
    setShowUpdateCover(false);
  });
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

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setCoverPicture(event.target.result);
    };
  };
  console.log(coverPicture);

  return (
    <div className="profile_cover">
      <input
        type="file"
        hidden
        accept="image/png,image/gif,image/webp,image/jpeg"
        ref={refCoverIn}
        onChange={handleImage}
      />
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
      {cover && <img src={cover} className="cover" alt="" />}
      {yourPage && (
        <div className="update_cover_wrapper">
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
            <div className="open_cover_menu">
              <div className="pay_attention_after" ref={coverRef}>
                <div className="open_cover_menu_item hover1">
                  <i className="photo_icon"></i>
                  Select photo
                </div>
                <div
                  className="open_cover_menu_item hover1"
                  onClick={() => {
                    refCoverIn.current.click();
                  }}
                >
                  <i className="upload_icon"></i>
                  Upload photo
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cover;
