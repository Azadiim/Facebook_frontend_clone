import React, { useRef, useState } from "react";
import useClickOutSide from "../../helpers/clickOutSide";
import {
  acceptRequest,
  addFriend,
  cancelRequest,
  deleteRequest,
  follow,
  unFollow,
  unFriend,
} from "../../functions/user";
import { useSelector } from "react-redux";

const FriendShip = ({ friendshipp, profileId }) => {
  const [friendsMenu, setFriendsMenu] = useState(false);
  const [respondMenu, setRespondMenu] = useState(false);

  const refFriends = useRef(null);
  const respondRef = useRef(null);
  const { user } = useSelector((state) => ({ ...state }));
  const friendship = friendshipp;
  useClickOutSide(refFriends, () => {
    setFriendsMenu(false);
  });
  useClickOutSide(respondRef, () => {
    setRespondMenu(false);
  });

  const addFriendHandler = async () => {
    //setFriendship({ ...friendship, sentRequest: true, following: true });
    friendship.sentRequest = true;
    friendship.following = true;
    await addFriend(profileId, user.token);
  };
  const cancelRequestHandler = async () => {
    // setFriendship({ ...friendship, sentRequest: false, following: false });
    friendship.sentRequest = false;
    friendship.following = false;
    await cancelRequest(profileId, user.token);
  };
  const followHandler = async () => {
    friendship.following = true;
    await follow(profileId, user.token);
  };
  const unFollowHandler = async () => {
    friendship.following = false;
    await unFollow(profileId, user.token);
  };
  const acceptRequestHandler = async () => {
    friendship.friends = true;
    friendship.receivedRequest = false;
    friendship.sentRequest = false;
    friendship.following = true;
    await acceptRequest(profileId, user.token);
  };
  const unFriendHandler = async () => {
    friendship.friends = false;
    friendship.receivedRequest = false;
    friendship.sentRequest = false;
    friendship.following = false;
    await unFriend(profileId, user.token);
  };
  const deleteRequestHandler = async () => {
    friendship.friends = false;
    friendship.receivedRequest = false;
    friendship.following = false;
    friendship.sentRequest = false;
    await deleteRequest(profileId, user.token);
    setRespondMenu(false);
  };

  return (
    <div className="friends_total_wrap">
      {friendship?.friends ? (
        <div className="friends_menu_wrap">
          <button
            className="gray_btn"
            onClick={() => setFriendsMenu((prev) => !prev)}
          >
            <img
              src="https://res.cloudinary.com/dbmrpcjnf/image/upload/v1721938921/icons/friends_apyuyr.png"
              alt=""
            />
            <span>Friends</span>
          </button>
          {friendsMenu && (
            <div className="open_cover_menu" ref={refFriends}>
              <div className="friends_option_item">
                <img
                  src="https://res.cloudinary.com/dbmrpcjnf/image/upload/v1721938919/icons/favoritesOutline_sm01h9.png"
                  alt=""
                />
                favorites
              </div>
              <div className="friends_option_item">
                <img
                  src="https://res.cloudinary.com/dbmrpcjnf/image/upload/v1721938921/icons/friends_apyuyr.png"
                  alt=""
                />
                Edit Friend List
              </div>
              {friendship?.following ? (
                <div
                  className="friends_option_item"
                  onClick={() => {
                    unFollowHandler();
                  }}
                >
                  <img
                    src="https://res.cloudinary.com/dbmrpcjnf/image/upload/v1721938917/icons/cancelRequest_ufl8cn.png"
                    alt=""
                  />
                  unFollow
                </div>
              ) : (
                <div
                  className="friends_option_item"
                  onClick={() => {
                    followHandler();
                  }}
                >
                  <img
                    src="https://res.cloudinary.com/dbmrpcjnf/image/upload/v1721938916/icons/addFriend_tl9ylx.png"
                    alt=""
                  />
                  follow
                </div>
              )}
              <div
                className="friends_option_item"
                onClick={() => unFriendHandler()}
              >
                <img
                  src="https://res.cloudinary.com/dbmrpcjnf/image/upload/v1721938917/icons/cancelRequest_ufl8cn.png"
                  alt=""
                />
                unFriend
              </div>
            </div>
          )}
        </div>
      ) : (
        !friendship?.sentRequest &&
        !friendship?.receivedRequest && (
          <button className="blue_btn" onClick={() => addFriendHandler()}>
            <img
              className="invert"
              src="https://res.cloudinary.com/dbmrpcjnf/image/upload/v1721938916/icons/addFriend_tl9ylx.png"
              alt=""
            />
            <span>Add Friends</span>
          </button>
        )
      )}
      {friendship?.sentRequest && friendship?.sentRequest ? (
        <button
          className="blue_btn"
          onClick={() => {
            cancelRequestHandler();
          }}
        >
          <img
            className="invert"
            src="https://res.cloudinary.com/dbmrpcjnf/image/upload/v1721938917/icons/cancelRequest_ufl8cn.png"
            alt=""
          />
          <span>Cancel Request</span>
        </button>
      ) : (
        friendship?.receivedRequest && (
          <div className="friends_menu_wrap">
            <button
              className="gray_btn"
              onClick={() => setRespondMenu((prev) => !prev)}
            >
              <img
                src="https://res.cloudinary.com/dbmrpcjnf/image/upload/v1721938916/icons/addFriend_tl9ylx.png"
                alt=""
              />
              <span>Respond</span>
            </button>
            {respondMenu && (
              <div className="open_cover_menu" ref={respondRef}>
                <div
                  className="friends_option_item"
                  onClick={() => {
                    acceptRequestHandler();
                  }}
                >
                  Confirm
                </div>
                <div
                  className="friends_option_item"
                  onClick={() => {
                    deleteRequestHandler();
                  }}
                >
                  Delete
                </div>
              </div>
            )}
          </div>
        )
      )}
      {friendship?.following ? (
        <button
          className="gray_btn"
          onClick={() => {
            unFollowHandler();
          }}
        >
          <img
            src="https://res.cloudinary.com/dbmrpcjnf/image/upload/v1721938920/icons/follow_mdekqw.png"
            alt=""
          />
          <span>Following</span>
        </button>
      ) : (
        <button
          className="blue_btn"
          onClick={() => {
            followHandler();
          }}
        >
          <img
            className="invert"
            src="https://res.cloudinary.com/dbmrpcjnf/image/upload/v1721938920/icons/follow_mdekqw.png"
            alt=""
          />
          <span>Follow</span>
        </button>
      )}
      <button className={friendship?.friends ? "blue_btn" : "gray_btn"}>
        <img
          className={friendship?.friends && "invert"}
          src="https://res.cloudinary.com/dbmrpcjnf/image/upload/v1721938962/icons/message_rdurla.png"
          alt=""
        />
        <span>Message</span>
      </button>
    </div>
  );
};

export default FriendShip;
