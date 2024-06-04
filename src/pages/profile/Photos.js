import { useEffect, useReducer, useState } from "react";
import { photoReducer } from "../../functions/reducers";
import axios from "axios";

const Photos = ({ username, token }) => {
  const [{ loading, error, photos }, dispatch] = useReducer(photoReducer, {
    loading: false,
    photos: {},
    error: "",
  });

  useEffect(() => {
    getPhoto();
  }, [username]);
  const path = `${username}/*`;
  const max = 30;
  const sort = "desc";
  const getPhoto = async () => {
    try {
      dispatch({
        type: "PHOTO_REQUEST",
      });
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/listImages`,
        { path, max, sort },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      dispatch({
        type: "PHOTO_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "PHOTO_ERROR",
        payload: error,
      });
    }
  };

  let photoCount = {};
  if (photos && photos.resources) {
    photoCount = photos.resources;
  }
  return (
    <div className="photo_collection">
      <div className="photo_header">
        <div className="left">
          <span className="up">photos</span>
          <span className="down">
            {photoCount && photoCount?.length === 0
              ? "0 photo"
              : photoCount?.length === 1
              ? "1 photo"
              : `${photoCount?.length} photos`}
          </span>
        </div>
        <div className="right">See all photos</div>
      </div>
      <div className="photo_body">
        {photoCount &&
          photoCount.length !== 0 &&
          Object.values(photoCount).slice(0,9).map((img) => (          // to making object to array
            <div className="grid_photo" key={img.public_id}>
              <img src={img.secure_url} alt="" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Photos;
