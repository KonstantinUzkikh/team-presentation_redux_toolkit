/* eslint-disable react-hooks/rules-of-hooks */
import { FC, useCallback, useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from '../stor/hooks-store';

import ButtonHeader from '../components/button-header/button-header';
import ButtonPage from '../components/button-page/button-page';
import { isLogined, usersOnPageLimit } from '../utils';

import { TUser } from '../services/types-data';
import { decreasePage, increasePage, userToggleLike } from '../stor/actions';

import pageLayout from './page.module.css';
import teamLayout from './team.module.css'

import likeActive from '../images/like-active.svg';
import likeDisactive from '../images/like-disactive.svg';
import chevronDown from '../images/Colebemis-Feather-Chevron-down.svg';
import chevronUp from '../images/Colebemis-Feather-Chevron-up.svg';

const TeamPresentation: FC = () => {
  return (
    <div className={teamLayout.team}>
      <h1 className={pageLayout.h1Style}>Наша команда</h1>
      <h3 className={pageLayout.h3Style}>
        Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые ложатся <br /> на их плечи,
        и умеющие находить выход из любых, даже самых сложных ситуаций.
      </h3>
    </div>
  );
}

const ProfileCard: FC<{ user: TUser }> = ({ user }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id, first_name, last_name, avatar, like } = user;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const goLink = useCallback(() => { navigate(`/team/${id}`) }, []);

  const onToggle = () => dispatch(userToggleLike(id)); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div onClick={goLink} className={teamLayout.profileCardBox}>
      <div className={teamLayout.profileCard} >
        <img src={avatar} alt="Аватар" className={teamLayout.avatar} />
        <h3 className={pageLayout.h3Style}>
          {`${first_name} ${last_name}`}
        </h3>
        <div className={teamLayout.boxLike} onClick={(evt) => evt.stopPropagation()} >
          {like
            ? <img src={likeActive} alt="иконка лайка" onClick={onToggle} className={teamLayout.like} />
            : <img src={likeDisactive} alt="иконка лайка" onClick={onToggle} className={teamLayout.like} />
          }
        </div>
      </div>
    </div>
  );
}

const TeamPage: FC = () => {

  const location = useLocation();
  const dispatch = useDispatch();

  if (!isLogined()) return <Navigate to="/login" state={{ from: location }} />;

  const { currentPage, users } = useSelector(state => state.users);
  const [usersOnPage, setUsersOnPage] = useState<TUser[]>([]);

  const [isNoLikes, setIsNoLikesset] = useState<number>(1);

  useEffect(() => { (isNoLikes === 3) && sessionStorage.removeItem('likeIds') }, [isNoLikes]);

  useEffect(() => {
    setUsersOnPage(
      users.filter((it, index) =>
        (index < currentPage * usersOnPageLimit) && (index >= (currentPage - 1) * usersOnPageLimit))
    );

      const arr = users.filter(it => it.like === true)
      if (arr.length !== 0) {
        sessionStorage.setItem('likeIds', JSON.stringify(arr.map(it => it.id)));
        setIsNoLikesset(2);

      } else (isNoLikes !== 1) && setIsNoLikesset(3);

  }, [currentPage, users]);  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <header className={`${pageLayout.headerStyle} ${teamLayout.headerStyle}`}>
        <nav className={pageLayout.navStyle}>
          <ButtonHeader content={'none'} />
          <ButtonHeader content={'exit'} />
        </nav>
        <div className={pageLayout.headerContentStyle}>
          <TeamPresentation />
        </div>
      </header>
      {currentPage > 0
        ? <div className={pageLayout.page}>
          <div className={teamLayout.grid}>
            {usersOnPage.map((it: TUser) => <ProfileCard user={it} key={it.id} />)}
          </div>
          <div className={teamLayout.buttonGroup}>
            <ButtonPage
              srcIcon={chevronUp}
              disabled={currentPage === 1}
              onClick={() => dispatch(decreasePage())}
            />
            <ButtonPage
              srcIcon={chevronDown}
              disabled={!(currentPage < Math.ceil(users.length / usersOnPageLimit))}
              onClick={() => dispatch(increasePage())}
            />
          </div>
        </div>
        : <div className={`${pageLayout.page} ${teamLayout.noUsers}`}>
          <p className={pageLayout.h3Style}>Массив зарегистрированных пользователей пуст.</p>
        </div>
      }
    </>
  );
}

export default TeamPage;
