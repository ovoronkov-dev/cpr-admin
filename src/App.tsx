import { Route, Routes } from "react-router-dom";
import { AuthLayout } from "~layouts/AuthLayout";
import { Dashboard } from "~views/Dashboard";
import { Login } from "~views/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<Dashboard />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
