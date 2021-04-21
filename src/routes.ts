import { request, response, Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { SettingsRepository } from './repositories/SettingsRepository';
import { SettingsController } from './controllers/SettingsController';

const routes = Router();
const settingsController = new SettingsController();

routes.post("/settings", settingsController.create);

export { routes };

/*
    Tipos de parâmetros

    Route Params -> Parâmetros de Rotas (Ex: http/localhost:3333/users/1)
    Query Params ->  Filtros e Buscas (Ex: http/localhost:3333/users/1?search=algumacoisa)
    Body Params -> Corpo da Requisição (Criação);
*/