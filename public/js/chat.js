
document.querySelector("#start_chat").addEventListener("click", (event) => {

    const socket = io(); // Iniciando conexão IO

    const chat_help = document.getElementById("chat_help");
    chat_help.style.display = "none";

    const chat_in_support = document.getElementById("chat_in_support");
    chat_in_support.style.display = "block";


    const email = document.getElementById("email").value;
    const text = document.getElementById("txt_help").value;

    socket.on("connect", () => {
        const params = {
            email,
            text,
        }

        socket.emit("client_firstAcess", params, (call, err) => { // Emitindo um evendo para "client_FirstAcess" 
            if (err) {
                console.err(err);
            } else {
                console.log(call);
            }
        });
    })

}); // Ao clickar no botão iremos abrir uma conexão WS
