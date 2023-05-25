type TOptions = {
  [optionKey: string]: boolean | number | string | DateConstructor;
};

//Устанавливает куки с именем name и значением value, с настройкой path=/ по умолчанию
//(можно изменить, чтобы добавить другие значения по умолчанию):
export function setCookie(name: string, value: string, options: TOptions = {}): void {

  options = {
    path: '/',
    // при необходимости добавьте другие значения по умолчанию
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie: string = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }
  document.cookie = updatedCookie;
}
// Пример использования:
//setCookie('user', 'John', {secure: true, 'max-age': 3600});


// возвращает куки с указанным name или undefined, если ничего не найдено
export function getCookie(name: string): string | undefined {
  const matches: Array<string> | null = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([$?*|{}\]\\^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}


export const writePassword = (password: string): void => setCookie('password', password);
export const readPassword = (): string | undefined => getCookie('password');

export const writeToken = (accessToken: string): void => {
  setCookie('accessToken', accessToken);
}

export const readToken = (): string | undefined => getCookie('accessToken');

export const deleteCookies = (): void => {
  setCookie('password', '', { 'max-age': 0 });
  setCookie('accessToken', '', { 'max-age': 0 });
}

export const isLogined = (): boolean => readToken() === undefined ? false : true;
