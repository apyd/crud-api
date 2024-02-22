import http from 'node:http';
import cluster from 'node:cluster';
import { availableParallelism } from 'node:os';
import { getApiRoutes } from './routes';


export const startCluster = () => {
  const numCPUs = availableParallelism()
  const portAsNumber = Number(process.env.PORT)
  let currentWorkerIndex = 0

  if (cluster.isPrimary) {
    for (let i = 1; i <= numCPUs; i++) {
      cluster.fork({ PORT: portAsNumber ? portAsNumber + i : undefined })
    }

    const server = http.createServer()

    server.on("request", (req: http.IncomingMessage, res: http.ServerResponse) => {
      if (cluster.workers) {
        const workers = Object.values(cluster.workers);
        const worker = workers?.[currentWorkerIndex];
        worker?.send({req,res}
        )
        currentWorkerIndex = (currentWorkerIndex + 1) % numCPUs
      }
    })

    server.listen(4000, () => {
      console.log(`Load balancer listening on port ${process.env.PORT}`);
    });
  } else {
    const server = http.createServer();
    server.on('request', (req: http.IncomingMessage, res: http.ServerResponse) => {
      console.log(process.env.PORT, 'received request')
      const routes = getApiRoutes(req.url)
      routes(req, res)
    })

    server.listen(process.env.PORT, () => {
      console.log(`Worker listening on port ${process.env.PORT}`)
    })
  }

  return cluster
}