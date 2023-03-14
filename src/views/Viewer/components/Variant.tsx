import { Box, styled, Typography } from "@mui/material";
import { ImageLoader } from "~components/ImageLoader";
import { PollVariantModel } from "~core/models";

const PREFIX = "ViewerVariant";

const classes = {
  root: `${PREFIX}-root`,
  image: `${PREFIX}-image`,
};

const Root = styled(Box)(({ theme: { shape } }) => ({
  [`&.${classes.root}`]: {},
  [`& .${classes.image}`]: {
    width: "100%",
    height: 140,

    borderRadius: shape.borderRadius,

    overflow: "hidden",

    "& img": {
      width: "100%",
      height: "100%",

      objectFit: "cover",
    },
  },
}));

interface Props {
  data: PollVariantModel;
}

export const ViewerVariant = ({ data }: Props) => {
  return (
    <Root className={classes.root}>
      <Box className={classes.image}>
        <ImageLoader src={data.url} />
      </Box>

      <Typography variant="body2" fontWeight="bold" align="center" sx={{ mt: 0.5 }}>
        {data.title}
      </Typography>
    </Root>
  );
};
