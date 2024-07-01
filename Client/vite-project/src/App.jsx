import React from 'react';
import { styled, ThemeProvider } from 'styled-components';
import { darkTheme } from "./utils/Theme";
import Home from './Pages/Home';
import CreatePost from './Pages/CreatePost';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Componenets/Navbar';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  overflow-x: hidden;
  transition: all 0.2s ease;
  background: ${({ theme }) => theme.bg};
`;

const Wrapper = styled.div`
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 3;
`;

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        <Wrapper>
          <BrowserRouter>
          <Navbar/>
            <Routes>
              <Route path="/" element={<Home />} exact />
              <Route path="/post" element={<CreatePost />} exact />
            </Routes>
          </BrowserRouter>
        </Wrapper>
      </Container>
    </ThemeProvider>
  );
};

export default App;