import { startServer } from './server'
import { startCluster } from './cluster'

const isClusterMode = process.env.CLUSTER_MODE === 'true';
const PORT = Number(process.env.PORT) || 4000
const startApp = isClusterMode ? startCluster : startServer

startApp()