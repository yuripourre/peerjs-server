
export class PeerServerWrapper {

    onClientJoin(clientId: string) {
        console.log("Client joined: " + clientId);
    }

    onClientLeft(clientId: string) {
        console.log("Client left: " + clientId);
    }
}