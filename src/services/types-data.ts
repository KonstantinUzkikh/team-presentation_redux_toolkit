export type TMethod = 'GET' | 'PATCH' | 'POST';

export type TUser = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  like: boolean;
}

export type TSupport = {
  url: string;
  text: string;
}

export type TResponseUsers = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: TUser[];
  support: TSupport;
};

export type TProfile = {
  email: string;
  password: string;
  nick_name: string;
  first_name: string;
  last_name: string;
  avatar: string;
  id: number;
}

export type TLoginResponse = {
  token: string;
}

export type TRegisterResponse = {
  id: number;
  token: string;
}
