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
    case "LOGOUT":
      return null;

    default:
      return state;
  }
};

export { userReducer };
