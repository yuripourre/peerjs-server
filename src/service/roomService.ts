import {Room} from "../model/room";
import {User} from "../model/user";

class RoomInfo {
    constructor(name: string, users: User[]) {
        this.name = name;
        this.users = users;
    }

    public name: string;
    public users: User[];
}

export class RoomService {
    private static instance: RoomService;

    private static ROOMS: Map<string, Room>;

    private constructor() {
        RoomService.ROOMS = new Map<string, Room>();
        // Create fake rooms
        this.createRoom("Lobby");
        this.createRoom("Room 1");
        this.createRoom("Room 2");
    }

    public static getInstance(): RoomService {
        if (!RoomService.instance) {
            RoomService.instance = new RoomService();
        }

        return RoomService.instance;
    }

    createRoom(name: string) {
        const room = new Room(name);
        RoomService.ROOMS.set(name, room);

        console.log(RoomService.ROOMS);
    }

    deleteRoom(name: string) {
        RoomService.ROOMS.delete(name);
    }

    listRooms(): RoomInfo[] {
        const list: RoomInfo[] = [];

        RoomService.ROOMS.forEach((value, key) => {
            const r = new RoomInfo(value.name, Array.from(value.users.values()));
            list.push(r);
        });

        return list;
    }

    getRoomByName(name: string) {
        return RoomService.ROOMS.get(name);
    }

}