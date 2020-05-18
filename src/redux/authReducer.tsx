import { IInitialAuthState, ILogin, IModalAction } from "../interfaces";
import { OPEN_MODAL, CLOSE_MODAL, LOGIN, LOGOUT } from "./types";
const initialState: IInitialAuthState = {
  modal: false,
  loggId: null,
};

export default (state = initialState, action: ILogin | IModalAction) => {
  switch (action.type) {
    case OPEN_MODAL:
      return { ...state, modal: true };
    case CLOSE_MODAL:
      return { ...state, modal: false };
    case LOGIN:
      return { ...state, loggId: action.payload };
    case LOGOUT:
      return { ...state, loggId: null };
    default:
      return state;
  }
};
