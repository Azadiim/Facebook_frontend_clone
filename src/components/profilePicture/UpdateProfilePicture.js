import { useRef, useState } from "react";
import Cropper from "react-easy-crop";

const UpdateProfilePicture = ({ setImage, image }) => {
  const [description, setDescription] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const refSlider = useRef(null);
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
  };
  const handleZoomOut = () => {
    refSlider.current.stepDown();
    setZoom(refSlider.current.value);
  };
  const handleZoomIn = () => {
    refSlider.current.stepUp();
    setZoom(refSlider.current.value);
  };

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
        <div className="cooper">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1 / 1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            cropShape="round"
          />
        </div>
        <div className="slider">
          <div
            className="slider_circle  small_circle hover1"
            onClick={() => {
              handleZoomOut();
            }}
          >
            <i className="minus_icon filter_blue"></i>
          </div>
          <input
            type="range"
            min={1}
            max={3}
            value={zoom}
            step={0.2}
            ref={refSlider}
            onChange={(e) => setZoom(e.target.value)}
          />
          <div
            className="slider_circle small_circle hover1"
            onClick={() => {
              handleZoomIn();
            }}
          >
            <i className="plus_icon filter_blue"></i>
          </div>
        </div>
        <div className="crop_make_part">
          <div className="gray_btn hover1">
            <i className="crop_icon"></i>Crop Photo
          </div>
          <div className="gray_btn hover1">
            <i className="temp_icon"></i>Make Temporary
          </div>
        </div>
      </div>
      <div className="comment_profile">Your profile picture is public</div>
      <div className="cancel_save_part">
        <div className="save_part">cancel</div>
        <div className="blue_btn">save</div>
      </div>
    </div>
  );
};

export default UpdateProfilePicture;
