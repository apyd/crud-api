import http from 'node:http';
import { notFound } from '../controllers/notFound.controller';

export const notFoundRoute = (req: http.IncomingMessage, res: http.ServerResponse) => {
  notFound(req, res)
}