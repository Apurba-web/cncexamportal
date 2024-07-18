import { Box, Typography } from "@mui/material";
import React from "react";
import { useCurrentExams } from "src/adapters/examAdapter";
import { SectionLayout } from "src/layouts/SectionLayout";
import { examinations } from "src/_mocks_/examinations";
import { ExaminationCard } from "../common/examination-card";

export const CurrentExamList = ({ data = [] }) => {
  return (
    <SectionLayout sectionTitle="Current Exams">
      {data?.map((exam, index) => (
        <ExaminationCard key={index} examData={exam} />
      ))}
      {data?.length === 0 && (
        <Box sx={{ px: 5 }}>
          <Typography variant="body2">No Examination Available</Typography>
        </Box>
      )}
    </SectionLayout>
  );
};
