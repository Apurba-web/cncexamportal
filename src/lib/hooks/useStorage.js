import { getCookie, setCookies, removeCookies } from "cookies-next";
const EXPIRY_TIME = Date(86400);

const useStorage = () => {
  const token = getCookie("cnc_token");
  const user_id = getCookie("cnc_user_id");
  const user_sec = getCookie("cnc_user_sec");
  const user_dept = getCookie("cnc_user_dept");
  const stud_id = getCookie("cnc_stud_id");

  const setToken = (token) => {
    setCookies("cnc_token", token);
  };

  const setUserSec = (sec) => {
    setCookies("cnc_user_sec", sec);
  };

  const setUserDept = (dept) => {
    setCookies("cnc_user_dept", dept);
  };

  const setUserId = (id) => {
    setCookies("cnc_user_id", id);
  };

  const setStudId = (id) => {
    setCookies("cnc_stud_id", id);
  };


  const removeToken = () => {
    removeCookies("cnc_token");
  };

  const clearAll = () => {
    removeCookies("cnc_token");
    removeCookies("cnc_user_id");
    removeCookies("cnc_user_sec");
    removeCookies("cnc_user_dept");
    removeCookies("cnc_stud_id");
  };

  return {
    token,
    user_sec,
    user_dept,
    user_id,
    stud_id,
    setUserId,
    setUserDept,
    setUserSec,
    setStudId,
    setToken,
    removeToken,
    clearAll,
  };
};

export default useStorage;
