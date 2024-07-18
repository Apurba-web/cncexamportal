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
import parse from "html-react-parser";
import {
  useExamDetails,
  useExamSubmitStatus,
  useStatusCheck,
} from "src/adapters/examAdapter";
import { APP_BAR_HEIGHT } from "src/constants";
import AlertDialog from "src/components/common/alert-dialog";
import StaticInstruction from "src/components/exam/static-instruction";
import { differenceInSeconds, isFuture, isPast } from "date-fns";

const Instructions = () => {
  const router = useRouter();
  const { exam_id } = router.query;

  const { status } = useStatusCheck(exam_id);

  // useEffect(() => {
  //   if (status?.submitted) {
  //     router.push(`/exam/${exam_id}/analysis`);
  //   }
  // }, [status, router, exam_id]);

  const { exam, loading } = useExamDetails(exam_id);

  const [accepted, setAccepted] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isExamActive, setIsExamActive] = useState(true);
  const [showErrorDialog, setShowErrorDialog] = useState("");

  let instruction = exam?.exm_hdr?.[0]?.instruction || "";

  const handleBegin = () => {
    if (accepted) {
      router.push(`/exam/${exam_id}`);
    } else {
      setShowAlert(true);
    }
  };

  useEffect(() => {
   
   console.log(exam)
    let examStartTime = new Date(Date.parse(exam?.exm_hdr?.[0]?.start_time));

    let examEndTime = new Date(Date.parse(exam?.exm_hdr?.[0]?.start_time));
    let examDuration = Number(exam?.exm_hdr?.[0]?.duration_min);

    if (examEndTime) {
      examEndTime?.setMinutes(examEndTime?.getMinutes() + examDuration);
      let RemTime = differenceInSeconds(examEndTime, new Date());
    }
 
  
    if (examStartTime && examEndTime) {
     
      let isCurrent = isPast(examStartTime) && isFuture(examEndTime);
     
      if (isCurrent) {
        setIsExamActive(true);
        return;
      }
      
      let isP = isPast(examStartTime);
      let isF = isFuture(examStartTime);

      if (isP) {
        setIsExamActive(false);
        setShowErrorDialog("This Exam is already finished.");
        return;
      }
      if (isF) {
        setIsExamActive(false);
        setShowErrorDialog(
          "You can enter this exam @" + exam?.exm_hdr?.[0]?.start_time
        );
        return;
      }
      if (!isP && !isF) {
        setIsExamActive(true);
        return;
      }
    }
  }, [exam?.exm_hdr]);

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
            {status.error}
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
    <div>
      <Head>
        <title>Exam Instructions</title>
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

  if (!isExamActive) {
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

  return (
    <div>
      <Head>
        <title>Exam Instructions</title>
        <meta name="description" content="Read instruction carefully" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AlertDialog
        title="Accept Terms"
        msg="Please check/accept the term and conditions to proceed with the examination."
        open={showAlert}
        handleClose={() => setShowAlert(false)}
      />
      <AppBar />
      <Grid container sx={{ paddingTop: APP_BAR_HEIGHT, px: 2 }}>
        <Grid item xs={12}>
          <Box
            sx={{
              width: "100%",
              px: 1,
              py: 0.5,
              borderRadius: 1,
              backgroundColor: "#0661B630",
              my: 2,
            }}>
            <Typography
              textAlign="center"
              variant="body1"
              sx={{ color: colors.blueGrey }}>
              Exam Instructions
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              minHeight: "600px",
              px: 2,
              py: 1,
              borderRadius: 1,
              backgroundColor: "#0661B630",
              my: 2,
              pb: 4,
            }}>
            <StaticInstruction
              examName={exam?.exm_hdr?.[0]?.exam_name}
              duration={exam?.exm_hdr?.[0]?.duration_min}
            />
            <Typography
              variant="subtitle1"
              sx={{ textDecorationLine: "underline", mt: 2 }}>
              Exam specific instruction:
            </Typography>
            <Typography
              variant="subtitle"
              sx={{ fontSize: { xs: "12px", sm: "14px" } }}>
              {parse(instruction)}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              minHeight: "100px",
              px: 2,
              py: 0.5,
              borderRadius: 1,
              backgroundColor: "#0661B630",
              my: 2,
            }}>
            <FormControlLabel
              onChange={(e) => setAccepted(e.target.value)}
              value={accepted}
              labelPlacement="end"
              control={
                <Checkbox
                  defaultChecked={false}
                  sx={{ alignSelf: "flex-start", mt: -1 }}
                />
              }
              sx={{ pt: 1 }}
              label="I have read and understood the instructions. I shall be liable to be debarred from this Test and/or to disciplinary action which may include ban from future Tests / Examinations."
            />
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ m: 2 }}>
              <Button variant="contained" onClick={handleBegin}>
                Begin Exam
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Instructions;
