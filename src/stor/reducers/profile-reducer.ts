import { GET_LOGIN_SUCCESS, GET_REGISTER_SUCCESS, PROFILE_RESET, type TProfileActions } from '../actions';

export type TProfileState = {
  isLoadProfile: boolean;
  email: string;
  password: string;
  nick_name: string;
  first_name: string;
  last_name: string;
  avatar: string;
  id: number;
};

export const initialProfileState: TProfileState = {
  isLoadProfile: false,
  email: 'eve.holt@reqres.in',
  password: 'cityslicka',
  nick_name: 'Any',
  first_name: 'Eve',
  last_name: 'Holt',
  avatar: 'https://reqres.in/img/faces/4-image.jpg',
  id: 4
};

export const profileReducer = (state = initialProfileState, action: TProfileActions): TProfileState => {
  switch (action.type) {
    case GET_REGISTER_SUCCESS: {
      return {
        ...state,
        isLoadProfile: true,
        email: action.email,
        password: action.password,
        nick_name: action.nick_name,
        first_name: action.user.first_name,
        last_name: action.user.last_name,
        avatar: action.user.avatar,
        id: action.id
      };
    }
    case GET_LOGIN_SUCCESS: {
      return {
        ...state,
        isLoadProfile: true,
        email: action.email,
        password: action.password,
        first_name: action.user.first_name,
        last_name: action.user.last_name,
        avatar: action.user.avatar,
        id: action.user.id
      };
    }
    case PROFILE_RESET: {
      return initialProfileState;
    }
    default: {
      return state;
    }
  }
};
