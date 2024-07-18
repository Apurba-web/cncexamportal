import useStorage from "src/hooks/useStorage";
import axios from "axios";
import { MAIN_URL } from "src/services/apiConfig";

//Upload files to AWS
export const uploadToAws = async (file) => {
  const { token } = useStorage();
  try {
    let FD = new FormData();
    FD.append("file", file);
    const res = await axios.post(`${MAIN_URL}/aws/upload_to_aws/`, data, {
      headers: {
        "Content-Type": " multipart/form-data",
        Authorization: "Bearer " + token,
      },
    });
    checkInvalidToken(res?.data?.msg);
    return res.data.response_data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
