import { SEARCH } from "./redux/types";

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
  type: typeof SEARCH;
  payload: IMovieSearchCard[];
}

export interface ICardProps {
  movie: IMovieSearchCard;
}
