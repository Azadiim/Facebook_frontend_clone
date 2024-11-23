import { Link } from "react-router-dom";
import {
  acceptRequest,
  cancelRequest,
  deleteRequest,
} from "../../functions/user";
import { useSelector } from "react-redux";

const FriendsCard = ({ userr, type, getData }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const handleAcceptFriend = async (userId) => {
    const res = await acceptRequest(userId, user.token);
    if (res == "ok") {
      getData();
    }
  };

  const handleDeleteFriend = async (userId) => {
    const res = await deleteRequest(userId, user.token);
    if (res == "ok") {
      getData();
    }
  };

  const handleCancelRequest = async (userId) => {
    const res = await cancelRequest(userId, user.token);
    if (res == "ok") {
      getData();
    }
  };

  return (
    <div className="inside_card">
      <Link to={`/profile/${userr?.username}`} className="picture_inside">
        {userr?.picture && <img src={userr?.picture} alt="profile " />}
      </Link>
      <div className="name">
        {userr?.first_name} {userr?.last_name}
      </div>
      {type === "req" ? (
        <div className="req_buttons">
          <div
            className="blue_btn hvr1"
            onClick={() => handleAcceptFriend(userr._id)}
          >
            Accept
          </div>
          <div
            className="gray_btn hvr1"
            onClick={() => handleDeleteFriend(userr._id)}
          >
            Delete
          </div>
        </div>
      ) : type === "sent" ? (
        <div className="req_buttons">
          <div
            className="gray_btn hvr1"
            onClick={() => handleCancelRequest(userr._id)}
          >
            Cancel
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default FriendsCard;
