import { useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import {
  checkStudentStatus,
  getAllExamResult,
  getCurrentExams,
  getExam,
  getExamResults,
  getExamSession,
  getExamSubResults,
  getSubjectQuestions,
  getUpcomingExams,
} from "src/services/examRequest";
import { isOptionGroup } from "@mui/base";

export const useCurrentExams = () => {
  const {
    data: currentExams,
    mutate,
    error,
  } = useSWR("current_exams", getCurrentExams);

  let loading = !currentExams & !error;

  return {
    currentExams,
    loading,
    mutate,
  };
};

export const useUpcomingExams = () => {
  const {
    data: upcomingExams,
    mutate,
    error,
  } = useSWR("upcoming_exams", getUpcomingExams);

  let loading = !upcomingExams & !error;

  return {
    upcomingExams,
    loading,
    mutate,
  };
};

export const useExamDetails = (examId) => {
  const { data: exam, mutate, error } = useSWR([examId, "exam"], getExam);

  let loading = !exam & !error;

  return {
    exam,
    loading,
    mutate,
  };
};

export const useSubjectQuestion = (examId, subjectId) => {
  const {
    data: questions,
    mutate,
    error,
  } = useSWR([examId, subjectId, "subject_questions"], getSubjectQuestions);

  let loading = !questions & !error;

  return {
    questions,
    loading,
    mutate,
  };
};

export const useExamSession = (body) => {
  let { exam_id, student_id, dept_id, sec_id } = body;

  const {
    data: session,
    mutate,
    error,
  } = useSWR([body, "exam_session"], getExamSession);

  let loading = !session & !error;

  return {
    session,
    loading,
    mutate,
  };
};

export const useAllExamResult = () => {
  const {
    data: allResults,
    mutate,
    error,
  } = useSWR("results_exams", getAllExamResult);

  let loading = !allResults & !error;

  return {
    allResults,
    loading,
    mutate,
  };
};

export const useExamResult = (exam_id) => {
  const {
    data: result,
    mutate,
    error,
  } = useSWR([exam_id, "result"], getExamResults);

  let loading = !result & !error;

  return {
    result,
    loading,
    mutate,
  };
};

export const useExamSubResult = (exam_id, sub_id) => {
  const {
    data: subResult,
    mutate,
    error,
  } = useSWR([exam_id, sub_id, "sub_result"], getExamSubResults);

  let loading = !subResult & !error;

  return {
    subResult,
    loading,
    mutate,
  };
};

export const useStatusCheck = (exam_id) => {
  const {
    data: status,
    mutate,
    error,
  } = useSWR([exam_id, "submit_status"], checkStudentStatus);

  let loading = !status & !error;

  return {
    status,
    loading,
    mutate,
  };
};
