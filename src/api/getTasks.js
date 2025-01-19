import { http } from "../services/http";

export const getTasksRequest = () => {
  return http("get").get({
    url: `http://localhost:5001/tasks`,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
