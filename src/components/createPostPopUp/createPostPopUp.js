import "./style.css";
import { useState, useRef } from "react";
import EmojiPickerBackgrounds from "./EmojiPickerBackgrounds";
import AddToYourPost from "./AddToYourPost";
import AddImages from "./AddImages";
import useClickOutSide from "../../helpers/clickOutSide";
import PulseLoader from "react-spinners/PulseLoader";
import { createPost } from "../../functions/post";
import dataURItoBlob from "../../helpers/dataURItoBlob";
import { uploadImages } from "../../functions/uploadImages";
const CreatePostPopUp = ({ user, setPostVisible }) => {
  const [text, setText] = useState("");
  const [showPrev, setShowPrev] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const textRef = useRef(null);
  const bgRef = useRef(null);
  const postRef = useRef(null);
  const [images, setImages] = useState([]);
  const [background, setBackground] = useState("");
  useClickOutSide(postRef, () => {
    setPostVisible(false);
  });

  const handlePost = async () => {
    if (background) {
      setLoading(true);
      const response = await createPost(
        null,
        background,
        text,
        null,
        user.id,
        user.token
      );
      setLoading(false);
      if (response === "ok") {
        setBackground("");
        setText("");
        setPostVisible(false);
      } else {
        setError(response);
      }
    } else if (images && images.length) {
      setLoading(true);
      const postImages = images.map((image) => {
        return dataURItoBlob(image);
      });
      const path = `${user.username}/postImages`;
      let formData = new FormData();
      formData.append("path", path);
      postImages.forEach((image) => {
        formData.append("file", image);
      });
      const response = await uploadImages(formData, path, user.token);
      await createPost(null, null, text, response, user.id, user.token);
      setLoading(false);
      setText("");
      setImages("");
      setPostVisible(false);
    } else if (text) {
      setLoading(true);
      const response = await createPost(
        null,
        null,
        text,
        null,
        user.id,
        user.token
      );
      setLoading(false);
      if (response === "ok") {
        setBackground("");
        setText("");
        setPostVisible(false);
      } else {
        setError(response);
      }
    } else {
      setPostVisible(false);
    }
  };

  return (
    <div className="blur">
      <div className="create_post_box" ref={postRef}>
        {error && (
          <div className="error_post">
            {error}
            <div
              className="blue_btn"
              onClick={() => {
                setError("");
              }}
            >
              Retry
            </div>
          </div>
        )}
        <div className="create_post_box_header">
          <span className="header_span">Create Post</span>
          <div
            className="small_circle"
            onClick={() => {
              setPostVisible(false);
            }}
          >
            <i className="exit_icon"></i>
          </div>
        </div>
        <div className="postBox_profile">
          <div className="porfile_img">
            <img src={require("../../postBackgrounds/azad.jpg")} />
          </div>
          <div>
            <div className="postBox_name">
              <span>{user?.first_name}</span>
            </div>
            <div className="postBox_public">
              <img src="./icons/public.png" />
              <span>Public</span>
              <i className="arrowDown_icon"></i>
            </div>
          </div>
        </div>
        {!showPrev ? (
          <>
            <div
              className={!background ? "middle_post" : "middle_post bgHandler"}
            >
              <textarea
                style={{
                  paddingTop: `${
                    background
                      ? Math.abs(textRef.current.value.length * 0.1 - 30)
                      : "0"
                  }%`,
                }}
                ref={textRef}
                maxLength="250"
                value={text}
                className="post_input"
                onChange={(e) => {
                  setText(e.target.value);
                }}
                placeholder={`What's in your mind, ${user?.first_name}`}
              ></textarea>
            </div>
            <EmojiPickerBackgrounds
              textRef={textRef}
              text={text}
              setText={setText}
              background={background}
              setBackground={setBackground}
            />
          </>
        ) : (
          <>
            <div className="middle_post_s">
              <textarea
                ref={textRef}
                maxLength="250"
                value={text}
                className="post_input"
                onChange={(e) => {
                  setText(e.target.value);
                }}
                placeholder={`What's in your mind, ${user?.first_name}`}
              ></textarea>
            </div>
            <EmojiPickerBackgrounds
              textRef={textRef}
              text={text}
              setText={setText}
              showPrev={showPrev}
              background={background}
              setBackground={setBackground}
              handlebackground={(background) => setBackground(background)}
            />
            <AddImages
              images={images}
              setImages={setImages}
              setShowPrev={setShowPrev}
            />
          </>
        )}
        <AddToYourPost setShowPrev={setShowPrev} />
        <button
          disabled={loading}
          className="create_post_popup"
          onClick={() => {
            handlePost();
          }}
        >
          {loading ? <PulseLoader size={4} color="#fff" /> : "Post"}
        </button>
      </div>
    </div>
  );
};

export default CreatePostPopUp;
