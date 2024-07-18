import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import { submitExam } from "src/services/examRequest";

const ExamSummaryDialog = ({
  open,
  handleClose,
  data,
  onSubmitSuccessful,
  autoSubmit,
}) => {
  const [submittedList, setSubmittedList] = useState([]);
  const [submiting, setSubmiting] = useState({ data: null, state: false });

  const handleSubmit = async () => {
    try {
     for (let i = 0; i < data?.length; i++) {
        setSubmiting({ data: data[i], state: true });
        let body = data[i]?.submitData;
        console.log('body : ',body)
        await submitExam(body);
        
        setSubmittedList((s) => [...s, data[i]]);
        setSubmiting({ data: null, state: false });
      }

      onSubmitSuccessful();
      handleClose();
    } catch (error) {
      console.log(error);
      setSubmiting({ data: null, state: false });
      return;
    }
  };

  useEffect(() => {
    if (autoSubmit) {
      handleSubmit();
    }
  }, [autoSubmit]);

  if (!data) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      onBackdropClick={() => null}
      BackdropProps={{ sx: { backdropFilter: "blur(5px)" } }}>
      <DialogTitle> Confirm Submit</DialogTitle>
      <DialogContent sx={{ background: "#e1e1e1" }}>
        <TableContainer component={Paper} sx={{ my: 2 }}>
          <Table sx={{ minWidth: "550px" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Typography sx={{ fontSize: "12px" }}>Subject</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography sx={{ fontSize: "12px" }}>
                    Total Questions
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography sx={{ fontSize: "12px" }}>Answered</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography sx={{ fontSize: "12px" }}>
                    Not Answered
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography sx={{ fontSize: "12px" }}>Not Visited</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row.subject?.sub_name}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    position: "relative",
                    background: submittedList?.find(
                      (i) => i.subject?.sub_id === row.subject.sub_id
                    )
                      ? "green"
                      : "white",
                  }}>
                  {submiting.state &&
                    submiting?.data?.sub_name === row.subject.sub_name && (
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          position: "absolute",
                        }}>
                        <CircularProgress />
                      </Box>
                    )}

                  <TableCell align="center" component="th" scope="row">
                    {row.subject?.sub_name}
                  </TableCell>
                  <TableCell align="center">{row.totalQuestions}</TableCell>
                  <TableCell align="center">{row.totalAnswered}</TableCell>
                  <TableCell align="center">{row.totalNotAnswered}</TableCell>
                  <TableCell align="center">{row.totalNotVisited}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="text" color="primary">
          Close
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={submiting?.state}
          variant="contained"
          color="primary">
          SUBMIT
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExamSummaryDialog;
