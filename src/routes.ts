import { Router } from 'express';
import { SettingsController } from './controllers/SettingsController';
import { UsersController } from './controllers/UsersController';
import { MessagesController } from './controllers/MessagesController'

const routes = Router();
const settingsController = new SettingsController();
const usersController = new UsersController();
const messagesController = new MessagesController();

routes.post("/settings", settingsController.create);

routes.post("/users", usersController.handle);

routes.post("/messages", messagesController.handle)
routes.get("/messages/:user_id", messagesController.showByUser);

export { routes };

/*
    Tipos de parâmetros
    Route Params -> Parâmetros de Rotas (Ex: http/localhost:3333/users/1)
    Query Params ->  Filtros e Buscas (Ex: http/localhost:3333/users/1?search=algumacoisa)
    Body Params -> Corpo da Requisição (Criação);
*/