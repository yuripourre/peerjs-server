import {User} from "../model/user";

export class UserService {

    private static instance: UserService;

    static USERS: Map<string, User>;

    private constructor() {
        UserService.USERS = new Map<string, User>();
        // Populate fake users
        this.createUser(new User("1", "User 1"));
        this.createUser(new User("2", "User 2"));
        this.createUser(new User("3", "User 3"));
    }

    public static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }

        return UserService.instance;
    }

    createUser(user: User) {
        UserService.USERS.set(user.id, user);
        console.log(UserService.USERS);
    }

    deleteUser(id: string) {
        UserService.USERS.delete(id);
    }

    getUserById(id: string) {
        return UserService.USERS.get(id);
    }

    listUsers(): User[] {
        return Array.from(UserService.USERS.values());
    }
}