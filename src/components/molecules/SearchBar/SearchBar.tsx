import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

import iconSearch from 'assets/icons/search-grey.svg';

interface IProps {
  placeholder?: string;
  term?: string;
  onSearch: (term: string) => void;
}
const SearchBar: React.FC<IProps> = ({ placeholder, term, onSearch }) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (term) setValue(term);
  }, [term]);

  function handleChangeValue(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSearch(value);
  }

  return (
    <InputForm onSubmit={handleSubmit}>
      <Image src={iconSearch} alt="search" />
      <Input
        placeholder={placeholder || '카페 또는 테마 검색'}
        value={value}
        onChange={handleChangeValue}
      />
    </InputForm>
  );
};

const InputForm = styled.form`
  position: relative;
  width: 100%;
  height: 100%;
`;
const Image = styled.img`
  position: absolute;
  top: 50%;
  left: 0;
  margin: 11px 13px;
  width: 20px;
  height: 20px;
  transform: translateY(calc(-50% - 12px));
`;
const Input = styled.input`
  border-radius: 16px;
  padding: 12.5px 8px 12.5px 42px;
  width: 100%;
  height: 100%;
  min-height: 40px;
  background-color: rgb(var(--background));
`;

export default SearchBar;
