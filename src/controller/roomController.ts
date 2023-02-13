import {Request, Response} from "express";
import {RoomService} from "../service/roomService";

export class RoomController {

    // curl -XGET http://localhost:3000/room/list -H 'Content-Type: application/json'
    static listRooms() {
        return async (req: Request, res: Response): Promise<Response> => {
            const rooms = RoomService.getInstance().listRooms();

            return res.status(200).send({
                rooms
            });
        };
    }

    // curl -XPOST http://localhost:3000/room/create -H 'Content-Type: application/json' -d '{ "name":"Room 1" }'
    static createRoom() {
        return async (req: Request, res: Response): Promise<Response> => {
            const name = req.body.name;

            RoomService.getInstance().createRoom(name);

            return res.status(200).send({
                message: 'Created room ' + name,
            });
        };
    }

    // curl -XPOST http://localhost:3000/room/delete -H 'Content-Type: application/json' -d '{ "name":"Room 1" }'
    static deleteRoom() {
        return async (req: Request, res: Response): Promise<Response> => {
            const name = req.body.name;
            RoomService.getInstance().deleteRoom(name);

            return res.status(200).send({
                message: 'Deleted room ' + name,
            });
        };
    }


}