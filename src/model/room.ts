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
        this.users.set(user.peerId, user);
    }

    removeUser(user: User) {
        this.users.delete(user.peerId);
    }

}