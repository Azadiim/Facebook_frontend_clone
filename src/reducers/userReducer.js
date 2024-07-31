import Cookies from "js-cookie";

const userReducer = (
  state = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
  action
) => {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "VERIFY":
      return { ...state, verify: action.payload };
    case "UPDATEPICTURE":
      return { ...state, picture: action.payload };
    case "LOGOUT":
      return null;

    default:
      return state;
  }
};
const picsReducer = (state = [], action) => {
  switch (action.type) {
    case "DOWNLOAD":
      return [...state, action.payload];
    default:
      return state;
  }
};

export { userReducer, picsReducer };
