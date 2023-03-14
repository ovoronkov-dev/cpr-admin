import { Box, BoxProps, styled, Typography } from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

const PREFIX = "EditorVariantPlaceholder";

const classes = {
  root: `${PREFIX}-root`,
  icon: `${PREFIX}-icon`,
};

const Root = styled(Box)(({ theme: { shape, spacing, palette } }) => ({
  [`&.${classes.root}`]: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    width: "100%",
    height: "100%",
    minHeight: 212,

    padding: spacing(2),

    border: "1px solid #e7e7e7",
    borderRadius: shape.borderRadius,

    cursor: "pointer",
  },

  [`& .${classes.icon}`]: {
    fontSize: "5rem",
    color: palette.primary.main,
  },
}));

type Props = BoxProps;

export const EditorVariantPlaceholder = (props: Props) => {
  return (
    <Root className={classes.root} {...props}>
      <AddBoxOutlinedIcon className={classes.icon} />

      <Typography variant="caption">Додати варіант</Typography>
    </Root>
  );
};
