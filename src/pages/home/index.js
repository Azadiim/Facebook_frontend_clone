import { useEffect, useReducer, useRef, useState } from "react";
import Header from "../../components/header";
import useClickOutSide from "../../helpers/clickOutSide";
import LeftHome from "../../components/home/left";
import { useDispatch, useSelector } from "react-redux";
import RightHome from "../../components/home/right";
import Story from "../../components/home/story";
import CreatePost from "../../components/createPost";
import "./style.css";
import Posts from "../../components/posts/Posts";
import Cookies from "js-cookie";

import axios from "axios";
import { picsReducer } from "../../reducers/userReducer";

const Home = ({ setPostVisible, posts }) => {
  const el = useRef(null);
  const [visible, setVisible] = useState(true);
  const { user } = useSelector((user) => ({ ...user }));
  useClickOutSide(el, () => {
    setVisible(false);
  });
  const dispatch = useDispatch();
  const [pics, setPics] = useState([]);
  useEffect(() => {
    getAllPics();
  }, []);

  const path = `${user.username}/*`;
  const max = 30;
  const sort = "desc";

  const getAllPics = async () => {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/listImages`,
      { path, max, sort },
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );
    setPics(data);
    dispatch({
      type: "DOWNLOAD",
      payload: data,
    });
  };
  console.log("*****************", pics);

  return (
    <>
      <Header page="home" />
      <div className="home">
        <LeftHome user={user} />
        <div className="middle_home">
          <Story />
          <CreatePost user={user} setPostVisible={setPostVisible} />
          <div className="posts">
            {posts.map((post) => (
              <Posts post={post} key={post._id} user={user} />
            ))}
          </div>
        </div>
        <RightHome user={user} />
      </div>
    </>
  );
};

export default Home;
