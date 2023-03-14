import { alpha, Box, CircularProgress, styled } from "@mui/material";

const Root = styled(Box)(({ theme: { palette } }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  width: "100vw",
  height: "100vh",

  position: "fixed",
  top: 0,
  left: 0,

  backgroundColor: alpha(palette.common.white, 0.65),
}));

export const FullpageLoading = () => (
  <Root>
    <CircularProgress size={60} />
  </Root>
);
