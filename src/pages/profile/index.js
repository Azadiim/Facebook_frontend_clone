import { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { profileReducer } from "../../functions/reducers";
import Header from "../../components/header";
import axios from "axios";
import "./style.css";

import Cover from "./cover";
import ProfileImageInfo from "./ProfileImageInfo";

const Profile = () => {
  const { username } = useParams();

  const navigate = useNavigate();

  const { user } = useSelector((state) => ({ ...state }));
  const userName = username === undefined ? user.username : username;
  const [{ loading, error, profile }, dispatch] = useReducer(profileReducer, {
    loading: false,
    profile: {},
    error: "",
  });

  useEffect(() => {
    getProfile();
  }, [userName]);
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
          payload: data.profile,
        });
      }
    } catch (error) {
      dispatch({
        type: "PROFILE_ERROR",
        payload: error.response.data.message,
      });
    }
  };
  return (
    <div className="profile">
      <Header page="profile" />
      <div className="profile_top">
        <div className="profile_container">
          <Cover cover={profile.cover} />
          <ProfileImageInfo profile={profile} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
