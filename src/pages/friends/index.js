import { useEffect, useReducer } from "react";
import Header from "../../components/header";
import "./style.css";
import { getFriendsInfo } from "../../functions/user";
import { useSelector } from "react-redux";
import { friendsReducer } from "../../functions/reducers";
import FriendsCard from "./friendsCard";
import { Link, useParams } from "react-router-dom";

const Friends = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const { type } = useParams();

  const [{ loading, error, data }, dispatch] = useReducer(friendsReducer, {
    loading: false,
    data: {},
    error: "",
  });
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    dispatch({ type: "FRIENDS_REQUEST" });
    const data = await getFriendsInfo(user.token);
    if (data.status === "ok") {
      dispatch({ type: "FRIENDS_SUCCESS", payload: data.data });
    } else {
      dispatch({ type: "FRIENDS_ERROR", payload: data.data });
    }
  };

  return (
    <div className="friends_page">
      <Header page="friend" />
      <div className="after_header">
        <div className="header_page_left">
          <div className="friends_setting">
            <h2>Friends</h2>
            <div className="small_circle">
              <i className="settings_filled_icon"></i>
            </div>
          </div>

          <div className="friends_items">
            <div className="friends_item_li">
              <Link
                className={`small_circle ${
                  type === undefined ? "home_white" : ""
                }`}
                to="/friends"
              >
                <i className="friends_requests_icon"></i>
              </Link>
              <span>Home</span>
            </div>
            {type !== undefined && <i className="right_icon"></i>}
          </div>

          <div className="friends_items">
            <div className="friends_item_li ">
              <Link
                className={`small_circle ${
                  type === "requests" ? "home_white" : ""
                }`}
                to="/friends/requests"
              >
                <i className="friends_requests_icon"></i>
              </Link>
              <span>Friends Requests</span>
            </div>
            {type !== "requests" && <i className="right_icon"></i>}
          </div>

          <div className="friends_items">
            <div className="friends_item_li ">
              <Link
                className={`small_circle ${
                  type === "sent" ? "home_white" : ""
                }`}
                to="/friends/sent"
              >
                <i className="friends_requests_icon"></i>
              </Link>
              <span>Sent Requests</span>
            </div>
            {type !== "sent" && <i className="right_icon"></i>}
          </div>

          <div className="friends_items">
            <div className="friends_item_li">
              <Link
                className={`small_circle ${type === "all" ? "home_white" : ""}`}
                to="/friends/all"
              >
                <i className="all_friends_icon"></i>
              </Link>
              <span>All Friends</span>
            </div>
            {type !== "all" && <i className="right_icon"></i>}
          </div>

          <div className="friends_items">
            <div className="friends_item_li">
              <div className="small_circle ">
                <i className="friends_suggestions_icon"></i>
              </div>
              <span>Suggestion</span>
            </div>
            <i className="right_icon"></i>
          </div>

          <div className="friends_items">
            <div className="friends_item_li">
              <div className="small_circle ">
                <i className="birthdays_icon"></i>
              </div>
              <span>Birthday</span>
            </div>
            <i className="right_icon"></i>
          </div>

          <div className="friends_items">
            <div className="friends_item_li">
              <div className="small_circle ">
                <i className="friends_requests_icon"></i>
              </div>
              <span>Custom List</span>
            </div>
            <i className="right_icon"></i>
          </div>
        </div>

        <div className="header_page_right">
          {(type === undefined || type === "all") && (
            <>
              <div className="card_header">
                <span className="header">Friends</span>
                {type !== "all" && <Link to="all">See all</Link>}
              </div>
              <div className="flex_card">
                {data?.friends &&
                  data?.friends.length !== 0 &&
                  data?.friends.map((user) => (
                    <div className="card_rap" key={user._id}>
                      <FriendsCard userr={user} getData={getData} />
                    </div>
                  ))}
              </div>{" "}
            </>
          )}

          {(type === undefined || type === "requests") && (
            <>
              {" "}
              <div className="card_header">
                <span className="header">Requests</span>
                {type !== "requests" && <Link to="all">See all</Link>}
              </div>
              <div className="flex_card">
                {data?.requests &&
                  data?.requests.length !== 0 &&
                  data?.requests.map((user) => (
                    <div className="card_rap" key={user._id}>
                      <FriendsCard userr={user} type="req" getData={getData} />
                    </div>
                  ))}
              </div>
            </>
          )}

          {(type === undefined || type === "sent") && (
            <>
              {" "}
              <div className="card_header">
                <span className="header">Sent Requests</span>
                {type !== "sent" && <Link to="all">See all</Link>}
              </div>
              <div className="flex_card">
                {data?.sentRequests &&
                  data?.sentRequests.length !== 0 &&
                  data?.sentRequests.map((user) => (
                    <div className="card_rap" key={user._id}>
                      <FriendsCard userr={user} type="sent" getData={getData} />
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Friends;
