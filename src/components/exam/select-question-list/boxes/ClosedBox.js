import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const ClosedBox = ({ question, onClick, current, buttonSx, titleSx }) => {
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
        backgroundColor: "#e5e5e5",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 0.5,
        borderColor: "#7E7E7E",
        margin: 1.5,
        p: 0,
        "&:hover": {
          backgroundColor: "#0661B680",
        },
        ...buttonSx,
      }}>
      <Typography
        sx={{
          color: "#121212",
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

export default ClosedBox;
