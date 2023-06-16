
const newTodo=48;
fetch('https://dummyjson.com/todos')
.then(response => response.json())
.then(data=>{
  console.log(data)
const todo1=data.todos
  const todos=todo1.filter(todo=>todo.userId===newTodo);
  if(todos.length>0) {
  todos.forEach(todo => {
  const todoIds=todo.id;
  const todoTitle=todo.todo;
  const todoElement=document.createElement('li');
  todoElement.textContent=` ${todoTitle}`;
  const todoList=document.getElementById('list');
  todoList.appendChild(todoElement);
});
}else{
  console.log(`Todo with ${newTodo} not found.`)
}
})
.catch(error=>{
  console.error('Error',error)
})



function addTask() {
  // Get the input value
  const taskInput = document.getElementById("inputTask");
  const taskText = taskInput.value;

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  // Create the new task element
  var newTask = document.createElement("li");
  newTask.innerHTML = taskText;

  // Create the delete button element
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = "x";
  deleteButton.onclick = function() {
    const parent = this.parentNode;
    parent.parentNode.removeChild(parent);
  };
  newTask.appendChild(deleteButton);

  // Create the complete checkbox element
  const completeCheckbox = document.createElement("input");
  completeCheckbox.type = "checkbox";
  completeCheckbox.onclick = function() {
    if (this.checked) {
      newTask.classList.add("completed");
    } else {
      newTask.classList.remove("completed");
    }
  };
  newTask.appendChild(completeCheckbox);

  // Generate a random API code for the new task
  const apiCode = Math.floor(Math.random() * 100000);

  // Send a POST request to your API endpoint with the task and API code
  fetch('https://your-api-endpoint.com/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      task: taskText,
      code: apiCode
    })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

  // Add the new task to the task list
  document.getElementById("list").appendChild(newTask);

  // Clear the input
  taskInput.value = "";
}



