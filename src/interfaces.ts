import {
  SEARCH,
  GENRE_SEARCH,
  SET_PAGES,
  OPEN_MODAL,
  CLOSE_MODAL,
  LOGIN,
  LOGOUT,
} from "./redux/types";

export interface IAppReducer {
  search: IInitialSearchState;
  auth: IInitialAuthState;
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
