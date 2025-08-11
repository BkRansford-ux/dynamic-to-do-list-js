// Run code only after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a task
    function addTask() {
        const taskText = taskInput.value.trim();

        // Prevent adding empty tasks
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Remove task when clicked
        removeBtn.onclick = () => {
            taskList.removeChild(li);
        };

        // Append button to list item
        li.appendChild(removeBtn);
        // Append list item to task list
        taskList.appendChild(li);

        // Clear input field
        taskInput.value = '';
    }

    // Event listeners
    addButton.addEventListener('click', addTask);

    // Allow adding tasks with Enter key
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
