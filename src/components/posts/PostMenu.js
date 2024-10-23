import { useEffect, useRef, useState } from "react";
import PostMenuItem from "./PostMenuItem";
import useClickOutSide from "../../helpers/clickOutSide";
import { savePost } from "../../functions/post";
const PostMenu = ({
  userId,
  postId,
  imagePost,
  setShowMenu,
  token,
  pId,
  checkSaved,
  setCheckSaved,
}) => {
  const [test, setTest] = useState(userId === postId ? true : false);
  const [save, setSave] = useState();
  useEffect(() => {
    if (savePost(pId, token)) {
      console.log("true");
    } else {
      console.log("false");
    }
  });

  const menuRef = useRef(null);
  const handleSave = async () => {
    await savePost(pId, token);
    if (checkSaved) {
      setCheckSaved(false);
    } else setCheckSaved(true);
  };

  useClickOutSide(menuRef, () => {
    setShowMenu(false);
  });
  return (
    <ul className="post_menu_wrap" ref={menuRef}>
      {test && <PostMenuItem icon="pin_icon" title="Pin code" />}
      <div onClick={() => handleSave()}>
        {!checkSaved ? (
          <PostMenuItem
            icon="save_icon"
            title="Save Post"
            subtitle="add this to your saved items"
          />
        ) : (
          <PostMenuItem
            icon="unsave_icon"
            title="unSave Post"
            subtitle="remove this to your saved items"
          />
        )}
      </div>
      <div className="line"></div>
      {!test && (
        <PostMenuItem
          icon="turnOnNotification_icon"
          title="Turn on notifications for this post"
        />
      )}

      {test && <PostMenuItem icon="edit_icon" title="Edit Post" />}
      {imagePost && <PostMenuItem icon="download_icon" title="Download" />}
      {imagePost && (
        <PostMenuItem icon="fullscreen_icon" title="enter fullscreen" />
      )}
      {!test && <div className="line"></div>}
      {!test && (
        <PostMenuItem
          img="https://res.cloudinary.com/dbmrpcjnf/image/upload/v1713105074/ihanamiri/postImages/lock_zak3dh.png"
          title="report post"
          subtitle="I'm concerned about this post"
        />
      )}
      {test && (
        <PostMenuItem
          img="https://res.cloudinary.com/dbmrpcjnf/image/upload/v1713105074/ihanamiri/postImages/lock_zak3dh.png"
          title="Edit Audience"
        />
      )}
      {test && (
        <PostMenuItem
          icon="turnOffNotifications_icon"
          title="Turn off notifications for this post"
        />
      )}
      {test && (
        <PostMenuItem icon="delete_icon" title="Turn off translations" />
      )}
      {test && <PostMenuItem icon="date_icon" title="Edit date" />}
      {test && (
        <PostMenuItem icon="refresh_icon" title="Refresh share attachments" />
      )}
      {test && <PostMenuItem icon="archive_icon" title="Move to archive" />}
      {test && (
        <PostMenuItem
          icon="trash_icon"
          title="Move to trash"
          subtitle="Items in the trash will delete after 30 days."
        />
      )}
      {test && <div className="line"></div>}
    </ul>
  );
};

export default PostMenu;
