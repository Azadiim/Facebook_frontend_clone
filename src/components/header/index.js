import "./style.css";
import { Link } from "react-router-dom";
import {
  Friends,
  Gaming,
  HomeActive,
  Home,
  Logo,
  Market,
  Search,
  Watch,
  Menu,
  Messenger,
  Notifications,
  ArrowDown,
} from "../../svg";
import { useSelector } from "react-redux";
import SearchMenu from "./SearchMenu";
import { useRef, useState } from "react";
import AllMenu from "./AllMenu";
import useClickOutSide from "../../helpers/clickOutSide";
import UserMenu from "./userMenu";

const Header = ({ page }) => {
  const { user } = useSelector((user) => ({ ...user }));
  const color = "#65676b";
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [showAllMenu, setShowAllMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const allmenu = useRef(null);
  const userMenu = useRef(null);
  useClickOutSide(allmenu, () => {
    setShowAllMenu(false);
  });
  useClickOutSide(userMenu, () => {
    setShowUserMenu(false);
  });
  return (
    <header>
      <div className="header_left">
        <Link to="/" className="header_logo">
          <div className="circle">
            <Logo />
          </div>
        </Link>
        <div
          className="search search1"
          onClick={() => {
            setShowSearchMenu(true);
          }}
        >
          <Search color={color} />
          <input
            type="text"
            placeholder="Search Facebook"
            className="hide_input"
          />
        </div>
      </div>
      {showSearchMenu && (
        <SearchMenu setShowSearchMenu={setShowSearchMenu} color={color} />
      )}
      <div className="header_middle">
        <Link
          to="/"
          className={`middle_icon hover1 ${page === "home" ? "active" : ""}`}
        >
          {page === "home" ? <HomeActive /> : <Home color={color} />}
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Friends color={color} />
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Watch color={color} />
          <div className="middle_notification">+9</div>
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Market color={color} />
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Gaming color={color} />
        </Link>
      </div>
      <div className="header_right">
        <Link
          to="/profile"
          className={`profile_link hover1 ${
            page === "profile" ? "profile_active" : ""
          }`}
        >
          <img src={user?.picture} alt="" />
          <span>{user?.first_name}</span>
        </Link>
        <div
          className={`circle_icon hover1 ${showAllMenu && "header_active"}`}
          ref={allmenu}
        >
          <div
            onClick={() => {
              setShowAllMenu((prev) => !prev);
            }}
          >
            <Menu />
          </div>

          {showAllMenu && <AllMenu />}
        </div>
        <div className="circle_icon hover1">
          <Messenger />
        </div>
        <div className="circle_icon hover1">
          <Notifications />
          <div className="right_notification">3</div>
        </div>
        <div
          className={`circle_icon hover1 ${showUserMenu && "header_active"}`}
          ref={userMenu}
        >
          <div
            onClick={() => {
              setShowUserMenu((prev) => !prev);
            }}
          >
            {" "}
            <ArrowDown />
          </div>
          {showUserMenu && <UserMenu user={user} />}
        </div>
      </div>
    </header>
  );
};

export default Header;
