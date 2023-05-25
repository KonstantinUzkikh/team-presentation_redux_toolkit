export const API_FLAG_UP: 'API_FLAG_UP' = 'API_FLAG_UP';
export const API_FLAG_DOWN: 'API_FLAG_DOWN' = 'API_FLAG_DOWN';
export const API_ERROR: 'API_ERROR' = 'API_ERROR';
export const ERROR: 'ERROR' = 'ERROR';
export const RESET_NOTIFIER: 'RESET_NOTIFIER' = 'RESET_NOTIFIER';

export interface IResetNotifier {
  readonly type: typeof RESET_NOTIFIER;
};

export interface IApiFlagUp {
  readonly type: typeof API_FLAG_UP;
};

export interface IApiFlagDown {
  readonly type: typeof API_FLAG_DOWN;
};

export interface IApiError {
  readonly type: typeof API_ERROR;
  readonly error: string;
};

export interface IError {
  readonly type: typeof ERROR;
  readonly error: string;
}

export type TNotifierActions = IResetNotifier | IApiFlagUp | IApiFlagDown | IApiError | IError;

export const apiFlagUp = (): IApiFlagUp => ({ type: API_FLAG_UP });

export const apiFlagDown = (): IApiFlagDown => ({ type: API_FLAG_DOWN });

export const apiError = (error: string = ''): IApiError => {
  return {
    type: API_ERROR,
    error
  }
};

export const error = (error: string): IError => {
  return {
    type: ERROR,
    error
  };
};

export const resetNotifier = (): IResetNotifier => ({ type: RESET_NOTIFIER })
