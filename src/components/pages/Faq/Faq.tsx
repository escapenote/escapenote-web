import { useState } from 'react';

import { Box, Input } from 'components/atoms';
import iconSearch from 'assets/icons/search-grey.svg';

const Faq = () => {
  const [term, setTerm] = useState('');

  return (
    <>
      <Box mb="24px">
        <Input
          type="text"
          name="term"
          placeholder="검색"
          value={term}
          prefixIcon={
            <img src={iconSearch} alt="search" width="20px" height="20px" />
          }
          onChange={e => setTerm(e.target.value)}
        />
      </Box>

      <ul>
        <li>
          로그인 또는 회원가입이 안 돼요.
          <div>
            로그인 또는 회원가입 과정에 문제가 있을 경우, 고객센터로 문의
            부탁드립니다.
          </div>
        </li>
      </ul>
    </>
  );
};

export default Faq;
