import { useState } from "react";
import { Link } from "react-router-dom";
import SettingsAndPrivacy from "./SettingsAndPrivacy";
import HelpAndSupport from "./HelpAndSupport";
import DisplayAndAccessibility from "./DisplayAndAccessibility";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

const UserMenu = ({ user }) => {
  const [visible, setVisible] = useState(0);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch({
      type: "LOGOUT",
    });
    Cookies.set("user", "");
  };
  return (
    <div className="mmenu">
      {visible === 0 && (
        <div>
          <Link to="/profile" className="mmenu_header hover3">
            <img src={user?.picture} alt="Profile picture" />
            <div className="mmenu_col">
              <span>
                {user.first_name} {user.last_name}
              </span>
              <span> see your profile</span>
            </div>
          </Link>
          <div className="mmenu_splitter"></div>
          <div className="mmenu_main hover3">
            <div className="small_circle">
              <i className="report_filled_icon"></i>
            </div>
            <div className="mmenu_col">
              <div className="mmenu_span1">Give Feedback</div>
              <div className="mmenu_span2">help us improve facebook</div>
            </div>
          </div>
          <div className="mmenu_splitter"></div>
          <div
            className="mmenu_item hover3"
            onClick={() => {
              setVisible(1);
            }}
          >
            <div className="small_circle">
              <i className="settings_filled_icon"></i>
            </div>
            <span>Settings & Privacy</span>
            <div className="rArrow">
              <i className="right_icon"></i>
            </div>
          </div>
          <div
            className="mmenu_item hover3"
            onClick={() => {
              setVisible(2);
            }}
          >
            <div className="small_circle">
              <i className="help_filled_icon"></i>
            </div>
            <span>Help & Support</span>
            <div className="rArrow">
              <i className="right_icon"></i>
            </div>
          </div>
          <div className="mmenu_item hover3" onClick={() => setVisible(3)}>
            <div className="small_circle">
              <i className="dark_filled_icon"></i>
            </div>
            <span>Display & Accessibility</span>
            <div className="rArrow">
              <i className="right_icon"></i>
            </div>
          </div>
          <div className="mmenu_item hover3" onClick={() => handleLogOut()}>
            <div className="small_circle">
              <i className="logout_filled_icon"></i>
            </div>
            <span>Log out</span>
          </div>
        </div>
      )}
      {visible === 1 && <SettingsAndPrivacy setVisible={setVisible} />}
      {visible === 2 && <HelpAndSupport setVisible={setVisible} />}
      {visible === 3 && <DisplayAndAccessibility setVisible={setVisible} />}
    </div>
  );
};

export default UserMenu;
