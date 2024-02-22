import { ROUTES } from "../constants";
import { userRoutes } from "./users.routes";
import { notFoundRoute } from "./404.routes";

export const getApiRoutes = (url: string | undefined) => {
  if (url?.includes(ROUTES.USERS)) {
    return userRoutes;
  }
  return notFoundRoute;
}