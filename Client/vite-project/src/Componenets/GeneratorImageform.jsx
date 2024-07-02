import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "./button"; // Ensure correct case
import TextInput from "./TextInput"; // Ensure correct case
import { AutoAwesome, CreateRounded } from "@mui/icons-material";
import { CreatePost, GenerateAIImage } from "../Componenets/Api/index"; // Ensure correct path
import GeneratorimageCard from "./GeneratorimageCard";
import ImageCard from "./ImageCard"; 

const Form = styled.div`
  flex: 1;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 9%;
  justify-content: center;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;

const Desc = styled.div`
  font-size: 17px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;

const Body = styled.div`
  max-width: 800px;
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 18px;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;

const Actions = styled.div`
  flex: 1;
  display: flex;
  gap: 8px;
`;

const ImageContainer = styled.div`
  margin-top: 20px;
`;
const GenerateImageForm = ({
  post: initialPost,
  createPostLoading: initialCreatePostLoading,
  generateImageLoading: initialGenerateImageLoading,
}) => {
  const navigate = useNavigate();
  const [post, setPost] = useState(initialPost || { name: '', prompt: '', photo: '' });
  const [error, setError] = useState('');
  const [createPostLoading, setCreatePostLoading] = useState(initialCreatePostLoading || false);
  const [generateImageLoading, setGenerateImageLoading] = useState(initialGenerateImageLoading || false);
  const [generatedImage, setGeneratedImage] = useState(null); // Add a new state to store the generated image
  const generateImageFun = async () => {
    if (!post.prompt) {
      setError("Please enter a prompt");
      return;
    }
    setGenerateImageLoading(true);
    try {
      const request = { prompt: post.prompt };
      console.log("GenerateAIImage request:", request);
      const res = await GenerateAIImage(request);
      setGeneratedImage(res.data.photo); // Store the generated image in the state
      setPost({ ...post, photo: res.data.photo });
    } catch (error) {
      setError("Error generating image");
      console.error(error);
    } finally {
      setGenerateImageLoading(false);
    }
  };

  const createPostFun = async () => {
    setCreatePostLoading(true);
    const postData = { ...post, photo: post.photo };
    await CreatePost(postData)
      .then((res) => {
        setCreatePostLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setError(error?.response?.data?.message);
        setCreatePostLoading(false);
      });
  };
  return (
    <Form>
      {/* <ImageContainer>
        {generatedImage && ( // Render the ImageCard component only if the generated image is available
          <ImageCard  />
        )}
      </ImageContainer> */}
      <Top>
        <Title>Generate Image with prompt</Title>
        <Desc>Write your prompt according to the image you want to generate!</Desc>
      </Top>
      <Body>
        <TextInput
          label="Author"
          placeholder="Enter your name.."
          name="author"
          value={post.name}
          handleChange={(e) => setPost({ ...post, name: e.target.value })}
        />
        <TextInput
          label="Image Prompt"
          placeholder="Write a detailed prompt about the image... "
          name="prompt"
          rows="8"
          textArea
          value={post.prompt}
          handleChange={(e) => setPost({ ...post, prompt: e.target.value })}
        />
        {error && <div style={{ color: "red" }}>{error}</div>}
        <div>** You can post the AI Generated Image to the Community **</div>
        <ImageContainer>
          <GeneratorimageCard src={post.photo} loading={generateImageLoading} />
        </ImageContainer>
      </Body>
      <Actions>
        <Button
          text="Generate Image"
          flex
          leftIcon={<AutoAwesome />}
          isLoading={generateImageLoading}
          isDisabled={post.prompt === ""}
          onClick={() => generateImageFun()}
        />
        <Button
          text="Post Image"
          flex
          type="secondary"
          leftIcon={<CreateRounded />}
          isLoading={createPostLoading}
          isDisabled={
            post.name === "" || post.prompt === "" || post.photo === ""
          }
          onClick={() => createPostFun()}
        />
      </Actions>
    </Form>
  );
};

export default GenerateImageForm;