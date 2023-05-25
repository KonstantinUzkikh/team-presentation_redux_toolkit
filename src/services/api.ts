function checkResponse(res: Response):Promise<any> {
  if (res.ok) return res.json();
  return Promise.reject(res);
}

export function request(url: string, options?: object | undefined):Promise<any> {
  return fetch(url, options).then(checkResponse)
}
