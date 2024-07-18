import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  Input,
  RadioGroup,
  Typography,
  useMediaQuery,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import ExamFooter from "../exam-footer";

const QuestionBox = ({
  data,
  examState,
  updateQuestionState,
  gotoNextQ,
  gotoPrevQ,
}) => {
  const [answer, setAnswer] = useState("");

  const matches = useMediaQuery("(max-width:600px)");

  const handleSaveNext = () => {
    updateQuestionState({ ...data, answer: answer });
  };

  const handleMarkNext = () => {
    updateQuestionState({ ...data, answer: answer, isMark: true });
  };

  const handleClearSelection = () => {
    setAnswer("");
  };

  const handleSkip = () => {
    gotoNextQ && gotoNextQ(data);
  };

  const handlePrev = () => {
    gotoPrevQ && gotoPrevQ(data);
  };

  const handleOptionSelect = (e) => {
  //  alert('value '+e.target.value)
    setAnswer(e.target.value);
  };

  useEffect(() => {
    let found = examState?.state?.find((item) => {
      if (
        item?.id === data?.id &&
        item?.subject_id === data?.subject_id &&
        item?.exam_id === data?.exam_id
      ) {
        return true;
      } else {
        return false;
      }
    });
    //alert(found?.answer)
    console.log(found);
    if (found) {
      setAnswer(found?.answer);
    } else {
      setAnswer("");
    }
  }, [examState, data]);

  if (!data) {
    return null;
  }

  return (
    <Grid container width="100%" minHeight="100%" display="flex">
      <Grid item xs={12} maxHeight="100vh" minHeight="70vh">
        <Grid
          container
          sx={{
            my: 0,
            px: 3,
            py: 1.5,
            backgroundColor: "turquoise",
          }}>
          <Grid item xs={6}>
            <Grid item sx={{ py: .5, color: "red", fontWeight: 'bold' }} > Group . {data?.q_group} </Grid>
            
            Question No. {data?.qNo}. {data?.option_chosen}
          </Grid>
          <Grid
            item
            xs={6}
            display="flex"
            justifyContent="flex-end"
            alignItems="center">
            <Typography variant="body2">Marks</Typography>
            <Box
              sx={{
                py: 0,
                px: 0.8,
                borderRadius: 0.2,
                background: "green",
                mx: 1,
              }}>
              <Typography variant="body2" sx={{ color: "#fff" }}>
                +{data.marks}
              </Typography>
            </Box>
            <Box
              sx={{
                py: 0,
                px: 0.8,
                borderRadius: 0.2,
                mx: 1,
              }}>
              <Typography variant="body2" sx={{ color: "red" }}>
                -{data.negative_mark}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Divider />
        <Grid item xs={11} sx={{ px: 3 }}>
          <Box
            sx={{
              py: 2,
              maxWidth: "100vw",
              objectFit: "contain",
              overflowX: "auto",
            }}>
            <Typography
              sx={{
                fontWeight: "500",
              }}>
              {parse(data.question)}
              {data?.answer}
            </Typography>
          </Box>
{
 (data.q_type === 'S' ?
  (      
          <Box sx={{ px: 3 }}>
            
            <RadioGroup
              onChange={handleOptionSelect}
              value={""}
              defaultChecked={false}
              sx={{ width: "100%" }}
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group">
              {data?.option_a && (
                <FormControlLabel
                  value={"a"}
                  checked={answer === "a"}
                  control={<Radio />}
                  label={parse(data?.option_a)}
                  sx={{
                    my: 1,
                    "&:hover": {
                      background: "#e1e1e1",
                    },
                  }}
                />
              )}
              {data?.option_b && (
                <FormControlLabel
                  value={"b"}
                  checked={answer === "b"}
                  control={<Radio />}
                  label={parse(data?.option_b)}
                  sx={{
                    my: 1,
                    "&:hover": {
                      background: "#e1e1e1",
                    },
                  }}
                />
              )}
              {data?.option_c && (
                <FormControlLabel
                  checked={answer === "c"}
                  value={"c"}
                  control={<Radio />}
                  label={parse(data?.option_c)}
                  sx={{
                    my: 1,
                    "&:hover": {
                      background: "#e1e1e1",
                    },
                  }}
                />
              )}
              {data?.option_d && (
                <FormControlLabel
                  checked={answer === "d"}
                  value={"d"}
                  control={<Radio />}
                  label={parse(data?.option_d)}
                  sx={{
                    my: 1,
                    "&:hover": {
                      background: "#e1e1e1",
                    },
                  }}
                />
              )}
              {data?.option_e && (
                <FormControlLabel
                  checked={answer === "e"}
                  value={"e"}
                  control={<Radio />}
                  label={parse(data?.option_e)}
                  sx={{
                    my: 1,
                    "&:hover": {
                      background: "#e1e1e1",
                    },
                  }}
                />
              )}
            </RadioGroup>
          </Box>
          )
          :<Box>
            <Typography>Answer : </Typography>
            <Input onChange={handleOptionSelect} 
                value = {answer ? answer : ""}
                type="number" 
                placeholder="Numeric (3 dec place)" />
                
           </Box>)
}                

        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{ position: matches ? "absolute" : "relative", bottom: 0 }}>
        <ExamFooter
          onSkipClick={handleSkip}
          onSaveNextClick={handleSaveNext}
          onClearSelection={handleClearSelection}
          onMarkNextClick={handleMarkNext}
          onPrevClick={handlePrev}
        />
      </Grid>
    </Grid>
  );
};

export default QuestionBox;
