import {Request, Response} from "express";
import {RoomService} from "../service/roomService";
import {UserService} from "../service/userService";
import {RoomInfo} from "../model/roomInfo";

export class RoomController {

    // curl -XGET http://localhost:3000/rooms/list -H 'Content-Type: application/json'
    static listRooms() {
        return async (req: Request, res: Response): Promise<Response> => {
            const rooms = RoomService.getInstance().listAllRooms();

            return res.status(200).send({
                rooms
            });
        };
    }

    // curl -XPOST http://localhost:3000/rooms/create -H 'Content-Type: application/json' -d '{ "name":"Room 1" }'
    static createRoom() {
        return async (req: Request, res: Response): Promise<Response> => {
            // Replace by proper id generation
            const id = String(RoomService.ROOMS.size);
            const name = req.body.name;

            RoomService.getInstance().createRoom(id, name);

            return res.status(200).send({
                message: 'Created room ' + name,
            });
        };
    }

    // curl -XPOST http://localhost:3000/rooms/delete -H 'Content-Type: application/json' -d '{ "name":"Room 1" }'
    static deleteRoom() {
        return async (req: Request, res: Response): Promise<Response> => {
            const name = req.body.name;
            RoomService.getInstance().deleteRoom(name);

            return res.status(200).send({
                message: 'Deleted room ' + name,
            });
        };
    }

    // curl -XPOST http://localhost:3000/rooms/join -H 'Content-Type: application/json' -d '{ "userId":"1", "roomId": "Room 1" }'
    static joinRoom() {
        return async (req: Request, res: Response): Promise<Response> => {
            const userId = req.body.userId;
            const roomId = req.body.roomId;

            if (RoomService.getInstance().joinRoom(userId, roomId)) {
                const room = RoomService.getInstance().getRoomById(roomId);
                if (room) {
                    const roomInfo = new RoomInfo(room);
                    return res.status(200).send({
                        message: 'Joined room ' + roomId,
                        room: roomInfo
                    });
                }
            }

            return res.status(405).send({
                message: 'User not found!',
            });
        };
    }

    // curl -XPOST http://localhost:3000/rooms/leave -H 'Content-Type: application/json' -d '{ "userId":"1", "roomId":"Room 1" }'
    static leaveRoom() {
        return async (req: Request, res: Response): Promise<Response> => {
            const userId = req.body.userId;

            const user = UserService.getInstance().getUserById(userId);

            if (user) {
                const room = RoomService.getInstance().getRoomById(user.roomId);
                room?.removeUser(user);
                return res.status(200).send({
                    message: 'Left room ' + user.roomId,
                });
            }

            return res.status(405).send({
                message: 'Room not found!',
            });
        };
    }

}