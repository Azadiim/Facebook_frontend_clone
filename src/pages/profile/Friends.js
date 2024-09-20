import { Link } from "react-router-dom";
const Friends = ({ friends }) => {
  return (
    <div className="photo_collection">
      <div className="photo_header">
        <div className="left">
          <span className="up">friends</span>
          <span className="down">
            {friends && friends?.length === 0
              ? "0 friend"
              : friends?.length === 1
              ? "1 photo"
              : `${friends?.length} friends`}
          </span>
        </div>
        <div className="right">See all friends</div>
      </div>
      <div className="photo_body">
        {friends &&
          friends.slice(0, 9).map((friend, i) => (
            <Link
              to={`/profile/${friend?.username}`}
              reloadDocument
              className="grid_photo"
              key={i}
            >
              <img src={friend?.picture} alt="" />
              <span>
                {friend.first_name} {friend.last_name}
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Friends;
