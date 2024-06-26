import "./style.css";
import "./../../../src/svg";
import { Feeling, LiveVideo, Photo } from "./../../../src/svg";

const CreatePost = ({ user, setPostVisible, profile }) => {
  return (
    <div className="create_post">
      <div className="header_post">
        <div className="header_profile">
          {/* <img src="./../../../public/stories/profile2.jpg" /> */}
          <img src={require("./../../postBackgrounds/azad.jpg")} />
        </div>
        <div
          className="header_text "
          onClick={() => {
            setPostVisible(true);
          }}
        >
          Whats on your mind, {user.first_name}
        </div>
      </div>
      <div className="post_splitter "></div>
      <div className="post_activity">
        <div className="activity_item hover1">
          <LiveVideo color="#f3425f" />
          Live Video
        </div>
        <div className="activity_item hover1">
          <Photo color="#4bbf67" />
          Photo/Video
        </div>
        {profile ? (
          <div className="activity_item hover1">
            <i className="lifeEvent_icon"></i>
            Life Event
          </div>
        ) : (
          <div className="activity_item hover1">
            <Feeling color="#f7b928" />
            Feeling Activity
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePost;
