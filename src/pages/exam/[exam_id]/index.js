import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/system";

import Head from "next/head";
import React, { useCallback, useEffect, useState } from "react";
import { AppBar } from "src/components/app-bar";
import ExamSideDrawer from "src/components/exam-side-drawer";
import ExamHeader from "src/components/exam/exam-header";
import Countdown from "react-countdown";
import { useRouter } from "next/router";
import { APP_BAR_HEIGHT } from "src/constants";
import QuestionBox from "src/components/exam/question-box";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import ExamFooter from "src/components/exam/exam-footer";
import { useAuth } from "src/adapters/authAdapters";
import {
  useExamDetails,
  useExamSession,
  useStatusCheck,
} from "src/adapters/examAdapter";
import { checkStudentStatus, storeExamSession } from "src/services/examRequest";
import { differenceInSeconds, isFuture, isPast } from "date-fns";
import ExamSummaryDialog from "src/components/exam/exam-summary-dialog";

const drawerWidth = "300px";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    display: "flex",
    flexDirection: "column",
    flex: 1,
    position: "relative",

    marginTop: APP_BAR_HEIGHT,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: `${open ? drawerWidth : 0}`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const ExamScreen = ({}) => {
  const data = { examTitle: "Mock Test Examination" };
  const router = useRouter();

  const { exam_id } = router.query;

  const { status } = useStatusCheck(exam_id);

  // useEffect(() => {
  //   if (status?.submitted) {
  //     router.push(`/exam/${exam_id}/analysis`);
  //   }
  // }, [status, router, exam_id]);

  const { exam, loading, error } = useExamDetails(exam_id);

  const { user } = useAuth();

  const matches = useMediaQuery("(max-width:600px)");

  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [activeSubject, setActiveSubject] = useState(null);
  const [activeSubQuestions, setActiveSubQuestions] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(null);
  // const [examRemTime, setExamRemTime] = useState(0);
  const [examState, setExamState] = useState({ state: [] });

  const [isExamActive, setIsExamActive] = useState(true);
  const [showErrorDialog, setShowErrorDialog] = useState("");
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);

  const [isTimeOver, setIsTimeOver] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { session } = useExamSession({
    exam_id: exam_id,
    student_id: user?.id,
    dept_id: exam?.exm_hdr?.[0]?.dept_id,
    sec_id: exam?.exm_hdr?.[0]?.section_id,
  });

  const allSubjects = exam?.exm_det;
  const examInfo = exam?.exm_hdr?.[0];
  const allQuestions = exam?.question;

  const checkSubmitStatus = async () => {
    let status = await checkStudentStatus(exam_id);
    console.log("STATUS", status);
    if (!status?.error) {
      setSubmitted(false);
    } else {
      setSubmitted(true);
      a;
    }
  };

  const handleExamTimeOver = () => {
    setIsTimeOver(true);
    checkSubmitStatus();
  };

  const saveSession = useCallback(async () => {
    if (examState?.state.length === 0) {
      return;
    }
    if (
      !exam_id ||
      !user?.id ||
      !exam?.exm_hdr?.[0]?.dept_id ||
      !exam?.exm_hdr?.[0]?.section_id
    ) {
      return;
    }
    let authData = {
      exam_id: exam_id,
      student_id: user?.id,
      dept_id: exam?.exm_hdr?.[0]?.dept_id,
      sec_id: exam?.exm_hdr?.[0]?.section_id,
    };
    const sessionData = {
      currentQ: activeQuestion?.id,
      currentSub: activeSubject?.id,
      currentTime: new Date(),
      state: examState,
    };
    try {
      let sessionRes = await storeExamSession({
        ...authData,
        value: JSON.stringify(sessionData),
      });

      console.log("SAVE RESPONSE", sessionRes);
    } catch (error) {
      console.log("SAVE ERROR RESPONSE", error);
    }
  }, [
    activeQuestion?.id,
    activeSubject?.id,
    exam?.exm_hdr,
    examState,
    exam_id,
    user?.id,
  ]);

  useEffect(() => {
    if (session?.length > 0) {
      let lastSession = session?.[session?.length - 1];
      let stateData = lastSession?.value && JSON.parse(lastSession.value);
      if (stateData?.currentQ && stateData?.currentSub) {
        let sub = allSubjects.find((i) => i.id === stateData?.currentSub);
        let allQ = allQuestions.map((i, ind) => ({ qNo: ind + 1, ...i }));
        let subQuestions = allQ.filter(
          (item) => item?.subject_id === sub?.sub_id
        );

        // let currentQData =
        //   examState?.currentQ &&
        //   currentSubQuestions?.find((i) => i?.id === examState?.currentQ);

        let q = subQuestions?.find(
          (i) => i?.subject_id === sub?.sub_id && i?.id === stateData?.currentQ
        );
        setActiveSubQuestions(allQ);
        setActiveSubject(sub);
        setActiveQuestion(q);
      }
      if (stateData?.state) {
        setExamState(stateData?.state);
      }
    }
  }, [session, allSubjects, allQuestions]);

  useEffect(() => {
    if (examState?.state?.length > 0) {
      saveSession();
    }
  }, [examState, saveSession]);

  let examStartTime = new Date(Date.parse(exam?.exm_hdr?.[0]?.start_time));

  let examEndTime = new Date(Date.parse(exam?.exm_hdr?.[0]?.start_time));
  let examDuration = Number(exam?.exm_hdr?.[0]?.duration_min);

  examEndTime?.setMinutes(examEndTime?.getMinutes() + examDuration);
  let examRemTime = differenceInSeconds(examEndTime, new Date());

  useEffect(() => {
    let examStartTime = new Date(Date.parse(exam?.exm_hdr?.[0]?.start_time));

    let examEndTime = new Date(Date.parse(exam?.exm_hdr?.[0]?.start_time));
    let examDuration = Number(exam?.exm_hdr?.[0]?.duration_min);
    if (examEndTime) {
      examEndTime?.setMinutes(examEndTime?.getMinutes() + examDuration);
    }
    if (examStartTime && examEndTime) {
      let isCurrent = isPast(examStartTime) && isFuture(examEndTime);
      if (isCurrent) {
        setIsExamActive(true);
        return;
      }
      let isP = isPast(examStartTime);
      let isF = isFuture(examStartTime);

      // if (isP) {
      //   setIsExamActive(false);
      //   setShowErrorDialog("This Exam is already finished.");
      //   return;
      // }
      if (isF) {
        setIsExamActive(false);
        setShowErrorDialog(
          "You can enter this exam @" + exam?.exm_hdr?.[0]?.start_time
        );
        return;
      }
    }
  }, [exam?.exm_hdr]);

  useEffect(() => {
    if (matches) {
      setSideBarOpen(false);
    } else {
      setSideBarOpen(true);
    }
  }, [matches]);

  useEffect(() => {
    if (allSubjects) {
      let currentSub =
        examState?.currentSub &&
        allSubjects?.find((i) => i?.sub_id === examState?.currentSub);
      if (allSubjects?.length > 0) {
        setActiveSubject(currentSub || allSubjects?.[0]);
      }
    }
  }, [allSubjects, examState.currentSub]);

  useEffect(() => {
    if (allQuestions?.length > 0) {
      const allTotalQuestions = allQuestions.map((i, ind) => ({
        qNo: ind + 1,
        ...i,
      }));

      setActiveSubQuestions(allTotalQuestions);
    }
  }, [allQuestions]);

  useEffect(() => {
    if (activeSubQuestions.length > 0) {
      const currentSubQuestions = activeSubQuestions.filter(
        (item) => item?.subject_id === activeSubject?.sub_id
      );
      setActiveQuestion(currentSubQuestions?.[0]);
    }
  }, [activeSubQuestions, activeSubject]);

  const handleGotoNext = (q) => {
    let currentQInd = activeSubQuestions.findIndex((i) => {
      if (i?.id === q?.id && i?.section_id === q?.section_id) {
        return true;
      } else {
        return false;
      }
    });
    if (currentQInd < activeSubQuestions?.length - 1) {
      setActiveQuestion(activeSubQuestions[currentQInd + 1]);
    }
  };

  const handleGotoPrev = (q) => {
  
    let currentQInd = activeSubQuestions.findIndex((i) => {
      if (i?.id === q?.id && i?.section_id === q?.section_id) {
        return true;
      } else {
        return false;
      }
    });
    if (currentQInd > 0) {
      setActiveQuestion(activeSubQuestions[currentQInd - 1]);
    }
  };

  const handleUpdateState = (qData) => {
   // alert('HandleUpdateState')
  console.log('qData : ',qData)
    let found = examState?.state?.find((item) => {
      if (item?.id === qData.id && item?.subject_id === qData.subject_id) {
        return true;
      } else {
        return false;
      }
    });

    if (!found) {
      setExamState((s) => ({
        ...s,
        currentQ: qData?.id,
        currentSub: qData?.subject_id,
        state: [...s.state, qData],
      }));
    } else {
      let changed = examState?.state?.map((item) => {
        if (item?.id === qData.id && item?.subject_id === qData.subject_id) {
          return { ...qData };
        } else {
          return item;
        }
      });
      setExamState((s) => ({ ...s, state: changed }));
    }
    handleGotoNext(qData);
  };

  const handleQuestionBoxSelect = (q) => {
    let lastQ = activeQuestion;
    let found = examState?.state?.find((item) => {
      if (item?.id === lastQ?.id && item?.subject_id === lastQ?.subject_id) {
        return true;
      } else {
        return false;
      }
    });
    if (!found) {
      setExamState((s) => ({
        ...s,
        currentQ: q?.id,
        currentSub: q?.subject_id,
        state: [...s.state, lastQ],
      }));
    } else {
    }

    setActiveQuestion(q);
  };

  const handleActiveSubject = (v) => {
    setExamState((s) => ({ ...s, currentSub: v?.sub_id }));
    setActiveSubject(v);
  };

  const handleSubmitClick = () => {
    setShowSubmitDialog(true);
  };

  const resultSummary = allSubjects?.map((subject) => {
    let questions = allQuestions
      .filter((item) => item?.subject_id === subject?.sub_id)
      .map((i, ind) => ({ qNo: ind + 1, ...i }));
    let answered = examState?.state
      ?.filter((item) => {
        if (item?.subject_id === subject.sub_id && item.answer) {
          return true;
        } else {
          false;
        }
      })
      ?.map((i) => {
        if (i.answer) {
          return { ...i, answer: i?.answer?.toUpperCase() };
        } else {
          return i;
        }
      });
    let notAnswered = examState?.state?.filter((item) => {
      if (item?.subject_id === subject.sub_id && !item.answer) {
        return true;
      } else {
        false;
      }
    });
    let correctAnswered = answered?.filter((item) => {
      let foundQ = questions?.find((q) => q.id === item.id);
      let isCorrect = item.answer === foundQ?.correct_ans;
      if (isCorrect) {
        return true;
      } else {
        return false;
      }
    });
    let markObtained = correctAnswered?.reduce((acc, cur) => {
      let total = Number(cur?.marks) + acc;
      return total;
    }, 0);

    return {
      subject: subject,
      totalQuestions: questions?.length,
      questions: questions,
      totalAnswered: answered?.length,
      totalNotAnswered: notAnswered?.length,
      totalNotVisited:
        questions?.length - answered?.length - notAnswered?.length,
      submitData: [
        {
          exam_id: exam_id,
          student_id: user?.id,
          dept_id: exam?.exm_hdr?.[0]?.dept_id,
          sub_id: subject.sub_id,
          stud_name: user?.firstname + " " + user?.lastname,
          total_mark: subject.total_marks,
          mark_obtained: markObtained,
        },
        ...questions?.map((i) => {
          let answeredFound = answered.find(
            (q) => q?.subject_id === i?.subject_id && q?.id === i?.id
          );

          return {
            question_id: i?.id,
            option_chosen: answeredFound ? answeredFound.answer : "",
          };
        }),
      ],
    };
  });
  const AppBarContent = (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid
        item
        xs={10}
        sm={5}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}>
        <Stack spacing={0.5} justifyContent="center" alignItems="flex-start">
          <Box
            display="flex"
            sx={{
              borderRadius: 0.5,
              px: 1,
              py: 0,
              maxWidth: { xs: "50vw", sm: "50vw" },
            }}>
            <Typography
              variant="caption"
              minWidth={"90px"}
              sx={{ fontSize: { xs: "10px", md: "14px" } }}>
              Exam Name :
            </Typography>
            <Typography
              variant="caption"
              sx={{ fontWeight: "500", fontSize: { xs: "10px", md: "14px" } }}
              color="grey">
              {examInfo?.exam_name}
            </Typography>
          </Box>
          <Box
            display="flex"
            sx={{
              borderRadius: 0.5,
              px: 1,
              py: 0,

              maxWidth: { xs: "50vw", sm: "20vw" },
            }}>
            <Typography
              variant="caption"
              width={"90px"}
              sx={{ fontSize: { xs: "10px", md: "14px" } }}>
              Total Time:{" "}
            </Typography>
            <Typography
              variant="caption"
              sx={{ fontWeight: "500", fontSize: { xs: "10px", md: "14px" } }}
              color="grey">
              {examInfo?.duration_min} mins
            </Typography>
          </Box>
        </Stack>
      </Grid>
      {!matches && (
        <Grid item sm={5}>
          <Button variant="contained" size="small">
            <Typography
              sx={{ marginRight: 2 }}
              fontSize="small"
              variant="caption">
              Remaining time
            </Typography>
            {examRemTime && (
              <Countdown
                onComplete={handleExamTimeOver}
                zeroPadTime={2}
                daysInHours={true}
                date={Date.now() + examRemTime * 1000}
              />
            )}
          </Button>
        </Grid>
      )}
    </Grid>
  );

  if (status?.error) {
    return (
      <div>
        <Head>
          <title>Exam Status</title>
          <meta name="description" content="Read instruction carefully" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Box
          sx={{
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Typography variant="body2" p={2}>
            {status?.error}
          </Typography>
          <Button
            onClick={() => router.push("/dashboard")}
            variant="contained"
            color="warning">
            Go Back
          </Button>
        </Box>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <Head>
          <title>Loading online exam</title>
          <meta name="description" content="fetching exam data" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Box
          display="flex"
          sx={{
            width: "100vw",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <CircularProgress />
        </Box>
      </div>
    );
  }

  if (exam?.error) {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <Head>
          <title>Loading online exam</title>
          <meta name="description" content="fetching exam data" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Box
          display="flex"
          sx={{
            width: "100vw",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Card>
            <CardContent>
              <Typography>Exam Is Unavailable</Typography>
            </CardContent>
            <CardActions
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Button
                size="small"
                variant="text"
                onClick={() => router.replace("/dashboard")}>
                Go Back
              </Button>
            </CardActions>
          </Card>
        </Box>
      </div>
    );
  }

  if (!isExamActive) {
    return (
      <div style={{ width: "100%", height: "100%", maxWidth: "100vw" }}>
        <Head>
          <title>{data.examTitle}</title>
          <meta name="description" content="Exam Portal" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <AppBar content={AppBarContent} />
        <Box
          display="flex"
          sx={{
            width: "100vw",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Card>
            <CardContent>
              <Typography>{showErrorDialog}</Typography>
            </CardContent>
            <CardActions
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Button
                size="small"
                variant="text"
                onClick={() => router.replace("/dashboard")}>
                Go Back
              </Button>
            </CardActions>
          </Card>
        </Box>
      </div>
    );
  }

  if (submitted && isTimeOver) {
    return (
      <div style={{ width: "100%", height: "100%", maxWidth: "100vw" }}>
        <Head>
          <title>{data.examTitle}</title>
          <meta name="description" content="Exam Portal" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <AppBar content={AppBarContent} />
        <Box
          display="flex"
          sx={{
            width: "100vw",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Card>
            <CardContent>
              <Typography>EXAM IS OVER</Typography>
            </CardContent>
            <CardActions
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Button
                size="small"
                variant="text"
                onClick={() => router.replace("/dashboard")}>
                Go Back
              </Button>
            </CardActions>
          </Card>
        </Box>
      </div>
    );
  }

  if (!submitted && isTimeOver) {
    return (
      <div style={{ width: "100%", height: "100%", maxWidth: "100vw" }}>
        <ExamSummaryDialog
          open={true}
          handleClose={() => {}}
          data={resultSummary}
          autoSubmit
          onSubmitSuccessful={() => {
            setTimeout(() => {
              alert("Test Paper sumitted successfully. Thank you.");
              router.replace("/dashboard");
            }, 1000);
          }}
        />
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: "100%", maxWidth: "100vw" }}>
      <Head>
        <title>{data.examTitle}</title>
        <meta name="description" content="Exam Portal" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBar content={AppBarContent} />
      <ExamSummaryDialog
        open={showSubmitDialog}
        handleClose={() => setShowSubmitDialog(false)}
        data={resultSummary}
        onSubmitSuccessful={() => {
          setTimeout(() => {
            alert("Test Paper sumitted successfully. Thank you.");
            router.replace("/dashboard");
          }, 1000);
        }}
      />
      <ExamSideDrawer
        currentSubject={activeSubject}
        activeQuestion={activeQuestion}
        questions={activeSubQuestions}
        examState={examState}
        drawerWidth={drawerWidth}
        open={sideBarOpen}
        user={user}
        onSelectQuestion={handleQuestionBoxSelect}
        handleClose={() => setSideBarOpen(false)}
        onSubmitClick={handleSubmitClick}
      />
      <Main open={!matches && sideBarOpen}>
        <Tooltip title={sideBarOpen ? "Hide sidebar" : "Open sidebar"}>
          <Button
            onClick={() => setSideBarOpen((s) => !s)}
            sx={{
              minWidth: "10px",
              width: "20px",
              height: "50px",
              position: "absolute",
              top: "45vh",
              p: 0,
              borderRadius: 0.5,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              opacity: 0.6,
              right: 0,
            }}
            variant="contained">
            {sideBarOpen ? <ChevronRight /> : <ChevronLeft />}
          </Button>
        </Tooltip>
        {matches && (
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            width="100%">
            <Button variant="text" size="small">
              <Typography
                sx={{ marginRight: 2 }}
                fontSize="small"
                variant="caption">
                Remaining time
              </Typography>
              {examRemTime && (
                <Countdown
                  onComplete={handleExamTimeOver}
                  zeroPadTime={2}
                  daysInHours={true}
                  date={Date.now() + examRemTime * 1000}
                />
              )}
            </Button>
          </Box>
        )}
        <ExamHeader
          subjects={allSubjects}
          currentSubject={activeSubject}
          setCurrentSubject={handleActiveSubject}
        />
        <Box sx={{ height: "100%" }}>
          <QuestionBox
            data={activeQuestion}
            examState={examState}
            updateQuestionState={handleUpdateState}
            gotoNextQ={handleGotoNext}
            gotoPrevQ={handleGotoPrev}
          />
        </Box>
      </Main>
    </div>
  );
};

export default ExamScreen;
