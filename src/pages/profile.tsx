/* eslint-disable react-hooks/rules-of-hooks */
import { FC, useEffect, useRef, useState } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';

import { useSelector } from '../stor/hooks-store';
import ButtonHeader from '../components/button-header/button-header';
import { isLogined } from '../utils';

import { TUser } from '../services/types-data';

import pageLayout from './page.module.css';
import profileLayout from './profile.module.css';

import phone from '../images/phone.svg';
import email from '../images/email.svg';

const PersonProfile: FC<{ user: TUser }> = ({ user }) => {

  return (
    <>
      <div className={profileLayout.profile}>
        <img src={user.avatar} alt="Аватар" className={profileLayout.avatar} />
        <div className={profileLayout.profileInfo}>
          <h1 className={pageLayout.h1Style}>{`${user.first_name} ${user.last_name}`}</h1>
          <h2 className={pageLayout.h2Style}>{`Партнер-${String(user.id)}`}</h2>
        </div>
      </div>
    </>
  );
}

const ProfilePage: FC = () => {

  const location = useLocation();

  if (!isLogined()) return <Navigate to="/login" state={{ from: location }} />;

  const navigate = useNavigate();
  const id = useParams().id;

  const { isLoadUsers, users } = useSelector(state => state.users);

  const userRef = useRef<TUser>();
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    if (isLoadUsers) {
      userRef.current = users.filter((it: TUser) => it.id === Number(id))[0];
      if (userRef.current === undefined) { navigate('/not-found') } else { setIsFiltered(true) };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadUsers, isFiltered]);

  return (
    <>
      {isFiltered && userRef.current !== undefined && <div>
        <header className={`${pageLayout.headerStyle} ${profileLayout.headerStyle}`}>
          <nav className={pageLayout.navStyle}>
            <ButtonHeader content={'back'} />
            <ButtonHeader content={'exit'} />
          </nav>
          <div className={pageLayout.headerContentStyle}>
            <PersonProfile user={userRef.current} />
          </div>
        </header>
        <div className={`${pageLayout.page} ${profileLayout.mainContentStyle}`}>
          <div></div>
          <div>
            <p className={pageLayout.textStyle}>
              Клиенты видят в нем эксперта по вопросам разработки комплексных решений финансовых продуктов,
              включая такие аспекты, как организационная структура, процессы, аналитика и ИТ-компоненты.
              Он помогает клиентам лучше понимать структуру рисков их бизнеса, улучшать процессы за счет применения новейших
              технологий и увеличивать продажи, используя самые современные аналитические инструменты.
            </p>
            <br></br>
            <p className={pageLayout.textStyle}>
              В работе с клиентами недостаточно просто решить конкретную проблему или помочь справиться с трудностями.
              Не менее важно уделять внимание обмену знаниями: "Один из самых позитивных моментов — это осознание того,
              что ты помог клиенту перейти на совершенно новый уровень компетентности, уверенность в том,
              что после окончания проекта у клиента есть все необходимое, чтобы дальше развиваться самостоятельно".
            </p>
            <br></br>
            <p className={pageLayout.textStyle}>
              Помимо разнообразных проектов для клиентов финансового сектора, Сорин ведет активную предпринимательскую
              деятельность. Он является совладельцем сети клиник эстетической медицины в Швейцарии, предлагающей
              инновационный подход к красоте, а также инвестором других бизнес-проектов.
            </p>
            <br />
          </div>
          <div></div>
          <div className={profileLayout.contacts}>
            <div className={`${profileLayout.contact} ${pageLayout.textStyle}`}>
              <img src={phone} alt="номер телефона" className={profileLayout.icon} />
              {userRef.current.id > 9
                ? <span>{`+7 (954) 333-44-${String(userRef.current.id)}`}</span>
                : <span>{`+7 (954) 333-44-0${String(userRef.current.id)}`}</span>
              }
            </div>
            <div className={`${profileLayout.contact} ${pageLayout.textStyle}`}>
              <img src={email} alt="e-mail" className={profileLayout.icon} />
              <span>{`${userRef.current.email}`}</span>
            </div>
          </div>
          <div></div>
        </div>
      </div>}
    </>
  );
}

export default ProfilePage;
