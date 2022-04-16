const todoTemplate = document.querySelector("#todo-template")

const renderTodo = function(todo) {
  const { id, title, isDone } = todo;

  const elTodo = todoTemplate.content.cloneNode(true);

  const elTodoCheckbox = elTodo.querySelector(".todo-checkbox");
  elTodoCheckbox.checked = isDone;
  elTodoCheckbox.setAttribute("data-id", id);

  const elTodoTitle = elTodo.querySelector(".todo-title");
  elTodoTitle.textContent = title;

  const elTodoDelete = elTodo.querySelector(".delete-todo")
  elTodoDelete.setAttribute("data-id", id);

  return elTodo;
}

const showingTodos = todos.slice();

const elTodosWrapper = document.querySelector(".todos-wrapper");

const renderTodos = function() {
  elTodosWrapper.innerHTML = "";

  const todosFragment = document.createDocumentFragment();
  showingTodos.forEach(function(todo) {
    const todoItem = renderTodo(todo);
    todosFragment.append(todoItem)
  });

  elTodosWrapper.append(todosFragment)
}

renderTodos();

elTodosWrapper.addEventListener("click", function(evt) {
  if (evt.target.matches("button.btn-danger")) {
    const clickedItemId = +evt.target.dataset.id;

    const clickedItemIndex = todos.findIndex(function(todo) {
      return todo.id === clickedItemId;
    });
    const clickedShowingItemIndex = showingTodos.findIndex(function(todo) {
      return todo.id === clickedItemId;
    });

    showingTodos.splice(clickedShowingItemIndex, 1);
    todos.splice(clickedItemIndex, 1);

    renderTodos();
  }
})
