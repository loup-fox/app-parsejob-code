import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Authenticated } from "./auth/Authenticated";
import { MainPage } from "./pages/MainPage";
import { LoginPage } from "./pages/LoginPage";
import { ParserPage } from "./pages/ParserPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="sign-in" element={<LoginPage />} />
        <Route path="/" element={<Authenticated />}>
          <Route index element={<ParserPage />} />
          <Route path="parser" element={<ParserPage />} />
          <Route path="parser/:parserName" element={<ParserPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
