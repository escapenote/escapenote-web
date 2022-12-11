import React, { useRef } from 'react';

import { useIntersectionObserver } from 'hooks';
import { Box } from 'components/atoms';

interface IProps {
  fetchNextPage: any;
  hasNextPage?: boolean;
  isFetching: boolean;
  isFetchingNextPage: boolean;
}
const FetchMore: React.FC<IProps> = ({
  fetchNextPage,
  hasNextPage,
  isFetching,
  isFetchingNextPage,
}) => {
  const loadMoreButtonRef = useRef<HTMLDivElement>(null);

  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  return (
    <div ref={loadMoreButtonRef}>
      {hasNextPage && (
        <Box alignItems="center" p="20px">
          {isFetching && !isFetchingNextPage ? 'Loading...' : null}
        </Box>
      )}
    </div>
  );
};

export default FetchMore;
