import { http } from "../services/http";

export const deleteTaskRequest = (data) => {
  return http("delete").delete({
    url: `http://localhost:5001/delete-task`,
    data: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
