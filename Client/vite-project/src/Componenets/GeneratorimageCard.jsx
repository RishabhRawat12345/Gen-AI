import React from 'react';
import { styled } from 'styled-components';
import { CircularProgress } from '@mui/material';

const Container = styled.div`
  max-width: 300px;
  width: 100%;
  flex: 1;
  min-height: 300px;
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border: 2px dashed ${({ theme }) => theme.yellow};
  color: ${({ theme }) => theme.arrow + 80};
  border-radius: 20px;
  margin: 0;
  /* Add these styles to move the container to the right side */
  position: absolute;
  right: 35px;
  top: 50%;
  transform: translateY(-50%);
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 24px;
  background: ${({ theme }) => theme.black + 50};
`;

const GeneratorimageCard = ({ src, loading }) => {
  return (
    <Container>
      {loading ? (
        <>
          <CircularProgress
            style={{ color: "inherit", width: "24px", height: "24px" }}
          />
          Generating Your Image ...
        </>
      ) : (
        <>
          {src ? <Image src={src} /> : <>Write a prompt to generate image </>}
        </>
      )}
    </Container>
  );
};

export default GeneratorimageCard;