import Link from 'next/link';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';

import api from 'api';
import { ITheme } from 'types';
import { numberWithComma } from 'utils/common';
import { useAppSelector } from 'store';
import { Box } from 'components/atoms';
import iconLock from 'assets/icons/lock.svg';
import iconHeartFilled from 'assets/icons/heart-filled.svg';
import iconHeartFilledActive from 'assets/icons/heart-filled-active.svg';

interface IProps {
  theme: ITheme;
  refetch?: any;
}
const ThemeBigCard: React.FC<IProps> = ({ theme, refetch }) => {
  const router = useRouter();
  const user = useAppSelector(state => state.auth.user);

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
      <Container
        imageUrl={`${process.env.NEXT_PUBLIC_IMAGE_URL}${theme.thumbnail}`}
      >
        <Contents>
          <Box>
            <Name>{theme.name}</Name>
            {theme.cafe && <Cafe>{theme.cafe.name}</Cafe>}
            <LevelBox>
              {Array.from({ length: theme.level }, (_, i) => (
                <img
                  key={i}
                  src={iconLock}
                  alt="level"
                  width="16px"
                  height="16px"
                />
              ))}
            </LevelBox>
          </Box>
          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="flex-end"
          >
            <GenreBox>
              {theme.genre.length > 0 &&
                theme.genre
                  .slice(0, 3)
                  .map(v => <Genre key={v.id}>#{v.id}</Genre>)}
              {theme.genre.length > 3 && '...'}
            </GenreBox>
            <Price>₩{numberWithComma(theme.price)}</Price>
          </Box>
        </Contents>

        {theme?.saves && theme?.saves.length > 0 ? (
          <SaveButton onClick={handleUnSaveTheme}>
            <img
              src={iconHeartFilledActive}
              alt="save-active"
              width="24px"
              height="24px"
            />
          </SaveButton>
        ) : (
          <SaveButton onClick={handleSaveTheme}>
            <img src={iconHeartFilled} alt="save" width="24px" height="24px" />
          </SaveButton>
        )}
      </Container>
    </Link>
  );
};

const Container = styled.a<{ imageUrl: string }>`
  position: relative;
  display: flex;
  flex-direction: row;
  border-radius: 20px;
  width: 250px;
  height: 290px;
  background-image: url(${p => p.imageUrl});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
`;
const Contents = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  margin: 12px;
  border-radius: 16px;
  padding: 12px;
  background-color: rgb(var(--content));
  box-shadow: 4px 8px 16px rgba(17, 24, 39, 0.2);
`;
const Name = styled.strong`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
`;
const Cafe = styled.span`
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  color: rgb(var(--greyscale400));
`;
const LevelBox = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: -1px;
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
`;
const Price = styled.span`
  border-radius: 8px;
  padding: 7px 8px;
  background-color: rgb(var(--primary100));
  font-size: 12px;
  font-weight: 500;
  color: rgb(var(--primary));
`;
const SaveButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 24px;
  height: 24px;
  z-index: 9;
`;

export default ThemeBigCard;
