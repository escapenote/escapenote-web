import { useEffect } from 'react';

import { useAppDispatch } from 'store';
import { setTheme } from 'store/commonSlice';

/**
 * 테마 설정
 */
const useTheme = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    function getUserPreference() {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }

    const currentTheme = getUserPreference();
    dispatch(setTheme(currentTheme));
  }, []);
};

export default useTheme;
