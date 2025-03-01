const addButton = document.getElementById("addButton");
const addNoteScreen = document.getElementById("addNoteScreen");

addButton.addEventListener("click", () => {
    addNoteScreen.style.visibility = "visible";
});

const cancelButton = document.getElementById("cancel");
cancelButton.addEventListener("click", () => {
    addNoteScreen.style.visibility = "hidden";
});

const applyButton = document.getElementById("apply");
applyButton.addEventListener("click", () => {
    createNote(document.getElementById("addNote").value);
    addNoteScreen.style.visibility = "hidden";
});

const themeButton = document.getElementById("theme");
themeButton.addEventListener("click", () => {
    const themeImage = document.getElementById("themeImage");
    const body = document.body;

    if (themeImage.dataset.theme === "light") {
        themeImage.src = "./images/moon.png";
        themeImage.dataset.theme = "dark";
        body.classList.add("dark-mode");
    } else {
        themeImage.src = "./images/sun.png";
        themeImage.dataset.theme = "light";
        body.classList.remove("dark-mode");
    }
});

const isCompleted = document.getElementById("isCompleted");

function createNote(content) {
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `
        <div class="note">
            <div id="mainPart">
                <div id="left">
                    <input type="checkbox" class="isCompleted">
                    <p id="noteContent">${content}</p>
                </div>
                <div id="right">
                    <button type="submit" id="editButton" class="rightButtons">✏️</button>
                    <button type="submit" id="deleteButton" class="rightButtons">🗑️</button>
                </div>
            </div>
            <div class="ayrac"><br></div>
        </div>
    `;

    note.querySelector(".isCompleted").addEventListener("change", (event) => {
        const noteContent = event.target.closest(".note").querySelector("#noteContent");
        if (event.target.checked) {
            noteContent.style.textDecoration = "line-through";
            noteContent.style.color = "#b0b0b0";
        } else {
            noteContent.style.textDecoration = "none";
            noteContent.style.color = "black";
        }
    });

    note.querySelector("#deleteButton").addEventListener("click", () => {
        note.style.animationPlayState = "running";
        setTimeout(() => {
            note.remove();
            if (document.getElementById("notes").querySelector(".note")) {
                document.getElementById("emptyDiv").style.display = "none";
            } else {
                document.getElementById("emptyDiv").style.display = "flex";
            }
        }, 500);
    });

    note.querySelector("#editButton").addEventListener("click", () => {
        document.getElementById("addNoteScreen").style.visibility = "visible";
        const noteElement = event.target.closest(".note");
        const noteContent = noteElement.querySelector("#noteContent");
        noteContent.textContent = document.getElementById("addNote").value;
        note.remove();
    });

    document.getElementById("emptyDiv").style.display = "none";
    document.getElementById("notes").appendChild(note);
    document.getElementById("addNote").value = "";
}

const searchBar = document.getElementById("searchBar");

searchBar.addEventListener("keyup", () => {
    let searchTerm = searchBar.value.toLowerCase();
    let notes = document.querySelectorAll("#notes .note");

    notes.forEach(note => {
        let noteText = note.querySelector("#noteContent").textContent.toLowerCase();
        if (noteText.includes(searchTerm)) {
            note.style.display = "block";
        } else {
            note.style.display = "none";
        }
    });
});


