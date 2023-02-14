import {Room} from "../model/room";
import {UserService} from "./userService";
import {RoomInfo} from "../model/roomInfo";

export class RoomService {
    private static instance: RoomService;

    static ROOMS: Map<string, Room>;

    private constructor() {
        RoomService.ROOMS = new Map<string, Room>();
        // Create fake rooms
        this.createRoom("0", "Lobby");
        this.createRoom("1", "Room 1");
        this.createRoom("2", "Room 2");
    }

    public static getInstance(): RoomService {
        if (!RoomService.instance) {
            RoomService.instance = new RoomService();
        }

        return RoomService.instance;
    }

    createRoom(id: string, name: string) {
        const room = new Room(id, name);
        RoomService.ROOMS.set(id, room);

        console.log(RoomService.ROOMS);
    }

    deleteRoom(id: string) {
        RoomService.ROOMS.delete(id);
    }

    listRooms(): RoomInfo[] {
        const list: RoomInfo[] = [];

        RoomService.ROOMS.forEach((value, key) => {
            const r = new RoomInfo(value);
            list.push(r);
        });

        return list;
    }

    getRoomById(id: string) {
        return RoomService.ROOMS.get(id);
    }

    getRoomByName(name: string) {
        RoomService.ROOMS.forEach((value, key) => {
            if (value.name === name) {
                return value;
            }
        });
    }

    joinRoom(userId: string, roomId: string) {
        const user = UserService.getInstance().getUserById(userId);
        const room = RoomService.getInstance().getRoomById(roomId);

        if (!user) {
            return false;
        }

        if (user.roomId !== "") {
            const currentRoom = RoomService.getInstance().getRoomById(user.roomId);
            currentRoom?.removeUser(user);
        }
        room?.addUser(user);
        return true;
    }
}