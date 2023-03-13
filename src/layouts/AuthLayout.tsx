import { Alert, CircularProgress } from "@mui/material";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { Navigate, Outlet } from "react-router-dom";
import { firebaseAuth } from "~firebase/index";

export const AuthLayout = () => {
  const [user, loading, error] = useAuthState(firebaseAuth);

  if (!user && !loading && !error) return <Navigate to="/login" />;

  if (loading)
    return (
      <CircularProgress size={40} sx={{ width: "100vw", height: "100vh" }} />
    );

  if (error) return <Alert severity="error">{error.message}</Alert>;

  return <Outlet />;
};
