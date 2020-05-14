import { combineReducers } from "redux";
import searchReducer from "./searchReducer";
import authReducer from "./authReducer";
import faveReducer from "./faveReducer";
import movieReducer from "./movieReducer";
export default combineReducers({
  search: searchReducer,
  auth: authReducer,
  fave: faveReducer,
  movie: movieReducer,
});
