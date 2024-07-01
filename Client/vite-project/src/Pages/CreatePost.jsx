import React, { useState } from 'react';
import styled from 'styled-components';
import GeneratorImageForm from '../Componenets/GeneratorImageform'; // Ensure correct path
import GeneratorImageCard from '../Componenets/GeneratorimageCard'; // Ensure correct path

const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
  background: ${({ theme }) => theme.bg};
  padding: 30px 30px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;

  @media (max-width: 768px) {
    padding: 6px 10px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: fit-content;
  max-width: 1200px;
  gap: 200px;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CreatePost = () => {
  const [generateImageLoading, setGenerateImageLoading] = useState(false);
  const [createPostLoading, setCreatePostLoading] = useState(false);
  const [post, setPost] = useState({
    author: "",
    prompt: "",
    photo: "",
  });

  return (
    <Container>
      <Wrapper>
        <GeneratorImageForm 
          post={post}
          setPost={setPost}
          createPostLoading={createPostLoading}
          generateImageLoading={generateImageLoading}
          setCreatePostLoading={setCreatePostLoading}
          setGenerateImageLoading={setGenerateImageLoading}
        />
        <GeneratorImageCard 
          src={post?.photo}
          loading={generateImageLoading}
        />
      </Wrapper>
    </Container>
  );
};

export default CreatePost;
