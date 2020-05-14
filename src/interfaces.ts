import {
  SEARCH,
  GENRE_SEARCH,
  SET_PAGES,
  OPEN_MODAL,
  CLOSE_MODAL,
  LOGIN,
  ADD_FAVE,
  SET_FAVE,
  SET_MOVIE,
} from "./redux/types";

export interface IAppReducer {
  search: IInitialSearchState;
  auth: IInitialAuthState;
  fave: IInitialFaveState;
  movie: IInitialMovieState;
}

export interface IInitialAuthState {
  modal: boolean;
  loggId: null | string;
}
export interface IMovieSearchCard {
  id: number;
  title: string;
  rating: number;
  imgUrl: string;
  date: string;
  genresIds: number[];
  favorited: boolean;
  url: null | string;
}
export interface IInitialFaveState {
  movieList: IMovieSearchCard[];
  faveIds: number[];
}
export interface IInitialSearchState {
  movies: IMovieSearchCard[];
  pages: number | null;
}
export interface ISearchAction {
  type: typeof SEARCH | typeof GENRE_SEARCH | typeof SET_PAGES;
  payload: IMovieSearchCard[] | number;
}

export interface IModalAction {
  type: typeof OPEN_MODAL | typeof CLOSE_MODAL;
}

export interface ICardProps {
  movie: IMovieSearchCard;
}

export interface ILogin {
  type: typeof LOGIN;
  payload: string;
}

export interface IFaveAction {
  type: typeof ADD_FAVE | typeof SET_FAVE;
  payload: IMovieSearchCard | IMovieSearchCard[];
}

export interface IMovie {
  id: number;
  title: string;
  rating: number;
  posterImg: string;
  date: string;
  genres: IGenre[];
  imdbUrl: string;
  overview: string;
  runtime: number;
  revenue: number;
  tagline: string;
}
export interface IInitialMovieState {
  movie: IMovie | null;
}
export interface IGenre {
  id: number;
  name: string;
}
export interface IMovieAction {
  type: typeof SET_MOVIE;
  payload: IMovie;
}
