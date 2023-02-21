import React, { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useQuery } from '@tanstack/react-query';
import debounce from 'lodash/debounce';

import api from 'api';
import { Box, Input } from 'components/atoms';
import iconSearch from 'assets/icons/search-grey.svg';
import iconChevronUp from 'assets/icons/chevron-up.svg';

const Faq = () => {
  const [term, setTerm] = useState('');
  const [index, setIndex] = useState(-1);

  const { isLoading, data, error } = useQuery(['fetchFaqList', term], () => {
    return api.faq.fetchFaqList({ term });
  });

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounceQuestionChange(e.target.value);
  };
  const debounceQuestionChange = debounce(value => {
    setTerm(value);
  }, 500);

  function handleChangeIndex(i: number) {
    if (i === index) {
      setIndex(-1);
    } else {
      setIndex(i);
    }
  }

  return (
    <>
      <Box mb="24px">
        <Input
          type="text"
          name="term"
          placeholder="검색"
          prefixIcon={
            <img src={iconSearch} alt="search" width="20px" height="20px" />
          }
          onChange={handleQuestionChange}
        />
      </Box>

      <Items>
        {isLoading ? (
          <Loading>로딩중...</Loading>
        ) : error ? (
          <Error>에러</Error>
        ) : data?.length === 0 ? (
          <NoData>데이터가 없습니다.</NoData>
        ) : (
          data?.map((v, i) => (
            <Item key={v.id} active={i === index}>
              <Question onClick={() => handleChangeIndex(i)}>
                {v.question}
              </Question>
              <Answer dangerouslySetInnerHTML={{ __html: v.answer }} />
            </Item>
          ))
        )}
      </Items>
    </>
  );
};

const Loading = styled.strong`
  font-size: 14px;
  font-weight: 500;
`;
const Error = styled(Loading)``;
const NoData = styled(Loading)``;
const Items = styled.ul``;
const Item = styled.li<{ active: boolean }>`
  position: relative;
  border-bottom: 1px solid rgb(var(--border));
  height: 60px;
  overflow: hidden;
  ::after {
    content: '';
    position: absolute;
    top: 18px;
    right: 0;
    width: 24px;
    height: 24px;
    background-image: url(${iconChevronUp});
    background-repeat: no-repeat;
    background-size: 24px 24px;
    transform: rotate(180deg);
    ${p =>
      p.active &&
      css`
        transform: rotate(0deg);
      `}
  }
  ${p =>
    p.active &&
    css`
      height: auto;
    `};
`;
const Question = styled.button`
  padding: 20px 0;
  width: 100%;
  font-weight: 700;
  text-align: left;
  line-height: 21px;
`;
const Answer = styled.div`
  margin-bottom: 20px;
  color: rgb(var(--greyscale500));
  line-height: 21px;
`;

export default Faq;
