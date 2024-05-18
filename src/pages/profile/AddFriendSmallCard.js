import { Friends } from "../../svg";

const AddFriendSmallCard = ({ item }) => {
  return (
    <div className="add_friend_card">
      <div className="add_friend_imgsmall">
        <img src={item.profile_picture} alt="" />
        <div className="item_profile_name">
          {item.profile_name.length < 12
            ? item.profile_name
            : item.profile_name.slice(0, 11) + "..."}
        </div>
        <div className="add_friend">
          {" "}
          <i className="friends_suggestions_icon filter_blue"></i> Add Friend
        </div>
      </div>
    </div>
  );
};

export default AddFriendSmallCard;
