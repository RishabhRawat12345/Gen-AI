import React from 'react';
import { SearchOutlined } from '@mui/icons-material';
import { styled } from 'styled-components';

const SearchBarContainer = styled.div`
  max-width: 550px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  margin: 0 auto; /* Center the container */
  border: 1px solid ${({ theme }) => theme.text_secondary + '90'};
  color: ${({ theme }) => theme.text_primary};
  border-radius: 8px;
  padding: 12px 16px;
  position: relative;
`;

const Input = styled.input`
  border: none;
  outline: none;
  width: 100%;
  color: inherit;
  background: transparent;
  margin-left: 8px;
`;

const Search = () => {
  return (
    <SearchBarContainer>
      <SearchOutlined />
      <Input placeholder="Search with prompt..." />
    </SearchBarContainer>
  );
};

export default Search;
