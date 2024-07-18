import { Check } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const MarkedNotAnsweredBox = ({
  question,
  onClick,
  current,
  isAnswered,
  buttonSx,
  titleSx,
}) => {
  return (
    <Button
      onClick={() => onClick(question)}
      variant="outlined"
      sx={{
        minWidth: 40,
        minHeight: 40,
        width: 35,
        height: 35,
        display: "flex",

        justifyContent: "center",
        alignItems: "center",
        borderRadius: 0.5,
        borderBottomLeftRadius: "50%",
        borderBottomRightRadius: "50%",
        backgroundColor: "#471D8B",
        margin: 1.5,
        p: 0,
        "&:hover": {
          backgroundColor: "#0661B680",
        },
        ...buttonSx,
      }}>
      <Typography
        sx={{
          color: "#fff",
          zIndex: 2,
          ...titleSx,
        }}
        fontSize="large"
        variant="body2">
        {question?.qNo}
      </Typography>
    </Button>
  );
};

export default MarkedNotAnsweredBox;
