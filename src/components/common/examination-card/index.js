import { CalendarMonth, ChevronRight } from "@mui/icons-material";
import { useRouter } from "next/router";
import { Card, Grid, Box, Typography, Button } from "@mui/material";
import { format } from "date-fns";
import React from "react";

export const ExaminationCard = ({ examData, actionDisabled }) => {
  const gotoExam = () => {
    if (examData && examData.id) {
      console.log(examData)
      router.push(`/exam/${examData.id}/instructions`);
    }
  };
  const router = useRouter();
  return (
    <Grid item xs={12} sm={6} md={4} sx={{ m: 1 }}>
      <Button
        fullWidth
        sx={{ textAlign: "left" }}
        disabled={actionDisabled}
        onClick={gotoExam}>
        <Card
          sx={{
            minHeight: "100px",
            width: "100%",
            backgroundColor: "#80D1FF",
            p: 1,
            position: "relative",
          }}>
          <ChevronRight
            fontSize="large"
            sx={{ position: "absolute", bottom: 0, right: 0 }}
          />
          <Box display="flex" alignItems="center">
            <CalendarMonth sx={{ color: "#323232" }} />
            <Typography size="small" variant="caption" sx={{ mx: 2 }}>
              {format(new Date(examData?.start_time), "dd-MM-yyyy hh:mm aaaa")}
            </Typography>
          </Box>
          <Box width="100%" sx={{ px: 1, py: 0.2 }}>
            <Typography size="small" variant="subtitle1">
              {examData.exam_name}
            </Typography>
          </Box>
          <Box width="100%" sx={{ px: 1 }}>
            <Typography size="small" sx={{ fontSize: "10px" }}>
              {examData.duration_min} mins
            </Typography>
            {/*<Typography size="small" sx={{ fontSize: "10px" }}>
              {examData.total_marks} marks
        </Typography>*/}
          </Box>
        </Card>
      </Button>
    </Grid>
  );
};
