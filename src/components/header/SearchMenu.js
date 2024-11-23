import { useEffect, useRef, useState } from "react";
import { Return, Search } from "../../svg";
import useClickOutSide from "../../helpers/clickOutSide";
import {
  addToSearchHistory,
  deleteFromSearchHistory,
  getSearchHistory,
  search,
} from "../../functions/user";
import { Link } from "react-router-dom";

const SearchMenu = ({ color, setShowSearchMenu, token }) => {
  const menu = useRef(null);
  const input = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState([]);
  const [showHistory, setShowHistory] = useState([]);
  const [iconVisible, setIconVisible] = useState(true);
  useClickOutSide(menu, () => {
    setShowSearchMenu(false);
  });
  useEffect(() => {
    input.current.focus();
  }, []);

  useEffect(() => {
    showHistoryHandler();
  }, []);

  const showHistoryHandler = async () => {
    const res = await getSearchHistory(token);
    setShowHistory(res);
  };

  const searchHandler = async () => {
    if (searchTerm === "") {
      setResult("");
    } else {
      const res = await search(searchTerm, token);
      setResult(res);
    }
  };

  const addToSearchHistoryHandler = async (searchUser) => {
    const res = await addToSearchHistory(searchUser, token);
    console.log(res)
    getSearchHistory();
  };

  const deleteFromSearchHistoryHandler = async (searchUser) => {
    await deleteFromSearchHistory(searchUser, token);
  };
  
  return (
    <div className="header_left search_area scrollbar" ref={menu}>
      <div className="search_wrap">
        <div className="header_logo">
          <div
            className="circle hover1"
            onClick={() => {
              setShowSearchMenu(false);
            }}
          >
            <Return color={color} />
          </div>
        </div>
        <div
          className="search"
          onClick={() => {
            input.current.focus();
          }}
        >
          {iconVisible && (
            <div>
              <Search color={color} />
            </div>
          )}

          <input
            type="text"
            placeholder="Search Facebook"
            ref={input}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={searchHandler}
            onFocus={() => {
              setIconVisible(false);
            }}
            onBlur={() => {
              setIconVisible(true);
            }}
          />
        </div>
      </div>
      {!result.length && (
        <div className="search_history_header">
          <span>Recent Searches</span>
          <a>Edit</a>
        </div>
      )}
      <div className="search_history">
        {showHistory &&
          result == "" &&
          showHistory
            .sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt);
            })
            .map((user,i) => (
              <div
                className="search_result1 scrollbar hover1"
                key={i}
              >
                <Link
                  to={`/profile/${user.user?.username}`}
                  className="search_item"
                  onClick={() => addToSearchHistoryHandler(user?.user?._id)}
                >
                  <img src={user?.user?.picture} alt="" />
                  <span>
                    {user?.user?.first_name} {user?.user?.last_name}
                  </span>
                </Link>
                <div
                  className="exit_icon exit_scale"
                  onClick={() =>
                    deleteFromSearchHistoryHandler(user?.user?._id)
                  }
                ></div>
              </div>
            ))}
      </div>
      <div className="search_result scrollbar">
        {result &&
          result.map((r) => (
            <Link
              to={`/profile/${r.username}`}
              className="search_item"
              onClick={() => addToSearchHistoryHandler(r._id)}
              key={r._id}
            >
              <img src={r.picture} alt="" />
              <span>
                {r.first_name} {r.last_name}
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default SearchMenu;
