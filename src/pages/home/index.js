import { useRef, useState } from "react";
import Header from "../../components/header";
import useClickOutSide from "../../helpers/clickOutSide";
import LeftHome from "../../components/home/left";
import { useSelector } from "react-redux";
import RightHome from "../../components/home/right";
import Story from "../../components/home/story";
import CreatePost from "../../components/createPost";
import "./style.css";

const Home = ({setPostVisible}) => {
  const el = useRef(null);
  const [visible, setVisible] = useState(true);
  const { user } = useSelector((user) => ({ ...user }));
  useClickOutSide(el, () => {
    setVisible(false);
  });

  return (
    <div className="home">
      <Header />
      <LeftHome user={user} />
      <div className="middle_home">
        <Story />
        <CreatePost user={user} setPostVisible={setPostVisible} />
      </div>
      <RightHome user={user} />
    </div>
  );
};

export default Home;
