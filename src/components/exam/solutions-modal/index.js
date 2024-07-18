import React from "react";
import { Card, Modal, Box, Dialog, Button, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import parse from "html-react-parser";
import { useExamSubResult } from "src/adapters/examAdapter";
import { OpenInBrowserSharp, OpenInFull } from "@mui/icons-material";

const SolutionsModal = ({ exam_id, open, handleClose }) => {
  //console.log('open : ',open)
  const id = open?.sub_id;
//alert('SubResult '+id)
  const { subResult } = useExamSubResult(exam_id, id);

  if (!id) {
    return null;
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Box sx={{ maxWidth: "80vw", maxHeight: "80vh" }}>
        <TableContainer
          component={Paper}
          sx={{
            minWidth: "80vw",
            maxWidth: "80vw",
            maxHeight: "80vh",
          }}>
          <Table stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="left">Question</TableCell>
                <TableCell align="center">Correct Answer</TableCell>
                <TableCell align="center">Mark</TableCell>
                <TableCell align="center">Negative Mark</TableCell>
                <TableCell align="center">Answer Given</TableCell>
                <TableCell align="center">Mark Obtained</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subResult?.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}>
                  <TableCell
                    component="th"
                    scope="row"
                    size="small"
                    sx={{ fontSize: "12px" }}>
                    {index + 1}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ objectFit: "contain", flex: 1 }}>
                    {parse(row.question)}
                    <br/><Typography sx={{ fontWeight: 'bold' }}>Ans. {row.solution}</Typography>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontSize: "12px",
                      fontWeight: "500",
                    }}>
                    {row.correct_ans}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontSize: "12px",
                      fontWeight: "500",
                    }}>
                    {row.marks}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontSize: "12px",
                      fontWeight: "500",
                      color: "red",
                    }}>
                    {row.negative_mark}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontSize: "12px",
                      fontWeight: "500",
                    }}>
                    {row.option_chosen || "NOT SELECTED"}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontSize: "12px",
                      fontWeight: "500",
                    }}>
                    {row.marksObtained}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          onClick={handleClose}
          variant="contained"
          color="warning"
          sx={{ mt: 1 }}>
          CLOSE
        </Button>
      </Box>
    </Modal>
  );
};

export default SolutionsModal;
