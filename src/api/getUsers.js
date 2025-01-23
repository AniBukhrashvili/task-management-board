import { http } from "../services/http";

export const getUsersRequest = () => {
  return http("get").get({
    url: `http://localhost:8000/users`,
  });
};
