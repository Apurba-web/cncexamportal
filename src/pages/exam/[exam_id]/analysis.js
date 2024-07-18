import React, { useState, useEffect } from "react";
import Head from "next/head";
import { AppBar } from "src/components/app-bar";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  CircularProgress,
  colors,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
} from "@mui/material";
import { useExamDetails, useExamResult } from "src/adapters/examAdapter";
import { APP_BAR_HEIGHT } from "src/constants";
const Analysis = () => {
  const router = useRouter();
  const { exam_id } = router.query;
  const { exam, loading } = useExamDetails(exam_id);

  const allSubjects = exam?.exm_det;
  const examInfo = exam?.exm_hdr?.[0];
  const allQuestions = exam?.question;

  const { result } = useExamResult(exam_id);

  const [accepted, setAccepted] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isResultPending, setIsResultPending] = useState(true);

  useEffect(() => {
    if (result?.length > 0) {
      setIsResultPending(false);
    }
  }, [result]);

  const gotoSolution = () => {
    router.push(`/exam/${exam_id}/solutions`);
  };

  if (loading) {
    <div>
      <Head>
        <title>Exam Analysis</title>
        <meta name="description" content="Read instruction carefully" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <CircularProgress />
      </Box>
    </div>;
  }

  if (isResultPending && !loading) {
    return (
      <div style={{ width: "100%", height: "100%", maxWidth: "100vw" }}>
        <Head>
          <title>{exam?.exm_hdr?.[0]?.exam_name}</title>
          <meta name="description" content="Exam Portal" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <AppBar />
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
              <Typography>Result not out yet !</Typography>
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

  return (
    <div>
      <Head>
        <title>Exam Instructions</title>
        <meta name="description" content="Read instruction carefully" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppBar />
      <Grid container sx={{ paddingTop: APP_BAR_HEIGHT, px: 2 }}>
        <Grid
          item
          xs={12}
          display="flex"
          height="50vh"
          justifyContent="center"
          alignItems="center">
          <Card sx={{ width: "100%", maxWidth: "600px", overflowX: "auto" }}>
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center">
                <Box flex={2}>
                  <Typography variant="body2" fontWeight="700">
                    Exam Name
                  </Typography>
                </Box>
                {result?.[0] &&
                  Object.keys(result?.[0])
                    .filter(
                      (i) =>
                        ![
                          "exam_id",
                          "stud_id",
                          "stud_name",
                          "stud_reg_no",
                          "dept_id",
                        ].includes(i)
                    )
                    ?.map((item, index) => (
                      <Box
                        key={index}
                        flex={1}
                        alignItems="center"
                        display="flex"
                        justifyContent="center">
                        <Typography variant="body2" fontWeight="700">
                          {item}
                        </Typography>
                      </Box>
                    ))}
                <Box flex={1}></Box>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center">
                <Box flex={2}>
                  <Typography variant="body2" fontWeight="700">
                    {examInfo?.exam_name}
                  </Typography>
                </Box>
                {result?.[0] &&
                  Object.keys(result?.[0])
                    .filter(
                      (i) =>
                        ![
                          "exam_id",
                          "stud_id",
                          "stud_name",
                          "stud_reg_no",
                          "dept_id",
                        ].includes(i)
                    )
                    ?.map((item, index) => (
                      <Box
                        key={index}
                        flex={1}
                        alignItems="center"
                        display="flex"
                        justifyContent="center">
                        <Typography variant="subtitle1">
                          {result?.[0]?.[item]}
                        </Typography>
                      </Box>
                    ))}
                <Button flex={1} variant="contained" onClick={gotoSolution}>
                  Results
                </Button>
              </Box>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                variant="contained"
                alignSelf="center"
                color="warning"
                onClick={() => router.replace("/dashboard")}>
                Go Back
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Analysis;
