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
  Stack,
  Typography,
} from "@mui/material";
import parse from "html-react-parser";
import { useExamDetails, useExamResult } from "src/adapters/examAdapter";
import { APP_BAR_HEIGHT } from "src/constants";
import SolutionsModal from "src/components/exam/solutions-modal";

const Solutions = () => {
  const router = useRouter();
  const { exam_id } = router.query;
  const { exam, loading } = useExamDetails(exam_id);

  const [selectedSubject, setSelectedSubject] = useState(null);

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

  if (isResultPending) {
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
      <SolutionsModal
        exam_id={exam_id}
        open={selectedSubject}
        handleClose={() => setSelectedSubject(null)}
      />
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
              <Typography variant="subtitle2" my={2}>
                Select a subject to view your questions result
              </Typography>
              <Stack spacing={2} direction="row">
                {allSubjects?.map((item, index) => (
                  <Button
                    key={index}
                    variant="contained"
                    onClick={() => setSelectedSubject(item)}>
                    {item.sub_name}
                  </Button>
                ))}
              </Stack>
              <Button
                sx={{ mt: 5 }}
                onClick={() => router.back()}
                variant="contained"
                color="warning">
                Go Back
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Solutions;
