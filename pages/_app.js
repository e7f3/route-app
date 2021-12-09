import { Provider } from "react-redux";
import { store } from "../store/index";
import Layout from "../components/layouts/Layout.jsx";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../utils/createTheme.js";
import "../styles/style.scss";

// Кастомный app с Provider для store от redux,
// ThemeProvider для темы Material UI, 
// Разметкой

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}
