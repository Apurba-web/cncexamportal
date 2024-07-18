import axios from "axios";
import { useRouter } from "next/router";
import useStorage from "src/lib/hooks/useStorage";
import checkInvalidToken from "src/utils/check-error-response";
import { useSWRConfig } from "swr";
import {MAIN_URL, apiPath1, apiPath2} from "./apiConfig";

export const checkAuth = async () => {
  const { token } = useStorage();
  if (token) {
    return token;
  } else {
    throw "error";
  }
};

//Student LOGIN

export const login = async ({ user_name, password }) => {
 
  const res = await axios.post(`${apiPath1}/login`, {
    user_name,
    password,
  });
  
  const { setToken, setUserId } = useStorage();
  
  setToken(res.data.data.auth_key);
 // alert(res.data.data.id)
  setUserId(res.data.data.id);
  
 
};

export const logout = async () => {
  const { clearAll } = useStorage();
  clearAll();

  return true;
};

export const getStudentDetails = async () => {
  
  const { user_id, token, setUserDept, setUserSec, setStudId } = useStorage();

  if (!user_id || !token) {
    throw { error: "no userid or no token" };
  }
  try {
    const res = await axios.post(
      `${apiPath2}/profile`,
  //`${MAIN_URL}/students/getstudent`,
  
      {
        id: user_id,
      },
      {
        headers: {
          //token: token,
           "Authorization": `Bearer ${token}`
        },
      }
    );
    //console.log(res.data.status)

    if (res.data.status === true) {
      setUserSec(res.data.data.section_id);
      setUserDept(res.data.data.dept_id);
      setStudId(res.data.data.id);
//alert(res.data.data.id)
      return res.data.data;
    } else {
      checkInvalidToken(res.data.msg);
      throw Error("Failed");
    }
  } catch (error) {
    //console.log(error);
    throw error;
  }
};

export const changePassword = async (data) => {
  
  const { user_id, token } = useStorage();
  
  if (!user_id || !token || !data) {
    throw { error: "no userid or no token" };
  }

  try {

    const res = await axios({
 //      `${MAIN_URL}/studentlogins/changepassword`,
      url:`${apiPath1}/changePassword`,
      method: "POST",
      data,
      headers: {
  //          token: token,
          "Authorization": `Bearer ${token}`
        },
      }
    );

//alert(res.data.msg)
    if (res.data.status === true) {
        return res.data.msg;
    } else {
      checkInvalidToken(res.data.msg);
      throw Error(res.data.msg);
    }
  } catch (error) {
    alert('Catch Error for test ', error)
    console.log(error);
    throw error;
  }
};
