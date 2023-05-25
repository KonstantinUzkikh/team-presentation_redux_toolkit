import { AppDispatch, AppThunk } from '../types-store';
import { apiFlagUp, apiFlagDown, apiError, getUsersSuccess } from '../actions';
import { getUsers } from '../../services/get-data';
import { TUser } from '../../services/types-data';

export const getUsersThunk = (): AppThunk => (dispatch: AppDispatch) => {
  dispatch(apiFlagUp());
  getUsers()
    .then((res: TUser[]) => {
      dispatch(apiFlagDown());
      dispatch(getUsersSuccess(res));
    })
    .catch((res: Response) => dispatch(apiError(`Error. Status: ${res.status}`)));
}
