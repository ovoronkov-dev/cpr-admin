import {
  Alert,
  AppBar,
  Box,
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

  if (!user && !loading && !error) return <Navigate to="/login" />;

  if (loading) return <FullpageLoading />;

  if (error) return <Alert severity="error">{error.message}</Alert>;

  return (
    <Box display="flex">
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component={Link} to="/" color="white" sx={{ textDecoration: "none" }}>
            CPR Admin
          </Typography>
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
            {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
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
