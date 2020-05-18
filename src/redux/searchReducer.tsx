import { IInitialSearchState, ISearchAction, ISort } from "../interfaces";
import { SEARCH, GENRE_SEARCH, SET_PAGES, SORT } from "./types";

const initialState: IInitialSearchState = {
  movies: [],
  pages: null,
};

export default (state = initialState, action: ISearchAction | ISort) => {
  switch (action.type) {
    case SEARCH:
      return { ...state, movies: action.payload };
    case GENRE_SEARCH:
      return { ...state, movies: action.payload };
    case SET_PAGES:
      return { ...state, pages: action.payload };
    case SORT:
      return { ...state, movies: action.payload };
    default:
      return state;
  }
};
