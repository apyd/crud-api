import http from 'node:http';
import { getApiRoutes } from './routes';

export const startServer = () => {
  const server = http.createServer()

  server.on("request", (req: http.IncomingMessage, res: http.ServerResponse) => {
    const routes = getApiRoutes(req.url)
    routes(req, res)
  })
  
  server.listen(process.env.PORT, () => {
    console.log(`listening... on port ${process.env.PORT}`);
  });

  return server
}