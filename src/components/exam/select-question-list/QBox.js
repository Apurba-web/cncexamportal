import React from "react";
import AnsweredBox from "./boxes/AnsweredBox";
import ClosedBox from "./boxes/ClosedBox";
import CurrentBox from "./boxes/CurrentBox";
import MarkedBox from "./boxes/MarkedBox";
import MarkedNotAnsweredBox from "./boxes/MarkedNotAnsweredBox";
import NotAnsweredBox from "./boxes/NotAnsweredBox";

const QBox = ({ question, onClick, examState, activeQuestion }) => {
  let isCurrent =
    question?.id === activeQuestion?.id &&
    question?.exam_id === activeQuestion?.exam_id;
  let isAnswered = examState?.state?.find(
    (i) => i?.id === question?.id && i?.subject_id === question?.subject_id
  )?.answer;
  let isOpen = examState?.state?.find(
    (i) => i?.id === question?.id && i?.subject_id === question?.subject_id
  );

  const isMarked = isOpen?.isMark;

  if (isCurrent) {
    return <CurrentBox question={question} onClick={onClick} />;
  }
  if (isOpen && !isCurrent && isMarked && !isAnswered) {
    return <MarkedNotAnsweredBox question={question} onClick={onClick} />;
  }

  if (isOpen && isMarked && isAnswered) {
    return <MarkedBox question={question} onClick={onClick} />;
  }

  if (isOpen && isMarked && !isAnswered) {
    return <MarkedNotAnsweredBox question={question} onClick={onClick} />;
  }

  if (isOpen && !isAnswered) {
    return <NotAnsweredBox question={question} onClick={onClick} />;
  }
  if (isOpen && isAnswered) {
    return <AnsweredBox question={question} onClick={onClick} />;
  }
  if (!isOpen && !isCurrent) {
    return <ClosedBox question={question} onClick={onClick} />;
  }
};

export default QBox;
