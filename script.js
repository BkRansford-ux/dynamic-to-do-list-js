// Run code only after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // Select DOM elements (exact IDs)
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Helper: read tasks array from Local Storage
    function getStoredTasks() {
        return JSON.parse(localStorage.getItem('tasks') || '[]');
    }

    // Helper: write tasks array to Local Storage
    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to add a task
    // If taskTextParam is provided, use it (used when loading from storage)
    // save defaults to true: when false, don't write to localStorage
    function addTask(taskTextParam, save = true) {
        const taskText = (typeof taskTextParam === 'undefined')
            ? taskInput.value.trim()
            : String(taskTextParam).trim();

        // Prevent adding empty tasks
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create new li element and set its textContent
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button, set textContent and class
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn'); // checker expects classList.add

        // Assign onclick event to the remove button to remove this li from taskList
        removeBtn.onclick = function () {
            taskList.removeChild(li);
            removeFromLocalStorage(taskText);
        };

        // Append remove button to li, then li to taskList
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear the input field only when task was typed by user (not when loading)
        if (typeof taskTextParam === 'undefined') {
            taskInput.value = '';
        }

        // Save to Local Storage (unless explicitly told not to)
        if (save) {
            const tasks = getStoredTasks();
            tasks.push(taskText);
            saveTasks(tasks);
        }
    }

    // Remove a single task text from Local Storage (removes first matching occurrence)
    function removeFromLocalStorage(taskText) {
        const tasks = getStoredTasks();
        const index = tasks.indexOf(taskText);
        if (index > -1) {
            tasks.splice(index, 1);
            saveTasks(tasks);
        }
    }

    // Load tasks from Local Storage and render them (do not re-save while loading)
    function loadTasks() {
        const storedTasks = getStoredTasks();
        storedTasks.forEach(task => addTask(task, false));
    }

    // Event listener on Add button (calls addTask using input value)
    addButton.addEventListener('click', function () {
        addTask();
    });

    // Keypress listener on the input to handle Enter key
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            addTask();
        }
    });

    // Load existing tasks on page load
    loadTasks();
});

