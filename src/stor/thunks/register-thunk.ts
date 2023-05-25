import { TRegisterResponse, TUser } from '../../services/types-data';
import { AppDispatch, AppThunk } from '../types-store';
import { getRegister } from '../../services/get-data';
import { writeToken, writePassword } from '../../utils';
import type { TInputValues } from '../../hooks/useFormAndValidation';
import { apiFlagDown, apiFlagUp, apiError, getRegisterSuccess } from '../actions';

export const getRegisterThunk = (
  userData: TInputValues, user: TUser, goPath: () => void
): AppThunk => (dispatch: AppDispatch) => {
  dispatch(apiFlagUp());
  getRegister(userData)
    .then((res: TRegisterResponse) => {
      writeToken(res.token);
      writePassword(userData.password);
      dispatch(apiFlagDown());
      dispatch(getRegisterSuccess(userData.email, userData.password, userData.name, res.id, user));
      goPath();
    })
    .catch((res: Response) => {
      res.status === 400
        ? dispatch(apiError('Ошибка 400: регистрация завершается успешно только для заданных пользователей.'))
        : dispatch(apiError(`Error. Status: ${res.status}`));
    })
}
