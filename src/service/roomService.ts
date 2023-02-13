import {Room} from "../model/room";

export class RoomService {
    private static instance: RoomService;

    private static ROOMS: Map<string, Room>;

    private constructor() {
        RoomService.ROOMS = new Map<string, Room>();
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

    listRooms() : Room[] {
        return Array.from(RoomService.ROOMS.values());
    }
}