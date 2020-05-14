import { SET_MOVIE } from "./types";
import { IInitialMovieState, IMovieAction } from "../interfaces";
const initialState: IInitialMovieState = {
  movie: null,
};
export default (state = initialState, action: IMovieAction) => {
  switch (action.type) {
    case SET_MOVIE:
      return { ...state, movie: action.payload };
    default:
      return state;
  }
};
