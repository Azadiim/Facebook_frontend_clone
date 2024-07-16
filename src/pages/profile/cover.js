import React, { useCallback, useEffect, useRef, useState } from "react";
import useClickOutSide from "../../helpers/clickOutSide";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../helpers/getCroppedImg";
import Public from "../../svg/public";

const Cover = ({ cover, yourPage }) => {
  const [showUpdateCover, setShowUpdateCover] = useState(false);
  const [coverPicture, setCoverPicture] = useState("");
  const [error, setError] = useState("");
  const coverRef = useRef(null);
  const refCoverIn = useRef(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
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
  const getCroppedImage = useCallback(
    async (show) => {
      try {
        const img = await getCroppedImg(coverPicture, croppedAreaPixels);
        if (show) {
          setZoom(1);
          setCrop({ x: 0, y: 0 });
          setCoverPicture(img);
        } else {
          return img;
        }
      } catch (error) {
        console.log(error);
      }
    },
    [croppedAreaPixels]
  );
  const refCrooped = useRef(null);
  const [width, setWidth] = useState(null);
  useEffect(() => {
    setWidth(refCrooped.current.clientWidth);
  }, [window.innerWidth]);

  return (
    <div className="profile_cover" ref={refCrooped}>
      {coverPicture && (
        <div className="cover_save_changes">
          <div className="cover_left">
            <Public />
            <span>your cover picture is public</span>
          </div>
          <div className="cover_right">
            <button className="blue_btn opacity_btn">cancel</button>
            <button className="blue_btn ">save changes</button>
          </div>
        </div>
      )}
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
      {coverPicture && (
        <div className="cover_crooper">
          <Cropper
            image={coverPicture}
            crop={crop}
            zoom={zoom}
            aspect={width / 350}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            objectFit="horizontal-cover"
            showGrid={true}
          />
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
