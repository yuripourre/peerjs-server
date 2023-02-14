import {User} from "./user";

export class Room {

    id: string;
    name: string;
    users = new Map<string, User>();

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }

    getName(): string {
        return this.name;
    }

    addUser(user: User) {
        if (!user) {
            return;
        }
        this.users.set(user.id, user);
        user.roomId = this.id;
    }

    removeUser(user: User) {
        this.users.delete(user.id);
        user.roomId = "";
    }

}