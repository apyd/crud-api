import http from 'node:http';
import { ERROR_MESSAGE, REQUEST_METHOD } from '../constants';

export const notFound = (req: http.IncomingMessage, res: http.ServerResponse) => {
  const notSupported = req.method && !Object.values(REQUEST_METHOD).includes(req.method)
  const errorMessage = notSupported ? ERROR_MESSAGE.INVALID_REQUEST_TYPE : ERROR_MESSAGE.INVALID_ROUTE
  res.writeHead(404, { 'Content-Type': 'application/json'});
  res.end(JSON.stringify({ message: errorMessage }));
}