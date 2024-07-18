import { ChevronLeft, Close, Inbox, Mail } from "@mui/icons-material";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Toolbar,
  Button,
  styled,
  Box,
  Avatar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { APP_BAR_HEIGHT } from "src/constants";
import SelectQuestionList from "../exam/select-question-list";
import AnsweredBox from "../exam/select-question-list/boxes/AnsweredBox";
import CurrentBox from "../exam/select-question-list/boxes/CurrentBox";
import MarkedBox from "../exam/select-question-list/boxes/MarkedBox";
import MarkedNotAnsweredBox from "../exam/select-question-list/boxes/MarkedNotAnsweredBox";
import NotAnsweredBox from "../exam/select-question-list/boxes/NotAnsweredBox";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const ExamSideDrawer = ({
  drawerWidth = "300px",
  open = true,
  data,
  currentSubject,
  questions,
  user,
  onSelectQuestion,
  examState,
  activeQuestion,
  handleClose,
  onSubmitClick,
}) => {
  const matches = useMediaQuery("(max-width:600px)");
  const totalSeen = examState?.state?.length;
  const totalAnswered = examState?.state?.filter((i) => i?.answer)?.length;
  const totalUnAnswered = examState.state?.filter((i) => !i?.answer)?.length;
  if (!currentSubject) {
    return null;
  }
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        position: "relative",

        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          marginTop: APP_BAR_HEIGHT,
        },
      }}
      variant={"persistent"}
      anchor="right"
      open={open}>
      <DrawerHeader>
        <Box
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          sx={{ width: "100%", px: 0 }}>
          {matches && (
            <IconButton onClick={handleClose} sx={{ mr: 4 }}>
              <Close />
            </IconButton>
          )}
          <Avatar variant="circle" src="" />
          <Box sx={{ px: 3 }}>
            <Typography sx={{ textAlign: "left" }} variant="body2">
              ID: {user?.id}
            </Typography>
          </Box>
        </Box>
      </DrawerHeader>
      <Divider />
      <Box
        display="flex"
        justifyContent="flex-start"
        flexWrap={"wrap"}
        alignItems="center"
        sx={{ width: "100%", px: 0.5, maxHeight: "22vh", overflowY: "auto" }}>
        <Box
          sx={{
            m: 0.1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <CurrentBox
            question={{ qNo: 1 }}
            buttonSx={{ minWidth: 20, minHeight: 20, width: 20, height: 20 }}
            titleSx={{ fontSize: "10px" }}
          />
          <Typography sx={{ fontSize: "12px" }}>Current</Typography>
        </Box>
        <Box
          sx={{
            m: 0.1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <AnsweredBox
            question={{ qNo: totalAnswered }}
            buttonSx={{ minWidth: 20, minHeight: 20, width: 20, height: 20 }}
            titleSx={{ fontSize: "10px" }}
          />
          <Typography sx={{ fontSize: "12px" }}>Attempted</Typography>
        </Box>
        <Box
          sx={{
            m: 0.1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <NotAnsweredBox
            question={{ qNo: totalUnAnswered }}
            buttonSx={{ minWidth: 20, minHeight: 20, width: 20, height: 20 }}
            titleSx={{ fontSize: "10px" }}
          />
          <Typography sx={{ fontSize: "12px" }}>Not Attempted</Typography>
        </Box>
        <Box
          sx={{
            m: 0.1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <MarkedBox
            question={{ qNo: totalAnswered }}
            buttonSx={{ minWidth: 20, minHeight: 20, width: 20, height: 20 }}
            titleSx={{ fontSize: "10px" }}
          />
          <Typography sx={{ fontSize: "12px" }}>
            Answered & Marked for review
          </Typography>
        </Box>
        <Box
          sx={{
            m: 0.1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <MarkedNotAnsweredBox
            question={{ qNo: totalUnAnswered }}
            buttonSx={{ minWidth: 20, minHeight: 20, width: 20, height: 20 }}
            titleSx={{ fontSize: "10px" }}
          />
          <Typography sx={{ fontSize: "12px" }}>Marked for review</Typography>
        </Box>
      </Box>

      <SelectQuestionList
        subjectName={currentSubject?.sub_name}
        questions={questions}
        onSelectQuestion={onSelectQuestion}
        examState={examState}
        activeQuestion={activeQuestion}
        onSubmitClick={onSubmitClick}
      />
    </Drawer>
  );
};

export default ExamSideDrawer;
