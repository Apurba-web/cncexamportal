import { Grid, Typography } from "@mui/material";
import React from "react";

export const SectionLayout = ({ sectionTitle, children }) => {
  return (
    <Grid
      container
      sx={{
        width: "100%",
        minHeight: "200px",
        backgroundColor: "#0661B620",
        borderRadius: 2,
        padding: 1.5,
      }}>
      <Grid item xs={12}>
        <Typography variant="h6" color="#02187E">
          {sectionTitle}
        </Typography>
      </Grid>
      <Grid container>{children}</Grid>
    </Grid>
  );
};
