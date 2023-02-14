## Description of the project

This project is a peerjs-server ready for extensions 

### Install the dependencies

Go inside the project and install the dependencies

```sh
cd nodejs-typescript-skeleton
npm install -g yarn
yarn add express
```

And also the type definitions for the express module

```sh
yarn add -D @types/express
```

### Test it out!

Start the server on port 3000 using:

```sh
yarn dev
```

Go ahead and hit the following URL `http://localhost:3000/` and you should be greeted with the following response:

```json
{ "message": "Hello World!" }
```

### PeerJS Server

Get information from the server using the following: http://localhost:3000/signal/

You can generate a new random id using the following: http://localhost:3000/signal/peerjs/id

### PeerJS Client
<script>
    const peer = new Peer('someid', {
      host: 'localhost',
      port: 3000,
      path: '/signal'
    });
</script>