const addButton = document.querySelector("#add-button");
const newTaskInput = document.querySelector("#wrapper input");
const tasksContainer = document.querySelector("#tasks");
const error = document.getElementById('error');
const countValue = document.querySelector(".count-value");
let taskCount = 0;

const displayCount = (taskCount) => {
    countValue.innerText = taskCount;
}

const addTask = () => {
    const taskName = newTaskInput.value.trim();
    error.style.display = "none";
    if (!taskName) {
        setTimeout(() => {
            error.style.display = "block";
        }, 200);
        return;
    }

    const task = `
        <div class="task">
            <input type="checkbox" class="task-check">
            <span class="taskname">${taskName}</span>
            <button class="edit">
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="delete">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>`;

    tasksContainer.insertAdjacentHTML("beforeend", task);

    const deleteButtons = document.querySelectorAll(".delete");

    deleteButtons.forEach((button) => {
        button.onclick = () => {
            const taskElement = button.parentNode;
            if (!taskElement.querySelector(".task-check").checked) {
                taskCount -= 1;
            }
            taskElement.remove();
            displayCount(taskCount);
        }
    });

    const editButtons = document.querySelectorAll(".edit");

    editButtons.forEach((editButton) => {
        editButton.onclick = (e) => {
            let taskElement = e.target.closest(".task");
            newTaskInput.value = taskElement.querySelector(".taskname").innerText;
            if (!taskElement.querySelector(".task-check").checked) {
                taskCount -= 1;
            }
            taskElement.remove();
            displayCount(taskCount);
        }
    });

    const tasksCheck = document.querySelectorAll(".task-check");

    tasksCheck.forEach((checkBox) => {
        checkBox.onchange = () => {
            checkBox.nextElementSibling.classList.toggle("completed");
            if (checkBox.checked) {
                taskCount -= 1;    
            } else {
                taskCount += 1;
            }
            displayCount(taskCount);
        }
    });

    taskCount += 1; 
    displayCount(taskCount);
    newTaskInput.value = "";
};

addButton.addEventListener("click", addTask);

window.onload = () => {
    taskCount = 0;
    displayCount(taskCount);
    newTaskInput.value = "";
}
