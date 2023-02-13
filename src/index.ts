import express, { Application, Request, Response } from 'express';
import { ExpressPeerServer } from 'peer';
import bodyParser from 'body-parser';
import {PeerServerWrapper} from "./peerServerWrapper";
import {HealthCheckController} from "./controller/healthCheckController";
import {RoomController} from "./controller/roomController";
const PORT = 3000;

const app: Application = express();

const server = app.listen(PORT, (): void => {
  console.log(`Connected successfully on port ${PORT}`);
});

// PeerJS server integration
const peerServer = ExpressPeerServer(server, {
  path: '/signal'
});

const serverWrapper = new PeerServerWrapper();

app.use(bodyParser.json(), peerServer);
app.use(bodyParser.urlencoded({ extended: true }), peerServer);

peerServer.on('connection', (client) => {
  serverWrapper.onClientJoin(client.getId());
});

peerServer.on('disconnect', (client) => {
  serverWrapper.onClientLeft(client.getId());
});

app.use('/peerjs', peerServer);

// Health Check Controller
app.get('/', HealthCheckController.index());

// Room Controller
app.get('/room/list', RoomController.listRooms());
app.post('/room/create', RoomController.createRoom());
app.post('/room/delete', RoomController.deleteRoom());

