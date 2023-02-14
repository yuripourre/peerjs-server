import {Request, Response} from "express";
import {UserService} from "../service/userService";
import {User} from "../model/user";

export class UserController {

    // curl -XGET http://localhost:3000/users/list -H 'Content-Type: application/json'
    static listUsers() {
        return async (req: Request, res: Response): Promise<Response> => {
            const users = UserService.getInstance().listUsers();

            return res.status(200).send({
                users
            });
        };
    }

    // curl -XPOST http://localhost:3000/users/create -H 'Content-Type: application/json' -d '{ "id":"1", "name": "User 1" }'
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

    // curl -XPOST http://localhost:3000/users/update -H 'Content-Type: application/json' -d '{ "userId":"1", "peerId": "123456" }'
    static updateUser() {
        return async (req: Request, res: Response): Promise<Response> => {
            const userId = req.body.userId;
            const peerId = req.body.peerId;

            UserService.getInstance().updatePeerId(userId, peerId);

            return res.status(200).send({
                message: 'User updated! '+userId+' '+peerId,
            });
        };
    }

}