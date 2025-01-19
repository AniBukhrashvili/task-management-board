import { http } from "../services/http";

export const createTaskRequest = (data) => {
  return http("post").post({
    url: `http://localhost:5001/create-task`,
    data: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
