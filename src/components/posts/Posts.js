import Moment from "react-moment";
import { Link } from "react-router-dom";
import { Dots, Public } from "../../svg";
import "./style.css";
import ReactPopUp from "./ReactPopUp";
import { useState } from "react";
import CreateComments from "./CreateComments";
import PostMenu from "./PostMenu";
import { useEffect } from "react";
import { getReact } from "../../functions/post";
const Posts = ({ post, user, profile }) => {
  const [react, setReact] = useState(false);
  const [rcs, setRcs] = useState();
  const [showMenu, setShowMenu] = useState(false);
  const [check, setCheck] = useState();
  useEffect(() => {
    getPostReacts();
  }, [post]);

  const getPostReacts = async () => {
    const res = await getReact(post._id, user.token);
    setRcs(res.react);
    setCheck(res.check);
  };
  return (
    <div className="post" style={{ width: `${profile && "100%"}` }}>
      <div className="post_header">
        <Link
          to={`/profile/${post.user.username}`}
          className="post_header_left"
        >
          <img src={post.user.picture} alt="" />
          <div className="profile_name">
            <div className="name">
              {post.user.first_name} {post.user.last_name}
              <div className="updated_p">
                {post.type === "profilePicture" &&
                  `updated ${
                    post.user.gender === "male" ? "his" : "her"
                  } profile picture`}
                {post.type === "coverPicture" &&
                  `updated ${
                    post.user.gender === "male" ? "his" : "her"
                  } cover picture`}
              </div>
            </div>
            <div className="date">
              <Moment fromNow interval={3600}>
                {post.createdAt}
              </Moment>
              . <Public color="#828387" />
            </div>
          </div>
        </Link>
        <div
          className="post_header_right hover1"
          onClick={() => {
            setShowMenu((prev) => !prev);
          }}
        >
          <Dots color="#828387" />
        </div>
      </div>
      {post.background ? (
        <div
          className="post_bg"
          style={{ backgroundImage: `url(${post.background})` }}
        >
          <div className="post_bg_text">{post.text}</div>
        </div>
      ) : post.type === null ? (
        <>
          <div className="post_text">{post.text}</div>
          {post.images && post.images.length && (
            <div
              className={
                post.images.length === 1
                  ? "grid_1"
                  : post.images.length === 2
                  ? "grid_2"
                  : post.images.length === 3
                  ? "grid_3"
                  : post.images.length === 4
                  ? "grid_4"
                  : "grid_5"
              }
            >
              {post.images.slice(0, 5).map((image, i) => (
                <img src={image.url} key={i} className={`img-${i}`} alt="" />
              ))}
              {post.images.length > 5 && (
                <div className="more-pics-shadow">
                  +{post.images.length - 5}
                </div>
              )}
            </div>
          )}
        </>
      ) : post.type === "profilePicture" ? (
        <div className="profile_picture_wrap">
          <div className="post_cover_bg">
            <img src={post.user.cover} alt="" />
          </div>
          {post.images && (
            <img src={post.images[0].url} alt="" className="post_profile_bg" />
          )}
        </div>
      ) : (
        <div className="profile_picture_cover">
          <img src={post.images[0].url} />
        </div>
      )}
      <div className="reacts_share">
        <div className="to_left">
          <div className="react_count_img"></div>
          <div className="react_count_num"></div>
        </div>
        <div className="to_right">
          <span className="post_comments">1comments</span>
          <span className="post_share">1share</span>
        </div>
      </div>
      <div className="reacts_like">
        <ReactPopUp react={react} setReact={setReact} postId={post._id} />
        <div
          className="like hover1"
          onMouseOver={() => {
            setTimeout(() => {
              setReact(true);
            }, 500);
          }}
          onMouseLeave={() => {
            setTimeout(() => {
              setReact(false);
            }, 500);
          }}
        >
          {check ? (
            <img src={`./reacts/${check}.svg`} alt="" style={{'width':'16px'}} />
          ) : (
            <i className="like_icon"></i>
          )}
          <span>like</span>
        </div>
        <div className="comment hover1 ">
          <i className="comment_icon"></i>
          <span>comment</span>
        </div>
        <div className="share hover1 ">
          <i className="share_icon"></i>
          <span>share</span>
        </div>
      </div>
      <div className="comments_wrap">
        <div className="comments_order"></div>
        <CreateComments user={user} />
      </div>
      {showMenu && (
        <PostMenu
          userId={user.id}
          postId={post.user._id}
          imagePost={post?.images?.length}
          setShowMenu={setShowMenu}
        />
      )}
    </div>
  );
};

export default Posts;
