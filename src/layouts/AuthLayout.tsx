import {
  Alert,
  AppBar,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { Link, Navigate, Outlet } from "react-router-dom";
import { FullpageLoading } from "~components/FullpageLoading";
import { firebaseAuth } from "~firebase/index";
import { DRAWER_WIDTH } from "~styles/theme";

export const AuthLayout = () => {
  const [user, loading, error] = useAuthState(firebaseAuth);
  const [signOut] = useSignOut(firebaseAuth);

  if (!user && !loading && !error) return <Navigate to="/login" />;

  if (loading) return <FullpageLoading />;

  if (error) return <Alert severity="error">{error.message}</Alert>;

  return (
    <Box display="flex">
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            color="white"
            sx={{ textDecoration: "none", flexGrow: 1 }}
          >
            CPR Admin
          </Typography>

          <Button color="secondary" variant="contained" onClick={signOut}>
            Вийти
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />

        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem>
              <Button variant="contained" color="primary" component={Link} to="/editor" fullWidth>
                Створити опитування
              </Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
        <Toolbar />
        <Paper sx={{ p: 2 }}>
          <Outlet />
        </Paper>
      </Box>
    </Box>
  );
};
