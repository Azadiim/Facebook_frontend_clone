import { useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";

const CreateComments = ({ user }) => {
  const [picker, setPicker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();
  const [text, setText] = useState("");
  const [error, setError] = useState("Format is not supported");
  const [imageComment, setImageComment] = useState("");
  const textRef = useRef(null);
  const imageRef = useRef(null);
  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);
  const handleEmoji = ({ emoji }) => {
    const ref = textRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
    setCursorPosition(start.length + emoji.length);
  };
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
      setImageComment(event.target.result);
    };
  };
  return (
    <div className="create_comment_wrap">
      <div className="create_comment">
        <img src={user?.picture} alt="" />
        <div className="create_input_wrap">
          {picker && (
            <div className="comment_emoji_picker">
              <Picker onEmojiClick={handleEmoji} />
            </div>
          )}
          <input
            type="file"
            hidden
            ref={imageRef}
            accept="image/jpeg,image/webp,image/png,image/gif"
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
          <input
            type="text"
            ref={textRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a comment..."
          />
          <div
            className="comment_circle_icon hover2"
            onClick={() => setPicker((prev) => !prev)}
          >
            <i className="emoji_icon"></i>
          </div>
          <div
            className="comment_circle_icon hover2"
            onClick={() => {
              imageRef.current.click();
            }}
          >
            <i className="camera_icon"></i>{" "}
          </div>
          <div className="comment_circle_icon hover2">
            <i className="gif_icon"></i>
          </div>
          <div className="comment_circle_icon hover2">
            <i className="sticker_icon"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateComments;
