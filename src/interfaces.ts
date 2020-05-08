import { SEARCH, GENRE_SEARCH } from "./redux/types";

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
}
export interface ISearchAction {
  type: typeof SEARCH | typeof GENRE_SEARCH;
  payload: IMovieSearchCard[];
}

export interface ICardProps {
  movie: IMovieSearchCard;
}
