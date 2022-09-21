import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Authenticated } from "./auth/Authenticated";
import { MainPage } from "./pages/MainPage";
import { LoginPage } from "./pages/LoginPage";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="sign-in" element={<LoginPage />} />
          <Route path="/" element={<Authenticated />}>
            <Route index element={<MainPage />} />
            <Route path="parser/:parserName" element={<MainPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
