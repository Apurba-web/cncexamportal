import { Grid, Box, useMediaQuery } from "@mui/material";

import React from "react";
import { APP_BAR_HEIGHT } from "src/constants";

export const AppBar = ({ content }) => {
  const matches = useMediaQuery("(max-width:600px)");
  return (
    <Grid
      container
      paddingX={2}
      paddingY={1}
      position="fixed"
      boxShadow=" 1px 3px 6px #00000010"
      zIndex={999}
      sx={{
        height: APP_BAR_HEIGHT,
        backgroundColor: "white",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}>
      <Grid item xs={4} sm={2} md={2}>
        <Box>
       {/*   <img
            src="/assets/images/cnc_logo.png"
            alt=""
            style={{
              width: matches ? "57" : "97px",
              height: matches ? "27" : "60px",
              objectFit: "contain",
            }}  
          /> */}
        </Box>
      </Grid>
      <Grid item xs={8} sm={10} md={10}>
        {content}
      </Grid>
    </Grid>
  );
};
