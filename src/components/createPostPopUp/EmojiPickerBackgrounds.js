import React, { useEffect, useState } from "react";
import Picker from "emoji-picker-react";

const EmojiPickerBackgrounds = ({ textRef, text, setText, showPrev }) => {
  const [picker, setPicker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();
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
  return (
    <div className="post_emoji_wrap">
      {picker && (
        <div className="comment_emoji_picker rlmove">
          <Picker onEmojiClick={handleEmoji} />
        </div>
      )}
      {!showPrev && <img src="./icons/colorful.png"></img>}
      <i
        className={!showPrev ? `emoji_icon_large` : `emoji_icon_large emoji_large_show` }
        onClick={() => {
          setPicker((prev) => !prev);
        }}
      ></i>
    </div>
  );
};

export default EmojiPickerBackgrounds;
