import { Dots, Feeling, Photo } from "../../svg";
const AddToYourPost = ({ setShowPrev }) => {
  return (
    <div className="add_to_your_post">
      <div className="add_left">Add to your post</div>
      <div className="add_right">
        <div
          className="hover1"
          onClick={() => {
            setShowPrev((prev) => !prev);
          }}
        >
          <Photo color="#45bd62" />
        </div>
        <div className="hover1">
          <i className="tag_icon"></i>
        </div>
        <div className="hover1">
          <Feeling color="#f7b928" />
        </div>
        <div className="hover1">
          <i className="maps_icon"></i>
        </div>
        <div className="hover1">
          <i className="microphone_icon"></i>
        </div>
        <div className="hover1">
          <Dots color="#65676b" />
        </div>
      </div>
    </div>
  );
};

export default AddToYourPost;
