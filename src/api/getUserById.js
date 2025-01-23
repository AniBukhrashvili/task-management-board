import { http } from "../services/http";

export const getUserByIdRequest = (id) => {
  return http("get").get({
    url: `http://localhost:8000/users/${id}`,
  });
};
