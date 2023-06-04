export type TMsgRecord = {
  code: number,
  msg: string
}

export const uncodeMsg = (code: number, arrMsg: TMsgRecord[]): string | undefined=> {
  return arrMsg.find(it => it.code === code)?.msg;
}

export const createErrMsg = (err: any, errors?: TMsgRecord[]): string => {
  let errMsg: string = '';

  typeof err === 'string'
    ? errMsg = err
    : errMsg = typeof err?.status !== 'number'
      ? err?.message
      : `Ошибка ${err.status}: ${(errors && `${uncodeMsg(err.status, errors)}`) || `${err?.statusText}` || ''}`;
  return errMsg;
}
