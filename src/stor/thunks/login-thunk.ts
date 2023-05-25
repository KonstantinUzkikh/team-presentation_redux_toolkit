import { AppDispatch, AppThunk } from '../types-store';
import { apiFlagDown, apiFlagUp, apiError, getLoginSuccess } from '../actions';
import { writeToken, writePassword } from '../../utils';
import { getLogin } from '../../services/get-data';
import type { TInputValues } from '../../hooks/useFormAndValidation';
import { TLoginResponse, TUser } from '../../services/types-data';

export const getLoginThunk = (
  userData: TInputValues, user: TUser, goPath: () => void
): AppThunk => (dispatch: AppDispatch) => {
  dispatch(apiFlagUp());
  getLogin(userData)
    .then((res: TLoginResponse) => {
      writeToken(res.token);
      writePassword(userData.password);
      dispatch(apiFlagDown());
      dispatch(getLoginSuccess(userData.email, userData.password, user));
      goPath();
    })
    .catch((res: Response) => {
      res.status === 400
        ? dispatch(apiError('Ошибка 400: пользователь не найден'))
        : dispatch(apiError(`Error. Status: ${res.status}`));
    })
}
