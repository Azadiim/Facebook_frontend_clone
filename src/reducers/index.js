import { combineReducers } from "redux";
import { picsReducer, userReducer } from "./userReducer";

const rootReducer = combineReducers({
  user: userReducer,
  pics: picsReducer,
});

export default rootReducer;
