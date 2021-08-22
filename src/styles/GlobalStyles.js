import { createGlobalStyle } from "styled-components";
import InterFont from "src/assets/fonts/Inter.ttf";

const GlobalStyles = createGlobalStyle`
    @font-face {
        font-family: Inter;
        src: local('Inter'), url(${InterFont}) format('truetype');
    }
    html,
    body {
        padding: 0;
        margin: 0;
        font-family: Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    }

    a {
        color: inherit;
        text-decoration: none;
        :hover {
            cursor: pointer;
        }
    }

    * {
        box-sizing: border-box;
    }
`;

export default GlobalStyles;
