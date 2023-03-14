import { CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { AuthLayout } from "~layouts/AuthLayout";
import { defaultTheme } from "~styles/theme";
import { Dashboard } from "~views/Dashboard/Dashboard";
import { Login } from "~views/Login";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />

      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
