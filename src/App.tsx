import { CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { AuthLayout } from "~layouts/AuthLayout";
import { defaultTheme } from "~styles/theme";
import { Dashboard } from "~views/Dashboard/Dashboard";
import { Editor } from "~views/Editor/Editor";
import { Login } from "~views/Login";
import { Viewer } from "~views/Viewer/Viewer";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />

      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="editor" element={<Editor />} />
          <Route path="viewer/:id" element={<Viewer />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
