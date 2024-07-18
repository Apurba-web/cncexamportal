import {
  ChevronLeft,
  ChevronRight,
  Clear,
  ClearAll,
} from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const ExamFooter = ({
  sx,
  onSkipClick,
  onClearSelection,
  onSaveNextClick,
  onPrevClick,
  onMarkNextClick,
}) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexWrap="wrap"
      sx={{
        px: 2,
        py: 2,
        backgroundColor: "#f1f1f1",
        ...sx,
      }}>
      <Button onClick={onPrevClick} variant="text" size="small" color="primary">
        <ChevronLeft /> Previous
      </Button>
      <Button
        onClick={onMarkNextClick}
        variant="contained"
        size="small"
        color="secondary"
        sx={{ color: "#fff", mx: 2, fontSize: { xs: "10px", md: "14px" } }}>
        Mark and Next <ChevronRight fontSize="small" />
      </Button>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ px: 3 }}>
        <Button
          onClick={onSkipClick}
          variant="outlined"
          size="small"
          sx={{
            backgroundColor: "orange",
            color: "#fff",
            mx: 2,
            fontSize: { xs: "10px", md: "14px" },
          }}>
          Skip <ChevronRight fontSize="small" />
        </Button>
        <Button
          onClick={onClearSelection}
          variant="outlined"
          color="warning"
          size="small"
          sx={{ mx: 2, fontSize: { xs: "10px", md: "14px" } }}>
          Clear <Clear fontSize="small" />
        </Button>

        <Button
          onClick={onSaveNextClick}
          variant="contained"
          size="small"
          color="success"
          sx={{ color: "#fff", mx: 2, fontSize: { xs: "10px", md: "14px" } }}>
          Save and Next <ChevronRight fontSize="small" />
        </Button>
      </Box>
    </Box>
  );
};

export default ExamFooter;
