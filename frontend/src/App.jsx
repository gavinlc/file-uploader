import React from 'react';
import styled from 'styled-components';

import GlobalStyles from "./styles/GlobalStyles";
import FileUploader from './components/FileUploader';

const StyledApp = styled.div`
   text-align: center;
  background-color: rgb(206, 213, 223);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
`;

const Container = styled.div`
 background-color: white;
  padding: 32px;
  width: 50%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11), 0 5px 15px 0 rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
`;

function App() {
  return (
    <StyledApp>
        <GlobalStyles/>
      <Container>
        <FileUploader />
      </Container>
    </StyledApp>
  );
}

export default App;
