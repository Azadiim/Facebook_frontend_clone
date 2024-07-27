import { useEffect, useReducer, useState } from "react";
import { photoReducer } from "../../functions/reducers";
import axios from "axios";

const Photos = ({ username, token, photos }) => {
  let photoCount = {};
  if (photos && photos.resources) {
    photoCount = photos.resources;
  }
  console.log("------",photoCount)
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
          Object.values(photoCount)
            .slice(0, 9)
            .map(
              (
                img // to making object to array
              ) => (
                <div className="grid_photo" key={img.public_id}>
                  <img src={img.secure_url} alt="" />
                </div>
              )
            )}
      </div>
    </div>
  );
};

export default Photos;
