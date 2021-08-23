import GlobalStyles from "src/styles/GlobalStyles";
import { ThemeProvider } from "styled-components";
import { themeDefault } from "src/styles/theme";
import { Provider as ReduxProvider } from "react-redux";
import Button from "src/components/shared/Button";
import store from "./redux/store";
import Auth from "./views/Auth";

function App() {
  return (
    <ReduxProvider store={store}>
      <GlobalStyles />
      <ThemeProvider theme={themeDefault}>
        <Auth />
      </ThemeProvider>
    </ReduxProvider>
  );
}

export default App;
