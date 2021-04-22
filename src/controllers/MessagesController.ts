import { Request, Response } from 'express';
import { MessagesService } from '../services/MessagesService';

class MessagesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { admin_id, text, user_id } = request.body;

        const messagesService = new MessagesService();

        const message = await messagesService.create({
            admin_id,
            text,
            user_id,
        });

        console.log(message);

        return response.json(message);
    }

    // localhost:333/messages/id
    async showByUser(request: Request, response: Response) {
        const { user_id } = request.params;

        console.log(user_id);

        const messagesService = new MessagesService();

        const list = await messagesService.listByUser(user_id);

        return response.json(list)
    }
}

export { MessagesController };