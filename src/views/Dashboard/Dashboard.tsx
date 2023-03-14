import { Grid, Typography } from "@mui/material";
import { Fragment } from "react";
import { DashboardPollsList } from "./components/PollsList";

export const Dashboard = () => {
  return (
    <Fragment>
      <Typography variant="h2">Головна</Typography>

      <Grid container sx={{ mt: 1 }} spacing={4}>
        <Grid item xs={6}>
          <Typography variant="h3" sx={{ mb: 1 }}>
            Опитування
          </Typography>

          <DashboardPollsList />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h3">Результати</Typography>
        </Grid>
      </Grid>
    </Fragment>
  );
};
