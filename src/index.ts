import express, { Application, Request, Response } from 'express';
import { ExpressPeerServer } from 'peer';
import bodyParser from 'body-parser';
import cors from 'cors';
import {PeerServerWrapper} from "./peerServerWrapper";
import {HealthCheckController} from "./controller/healthCheckController";
import {RoomController} from "./controller/roomController";
import {UserController} from "./controller/userController";

const PORT = 3000;

const app: Application = express();

const server = app.listen(PORT, (): void => {
  console.log(`Connected successfully on port ${PORT}`);
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// PeerJS server integration
const peerServer = ExpressPeerServer(server, {
  path: '/myapp'
});

app.use('/peerjs', peerServer);

const serverWrapper = new PeerServerWrapper();
peerServer.on('connection', (client) => {
  serverWrapper.onClientJoin(client.getId());
});

peerServer.on('disconnect', (client) => {
  serverWrapper.onClientLeft(client.getId());
});

// Health Check Controller
app.get('/', HealthCheckController.index());

// Room Controller
app.get('/rooms/list', RoomController.listRooms());
app.post('/rooms/create', RoomController.createRoom());
app.post('/rooms/delete', RoomController.deleteRoom());
app.post('/rooms/join', RoomController.joinRoom());
app.post('/rooms/leave', RoomController.leaveRoom());

// User Controller
app.get('/users/list', UserController.listUsers());
app.post('/users/create', UserController.createUser());
app.post('/users/update', UserController.updateUser());