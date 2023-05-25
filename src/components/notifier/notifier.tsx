import { useEffect, useState, FC } from 'react';
import ReactDOM from "react-dom";

import { useSelector, useDispatch } from '../../stor/hooks-store';
import { resetNotifier } from '../../stor/actions';
import notifierLayout from './notifier.module.css';

const Notifier: FC = () => {

  const Notification: FC<{ title?: string; notification?: string; isClosed?: boolean; children?: string }> =
    ({ title, notification, isClosed, children }) => {

      const dispatch = useDispatch();

      const comment = 'Чтобы закрыть уведомление,\nнажмите Esc или кликните мышкой.';

      const onClose = () => isClosed && dispatch(resetNotifier());

      useEffect(() => {
        const escCloseModal = (evt: KeyboardEvent) => evt.key === 'Escape' && onClose();
        document.addEventListener('keydown', escCloseModal);
        return () => {
          document.removeEventListener('keydown', escCloseModal)
        }
      }, []); // eslint-disable-line react-hooks/exhaustive-deps

      return (
        <div className={notifierLayout.overlay} onClick={onClose}>
          <div className={notifierLayout.boxMain} >
            <div className={notifierLayout.children}>
              {title !== undefined && <p>{title}</p>}
              {notification !== undefined && <p data-testid={'notification'} >{notification}</p>}
              {children !== undefined && <p>{children}</p>}
              {isClosed && <p>{comment}</p>}
            </div>
          </div>
        </div>
      )
    }

  type TNotification = { isFlag: boolean; title: string; notification: string; isClosed: boolean }
  const initialNotification: TNotification = { isFlag: false, title: '', notification: '', isClosed: false }

  const [notification, setNotification] = useState<TNotification>(initialNotification);
  const [isOpen, setIsOpen] = useState(false);

  const { isAPI, isError, error } = useSelector(state => state.notifier);

  const notifications: Array<{ isFlag: boolean; title: string; notification: string; isClosed: boolean }> = [
    { isFlag: isAPI, title: 'Ожидайте', notification: 'Загружаем данные с сервера...', isClosed: false },
    { isFlag: isError, title: 'Что-то пошло не так...', notification: `${error}`, isClosed: true },
  ]

  useEffect(() => {
    setIsOpen(isAPI || isError);
    setNotification(notifications.find((item) => { return item.isFlag }) || initialNotification);
  }, [isAPI, isError]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {isOpen && ReactDOM.createPortal(
        <Notification
          title={notification.title}
          notification={notification.notification}
          isClosed={notification.isClosed}
        />,
        document.getElementById('notifier') as Element
      )}
    </>
  )
}

export default Notifier
