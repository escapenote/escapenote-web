import styled from '@emotion/styled';

import { useAppSelector } from 'store';
import GoogleAdsense from 'components/molecules/GoogleAdsense';

interface IProps {
  layoutKey?: string;
  lightSlot: string;
  darkSlot: string;
  noContainer?: boolean;
}
const ThemeAds: React.FC<IProps> = ({
  layoutKey = '-hc+k-23-7u+lx',
  lightSlot,
  darkSlot,
  noContainer = false,
}) => {
  const colorTheme = useAppSelector(state => state.common.theme);

  return (
    <>
      {colorTheme && (
        <>
          {!noContainer ? (
            <Container>
              <GoogleAdsense
                format="fluid"
                layoutKey={layoutKey}
                slot={colorTheme === 'light' ? lightSlot : darkSlot}
              />
            </Container>
          ) : (
            <GoogleAdsense
              format="fluid"
              layoutKey={layoutKey}
              slot={colorTheme === 'light' ? lightSlot : darkSlot}
            />
          )}
        </>
      )}
    </>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  margin-bottom: 18px;
  border-radius: 16px;
  padding: 16px 14px 0px 14px;
  /* padding: 14px; */
  box-shadow: 0 0 40px rgba(var(--text), 0.06);
  /* * {
    max-height: 110px !important;
    overflow: hidden !important;
  } */
`;

export default ThemeAds;
