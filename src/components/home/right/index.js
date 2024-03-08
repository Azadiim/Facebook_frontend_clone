import "./style.css";
import { NewRoom, Dots, Search } from "../../../svg";
import Contact from "./Contact";

const RightHome = ({ user }) => {
  const color = "#65676b";
  return (
    <div className="right_wrap">
      <div className="sponsor">Sponsored</div>
      <div className="splitter"></div>
      <div className="contact">
        <div className="contact_header">
          <div className="contact_header_left">Contacts</div>
          <div className="contact_header_right">
            <div className="contact_circle">
              <NewRoom color={color} />
            </div>
            <div className="contact_circle">
              <Search color={color} />
            </div>
            <div className="contact_circle">
              <Dots color={color} />
            </div>
          </div>
        </div>
        <div className="contact_body">
          <Contact user={user} />
        </div>
      </div>
    </div>
  );
};

export default RightHome;
