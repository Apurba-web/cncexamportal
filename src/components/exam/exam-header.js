import { Button, colors, Grid, Typography } from "@mui/material";
import React from "react";

const ExamHeader = ({ subjects, currentSubject, setCurrentSubject }) => {
  if (!currentSubject) {
    return null;
  }
  return (
    <Grid
      container
      sx={{ backgroundColor: colors.grey[300], minHeight: "55px", p: 1 }}>
      <Grid
        item
        xs={12}
        display="flex"
        sx={{
          height: "100%",
          alignItems: "center",
          justifyContent: "flex-start",
          flexWrap: "wrap",
        }}>
        <Typography
          variant="body2"
          sx={{ fontSize: { xs: "10px", md: "14px" }, fontWeight: "500" }}>
          SUBJECTS {"-->"}
        </Typography>
        {subjects.map((item) => (
          <Button
            onClick={() => setCurrentSubject(item)}
            size="small"
            variant={
              currentSubject.sub_name === item?.sub_name
                ? "contained"
                : "outlined"
            }
            sx={{
              mx: 1,
              my: 0.5,
              fontSize: { xs: "10px", md: "14px" },
              px: 0.5,
              py: 0.5,
            }}
            key={item.sub_name}>
            {item.sub_name}
          </Button>
        ))}
      </Grid>
    </Grid>
  );
};

export default ExamHeader;
