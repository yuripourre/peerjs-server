import {Request, Response} from "express";
import {RoomService} from "../service/roomService";
import {UserService} from "../service/userService";
import {User} from "../model/user";

export class UserController {

    // curl -XGET http://localhost:3000/user/list -H 'Content-Type: application/json'
    static listUsers() {
        return async (req: Request, res: Response): Promise<Response> => {
            const users = UserService.getInstance().listUsers();

            return res.status(200).send({
                users
            });
        };
    }

    // curl -XPOST http://localhost:3000/user/create -H 'Content-Type: application/json' -d '{ "id":"1", "name": "User 1" }'
    static createUser() {
        return async (req: Request, res: Response): Promise<Response> => {
            const id = req.body.id;
            const name = req.body.name;

            const user = new User(id);
            user.name = name;

            UserService.getInstance().createUser(user);

            return res.status(200).send({
                message: 'User created!',
            });
        };
    }

    // curl -XPOST http://localhost:3000/user/join -H 'Content-Type: application/json' -d '{ "userId":"1", "roomName": "Room 1" }'
    static joinRoom() {
        return async (req: Request, res: Response): Promise<Response> => {
            const userId = req.body.userId;
            const roomName = req.body.roomName;

            const user = UserService.getInstance().getUserById(userId);
            const room = RoomService.getInstance().getRoomByName(roomName);

            if (user) {
                room?.addUser(user);
                return res.status(200).send({
                    message: 'Joined room ' + roomName,
                });
            }

            return res.status(405).send({
                message: 'User not found!',
            });
        };
    }

    // curl -XPOST http://localhost:3000/user/leave -H 'Content-Type: application/json' -d '{ "userId":"1", "name":"Room 1" }'
    static leaveRoom() {
        return async (req: Request, res: Response): Promise<Response> => {
            const userId = req.body.userId;
            const roomName = req.body.roomName;

            const user = UserService.getInstance().getUserById(userId);
            const room = RoomService.getInstance().getRoomByName(roomName);

            if (user) {
                room?.removeUser(user);
            }

            return res.status(200).send({
                message: 'Left room ' + roomName,
            });
        };
    }

}