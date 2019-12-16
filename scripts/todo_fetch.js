(async function(){
  /*fetching todos by GET requests*/
  let response = await fetch('https://jsonplaceholder.typicode.com/todos');
  let todos = await response.json();
  console.log(todos);

  enlistTodos();

  document.getElementById("body").addEventListener("submit" , async (e) => {
    e.preventDefault();
    let new_todo = JSON.parse(`{
                      "userId": 0,
                      "id": 0,
                      "title": "",
                      "completed": false
                    }`);
    new_todo.userId = +document.forms['todo-form']['uid'].value;
    new_todo.id = todos[todos.length-1].id + 1;
    new_todo.title = document.forms['todo-form']['title'].value;
    new_todo.completed = false;

    console.log(JSON.stringify(new_todo));

    await fetch(`https://jsonplaceholder.typicode.com/todos`, {
      method: 'POST',
      body: JSON.stringify(new_todo),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });

    todos.push(new_todo);
    console.log(todos);
    enlistTodos();
  })

  function enlistTodos() {
    let list = todos.reduce((agg, todo) => {
      return `
        <label id="label_${todo.id}" for="${todo.id}" class="list-group-item border border-success my-1 check-label" ${todo.completed ? "style='background-color: #abffbe !important'" : ""}>
          <input type='checkbox' class="input-check" name="${todo.id}" id="${todo.id}" data-todo="${todo.id}" ${todo.completed ? "checked" : ""}>
          <span id="title_${todo.id}">${todo.title}</span>
        </label>` + agg;
    }, '');
    document.getElementById("todos").innerHTML = list;
    addCheckboxEventListener();
  }

  function addCheckboxEventListener() {
    document.querySelectorAll('.input-check').forEach((element) => {
      const id = element.getAttribute('data-todo');
      element.addEventListener('change', e => toggleTodo(e, id));
    });
  }

  async function toggleTodo(e, id)  {
    document.getElementById(`label_${id}`).setAttribute("style" , `background-color: #f6ff4d !important`);
    try {
        response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          completed: e.target.checked
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      let todo = await response.json();
      console.log(todo);
      todos[todo.id-1].completed = todo.completed;
      const decoration = todo.completed ? '#abffbe' : '#fff';
      document.getElementById(`label_${todo.id}`).setAttribute("style" , `background-color: ${decoration} !important`);
    }
    catch (e) {
      document.getElementById(`label_${id}`).setAttribute("style" , `background-color: #ffa4a4 !important`);
    }
  }
})();

function clearForms() {
  document.querySelectorAll('.form-input').forEach((element) => {
    element.value = "";
  })
}
