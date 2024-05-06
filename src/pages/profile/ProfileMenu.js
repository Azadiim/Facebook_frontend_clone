import { Link } from "react-router-dom";
import { Dots } from "../../svg";

const ProfileMenu = () => {
  return (
    <div className="profile_menu">
      <div className="left_menu">
        <Link to="/" className="active profile_menu_active">
          Posts
        </Link>
        <Link to="/" className="hover1">
          About
        </Link>
        <Link to="/" className="hover1">
          Friends
        </Link>
        <Link to="/" className="hover1">
          Photos
        </Link>
        <Link to="/" className="hover1">
          Videos
        </Link>
        <Link to="/" className="hover1">
          Check-Ins
        </Link>
        <Link className="hover1">
          <span className="arrow_span">
            More<i className="arrowDown_icon"></i>
          </span>
        </Link>
      </div>
      <div className="right_menu">
        <div className="dot10 hover1">
          {" "}
          <Dots />
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
