import {User} from "./user";
import {Room} from "./room";

export class RoomInfo {
    constructor(room: Room) {
        this.id = room.id;
        this.name = room.name;
        this.users = Array.from(room.users.values());
    }

    public id: string;
    public name: string;
    public users: User[];
}