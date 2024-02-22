import http from 'node:http';
import cluster from 'node:cluster';
import { availableParallelism } from 'node:os';
import { getApiRoutes } from './routes';


export const startCluster = () => {
  const numCPUs = availableParallelism()
  const portToNumber = Number(process.env.PORT)
  let currentWorkerIndex = 0

  if (cluster.isPrimary) {
    for (let i = 1; i <= numCPUs; i++) {
      cluster.fork({ PORT: portToNumber ? portToNumber + i : undefined })
    }

    const server = http.createServer()

    server.on("request", (req: http.IncomingMessage, res: http.ServerResponse) => {
      if (cluster.workers) {
        const options = {
          hostname: process.env.HOSTNAME,
          port: portToNumber + currentWorkerIndex + 1,
          path: req.url,
          method: req.method,
          headers: req.headers
        };

        const proxy = http.request(options, (response) => {
          res.writeHead(response.statusCode || 200, response.headers);
          response.pipe(res);
        });

        proxy.on('error', (err) => {
          console.error(`Error during request: ${err.message}`);
          res.writeHead(500);
          res.end('An error occurred while processing your request.');
        });

        req.pipe(proxy);

        currentWorkerIndex = (currentWorkerIndex + 1) % numCPUs
      }
    })

    server.listen(4000, () => {
      console.log(`Load balancer listening on port ${process.env.PORT}`);
    });
  } else {
    const server = http.createServer();

    server.on('request', (req: http.IncomingMessage, res: http.ServerResponse) => {
      const routes = getApiRoutes(req.url)
      routes(req, res)
    })

    server.listen(process.env.PORT, () => {
      console.log(`Worker listening on port ${process.env.PORT}`)
    })
  }

  return cluster
}