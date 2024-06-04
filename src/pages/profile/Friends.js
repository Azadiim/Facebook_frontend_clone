import { useEffect, useReducer, useState } from "react";
import { photoReducer } from "../../functions/reducers";
import axios from "axios";

const Friends = ({ friends }) => {
  return (
    <div className="photo_collection">
      <div className="photo_header">
        <div className="left">
          <span className="up">friends</span>
          <span className="down">
            {friends &&friends?.length === 0
              ? "0 friend"
              : friends?.length === 1
              ? "2 photo"
              : `${friends?.length} friends`}
          </span>
        </div>
        <div className="right">See all friends</div>
      </div>
      <div className="photo_body">
        {friends &&
          friends
            .slice(0, 9)
            .map((friend) => <div className="grid_photo"></div>)}
      </div>
    </div>
  );
};

export default Friends;
