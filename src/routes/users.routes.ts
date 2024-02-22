import http from 'node:http';
import { getUsers, getUser, updateUser, createUser, deleteUser } from '../controllers/users.controller';
import { notFoundRoute } from '../routes/404.routes';
import { REQUEST_METHOD, ROUTES } from '../constants';

export const userRoutes = (req: http.IncomingMessage, res: http.ServerResponse) => {
  switch (req.method) {
    case REQUEST_METHOD.GET: {
      if (req.url === ROUTES.USERS) {
        getUsers(req, res)
        break;
      }
      if (req.url?.split('/').length === 4){
        getUser(req, res)
        break;
      }
    }
    case REQUEST_METHOD.POST: {
      if (req.url === ROUTES.USERS) {
        createUser(req, res);
        break;
      }
    }
    case (REQUEST_METHOD.PUT): {
      if (req.url?.split('/').length === 4) {
        updateUser(req, res)
        break;
      }
    }
    case (REQUEST_METHOD.DELETE): {
      if (req.url?.split('/').length === 4) {
        deleteUser(req, res)
        break;
      }
    }
    default: {
      if(req?.url && req.url?.split('/').length > 4) {
        notFoundRoute(req, res)
        break;
      } 
      notFoundRoute(req, res)
      break;
    }
  }
}