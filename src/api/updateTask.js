import { http } from "../services/http";

export const updateTaskRequest = (data) => {
  return http("put").put({
    url: `http://localhost:8000/update-task/${data.id}`,
    data: JSON.stringify(data),
  });
};
