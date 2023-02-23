import Link from 'next/link';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';

import api from 'api';
import { ITheme } from 'types';
import { numberWithComma } from 'utils/common';
import { useAppSelector } from 'store';
import { Box, Stars } from 'components/atoms';
import iconLock from 'assets/icons/lock.svg';
import iconLockDark from 'assets/icons/lock-dark.svg';
import iconBookmark from 'assets/icons/bookmark.svg';
import iconBookmarkActive from 'assets/icons/bookmark-active.svg';

interface IProps {
  theme: ITheme;
  refetch?: any;
}
const ThemeCard: React.FC<IProps> = ({ theme, refetch }) => {
  const router = useRouter();
  const user = useAppSelector(state => state.auth.user);
  const colorTheme = useAppSelector(state => state.common.theme ?? 'light');

  const saveMutation = useMutation(
    () => api.themes.saveTheme({ id: theme.id }),
    {
      onSuccess: () => refetch && refetch(),
      onError: ({ response }) => {
        const { detail } = response.data;
        alert(detail);
      },
    },
  );
  const unSaveMutation = useMutation(
    () => api.themes.unSaveTheme({ id: theme.id }),
    {
      onSuccess: () => refetch && refetch(),
      onError: ({ response }) => {
        const { detail } = response.data;
        alert(detail);
      },
    },
  );

  function handleSaveTheme(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      router.push(`/accounts/login?rd_url=${router.asPath}`);
      return;
    }
    saveMutation.mutate();
  }

  function handleUnSaveTheme(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      router.push(`/accounts/login?rd_url=${router.asPath}`);
      return;
    }
    unSaveMutation.mutate();
  }

  return (
    <Link href={`/themes/${theme.id}`} passHref>
      <Container>
        <Thumbnail
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${theme.thumbnail}`}
          alt={theme.displayName}
        />
        <Contents>
          <Box>
            <Name>{theme.displayName}</Name>
            {theme.cafe && <Cafe>{theme.cafe.name}</Cafe>}
            <Rating>
              <Stars rating={theme?.reviewsRating} />
              <span>
                {theme?.reviewsRating}점({theme?.reviewsCount})
              </span>
            </Rating>
            <LevelBox>
              {Array.from({ length: theme.level }, (_, i) => (
                <img
                  key={i}
                  src={colorTheme === 'light' ? iconLock : iconLockDark}
                  alt="level"
                  width="16px"
                  height="16px"
                />
              ))}
              {theme.during && ` | ${theme.during}분`}
            </LevelBox>
            <GenreBox>
              {theme.genre.length > 0 &&
                theme.genre
                  .slice(0, 2)
                  .map(v => <Genre key={v.id}>#{v.id}</Genre>)}
              {theme.genre.length > 2 && '...'}
            </GenreBox>
          </Box>
        </Contents>

        <Price>₩{numberWithComma(theme.price)}</Price>

        {theme?.saves && theme?.saves.length > 0 ? (
          <SaveButton onClick={handleUnSaveTheme}>
            <img
              src={iconBookmarkActive}
              alt="save-active"
              width="14px"
              height="14px"
            />
          </SaveButton>
        ) : (
          <SaveButton onClick={handleSaveTheme}>
            <img src={iconBookmark} alt="save" width="14px" height="14px" />
          </SaveButton>
        )}
      </Container>
    </Link>
  );
};

const Container = styled.a`
  position: relative;
  display: flex;
  flex-direction: row;
  border-radius: 16px;
  padding: 12px;
  box-shadow: 0 0 40px rgba(var(--text), 0.06);
`;
const Thumbnail = styled.img`
  border-radius: 12px;
  width: 96px;
  height: 96px;
`;
const Contents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  margin-left: 18px;
`;
const Name = styled.strong`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-top: 4px;
  margin-right: 24px;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
`;
const Cafe = styled.span`
  margin-bottom: 4px;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  color: rgb(var(--greyscale400));
`;
const Rating = styled.span`
  margin-left: -1px;
  font-size: 10px;
  > span:last-of-type {
    margin-left: 4px;
  }
`;
const LevelBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: -1px;
  font-size: 10px;
`;
const GenreBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 12px;
  color: rgb(var(--primary));
  line-height: 18px;
`;
const Genre = styled.span`
  margin-right: 4px;
  white-space: nowrap;
`;
const Price = styled.span`
  position: absolute;
  bottom: 12px;
  right: 12px;
  border-radius: 8px;
  padding: 7px 8px;
  height: 32px;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  color: rgb(var(--primary));
  body[data-theme='light'] & {
    background-color: rgb(var(--primary100));
  }
  body[data-theme='dark'] & {
    background-color: rgb(var(--greyscale800));
  }
`;
const SaveButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 24px;
  height: 24px;
  z-index: 9;
`;

export default ThemeCard;
