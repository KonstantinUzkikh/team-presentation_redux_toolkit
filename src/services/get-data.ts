import { BASE_URL, endPoints } from '../utils';
import { request } from './api';
import type { TInputValues } from '../hooks/useFormAndValidation';
import { TResponseUsers, TUser } from './types-data';

export function createOptions(methodValue?: string | undefined,
  bodyValue?: object | undefined, header?: object | undefined) {
  const options: { [optionKey: string]: string | object } =
    { headers: { 'Content-Type': 'application/json' } as { [optionKey: string]: string } }
  if (methodValue !== undefined) options.method = `${methodValue}`;
  if (bodyValue !== undefined) options.body = JSON.stringify(bodyValue);
  if (header !== undefined) Object.assign(options.headers, header);
  return options;
}

export function getRegister(userData: TInputValues) {
  return request(`${BASE_URL}${endPoints.register}`, createOptions('POST', userData));
}

export function getLogin(userData: TInputValues) {
  return request(`${BASE_URL}${endPoints.login}`, createOptions('POST', userData));
}

export function getUsersPage(page: number) {
  return request(`${BASE_URL}${endPoints.users}?page=${String(page)}`)
};

export async function getUsers(): Promise<TUser[]> {

  let users: TUser[] = [];
  let res: TResponseUsers;

  let totalPages = 1;
  let currentPage = 1;

  while (currentPage <= totalPages) {
    res = await getUsersPage(currentPage)
      .catch(res => res);
    users = [...users, ...res.data];
    totalPages = res.total_pages;
    ++currentPage;
  }

  let likeArr: number[] = [];
  const likesStr: string | null = sessionStorage.getItem('likeIds');

  if (likesStr !== null) {

    likeArr = JSON.parse(likesStr);

    users = users.map(it => {
      likeArr.find(item => item === it.id) ? it.like = true : it.like = false;
      return it
    });
  }

  return Promise.resolve(users)
};
