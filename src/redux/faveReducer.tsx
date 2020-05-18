import {
  IInitialFaveState,
  IFaveAction,
  IMovieSearchCard,
  IFaveArrayAction,
} from "../interfaces";
import { ADD_FAVE, SET_FAVE, REMOVE_FAVE } from "./types";
const initialState: IInitialFaveState = {
  movieList: [],
  faveIds: [],
};
export default (
  state = initialState,
  action: IFaveAction | IFaveArrayAction
) => {
  switch (action.type) {
    case ADD_FAVE:
      return {
        ...state,
        movieList: [...state.movieList, action.payload],
        faveIds: [...state.faveIds, action.payload.id],
      };
    case SET_FAVE:
      return {
        ...state,
        movieList: action.payload,
        faveIds: action.payload.map((movie: IMovieSearchCard) => movie.id),
      };
    case REMOVE_FAVE:
      return {
        ...state,
        movieList: action.payload,
        faveIds: action.payload.map((movie: IMovieSearchCard) => movie.id),
      };
    default:
      return state;
  }
};
