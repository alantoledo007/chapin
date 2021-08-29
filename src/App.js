import "src/firebase/starter";
import GlobalStyles from "src/styles/GlobalStyles";
import { ThemeProvider } from "styled-components";
import { themeDefault } from "src/styles/theme";
import { Provider as ReduxProvider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import CustomAnimatedSwitch from "src/components/shared/CustomAnimatedSwitch";
import LoginView from "src/views/LoginView";
import RegisterView from "src/views/RegisterView";
import { PATH_ROUTES } from "./constants";
import { ToastProvider } from "react-toast-notifications";
import useUser from "./hooks/useUser";
import FeedView from "./views/FeedView";
import PublishView from "./views/PublishView";

function App() {
  return (
    <ReduxProvider store={store}>
      <GlobalStyles />
      <ThemeProvider theme={themeDefault}>
        <ToastProvider>
          <Routes />
        </ToastProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
}

export default App;

const unauthHandler = (Component) => (user) =>
  !user.isAuthenticated ? Component : () => <Redirect to={PATH_ROUTES.feed} />;

const authHandler = (Component) => (user) =>
  user.isAuthenticated ? Component : () => <Redirect to={PATH_ROUTES.login} />;

const unauth_routes = [
  {
    exact: true,
    component: unauthHandler(LoginView),
    path: PATH_ROUTES.login,
  },
  {
    exact: true,
    component: unauthHandler(RegisterView),
    path: PATH_ROUTES.register,
  },
];

const auth_routes = [
  {
    exact: true,
    component: authHandler(FeedView),
    path: PATH_ROUTES.feed,
  },
  {
    exact: true,
    component: authHandler(PublishView),
    path: PATH_ROUTES.publish,
  },
];

const Routes = () => {
  const user = useUser();

  return (
    <BrowserRouter>
      <CustomAnimatedSwitch>
        {user.isUnknow && <Route path="*">cargando...</Route>}
        <Route exact path="/">
          inicio
        </Route>
        {unauth_routes.map((item) => (
          <Route key={item.path} {...item} component={item.component(user)} />
        ))}
        {auth_routes.map((item) => (
          <Route key={item.path} {...item} component={item.component(user)} />
        ))}
        <Route path="*">error 404</Route>
      </CustomAnimatedSwitch>
    </BrowserRouter>
  );
};
