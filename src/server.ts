import { http } from "./app";
import "./websocket/client";

http.listen(3333, () => {
    console.log("Server is Running! Port: 3333 "); // Subindo servidor do WS junto com HTTP 
})