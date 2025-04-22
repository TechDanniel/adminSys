// import { http } from "@/utils/http";

import axios from "axios";

// type Result = {
//   success: boolean;
//   data: Array<any>;
// };

export const getAsyncRoutes = () => {
  return axios.get('/get-async-routes');
};
