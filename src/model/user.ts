export class User {
    
    private _peerId: string;
    private _id = "";
    private _name = "";
    private _profileImage = "";

    constructor(peerId: string) {
        this._peerId = peerId;
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
}