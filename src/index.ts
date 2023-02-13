import express, { Application, Request, Response } from 'express';
import { ExpressPeerServer } from 'peer';
import bodyParser from 'body-parser';
import {ServerWrapper} from "./serverWrapper";
const PORT = 3000;

const app: Application = express();
const serverWrapper = new ServerWrapper();

const server = app.listen(PORT, (): void => {
  console.log(`Connected successfully on port ${PORT}`);
});

// PeerJS server integration
const peerServer = ExpressPeerServer(server, {
  path: '/signal'
});

app.use(bodyParser.json(), peerServer);
app.use(bodyParser.urlencoded({ extended: true }), peerServer);

peerServer.on('connection', (client) => {
  serverWrapper.onClientJoin(client.getId());
});

peerServer.on('disconnect', (client) => {
  serverWrapper.onClientLeft(client.getId());
});

app.use('/peerjs', peerServer);

// Health Check
app.get('/', async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send({
    message: 'Hello World!',
  });
});