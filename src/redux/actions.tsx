import axios from "axios";
import { SEARCH } from "./types";
import {
  ISearchAction,
  IInitialSearchState,
  IMovieSearchCard,
} from "../interfaces";
import { ThunkDispatch } from "redux-thunk";

const nulifySearch = (): ISearchAction => {
  return {
    type: SEARCH,
    payload: [],
  };
};

export const searchApiHandler = (title: string) => {
  return async (
    dispatch: ThunkDispatch<IInitialSearchState, undefined, ISearchAction>
  ) => {
    dispatch(nulifySearch());
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=80ef1f7c9782ae8f49ad43d536130056&language=ru&query=${title}`
      );
      const searchResult: IMovieSearchCard[] = response.data.results.map(
        (item: any) => {
          const movie: IMovieSearchCard = {
            title: item.title,
            id: item.id,
            rating: item.vote_average,
            date: item.release_date,
            imgUrl: `https://image.tmdb.org/t/p/w300/${item.poster_path}`,
            genresIds: item.genre_ids,
          };
          return movie;
        }
      );
      console.log(searchResult);
      dispatch({
        type: SEARCH,
        payload: searchResult,
      });
    } catch (e) {}
  };
};
