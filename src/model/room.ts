import {User} from "./user";

export class Room {

    name: string;
    users = new Map<string, User>();

    constructor(name: string) {
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
        user.roomId = this.name;
    }

    removeUser(user: User) {
        this.users.delete(user.id);
        user.roomId = "";
    }

}