import { IInitialSearchState } from "../interfaces";
import { SEARCH, GENRE_SEARCH, SET_PAGES } from "./types";

const initialState: IInitialSearchState = {
  movies: [],
  pages: null,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case SEARCH:
      return { ...state, movies: action.payload };
    case GENRE_SEARCH:
      return { ...state, movies: action.payload };
    case SET_PAGES:
      return { ...state, pages: action.payload };

    default:
      return state;
  }
};
