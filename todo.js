document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('buttonaddon2');
    const textInput = document.getElementById('textinput');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage when the page is loaded
    loadTasks();

    addButton.addEventListener('click', function() {
        addTask(textInput.value);
        textInput.value = ''; // Clear the input field after adding
    });

    function addTask(taskContent) {
        if (!taskContent.trim()) return; // Avoid adding empty tasks

        const taskItem = document.createElement('li');
        taskItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        taskItem.innerHTML = `
            <span>${taskContent}</span>
            <div>
                <button class="btn btn-secondary btn-sm mr-2" onclick="editTask(this)">Edit</button>
                <button class="btn btn-info btn-sm mr-2" onclick="duplicateTask(this)">Duplicate</button>
                <button class="btn btn-danger btn-sm mr-2" onclick="deleteTask(this)">Delete</button>
                <button class="btn btn-warning btn-sm mr-2" onclick="moveUp(this)">Move Up</button>
                <button class="btn btn-warning btn-sm" onclick="moveDown(this)">Move Down</button>
            </div>
        `;
        taskList.appendChild(taskItem);
        saveTasks(); // Save tasks to local storage after adding
    }

    function saveTasks() {
        const tasks = [];
        const taskItems = taskList.querySelectorAll('li');
        taskItems.forEach(item => {
            tasks.push(item.querySelector('span').textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTask(task));
    }

    window.deleteTask = function(button) {
        if (confirm('Are you sure you want to delete this task?')) {
            button.parentElement.parentElement.remove();
            saveTasks(); // Save tasks to local storage after deleting
        }
    };

    window.editTask = function(button) {
        const taskItem = button.parentElement.parentElement;
        const taskContent = taskItem.querySelector('span').textContent;
        const newContent = prompt('Edit Task:', taskContent);
        if (newContent) {
            taskItem.querySelector('span').textContent = newContent;
            saveTasks(); // Save tasks to local storage after editing
        }
    };

    window.duplicateTask = function(button) {
        const taskItem = button.parentElement.parentElement;
        const taskContent = taskItem.querySelector('span').textContent;
        addTask(taskContent);
    };

    window.moveUp = function(button) {
        const taskItem = button.parentElement.parentElement;
        const previousItem = taskItem.previousElementSibling;
        if (previousItem) {
            taskList.insertBefore(taskItem, previousItem);
            saveTasks(); // Save tasks to local storage after moving
        }
    };

    window.moveDown = function(button) {
        const taskItem = button.parentElement.parentElement;
        const nextItem = taskItem.nextElementSibling;
        if (nextItem) {
            taskList.insertBefore(nextItem, taskItem);
            saveTasks(); // Save tasks to local storage after moving
        }
    };
});
