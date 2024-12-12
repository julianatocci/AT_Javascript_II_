export class User {
        constructor(id, name, profilePictureUrl) {
            this.id = id;
            this.name = name;
            this.profilePictureUrl = profilePictureUrl;
        }
    
        get nameInitial() {
            const nameInitial = this.name.substr(0, 1);
            return nameInitial;
        }
    
        generateURL() {
            //return `/chat.html?id=[${this.id}]`;
            return `../chat/chat.html?id=${this.id}`;
        }
    }

    const list = document.getElementById("lista");
    export let chosenUser = {};

    export function users() {
        const existingUsers = localStorage.getItem("users");
        list.textContent = ""; 
        if (!existingUsers) {
            const createUsers = [
                new User("1", "Juliana", "https://w7.pngwing.com/pngs/666/201/png-transparent-computer-icons-woman-women-s-day-face-holidays-head-thumbnail.png"),
                new User("2", "Vitor", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfmV4q85EQOARdXBFldu44LduAjDM8iQvl9g&s"),
                new User("3", "Roberta"),
                new User("4", "Matheus"),
                new User("5", "Ana Clara")
            ];
    
            localStorage.setItem("users", JSON.stringify(createUsers));
            displayUsers(createUsers);
        } else {
            const parsedUsers = JSON.parse(existingUsers);
            displayUsers(parsedUsers.map(user => new User(user.id, user.name, user.profilePictureUrl)));
        }
    }
    
    export function displayUsers(users) {
        users.forEach(user => {
            const userContainer = document.createElement("div");
            userContainer.id = "user-container";
    
            if (user.profilePictureUrl) {
                const userImage = document.createElement("img");
                userImage.src = user.profilePictureUrl;
                userImage.id = "user-image"
                userContainer.appendChild(userImage);
            } else {
                const userInitialImage = document.createElement("div");
                userInitialImage.id = "user-initial-image"
                userInitialImage.textContent = user.nameInitial;
                userContainer.appendChild(userInitialImage);
            }
    
            const userParagraph = document.createElement("p");
            userParagraph.className = "user";
            userParagraph.textContent = `${user.name}`;
            userContainer.appendChild(userParagraph);
    
            const link = document.createElement("a");
            link.addEventListener("click", () => {
                getChosenUser(user);
            })
            link.textContent = "Entrar";
            link.style.textDecoration = "none";
            userContainer.appendChild(link);
    
            list.appendChild(userContainer);

            userParagraph.addEventListener("click", () => {
                const userURL = user.generateURL(); 
                window.location.href = userURL; 
            });
        });
    }

    export function getChosenUser(user) {
        const nomeUsuarioAtivo = document.getElementById("nomeUsuarioAtivo");
        const pictureContainer = document.getElementById("div-foto-perfil");
        const initialImageContainer = document.getElementById("user-initial-image-chat");
        const imageContainer = document.getElementById("user-image-chat");

        if (user.profilePictureUrl) {
            if (initialImageContainer) {
                initialImageContainer.remove();
            }
            if (imageContainer) {
                imageContainer.remove();
            }
            const userImage = document.createElement("img");
            userImage.src = user.profilePictureUrl;
            userImage.id = "user-image-chat"
            pictureContainer.prepend(userImage);
        } else {
            if (initialImageContainer) {
                initialImageContainer.remove();
            }
            if (imageContainer) {
                imageContainer.remove();
            }
            const userInitialImage = document.createElement("div");
            userInitialImage.id = "user-initial-image-chat"
            userInitialImage.textContent = user.nameInitial;
            pictureContainer.prepend(userInitialImage);
        }
        
        nomeUsuarioAtivo.textContent = user.name;
        chosenUser = {...user, nameInitial: user.nameInitial};
    }

    document.addEventListener('DOMContentLoaded', () => {
        users();  
    });
    
     window.addEventListener("storage", users);