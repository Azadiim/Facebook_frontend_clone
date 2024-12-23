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

import axios from "axios";

const Home = ({ setPostVisible, posts }) => {
  const el = useRef(null);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(true);
  const { user } = useSelector((state) => ({ ...state }));
  useClickOutSide(el, () => {
    setVisible(false);
  });

  const [pics, setPics] = useState([]);

  useEffect(() => {
    getAllPics();
  }, []);

  const path = `${user.username}/*`;
  const max = 30;
  const sort = "desc";

  const getAllPics = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/listImages`,
        { path, max, sort },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      
      dispatch({
        type: "DOWNLOAD",
        payload: data,
      });
    } catch (error) {
      console.log(
        "error form home page which have some problem in getting posts",
        error
      );
    }
  };

  return (
    <>
      <Header page="home" />
      <div className="home">
        <LeftHome user={user} />
        <div className="middle_home">
          <Story />
          <CreatePost user={user} setPostVisible={setPostVisible} />
          <div className="posts">
            {posts.map((post,i) => (
              <Posts post={post ? post : ''} key={i} user={user} />
            ))}
          </div>
        </div>
        <RightHome user={user} />
      </div>
    </>
  );
};

export default Home;
