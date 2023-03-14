import { Alert, Button, Grid, Typography } from "@mui/material";
import { Fragment } from "react";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { useParams } from "react-router-dom";
import { usePollDocument } from "~firebase/hooks/usePollDocument";
import { FullpageLoading } from "~components/FullpageLoading";
import { ViewerVariant } from "./components/Variant";

export const Viewer = () => {
  const { id } = useParams<{ id?: string }>();
  const [document, loading, error] = usePollDocument(id);

  if (error) return <Alert severity="error">{error.message}</Alert>;

  if (!document || loading) return <FullpageLoading />;

  return (
    <Fragment>
      <Grid container alignItems="center">
        <Grid item xs={6} container alignItems="center">
          <Typography variant="h2">Деталі опитування</Typography>
        </Grid>
        <Grid item xs={6} container justifyContent="flex-end" alignItems="center">
          <Button variant="contained" color="error" startIcon={<DeleteForeverRoundedIcon />}>
            Видалити
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Typography variant="body2" fontWeight="bold">
                Назва опитування:
              </Typography>

              <Typography>{document.title}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body2" fontWeight="bold">
                Опис опитування:
              </Typography>

              <Typography>{document.description}</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="body2" fontWeight="bold">
            Варіанти:
          </Typography>

          <Grid container spacing={2} wrap="wrap" sx={{ mt: 1 }}>
            {document.variants.map((variant, index) => (
              <Grid key={index} item xs={4}>
                <ViewerVariant data={variant} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};
