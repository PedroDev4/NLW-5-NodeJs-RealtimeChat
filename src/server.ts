import express from 'express';
import "reflect-metadata";
import "./database"; // Importando o Index database 
import { routes } from './routes'

const app = express();

app.use(express.json());
app.use(routes);
app.listen(3333, () => {
    console.log("Server is Running! Port: 3333 ");
})