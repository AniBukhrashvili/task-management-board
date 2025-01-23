import { http } from "../services/http";

export const createTaskRequest = (data) => {
  return http("post").post({
    url: `http://localhost:8000/create-task`,
    data: JSON.stringify(data),
  });
};
