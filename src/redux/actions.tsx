import axios from "axios";
import {
  SEARCH,
  GENRE_SEARCH,
  SET_PAGES,
  OPEN_MODAL,
  CLOSE_MODAL,
  LOGIN,
  LOGOUT,
} from "./types";
import {
  ISearchAction,
  IInitialSearchState,
  IMovieSearchCard,
  IModalAction,
  ILogin,
  IInitialAuthState,
} from "../interfaces";
import { ThunkDispatch } from "redux-thunk";

export const searchApiHandler = (title: string, page: number) => {
  return async (
    dispatch: ThunkDispatch<IInitialSearchState, undefined, ISearchAction>
  ) => {
    dispatch(nulifySearch());
    try {
      console.log(page);
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=80ef1f7c9782ae8f49ad43d536130056&language=ru&query=${title}&page=${page}`
      );
      dispatch(setPages(response.data.total_pages));
      const searchResult: IMovieSearchCard[] = response.data.results.map(
        (item: any) => {
          const movie: IMovieSearchCard = {
            title: item.title,
            id: item.id,
            rating: item.vote_average,
            date: item.release_date,
            imgUrl: item.poster_path
              ? `https://image.tmdb.org/t/p/w300/${item.poster_path}`
              : "https://media.istockphoto.com/photos/vintage-8mm-film-reels-of-home-movies-history-and-memories-picture-id947659542?k=6&m=947659542&s=612x612&w=0&h=kW9x2woe4yB8yjFpkTus_A8z04TRqREZiGKvhRbY_wQ=",
            genresIds: item.genre_ids,
          };
          return movie;
        }
      );
      dispatch({
        type: SEARCH,
        payload: searchResult,
      });
    } catch (e) {
      console.log(e);
    }
  };
};
export const genreSearch = (id: number, page: number, range: string) => {
  const [start, end] = range.split("-").map((item) => +item);
  return async (
    dispatch: ThunkDispatch<IInitialSearchState, undefined, ISearchAction>
  ) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=80ef1f7c9782ae8f49ad43d536130056&with_genres=${id}&primary_release_date.gte=${start}-01-01&primary_release_date.lte=${end}-01-01&page=${page}`
      );
      dispatch(setPages(response.data.total_pages));
      const searchResult: IMovieSearchCard[] = response.data.results.map(
        (item: any) => {
          const movie: IMovieSearchCard = {
            title: item.title,
            id: item.id,
            rating: item.vote_average,
            date: item.release_date,
            imgUrl: item.poster_path
              ? `https://image.tmdb.org/t/p/w300/${item.poster_path}`
              : "https://media.istockphoto.com/photos/vintage-8mm-film-reels-of-home-movies-history-and-memories-picture-id947659542?k=6&m=947659542&s=612x612&w=0&h=kW9x2woe4yB8yjFpkTus_A8z04TRqREZiGKvhRbY_wQ=",
            genresIds: item.genre_ids,
          };
          return movie;
        }
      );

      dispatch({
        type: GENRE_SEARCH,
        payload: searchResult,
      });
    } catch (e) {
      console.log(e);
    }
  };
};
export const auth = (email: string, password: string, isLogin: boolean) => {
  console.log(email, password);
  return async (
    dispatch: ThunkDispatch<IInitialAuthState, undefined, ILogin>
  ) => {
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };
    let url =
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCB5TpTCb5h3-hyAyxdw63k2qJPRLvEpME";
    if (isLogin) {
      url =
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCB5TpTCb5h3-hyAyxdw63k2qJPRLvEpME";
    }
    const response = await axios.post(url, authData);
    const data = response.data;
    const token = data.localId;
    localStorage.setItem("token", token);
    dispatch(login(token));
    dispatch(closeModal());
  };
};

export const openModal = (): any => {
  return {
    type: OPEN_MODAL,
  };
};
export const closeModal = (): any => {
  return {
    type: CLOSE_MODAL,
  };
};
export const login = (token: string): ILogin => {
  return {
    type: LOGIN,
    payload: token,
  };
};
export const logout = () => {
  return {
    type: LOGOUT,
  };
};
const setPages = (pages: number): ISearchAction => {
  return {
    type: SET_PAGES,
    payload: pages,
  };
};
const nulifySearch = (): ISearchAction => {
  return {
    type: SEARCH,
    payload: [],
  };
};
