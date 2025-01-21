import { http } from "../services/http";

export const updateTaskRequest = (data) => {
  return http("put").put({
    url: `http://localhost:5001/update-task/${data.id}`, 
    data: JSON.stringify(data), 
    headers: {
      "Content-Type": "application/json",
    },
  });
};
