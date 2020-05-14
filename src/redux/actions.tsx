import axios from "axios";
import {
  SEARCH,
  GENRE_SEARCH,
  SET_PAGES,
  OPEN_MODAL,
  CLOSE_MODAL,
  LOGIN,
  LOGOUT,
  ADD_FAVE,
  SET_FAVE,
  REMOVE_FAVE,
  SET_MOVIE,
} from "./types";
import {
  ISearchAction,
  IInitialSearchState,
  IMovieSearchCard,
  IModalAction,
  ILogin,
  IInitialAuthState,
  IFaveAction,
  IMovie,
} from "../interfaces";
import { ThunkDispatch } from "redux-thunk";

export const searchApiHandler = (title: string, page: number) => {
  return async (
    dispatch: ThunkDispatch<IInitialSearchState, undefined, ISearchAction>
  ) => {
    dispatch(nulifySearch());
    try {
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
            favorited: false,
            url: null,
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
            favorited: false,
            url: null,
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
  return async (
    dispatch: ThunkDispatch<IInitialAuthState, undefined, ILogin | IModalAction>
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
export const setFavorites = (url: string) => {
  return async (dispatch: any) => {
    const movies = await axios.get(
      `https://moviefave-56a11.firebaseio.com/${url}.json`
    );
    let array: IMovieSearchCard[] = [];
    if (movies.data) {
      const objectKeys = Array.from(Object.keys(movies.data));
      array = Array.from(Object.values(movies.data));
      array.forEach((item, index) => {
        item.url = objectKeys[index];
      });
    }
    dispatch({
      type: SET_FAVE,
      payload: array,
    });
  };
};
export const addFavorite = (movie: IMovieSearchCard): IFaveAction => {
  return {
    type: ADD_FAVE,
    payload: movie,
  };
};
export const removeFavotire = (
  url: string,
  movieUrl: string | null,
  movies: IMovieSearchCard[]
) => {
  return async (dispatch: any) => {
    console.log(movies);
    await axios.delete(
      `https://moviefave-56a11.firebaseio.com/${url}/${movieUrl}.json`
    );
    dispatch({
      type: REMOVE_FAVE,
      payload: movies,
    });
  };
};
export const openModal = (): IModalAction => {
  return {
    type: OPEN_MODAL,
  };
};
export const closeModal = (): IModalAction => {
  document.body.classList.remove("height");
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
  localStorage.removeItem("token");
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
export const setMovie = (id: number) => {
  return async (dispatch: any) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=80ef1f7c9782ae8f49ad43d536130056&language=ru`
    );
    const data = response.data;
    const movie: IMovie = {
      id: data.id,
      title: data.title,
      tagline: data.tagline,
      posterImg: `https://image.tmdb.org/t/p/w400/${data.poster_path}`,
      rating: data.vote_average,
      genres: data.genres,
      imdbUrl: `https://www.imdb.com/title/${data.imdb_id}`,
      date: data.release_date,
      overview: data.overview,
      runtime: data.runtime,
      revenue: data.revenue,
    };
    localStorage.setItem("movie", JSON.stringify(movie));
    dispatch({
      type: SET_MOVIE,
      payload: movie,
    });
  };
};
const nulifySearch = (): ISearchAction => {
  return {
    type: SEARCH,
    payload: [],
  };
};
