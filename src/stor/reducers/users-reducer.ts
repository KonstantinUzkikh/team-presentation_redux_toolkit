import type { TUser } from '../../services/types-data';
import { DECREASE_PAGE, GET_USERS_SUCCESS, INCREASE_PAGE, TOGGLE_LIKE, type TUsersActions } from '../actions';

export type TUsersState = {
  isLoadUsers: boolean;
  currentPage: number;
  users: TUser[];
};

export const initialUsersState: TUsersState = {
  isLoadUsers: false,
  currentPage: 0,
  users: [],
};

export const usersReducer =
  (state = initialUsersState, action: TUsersActions): TUsersState => {
    switch (action.type) {
      case GET_USERS_SUCCESS: {
        return {
          ...state,
          isLoadUsers: true,
          currentPage: 1,
          users: action.users,
        };
      }
      case TOGGLE_LIKE: {
        let switchLike: boolean = false;
        return {
          ...state,
          users: state.users.map(item => {
            if (item.id === action.id) {
              switchLike = !item.like;
              return { ...item, like: switchLike }
            }
            return item;
          }
          )
        };
      }
      case INCREASE_PAGE: {
        return {
          ...state,
          currentPage: ++state.currentPage,
        };
      }
      case DECREASE_PAGE: {
        return {
          ...state,
          currentPage: --state.currentPage,
        };
      }
      default: {
        return state;
      }
    }
  };
