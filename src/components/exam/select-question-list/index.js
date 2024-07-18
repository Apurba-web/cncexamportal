import { Box, Grid, Typography, Button, Divider } from "@mui/material";
import React from "react";
import QBox from "./QBox";

const SelectQuestionList = ({
  subjectName,
  questions,
  onSelectQuestion,
  examState,
  activeQuestion,
  onSubmitClick,
}) => {
  return (
    <Grid
      item
      xs={12}
      sx={{ position: "relative", maxHeight: "50vh", overflowY: "hidden" }}>
      <Box sx={{ width: "100%", background: "skyblue", p: 1 }}>
        <Typography sx={{ color: "white", fontSize: "12px" }}>
          Current Subject : {subjectName}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          minHeight: "100px",
          maxHeight: "75%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexWrap: "wrap",
          p: 0.5,
          overflowY: "auto",
        }}>
        {questions?.map((item, index) => (
          <QBox
            key={index}
            question={item}
            onClick={onSelectQuestion}
            examState={examState}
            activeQuestion={activeQuestion}
          />
        ))}
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          bottom: 0,
          backgroundColor: "#e1e1e1",
          py: 2,
          px: 1,
          zIndex: 2,
        }}>
        <Button
          onClick={onSubmitClick}
          variant="contained"
          sx={{ borderRadius: 0 }}>
          SUBMIT
        </Button>
      </Box>
    </Grid>
  );
};

export default SelectQuestionList;
