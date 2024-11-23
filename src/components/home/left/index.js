import LeftLink from "./LeftLink";
import "./style.css";
import { left } from "../../../data/home";
import { Link } from "react-router-dom";
import { ArrowDown1 } from "../../../svg";
import { useState } from "react";
import LeftShortCut from "./LeftShortCut";
import { useMediaQuery } from "react-responsive";

const LeftHome = ({ user }) => {
  const [visible, setVisible] = useState(false);
  const query940px = useMediaQuery({
    query: "(max-width:940px)",
  });
  return (
    <div className={`left_home ${!query940px && "scrollbar"}`}>
      <Link to="profile" className="left_link hover2">
        <img
          src={require("../../../postBackgrounds/default_pic.png")}
          alt="profile_picture"
        />
        <span>
          {user.first_name} {user.last_name}
        </span>
      </Link>
      {left.slice(0, 8).map((link, i) => (
        <LeftLink
          key={i}
          img={link.img}
          text={link.text}
          notification={link.notification}
        />
      ))}
      {!visible && (
        <div
          className="left_link hover1"
          onClick={() => {
            setVisible(true);
          }}
        >
          <div className="small_circle">
            <ArrowDown1 />
          </div>
          <span>See more</span>
        </div>
      )}
      {visible && (
        <div className="more_left">
          {left.slice(0, left.length).map((link, i) => (
            <LeftLink
              key={i}
              img={link.img}
              text={link.text}
              notification={link.notification}
            />
          ))}
          <div
            className="left_link hover1"
            onClick={() => {
              setVisible(false);
            }}
          >
            <div className="small_circle rotate360">
              <ArrowDown1 />
            </div>
            <span>Show less</span>
          </div>
        </div>
      )}
      <div className="splitter"></div>
      <div className="left_link_short">
        <span className="left_link_shortspan1">Your shortcuts</span>
        <span className="left_link_shortspan2">edit</span>
      </div>
      <div className="shortcut_list">
        <div>
        <LeftShortCut
          link="https://www.instagram.com/azad_am88/"
          name="My instagram"
          img={require("../../../postBackgrounds/insta.png")}
        />
        </div>
        <div>
        <LeftShortCut
          link="https://www.instagram.com/azad_am88/"
          name="My YouTube"
          img={require("../../../postBackgrounds/ytb.png")}
        />
        </div>
      </div>
    </div>
  );
};

export default LeftHome;
