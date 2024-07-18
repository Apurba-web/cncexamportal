import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import AnsweredBox from "./select-question-list/boxes/AnsweredBox";
import ClosedBox from "./select-question-list/boxes/ClosedBox";
import MarkedBox from "./select-question-list/boxes/MarkedBox";
import MarkedNotAnsweredBox from "./select-question-list/boxes/MarkedNotAnsweredBox";
import NotAnsweredBox from "./select-question-list/boxes/NotAnsweredBox";

const StaticInstruction = ({ examName, duration }) => {
  return (
    <Box>
      <Typography variant="subtitle1">
        Please read the instruction carefully
      </Typography>
      <Typography variant="subtitle1" sx={{ textDecorationLine: "underline" }}>
        General Instruction
      </Typography>
      <Box sx={{ px: 2 }}>
        <ol>
          <li>
            <Typography sx={{ fontSize: { xs: "12px", sm: "14px" } }}>
              Total duration of {examName} is {duration} min.
            </Typography>
          </li>
          <li>
            <Typography sx={{ fontSize: { xs: "12px", sm: "14px" } }}>
              The clock will be set at the server. The countdown timer in the
              top right corner of screen will display the remaining time
              available for you to complete the examination. When the timer
              reaches zero, the examination will end by itself. You will not be
              required to end or submit your examination.
            </Typography>
          </li>
          <li>
            <Typography sx={{ fontSize: { xs: "12px", sm: "14px" } }}>
              The Questions Palette displayed on the right side of screen will
              show the status of each question using one of the following
              symbols:
            </Typography>
            <ul style={{ paddingLeft: "20px" }}>
              <li>
                <Typography
                  sx={{
                    fontSize: { xs: "12px", sm: "14px" },
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}>
                  <ClosedBox /> You have not visited the question yet.
                </Typography>
              </li>
              <li>
                <Typography
                  sx={{
                    fontSize: { xs: "12px", sm: "14px" },
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}>
                  <NotAnsweredBox /> You have not answered the question.
                </Typography>
              </li>
              <li>
                <Typography
                  sx={{
                    fontSize: { xs: "12px", sm: "14px" },
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}>
                  <AnsweredBox /> You have answered the question.
                </Typography>
              </li>
              <li>
                <Typography
                  sx={{
                    fontSize: { xs: "12px", sm: "14px" },
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}>
                  <MarkedBox />
                  You have answered and mark the question for review.
                </Typography>
              </li>
              <li>
                <Typography
                  sx={{
                    fontSize: { xs: "12px", sm: "14px" },
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}>
                  <MarkedNotAnsweredBox /> You have not answered but have mark
                  the question for review.
                </Typography>
              </li>
            </ul>
          </li>
          <li>
            <Typography sx={{ fontSize: { xs: "12px", sm: "14px" } }}>
              {`You can click on the ">" arrow which apperes to the left of question palette to collapse the
          question palette thereby maximizing the question window. To view the question palette
          again, you can click on "<" which appears on the right side of question window`}
            </Typography>
          </li>
          <li>
            <Typography sx={{ fontSize: { xs: "12px", sm: "14px" } }}>
              {`You can click on your "Profile" image on top right corner of your screen to change the
              language during the exam for entire question paper. On clicking of Profile image you will
              get a drop-down to change the question content to the desired language.`}
            </Typography>
          </li>
          <Typography
            variant="subtitle1"
            sx={{ textDecorationLine: "underline", ml: -2, mt: 2 }}>
            Navigating to a question:
          </Typography>
          <li>
            <Typography sx={{ fontSize: { xs: "12px", sm: "14px" } }}>
              To answer a question, do the following:
            </Typography>
            <ol style={{ paddingLeft: "20px" }}>
              <li>
                <Typography sx={{ fontSize: { xs: "12px", sm: "14px" } }}>
                  {`Click on the question number in the Question Palette at the right of your screen to go
              to that numbered question directly. Note that using this option does NOT save your
              answer to the current question.`}
                </Typography>
              </li>
              <li>
                <Typography sx={{ fontSize: { xs: "12px", sm: "14px" } }}>
                  {`Click on Save & Next to save your answer for the current question and then go to the
              next question.`}
                </Typography>
              </li>
              <li>
                <Typography sx={{ fontSize: { xs: "12px", sm: "14px" } }}>
                  {`Click on Mark for Review & Next to save your answer for the current question,
                  mark it for review, and then go to the next question.`}
                </Typography>
              </li>
            </ol>
          </li>
          <Typography
            variant="subtitle1"
            sx={{ textDecorationLine: "underline", ml: -2, mt: 2 }}>
            Answering a Question:
          </Typography>
          <li>
            <Typography sx={{ fontSize: { xs: "12px", sm: "14px" } }}>
              Procedure for answering a multiple choice type question:
            </Typography>
            <ol style={{ paddingLeft: "20px" }}>
              <li>
                <Typography sx={{ fontSize: { xs: "12px", sm: "14px" } }}>
                  {`To select you answer, click on the button of one of the options.`}
                </Typography>
              </li>
              <li>
                <Typography sx={{ fontSize: { xs: "12px", sm: "14px" } }}>
                  {`To deselect your chosen answer, click on the button of the chosen option again or
                  click on the Clear Response button.`}
                </Typography>
              </li>
              <li>
                <Typography sx={{ fontSize: { xs: "12px", sm: "14px" } }}>
                  {`To change your chosen answer, click on the button of another option.`}
                </Typography>
              </li>
              <li>
                <Typography sx={{ fontSize: { xs: "12px", sm: "14px" } }}>
                  {`To save your answer, you MUST click on the Save & Next button.`}
                </Typography>
              </li>
              <li>
                <Typography sx={{ fontSize: { xs: "12px", sm: "14px" } }}>
                  {`To mark the question for review, click on the Mark for Review & Next button.`}
                </Typography>
              </li>
            </ol>
          </li>
          <li>
            <Typography sx={{ fontSize: { xs: "12px", sm: "14px" } }}>
              {`To change your answer to a question that has already been answered, first select that
            question for answering and then follow the procedure for answering that type of question.`}
            </Typography>
          </li>
          <Typography
            variant="subtitle1"
            sx={{ textDecorationLine: "underline", ml: -2, mt: 2 }}>
            Navigating through subjects:
          </Typography>
          <li>
            <Typography sx={{ fontSize: { xs: "12px", sm: "14px" } }}>
              {`Sections in this question paper are displayed on the top bar of the screen. Questions in a
            section can be viewed by click on the section name. The section you are currently viewing is
            highlighted.`}
            </Typography>
          </li>
          <li>
            <Typography sx={{ fontSize: { xs: "12px", sm: "14px" } }}>
              {`After click the Save & Next button on the last question for a section, you will automatically
          be taken to the first question of the next section.`}
            </Typography>
          </li>
          <li>
            <Typography sx={{ fontSize: { xs: "12px", sm: "14px" } }}>
              {`You can shuffle between sections and questions anything during the examination as per your
        convenience only during the time stipulated.`}
            </Typography>
          </li>
          <li>
            <Typography sx={{ fontSize: { xs: "12px", sm: "14px" } }}>
              {`Candidate can view the corresponding section summery as part of the legend that appears in
        every section above the question palette.`}
            </Typography>
          </li>
        </ol>
      </Box>
    </Box>
  );
};

export default StaticInstruction;
