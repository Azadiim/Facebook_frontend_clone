import "./style.css";
import { useState, useRef } from "react";
import EmojiPickerBackgrounds from "./EmojiPickerBackgrounds";
import AddToYourPost from "./AddToYourPost";
import AddImages from "./AddImages";
const CreatePostPopUp = ({ user }) => {
  const [text, setText] = useState("");
  const [showPrev, setShowPrev] = useState(false);
  const textRef = useRef(null);
  const bgRef = useRef(null);
  const [images, setImages] = useState([]);
  const [background, setBackground] = useState("");
  console.log(background);

  return (
    <div className="blur">
      <div className="create_post_box">
        <div className="create_post_box_header">
          <span className="header_span">Create Post</span>
          <div className="small_circle">
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
                      ? Math.abs(textRef.current.value.length *.1 - 30)
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
        <button className="create_post_popup">Post</button>
      </div>
    </div>
  );
};

export default CreatePostPopUp;
