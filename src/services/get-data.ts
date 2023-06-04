import { BASE_URL, endPoints } from '../utils';
import { request } from './api';
import type { TValues } from '../hooks/useFormAndValidation';
import { TResponseUsers, TUser } from './types-data';

export function createOptions(
  methodValue?: string,
  bodyValue?: object,
  header?: object
): Record<string, string | object> {

  const options: Record<string, string | object> = { headers: { 'Content-Type': 'application/json' } }
  if (methodValue) options.method = methodValue;
  if (bodyValue) options.body = JSON.stringify(bodyValue);
  if (header) Object.assign(options.headers, header);
  return options;
}

export function getProfile(endPoint: string, userData: TValues) {
  return request(`${BASE_URL}${endPoint}`, createOptions('POST', userData));
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
    res = await getUsersPage(currentPage).catch(res => res);
    users.push(...res.data);
    totalPages = res.total_pages;
    currentPage++;
  }

  const likesStr = sessionStorage.getItem('likeIds');

  if (likesStr !== null) {
    const likeArr = JSON.parse(likesStr);
    users.forEach(it => it.like = likeArr.includes(it.id));
  }

  return Promise.resolve(users)
};
