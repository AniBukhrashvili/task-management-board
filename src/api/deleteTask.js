import { http } from "../services/http";

export const deleteTaskRequest = (data) => {
  return http("delete").delete({
    url: `http://localhost:8000/delete-task/${data.id}`,
  });
};
