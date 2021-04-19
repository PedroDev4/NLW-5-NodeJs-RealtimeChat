import { json } from 'body-parser';
import express, { request, response } from 'express';

const app = express();

app.use(json());

app.get("/", (request, response) => {
    return response.json({
        message: "NLW 05",
    });
});

app.post("/users", (request, response) => {
    return response.json({
        message: "User successifuly created!",
    })
});

app.listen(3333, () => {
    console.log("Server is running! Port: 3333");
});