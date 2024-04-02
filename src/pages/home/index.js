import { useRef, useState } from "react";
import Header from "../../components/header";
import useClickOutSide from "../../helpers/clickOutSide";
import LeftHome from "../../components/home/left";
import { useSelector } from "react-redux";
import RightHome from "../../components/home/right";
import Story from "../../components/home/story";
import CreatePost from "../../components/createPost";
import "./style.css";
import Posts from "../../components/posts/Posts";

const Home = ({ setPostVisible, posts }) => {
  const el = useRef(null);
  const [visible, setVisible] = useState(true);
  const { user } = useSelector((user) => ({ ...user }));
  useClickOutSide(el, () => {
    setVisible(false);
  });

  return (<>
  <Header />
  <div className="home">
      <LeftHome user={user} />
      <div className="middle_home">
        <Story />
        <CreatePost user={user} setPostVisible={setPostVisible} />
        <div className="posts">
          {posts.map((post) => (
            <Posts post={post} key={post._id} />
          ))}
        </div>
      </div>
      <RightHome user={user} />
    </div>
    </>
  );
};

export default Home;
