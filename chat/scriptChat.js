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
}

class Message {
    constructor(content, authorId, createdAt = new Date()) {
        this.content = content;
        this.authorId = authorId;
        this.createdAt = createdAt;
    }
}

const list = document.getElementById("lista");

export function users() {
    const existingUsers = localStorage.getItem("users");
    list.textContent = ""; 
    if (!existingUsers) {
        const createUsers = [
            new User("1", "Juliana", "https://w7.pngwing.com/pngs/666/201/png-transparent-computer-icons-woman-women-s-day-face-holidays-head-thumbnail.png"),
            new User("2", "Claudia"),
            new User("3", "Arthur"),
            new User("4", "Pedro"),
            new User("5", "Richard", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfmV4q85EQOARdXBFldu44LduAjDM8iQvl9g&s")
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
        userContainer.style.display = "flex";
        userContainer.style.alignItems = "center";
        userContainer.style.marginBottom = "10px";

        if (user.profilePictureUrl) {
            const userImage = document.createElement("img");
            userImage.src = user.profilePictureUrl;
            userImage.style.width = "50px";
            userImage.style.height = "50px";
            userImage.style.borderRadius = "50%";
            userImage.style.objectFit = "cover"; 
            userContainer.appendChild(userImage);
        } else {
            const userInitialImage = document.createElement("div");
            userInitialImage.style.width = "50px";
            userInitialImage.style.height = "50px";
            userInitialImage.style.borderRadius = "50%";
            userInitialImage.style.display = "flex";
            userInitialImage.style.alignItems = "center";
            userInitialImage.style.justifyContent = "center";
            userInitialImage.style.backgroundColor = "#005b6b";
            userInitialImage.style.color = "#fff";
            userInitialImage.style.fontSize = "20px";
            userInitialImage.textContent = user.nameInitial;
            userContainer.appendChild(userInitialImage);
        }

        const userParagraph = document.createElement("p");
        userParagraph.className = "user";
        userParagraph.textContent = `${user.name}`;
        userContainer.appendChild(userParagraph);
        list.appendChild(userContainer);
        userParagraph.addEventListener("click", () => {
            window.location.href = "../chat/chat.html"
        })
    });
}

users();
