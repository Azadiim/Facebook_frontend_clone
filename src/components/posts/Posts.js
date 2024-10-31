import Moment from "react-moment";
import { Link } from "react-router-dom";
import { Dots, Public } from "../../svg";
import "./style.css";
import ReactPopUp from "./ReactPopUp";
import { useRef, useState } from "react";
import CreateComments from "./CreateComments";
import PostMenu from "./PostMenu";
import { useEffect } from "react";
import { createReact, getReact } from "../../functions/post";
const Posts = ({ post, user, profile }) => {
  const [react, setReact] = useState(false);
  const [rcs, setRcs] = useState();
  const [showMenu, setShowMenu] = useState(false);
  const [check, setCheck] = useState("");
  const [total, setTotal] = useState(0);
  const [checkSaved, setCheckSaved] = useState();
  const postRef = useRef(null);
  useEffect(() => {
    getPostReacts();
  }, [post]);

  const getPostReacts = async () => {
    const res = await getReact(post._id, user.token);
    setRcs(res?.react);
    setCheck(res?.check);
    setTotal(res?.total);
    setCheckSaved(res?.checkSaved);
  };

  const reactHandler = async (type) => {
    await createReact(post._id, type, user.token);
    if (check === type) {
      setCheck();
    } else {
      setCheck(type);
    }
  };

  return (
    <div
      className="post"
      style={{ width: `${profile && "100%"}` }}
      ref={postRef}
    >
      <div className="post_header">
        <Link
          to={`/profile/${post?.user?.username}`}
          className="post_header_left"
        >
          <img src={post?.user?.picture} alt="" />
          <div className="profile_name">
            <div className="name">
              {post?.user?.first_name} {post?.user?.last_name}
              <div className="updated_p">
                {post.type === "profilePicture" &&
                  `updated ${
                    post?.user?.gender === "male" ? "his" : "her"
                  } profile picture`}
                {post.type === "coverPicture" &&
                  `updated ${
                    post?.user?.gender === "male" ? "his" : "her"
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
            <img src={post?.user?.cover} alt="" />
          </div>
          {post.images && (
            <img src={post.images[0].url} alt="" className="post_profile_bg" />
          )}
        </div>
      ) : (
        <div className="profile_picture_cover">
          <img src={post.images[0].url} alt="" />
        </div>
      )}
      <div className="reacts_share">
        <div className="to_left">
          <div className="react_count_img">
            {rcs &&
              rcs
                .slice(0, 3)
                .map(
                  (react, i) =>
                    react.count > 0 && (
                      <img src={`./reacts/${react.react}.svg`} alt="" key={i} />
                    )
                )}
          </div>
          <div className="react_count_num">{total > 0 && total}</div>
        </div>
        <div className="to_right">
          <span className="post_comments">{post.comments.length} comments</span>
          <span className="post_share">1share</span>
        </div>
      </div>
      <div className="reacts_like">
        <ReactPopUp
          react={react}
          setReact={setReact}
          reactHandler={reactHandler}
        />
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
          onClick={() => {
            reactHandler(check ? check : "like");
          }}
        >
          {check ? (
            <img
              src={`./reacts/${check}.svg`}
              alt=""
              style={{ width: "16px" }}
            />
          ) : (
            <i className="like_icon"></i>
          )}
          <span
            style={{
              color: `${
                check === "like"
                  ? "#4267b2"
                  : check === "love"
                  ? "#f63459"
                  : check === "angry"
                  ? "#e4605a"
                  : "f7b125"
              }`,
            }}
          >
            {check ? check : "Like"}
          </span>
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
        <CreateComments
          user={user}
          postId={post?._id}
          comments={post.comments}
        />
      </div>
      {showMenu && (
        <PostMenu
          userId={user.id}
          postId={post?.user?._id}
          imagePost={post?.images?.length}
          setShowMenu={setShowMenu}
          token={user.token}
          pId={post._id}
          checkSaved={checkSaved}
          setCheckSaved={setCheckSaved}
          images={post.images}
          postRef={postRef}
        />
      )}
    </div>
  );
};

export default Posts;
