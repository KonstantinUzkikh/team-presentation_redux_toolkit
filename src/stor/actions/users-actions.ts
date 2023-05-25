import type { TUser } from '../../services/types-data';

export const GET_USERS_SUCCESS: 'GET_USERS_SUCCESS' = 'GET_USERS_SUCCESS';
export const TOGGLE_LIKE: 'TOGGLE_LIKE' = 'TOGGLE_LIKE';
export const INCREASE_PAGE: 'INCREASE_PAGE' = 'INCREASE_PAGE';
export const DECREASE_PAGE: 'DECREASE_PAGE' = 'DECREASE_PAGE';

export interface IUsersSuccess {
  type: typeof GET_USERS_SUCCESS;
  users: TUser[];
};

export interface IUsersToggleLikeAction {
  readonly type: typeof TOGGLE_LIKE;
  id: number;
}

export interface IUsersIncreasePageAction {
  readonly type: typeof INCREASE_PAGE;
}

export interface IUsersDecreasePageAction {
  readonly type: typeof DECREASE_PAGE;
}

export type TUsersActions =
  IUsersSuccess | IUsersToggleLikeAction | IUsersIncreasePageAction | IUsersDecreasePageAction;

export const getUsersSuccess = (res: TUser[]): IUsersSuccess => {
  return {
    type: GET_USERS_SUCCESS,
    users: res
  }
};

export const userToggleLike = (id: number): IUsersToggleLikeAction => {
  return {
    type: TOGGLE_LIKE,
    id
  }
};

export const increasePage = (): IUsersIncreasePageAction => ({ type: INCREASE_PAGE })

export const decreasePage = (): IUsersDecreasePageAction => ({ type: DECREASE_PAGE })
