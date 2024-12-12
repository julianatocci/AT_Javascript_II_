import { users, chosenUser } from '../usuarios/scriptUsuarios.js';

document.addEventListener('DOMContentLoaded', () => {
    users();
    const savedMessages = JSON.parse(localStorage.getItem("messages")) || [];
    displayMessages(savedMessages);
});

class Message {
    constructor(content, authorId, createdAt = new Date()) {
        this.content = content;
        this.authorId = authorId;
        this.createdAt = createdAt;
    }
}

const botaoMensagem = document.getElementById("botao-enviar-mensagem");
botaoMensagem.addEventListener("click", sendMessages);

const input = document.getElementById("input-mensagem");
input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        sendMessages();
    } 
})

function sendMessages() {
    const messages = JSON.parse(localStorage.getItem("messages")) || [];
    let messagesInput = document.getElementById("input-mensagem");
    const date = new Date();
    const formattedTime = date.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
    });

    const messageSent = {
        messageContent: messagesInput.value,
        messageDate: formattedTime,
        messageUser: chosenUser.name,
        messageUserImage: chosenUser.profilePictureUrl || chosenUser.nameInitial,
    };

    if (messagesInput.value === "") {
        alert("Digite sua mensagem");
        return;
    }

    messages.push(messageSent);
    localStorage.setItem("messages", JSON.stringify(messages));
    displayMessages(messages);

    messagesInput.value = "";
}

function displayMessages(messages) {
    const messagesContainer = document.getElementById("mensagens");
    messagesContainer.textContent = "";

    messages.forEach((message) => {
        const mainDiv = document.createElement("div");
        const messageDiv = document.createElement("div");
        const imageMessage = document.createElement("img");
        const firstLetterMessage = document.createElement("div");
        const userNameMessage = document.createElement("p");
        const messageDate = document.createElement("p");

        imageMessage.id = "image-message";
        userNameMessage.id = "user-name-message";
        mainDiv.id = "main-div";
        messageDate.id = "message-date";
        firstLetterMessage.id = "first-letter";
        userNameMessage.textContent = message.messageUser;
        messageDate.textContent = `${message.messageDate}`;

        messageDiv.classList.add("styleMessage");
        messageDiv.textContent = message.messageContent;

        if (message.messageUserImage?.length > 1) {
            imageMessage.src = message.messageUserImage;
            mainDiv.appendChild(imageMessage);
        } else {
            firstLetterMessage.textContent = message.messageUserImage;
            mainDiv.appendChild(firstLetterMessage);
        }

        mainDiv.appendChild(userNameMessage);
        mainDiv.appendChild(messageDiv);
        mainDiv.appendChild(messageDate);
        messagesContainer.appendChild(mainDiv);
    });
}

window.addEventListener("storage", (event) => {
    if (event.key === "messages") {
        const updatedMessages = JSON.parse(localStorage.getItem("messages")) || [];
        displayMessages(updatedMessages);
    }
});

