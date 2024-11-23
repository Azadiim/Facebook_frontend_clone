import { combineReducers } from "redux";
import { picsReducer, userReducer } from "./userReducer";
import { themeReducer } from "./darkTheme";

const rootReducer = combineReducers({
  user: userReducer,
  pics: picsReducer,
  darkTheme: themeReducer,
});

export default rootReducer;
