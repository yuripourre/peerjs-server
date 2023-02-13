export class User {
    
    private _id: string;
    private _peerId = "";
    private _name = "";
    private _profileImage = "";
    private _roomId = "";

    constructor(id: string, name = "") {
        this._id = id;
        this._name = name;
    }

    get peerId(): string {
        return this._peerId;
    }

    set peerId(value: string) {
        this._peerId = value;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get profileImage(): string {
        return this._profileImage;
    }

    set profileImage(value: string) {
        this._profileImage = value;
    }

    get roomId(): string {
        return this._roomId;
    }

    set roomId(value: string) {
        this._roomId = value;
    }
}