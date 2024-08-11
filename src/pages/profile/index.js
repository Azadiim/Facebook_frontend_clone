import { useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { profileReducer } from "../../functions/reducers";
import Header from "../../components/header";
import axios from "axios";
import CreatePost from "../../components/createPost/index";
import "./style.css";

import Cover from "./cover";
import ProfileImageInfo from "./ProfileImageInfo";
import ProfileMenu from "./ProfileMenu";
import PplYouMayKnow from "./PplYouMayKnow";
import GridPosts from "./GridPosts";
import Posts from "../../components/posts/Posts";
import Photos from "./Photos";
import Friends from "./Friends";
import Intro from "../../components/introduction";

const Profile = ({ setPostVisible }) => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [photos, setPhotos] = useState({});

  const { user } = useSelector((state) => ({ ...state }));

  const userName = username === undefined ? user.username : username;

  const path = `${userName}/*`;
  const max = 30;
  const sort = "desc";

  const [{ loading, error, profile }, dispatch] = useReducer(profileReducer, {
    loading: false,
    profile: {},
    error: "",
  });

  const yourPage = userName === user.username ? true : false;
  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      dispatch({
        type: "PROFILE_REQUEST",
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getProfile/${userName}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      if (data.profileExist === false) {
        navigate("/profile");
      } else {
        dispatch({
          type: "PROFILE_SUCCESS",
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: "PROFILE_ERROR",
        payload: error,
      });
    }
  };

  return (
    <div className="profile">
      <Header page="profile" />
      <div className="profile_top">
        <div className="profile_container">
          <Cover cover={profile.cover} yourPage={yourPage} photos={photos} />
          <ProfileImageInfo
            profile={profile}
            yourPage={yourPage}
            photos={photos.resources}
          />
          <ProfileMenu />
        </div>
      </div>
      <div className="profile_bottom">
        <div className="profile_bottom_container">
          <div className="btm_container">
            <PplYouMayKnow />
            <div className="profile_grid">
              <div className="profile_left">
                <Intro detailss={profile.details} yourPage={yourPage} />
                <Photos username={userName} token={userName.token} />
                <Friends friends={profile.friends} />
              </div>
              <div className="profile_right">
                {yourPage && (
                  <CreatePost
                    user={user}
                    profile
                    setPostVisible={setPostVisible}
                  />
                )}
                <GridPosts />
                {profile.posts && profile.posts.length ? (
                  profile.posts.map((post) => (
                    <Posts post={post} user={user} key={post._id} profile />
                  ))
                ) : (
                  <div className="no-post">No Post Available!</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
