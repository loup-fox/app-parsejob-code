import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Authenticated } from "./auth/Authenticated";
import { MainPage } from "./pages/MainPage";
import { LoginPage } from "./pages/LoginPage";
import { ParserPage } from "./pages/ParserPage";
import { ParserCodingPage } from "./pages/ParserCodingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="sign-in" element={<LoginPage />} />
        <Route path="/" element={<Authenticated />}>
          <Route index element={<ParserPage />} />
          <Route path="parser/*" element={<ParserPage />} />
          <Route path="parser-coding/*" element={<ParserCodingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
