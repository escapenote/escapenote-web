import Link from 'next/link';
import styled from '@emotion/styled';

import { ICafe } from 'types';
import { Box } from 'components/atoms';
import iconLightbulb from 'assets/icons/lightbulb.svg';

interface IProps {
  cafe: ICafe;
}
const CafeCard: React.FC<IProps> = ({ cafe }) => {
  return (
    <Link href={`/cafes/${cafe.id}`} passHref>
      <Container>
        <Name>{cafe.name}</Name>
        <Themes>
          {cafe.themes.map(theme => (
            <Box key={theme.id} mr="12px">
              <ThemeThumbsnail
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${theme.thumbnail}`}
                alt={theme.name}
              />
              <Box flexDirection="row" alignItems="center">
                <img
                  src={iconLightbulb}
                  alt="level"
                  width="24px"
                  height="24px"
                />
                난이도 {theme.level}
              </Box>
            </Box>
          ))}
        </Themes>
      </Container>
    </Link>
  );
};

const Container = styled.a`
  display: flex;
  flex-direction: column;
  margin: 0 20px 12px 20px;
  border: 1px solid rgb(var(--border));
  padding: 10px;
`;
const Name = styled.strong`
  margin-bottom: 15px;
  font-size: 16px;
`;
const Themes = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  font-weight: 300;
`;
const ThemeThumbsnail = styled.img`
  border-radius: 4px;
  width: 82px;
  height: 115px;
`;

export default CafeCard;
