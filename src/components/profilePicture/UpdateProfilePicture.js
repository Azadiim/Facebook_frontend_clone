import { useCallback, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../helpers/getCroppedImg";
import { useDispatch, useSelector } from "react-redux";
import { uploadImages } from "../../functions/uploadImages";
import { updateProf } from "../../functions/user";
import { createPost } from "../../functions/post";
import PulseLoader from "react-spinners/PulseLoader";
import Cookies from "js-cookie";

const UpdateProfilePicture = ({
  setImage,
  image,
  setError,
  setShow,
  ppRef,
}) => {
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const refSlider = useRef(null);
  const { user } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  const handleZoomOut = () => {
    refSlider.current.stepDown();
    setZoom(refSlider.current.value);
  };
  const handleZoomIn = () => {
    refSlider.current.stepUp();
    setZoom(refSlider.current.value);
  };
  const getCroppedImage = useCallback(
    async (show) => {
      try {
        const img = await getCroppedImg(image, croppedAreaPixels);
        if (show) {
          setZoom(1);
          setCrop({ x: 0, y: 0 });
          setImage(img);
        } else {
          return img;
        }
      } catch (error) {
        console.log(error);
      }
    },
    [croppedAreaPixels]
  );
  const updateProfPic = async () => {
    try {
      setLoading(true);
      let img = await getCroppedImage();
      let blobimg = await fetch(img).then((b) => b.blob());
      const path = `${user.username}/profilePicture`;
      let formData = new FormData();
      formData.append("file", blobimg);
      formData.append("path", path);
      const res = await uploadImages(formData, path, user.token);

      const prof_update = await updateProf(res[0].url, user.token);
      if (prof_update === "ok") {
        const newPost = await createPost(
          "profilePicture",
          null,
          description,
          res,
          user.id,
          user.token
        );
        if (newPost === "ok") {
          setLoading(false);
          setImage("");
          ppRef.current.style.backgroundImage = `url(${res[0].url})`;
          Cookies.set(
            "user",
            JSON.stringify({
              ...user,
              picture: res[0].url,
            })
          );
          dispatch({ type: "UPDATEPICTURE", payload: res[0].url });
          setShow(false);
        } else {
          setError(newPost);
        }
      } else {
        setLoading(false);
        setError(prof_update);
      }
    } catch (error) {
      setLoading(false);
      setError(error.response);
    }
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
          <div
            className="gray_btn hover1"
            onClick={() => {
              getCroppedImage("show");
            }}
          >
            <i className="crop_icon"></i>Crop Photo
          </div>
          <div className="gray_btn hover1">
            <i className="temp_icon"></i>Make Temporary
          </div>
        </div>
      </div>
      <div className="comment_profile">Your profile picture is public</div>
      <div className="cancel_save_part">
        <div
          className="save_part"
          disabled={loading}
          onClick={() => setImage("")}
        >
          cancel
        </div>
        <div className="blue_btn" onClick={() => updateProfPic()}>
          {loading ? <PulseLoader color="#fff" size={5} /> : "Save"}
        </div>
      </div>
    </div>
  );
};

export default UpdateProfilePicture;
