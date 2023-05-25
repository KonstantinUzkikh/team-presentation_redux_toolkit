import { TUser } from "../../services/types-data";

export const GET_REGISTER_SUCCESS: 'GET_REGISTER_SUCCESS' = 'GET_REGISTER_SUCCESS';
export const GET_LOGIN_SUCCESS: 'GET_LOGIN_SUCCESS' = 'GET_LOGIN_SUCCESS';
export const PROFILE_RESET: 'PROFILE_RESET' = 'PROFILE_RESET';

export interface IRegisterSuccessAction {
  readonly type: typeof GET_REGISTER_SUCCESS;
  readonly email: string;
  readonly password: string;
  readonly nick_name: string;
  readonly id: number;
  readonly user: TUser;
};

export interface ILoginSuccessAction {
  readonly type: typeof GET_LOGIN_SUCCESS;
  readonly email: string;
  readonly password: string;
  readonly user: TUser;
};

export interface IProfileResetAction {
  readonly type: typeof PROFILE_RESET;
}

export type TProfileActions = IRegisterSuccessAction | ILoginSuccessAction | IProfileResetAction;

export const getRegisterSuccess = (
  email: string, password: string, nick_name: string, id: number, user: TUser
): IRegisterSuccessAction => {
  return {
    type: GET_REGISTER_SUCCESS,
    email,
    password,
    nick_name,
    id,
    user
  }
};

export const getLoginSuccess = (email: string, password: string, user: TUser): ILoginSuccessAction => {
  return {
    type: GET_LOGIN_SUCCESS,
    email,
    password,
    user
  }
};

export const profileReset = (): IProfileResetAction => ({ type: PROFILE_RESET });
