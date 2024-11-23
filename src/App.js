import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/index";
import Profile from "./pages/profile";
import Home from "./pages/home/index";
import Reset from "./pages/reset";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import Activate from "./pages/home/activate";
import CreatePostPopUp from "./components/createPostPopUp/createPostPopUp";
import { useSelector } from "react-redux";
import { useEffect, useReducer, useRef, useState } from "react";
import axios from "axios";
import { postReducer } from "./functions/reducers";
import Friends from "./pages/friends";
import "./dark.css";

function App() {
  const [postVisible, setPostVisible] = useState(false);
  const { user, darkTheme } = useSelector((state) => ({ ...state }));
  const pageRef = useRef();

  const [{ loading, posts, error }, dispatch] = useReducer(postReducer, {
    loading: false,
    posts: [],
    error: "",
  });
  const getAllPosts = async () => {
    try {
      dispatch({
        type: "POSTS_REQUEST",
      });

      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getAllPosts`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      dispatch({
        type: "POSTS_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "POSTS_ERROR",
        payload: error,
      });
    }
  };
  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div ref={pageRef} className={darkTheme && 'dark'}>
      {postVisible && (
        <CreatePostPopUp
          user={user}
          setPostVisible={setPostVisible}
          pageRef={pageRef}
        />
      )}
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route
            path="/profile"
            element={
              <Profile
                setPostVisible={setPostVisible}
                getAllPosts={getAllPosts}
              />
            }
            exact
          />
          <Route
            path="/profile/:username"
            element={<Profile setPostVisible={setPostVisible} />}
            exact
          />

          <Route path="/activate/:token" element={<Activate />} exact />
          <Route
            path="/"
            element={<Home setPostVisible={setPostVisible} posts={posts} />}
            exact
          />
          <Route
            path="/friends"
            element={<Friends setPostVisible={setPostVisible} />}
            exact
          />

          <Route
            path="/friends/:type"
            element={<Friends setPostVisible={setPostVisible} />}
            exact
          />
        </Route>

        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} exact />
        </Route>
        <Route path="/reset" element={<Reset />} />
      </Routes>
    </div>
  );
}

export default App;
