import { http } from "../services/http";

export const getTasksRequest = () => {
  return http("get").get({
    url: `http://localhost:8000/tasks`,
  });
};
