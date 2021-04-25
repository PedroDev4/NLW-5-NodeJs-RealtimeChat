import express, { request, response } from 'express';
import "reflect-metadata";
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import path from 'path';
import "./database"; // Importando o Index database 
import { routes } from './routes'

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));
app.set("views", path.join(__dirname, '..', 'public'));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.get("/pages/client", (request, response) => {
    return response.render("html/client.html"); //`pedindo para a rota renderizar a html page
});

app.get("/pages/admin", (request, response) => {
    return response.render("html/admin.html"); //`pedindo para a rota renderizar a html page
});

const http = createServer(app); // Criando server protocolo HTTP
const io = new Server(http) // Criando o server protocolo WS (WebSocket)

io.on("connection", (socket: Socket) => {
    console.log("Connected! ", socket.id);
})

app.use(express.json());
app.use(routes);

export { http, io };