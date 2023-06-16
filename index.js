const apiUrl = 'https://dummyjson.com/todos?limit10';
const newTodo = 48;

// Function to get a list of all tasks for a specific user from the API
async function getTasksForUser(userId) {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    data.todos.filter(todo => todo.userId === userId)
      .forEach(todo => {
        const todoElement = document.createElement('li');
        todoElement.textContent = todo.todo;
        list.appendChild(todoElement);
      });
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

// Function to add a new task to the list
async function addTask() {
  const taskInput = document.getElementById('inputTask');
  const taskText = taskInput.value.trim();
  if (taskText === '') return alert('Please enter a task!');

  const newTask = document.createElement('li');
  newTask.innerHTML = taskText;

  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = 'x';
  deleteButton.onclick = () => list.removeChild(newTask);
  newTask.appendChild(deleteButton);

  const completeCheckbox = document.createElement('input');
  completeCheckbox.type = 'checkbox';
  completeCheckbox.onclick = () => {
    if (completeCheckbox.checked) newTask.classList.add('completed');
    else newTask.classList.remove('completed');
  };
  newTask.appendChild(completeCheckbox);

  const apiCode = Math.floor(Math.random() * 100000);

  try {
    const response = await fetch('https://dummyjson.com/todos/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: taskText, code: apiCode })
    });
    if (!response.ok) throw new Error('Network response was not ok');
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }

  list.appendChild(newTask);
  taskInput.value = '';
}

// Call the getTasksForUser function to retrieve and display the tasks for the specified user
getTasksForUser(newTodo);