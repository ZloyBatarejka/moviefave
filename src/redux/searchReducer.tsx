import {
  IMovieSearchCard,
  ISearchAction,
  IInitialSearchState,
} from "../interfaces";
import { SEARCH, GENRE_SEARCH } from "./types";

export const movie: IMovieSearchCard = {
  id: 299536,
  title: "Мстители: Война бесконечности",
  rating: 8.3,
  imgUrl: "https://image.tmdb.org/t/p/w300/qIUFg6tzKeK5bUDguonWCAFceNB.jpg",
  date: "2018-04-25",
  genresIds: [28, 12, 878],
};

const initialState: IInitialSearchState = {
  movies: [],
};

export default (state = initialState, action: ISearchAction) => {
  switch (action.type) {
    case SEARCH:
      return { ...state, movies: action.payload };
    case GENRE_SEARCH:
      return { ...state, movies: action.payload };
    default:
      return state;
  }
};
