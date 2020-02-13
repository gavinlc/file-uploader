import { createGlobalStyle } from "styled-components";
import styledSanitize from "styled-sanitize";

const GlobalStyles = createGlobalStyle`

     ${styledSanitize}

    body {
      margin: 0;
      //font-size: 16px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
`;

export default GlobalStyles;
