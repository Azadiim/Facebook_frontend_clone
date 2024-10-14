import { useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";
import { comment } from "../../functions/post";
import PulseLoader from "react-spinners/PulseLoader";
import { uploadImages } from "../../functions/uploadImages";
import dataURItoBlob from "../../helpers/dataURItoBlob";
import CommentMgm from "./CommentMgm";

const CreateComments = ({ user, postId, comments }) => {
  const [picker, setPicker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [count, setCount] = useState(3);
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
  const handleComment = async (e) => {
    try {
      if (e.key === "Enter") {
        if (imageComment && imageComment.length) {
          setLoading(true);
          const img = dataURItoBlob(imageComment);
          const path = `${user.username}/post_images/${postId}`;
          let formData = new FormData();
          formData.append("path", path);
          formData.append("file", img);
          const imgCom = await uploadImages(formData, path, user.token);
          const comments = await comment(
            postId,
            text,
            imgCom[0].url,
            user.token
          );
          setCount((prv) => prv + 1);
          setLoading(false);
          setText("");
          setImageComment("");
        } else {
          setLoading(true);
          const comments = await comment(postId, text, "", user.token);
          setText("");
          setLoading(false);
          setCount((prv) => prv + 1);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const moreCommentHandler = () => {
    setCount(count + 3);
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
            onKeyUp={handleComment}
          />
          {loading && <PulseLoader color="#85c1e9" size={5} />}
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
      {comments && (
        <div>
          {comments
            ?.sort()
            .slice(-count)
            .reverse()
            .map((comment, i) => (
              <CommentMgm comment={comment} key={i} />
            ))}
        </div>
      )}
      {comments && comments.length > count ? (
        <div className="more_comments" onClick={() => moreCommentHandler()}>
          Show More Comments
        </div>
      ) : (
        ""
      )}

      {imageComment && (
        <div className="image_comment_preview">
          <img src={imageComment} alt=""></img>
          <div
            className="small_white_circle"
            onClick={() => {
              setImageComment("");
            }}
          >
            <i className="exit_icon"></i>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateComments;
