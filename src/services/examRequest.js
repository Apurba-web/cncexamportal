import axios from "axios";
import useStorage from "src/lib/hooks/useStorage";
import {apiPath1, apiPath2} from "./apiConfig";

export const getUpcomingExams = async () => {
  //alert('upcoming')
  const { token, user_dept, user_sec } = useStorage();
  if (!user_dept || !user_sec || !token) {
    throw { error: "no userid or no token" };
  }
  try {
    const res = await axios.post(
      `${apiPath2}/upcomingExams`,
      { sec_id: user_sec, dept_id: user_dept },
      {
        headers: {
          "Authorization": `Bearer ${token}`
//          token: token,
        },
      }
    );
//    alert(res.data.status)
    if (res.data.status === true) {
      return res.data.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCurrentExams = async () => {
  const { token, user_dept, user_sec } = useStorage();
  if (!user_dept || !user_sec || !token) {
    throw { error: "no userid or no token" };
  }
  try {
    const res = await axios({
//      url: `${MAIN_URL}/frontends/examcurrent`,
      url: `${apiPath2}/todaysExams`,
      method: "POST",
      data: { sec_id: user_sec, dept_id: user_dept },
      headers: {
//        token: token,
        "Authorization": `Bearer ${token}`
      },
    });
    if (res.data.status === true) {
      return res.data.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getExam = async (examId) => {
  const { token, user_dept, user_sec } = useStorage();
  if (!user_dept || !user_sec || !token || !examId) {
    throw { error: "no userid or no token" };
  }
  try {
    const res = await axios({
//      ${MAIN_URL}/frontends/examinfo`,
      url: `${apiPath2}/examHdrDetQuestion`,
      method: "POST",
      data: { exam_id: examId, dept_id: user_dept, sec_id: user_sec },
      headers: {
//        token: token,
        "Authorization": `Bearer ${token}`
      },
    });
//alert(res.data.status)
    if (res.data.status === true) {
      return res.data.data;
    } else {
      return { error: "No Data" };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSubjectQuestions = async (examId, subjectId) => {
  const { token, user_dept, user_sec } = useStorage();
  if (!user_dept || !user_sec || !token) {
    throw { error: "no userid or no token" };
  }
  try {
    const res = await axios({
      url: `${MAIN_URL}/frontends/question`,
      method: "POST",
      data: { exam_id: examId, subject_id: subjectId },
      headers: {
        token: 12345,
      },
    });
    if (res.data.status === "success") {
      return res.data.msg;
    } else {
      throw "failed";
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getExamSession = async (body) => {
  const { token } = useStorage();
  let { exam_id, student_id, dept_id, sec_id } = body;

  if (!exam_id || !student_id || !dept_id || !sec_id || !token) {
    throw { error: "no userid or no token" };
  }
  try {
    const res = await axios({
     // url: `${MAIN_URL}/frontends/checksessiondata`,
      url: `${apiPath2}/checkTimeRemained`,
      method: "POST",
      data: body,
      headers: {
          "Authorization": `Bearer ${token}`
//        token: token,
      },
    });

    if (res.data.status === true) {
      console.log("SUCCESS", res);
      return res.data?.msg;
    } else {
      checkInvalidToken(res?.data?.msg);
      console.log("failed", res);
      return { error: "No Data" };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const storeExamSession = async (body) => {
//alert('Store Session Data Called')
  const { token } = useStorage();
  if (!body || !token) {
    throw { error: "no userid or no token" };
  }
  try {
    const res = await axios({
//      url: `${MAIN_URL}/frontends/storesessiondata`,
        url: `${apiPath2}/storeSessionData`,
      method: "POST",
      data: body,
      headers: {
//        token: token,
      "Authorization": `Bearer ${token}`

      },
    });
    if (res.data.status === true) {
      console.log("SUCCESS", res);
      return res.data;
    } else {
      checkInvalidToken(res?.data?.msg);
      console.log("failed", res);
      return { error: "No Data" };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const submitExam = async (body) => {

  const { token } = useStorage();

  if (!body || !token) {
    throw { error: "no userid or no token" };
  }
  try {
 //   alert(JSON.stringify(body))

    const res = await axios({
      url: `${apiPath2}/submitAnswer`,
      method: "POST",
      data: body,
      headers: {
        "Authorization": `Bearer ${token}`
      },
    });
    
//alert(res.data.status)
//console.log("RES : ", JSON.stringify(res));

    if (res?.data?.status === true) {
      console.log("SUCCESS",res);
//      return res.data;
      return res.data.data;
    } else {
      checkInvalidToken(res?.data?.msg);
      console.log("failed", res);
      return { error: "No Data" };
    }
  } catch (error) {
    const {stat} = error.response;
    if (stat === 410) {
      alert('Already Submitted')
    }
    alert(error)
   // alert(JSON.stringify(body))
    console.log(error);
    throw error;
  }
  alert('Completed')
};

export const getAllExamResult = async () => {
  const { token, user_dept, user_sec } = useStorage();
  if (!user_dept || !user_sec || !token) {
    throw { error: "no userid or no token" };
  }
  try {
    const res = await axios.post(
//      `${MAIN_URL}/frontends/exampublish`,
        `${apiPath2}/allResultPublishedExamsForSecDept`,
      { sec_id: user_sec, dept_id: user_dept },
      {
        headers: {
      //    token: token,
          "Authorization": `Bearer ${token}`
        },
      }
    );
//    console.log(res);
    if (res.data.status === true) {
      return res.data.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const checkStudentStatus = async (exam_id) => {
  const { token, user_id } = useStorage();
  if (!exam_id || !user_id || !token) {
    throw { error: "no userid or no token" };
  }
  try {
    const res = await axios.post(
//      `${MAIN_URL}/frontends/checkstudent`,
      `${apiPath2}/isAllowedToTakeExam`,
      {
        exam_id: exam_id,
      },
      {
        headers: {
           "Authorization": `Bearer ${token}`
//          token: token,
        },
      }
    );

    if (res.data.status === false) {
      return { error: res.data.msg };
    } else {
      return { error: false };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getExamResults = async (exam_id, sub_id) => {

  const { token, user_id, stud_id } = useStorage();
  if (!exam_id || !user_id || !token) {
    throw { error: "no userid or no token" };
  }
  try {
   // alert(user_id+", "+exam_id+", "+stud_id)
    const res = await axios.post(
//      `${MAIN_URL}/frontends/resultstudent`, 
      `${apiPath2}/studentResultSummary`,
      {
      stud_id: stud_id, eid: exam_id },
      {
      headers: {
        "Authorization": `Bearer ${token}`
//        token: token,
      },
    });
    
  //  console.log('Res: ',res);
    if (res.data.status === true) {
      return res.data.data;
    } else {
      return [];
    }
  } catch (error) {
//    alert('Catch')
    console.log(error);
    throw error;
  }
};

export const getExamSubResults = async (exam_id, sub_id) => {

  const { token, user_id, stud_id } = useStorage();
  
  if (!exam_id || !user_id || !token) {
    throw { error: "no userid or no token" };
  }
  try {

   //alert("Details : "+sub_id+", "+exam_id+", "+stud_id)

    const res = await axios.post(
//      `${MAIN_URL}/frontends/indvstudresult`, 
      `${apiPath2}/studentResultDetail`,      

      {
        stid: stud_id, eid: exam_id, sid: sub_id },
      {
      headers: {
//        token: token,
        "Authorization": `Bearer ${token}`

      },
    });

//alert(res.data.status)
    console.log('ResDetails', res);
    if (res.data.status === true) {
      return res.data.data;
    } else {
      return [];
    }
  } catch (error) {
  //  alert(error)
    console.log(error);
    throw error;
  }
};
