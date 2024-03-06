let todos = [];

function addTodo() {
  const todoInput = document.getElementById("todoInput");
  const prioritySelect = document.getElementById("prioritySelect");
  const todoText = todoInput.value;
  const priority = prioritySelect.value;
  
  if (todoText.trim() === "") {
    alert("할 일을 입력하세요!");
    return;
  }

  const todo = { text: todoText, priority: priority, completed: false };
  todos.push(todo);
  renderTodos();
  todoInput.value = "";
}



function filterTodos(filterType) {
    let filteredTodos = [];
    if (filterType === "전체") {
      filteredTodos = todos;
    } else if (filterType === "완료") {
      filteredTodos = todos.filter(todo => todo.completed);
    } else if (filterType === "미완료") {
      filteredTodos = todos.filter(todo => !todo.completed);
    }
    renderTodos(filteredTodos);
  }

  function renderTodos(todosToRender = todos) {
    const todoList = document.getElementById("todoList");
    todoList.innerHTML = "";
    
    todosToRender.forEach((todo, index) => {
      const listItem = document.createElement("div");
  
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = todo.completed;
      checkbox.addEventListener("change", () => toggleCompleted(index));
      listItem.appendChild(checkbox);
  
      const priorityCount = document.createElement("span");
      priorityCount.textContent = getPriorityCount(todo.priority);
      listItem.appendChild(priorityCount);
  
      const todoText = document.createElement("span");
      todoText.textContent = `${todo.text}`;
      if (todo.completed) {
        todoText.style.textDecoration = "line-through";
      }
      listItem.appendChild(todoText);
  
      const editButton = document.createElement("button");
      editButton.textContent = "수정";
      editButton.addEventListener("click", () => {
        const newText = prompt("수정할 내용을 입력하세요:", todo.text);
        if (newText !== null) {
          todo.text = newText;
          renderTodos();
        }
      });
      listItem.appendChild(editButton);
  
      todoList.appendChild(listItem);
    });
  }
  
  function getPriorityCount(priority) {
    switch (priority) {
      case "낮음":
        return " [!] ";
      case "보통":
        return " [!!] ";
      case "높음":
        return " [!!!]";
      case "아주 높음":
        return " [!!!!] ";
      default:
        return 0;
    }
  }
  
  function toggleCompleted(index) {
    todos[index].completed = !todos[index].completed;
    renderTodos();
  }
