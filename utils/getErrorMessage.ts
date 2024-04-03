import axios from "axios";

export default function getErrorMessage(error: any) {
  if (axios.isAxiosError(error)) {
    return error.response?.data;
    // Do something with this error...
  } else {
    console.error("ERROR", error);
  }
}
