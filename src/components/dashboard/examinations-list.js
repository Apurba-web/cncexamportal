import { Box, Typography } from "@mui/material";
import React from "react";
import { SectionLayout } from "src/layouts/SectionLayout";
import { ExaminationCard } from "../common/examination-card";

export const ExaminationsList = ({ data }) => {
  return (
    <SectionLayout sectionTitle="Examinations">
      {data?.map((exam, index) => (
        <ExaminationCard key={index} examData={exam} actionDisabled />
      ))}
      {data?.length === 0 && (
        <Box sx={{ px: 5 }}>
          <Typography variant="body2">No Examination Available</Typography>
        </Box>
      )}
    </SectionLayout>
  );
};
