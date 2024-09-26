import React, { useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";

const EmojiPickerBackgrounds = ({
  textRef,
  text,
  setText,
  showPrev,
  background,
  setBackground,
  handlebackground,
}) => {
  const [picker, setPicker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();
  const [showBg, setShowBg] = useState(false);

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
  const handleBg = (i) => {
    setBackground(postBackgrounds[i]);
    textRef.current.style.backgroundImage = `url(${postBackgrounds[i]})`;
  };
  const handleNoBg = () => {
    textRef.current.style.backgroundImage = "";
    setBackground("");
  };

  const postBackgrounds = [
    require("./postBackgrounds/1.jpg"),
    require("./postBackgrounds/2.jpg"),
    require("./postBackgrounds/3.jpg"),
    require("./postBackgrounds/4.jpg"),
    require("./postBackgrounds/5.jpg"),
    require("./postBackgrounds/6.jpg"),
    require("./postBackgrounds/7.jpg"),
    require("./postBackgrounds/8.jpg"),
    require("./postBackgrounds/9.jpg"),
  ];

  return (
    <div className="post_emoji_wrap">
      {picker && (
        <div className="comment_emoji_picker rlmove">
          <Picker onEmojiClick={handleEmoji} />
        </div>
      )}
      {!showPrev && (
        <img
          src="./icons/colorful.png"
          onClick={() => {
            setShowBg((prev) => !prev);
          }}
          alt=""
        />
      )}
      {showBg && (
        <div className="post_background_picker">
          <div className="no_backgrounds" onClick={handleNoBg}></div>
          {postBackgrounds.map((bg, i) => (
            <img
              src={bg}
              key={i}
              onClick={() => {
                handleBg(i);
              }}
              alt=""
            />
          ))}
        </div>
      )}

      <i
        className={
          !showPrev ? `emoji_icon_large` : `emoji_icon_large emoji_large_show`
        }
        onClick={() => {
          setPicker((prev) => !prev);
        }}
      ></i>
    </div>
  );
};

export default EmojiPickerBackgrounds;
