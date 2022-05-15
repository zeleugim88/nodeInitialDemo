//Client initialization https://socket.io/docs/v4/client-initialization/
import { io } from "socket.io-client"; // first => npm install socket.io-client

const socket = io("http://localhost:3000", { autoConnect: false }); //if server and client domain is same => //const socket = io();
//autoConnect is set to false so the connection is not established right away. Later socket.connect()
//Here client will connect to the main namespace ( / ), that is sufficient for most use cases. Otherwise socket = io("/example");

//Catch-all listener: So that any event received by the client will be printed in the console.
//https://socket.io/docs/v4/listening-to-events/#Catch-all-listeners
socket.onAny((event, ...args) => {
  console.log(event, args);
});

export default socket;
