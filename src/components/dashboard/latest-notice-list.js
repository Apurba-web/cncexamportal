import { Box, Typography } from "@mui/material";
import React from "react";
import { SectionLayout } from "src/layouts/SectionLayout";

export const LatestNoticeList = () => {
  return (
    <SectionLayout sectionTitle="Latest Notice">
      {true && (
        <Box sx={{ px: 5 }}>
          <Typography variant="body2">No New Notice</Typography>
        </Box>
      )}
    </SectionLayout>
  );
};
