const routineButton = document.getElementById("routine-button");
const itemsButton = document.getElementById("items-button");

const routinePanel = document.getElementById("routine-panel");
const itemsPanel = document.getElementById("items-panel");

itemsButton.addEventListener("click", () => {
    routinePanel.hidden = true;
    itemsPanel.hidden = false;

    routineButton.classList.remove("is-active");
    itemsButton.classList.add("is-active");
});

routineButton.addEventListener("click", () => {
    routinePanel.hidden = false;
    itemsPanel.hidden = true;

    itemsButton.classList.remove("is-active");
    routineButton.classList.add("is-active");
});