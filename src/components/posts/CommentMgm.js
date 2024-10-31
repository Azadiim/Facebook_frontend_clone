import React from "react";
import Moment from "react-moment";

const CommentMgm = ({ comment }) => {
  return (
    <div className="comment_mgm">
      <div className="profile_comment">
        <img src={comment?.commentBy?.picture} alt="" />
      </div>
      <div className="comment_block">
        <div className="message_comment">
          <div className="comment_by">
            {comment?.commentBy?.first_name} {comment?.commentBy?.last_name}
          </div>
          {comment?.comment}
        </div>
        {comment.image && (
          <div className="picture_comment">
            <img src={comment?.image} alt="" />
          </div>
        )}
        <div className="like_reply">
          <div className="like">like</div>
          <div className="reply">reply</div>
          <div className="hours_ago">
            {" "}
            <Moment fromNow interval={3600}>
              {comment?.commentAt}
            </Moment>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentMgm;
