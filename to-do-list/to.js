let allTasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const dateInput = document.getElementById("dateInput");

    const taskName = taskInput.value.trim();
    const taskDate = dateInput.value;

    if (taskName === "" || taskDate === "") {
        alert("Please enter task name and date");
        return;
    }

    const task = {
        id: Date.now(),
        name: taskName,
        date: taskDate,
        completed: false
    };

    allTasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(allTasks));

    taskInput.value = "";
    dateInput.value = "";

    displayTasks();
}

function displayTasks() {
    const todaysTasks = document.getElementById("todaysTasks");
    const upcomingTasks = document.getElementById("upcomingTasks");
    const completedTasks = document.getElementById("completedTasks");

    todaysTasks.innerHTML = "";
    upcomingTasks.innerHTML = "";
    completedTasks.innerHTML = "";

    const today = new Date().toISOString().split("T")[0];

    allTasks.forEach(task => {

        const taskCard = document.createElement("div");
        taskCard.className =
            "bg-white p-3 rounded-lg shadow mb-3 flex justify-between items-center";

        taskCard.innerHTML = `
            <div>
                <p class="font-semibold">${task.name}</p>
                <p class="text-sm text-gray-500">${task.date}</p>
            </div>

            <div class="flex gap-2">
                ${
                    !task.completed
                        ? `<button onclick="completeTask(${task.id})"
                            class="bg-green-500 text-white px-2 py-1 rounded">
                            ✓
                           </button>`
                        : ""
                }

                <button onclick="deleteTask(${task.id})"
                    class="bg-red-500 text-white px-2 py-1 rounded">
                    🗑
                </button>
            </div>
        `;

        if (task.completed) {
            completedTasks.appendChild(taskCard);
        } else if (task.date === today) {
            todaysTasks.appendChild(taskCard);
        } else {
            upcomingTasks.appendChild(taskCard);
        }
    });
}

function completeTask(id) {
    allTasks = allTasks.map(task => {
        if (task.id === id) {
            task.completed = true;
        }
        return task;
    });

    localStorage.setItem("tasks", JSON.stringify(allTasks));
    displayTasks();
}

function deleteTask(id) {
    allTasks = allTasks.filter(task => task.id !== id);

    localStorage.setItem("tasks", JSON.stringify(allTasks));
    displayTasks();
}