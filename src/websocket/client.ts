import { io } from "../app";
import { ConnectionsService } from '../services/ConnectionsService';
import { UsersService } from "../services/UsersService";
import { MessagesService } from "../services/MessagesService";

io.on("connect", (socket) => { // Reutilizando a mesma conexão do chat.js
    // Eventos relacionados ao Client

    const connectionService = new ConnectionsService();
    const usersService = new UsersService();
    const messagesService = new MessagesService();


    socket.on("client_firstAcess", async (params) => {
        const socket_id = socket.id; // Pegando o socket_id
        const { text, email } = params;
        let user_id = null;

        const userExists = await usersService.findByEmail(email);

        if (!userExists) { // Se o email recebido nao tiver cadastrado, salva o usuario com aquele email
            const user = await usersService.create(email);

            // Salvar a conexão com o socket_id, user_id na Tabela de "Conexão"
            await connectionService.create({ // E cria a conexão do usuario
                socket_id,
                user_id: user.id,
            });

            user_id = user.id;

        } else {
            user_id = userExists.id;

            const connection = await connectionService.findConnectionByUserId(userExists.id);
            console.log(connection);
            if (!connection) {
                await connectionService.create({
                    socket_id,
                    user_id: userExists.id,
                });
            } else {
                connection.socket_id = socket_id; // Sobrescrevendo o Socket_id existente
                await connectionService.create(connection) // Criando a nova conexão
            }
        }

        await messagesService.create({
            text,
            user_id,
        });


    });
});