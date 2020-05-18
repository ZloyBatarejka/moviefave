import { SET_MOVIE, SHOW_MOVIE, REMOVE_MOVIE } from "./types";
import { IInitialMovieState, IMovieAction } from "../interfaces";
const initialState: IInitialMovieState = {
    movie: null,
    show: false,
};
export default (state = initialState, action: IMovieAction) => {
    switch (action.type) {
        case SET_MOVIE:
            return { ...state, movie: action.payload };
        case SHOW_MOVIE:
            return { ...state, show: true };
        case REMOVE_MOVIE:
            return { ...state, show: false };
        default:
            return state;
    }
};
