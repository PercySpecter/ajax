(async function(){
  /*fetching todos by GET requests*/
  let response = await fetch('https://jsonplaceholder.typicode.com/todos');
  let todos = await response.json();
  console.log(todos);

  /*enlisting todos*/
  let list = todos.reduce((agg, todo) => {
    return agg + `
      <label id="label_${todo.id}" for="${todo.id}" class="list-group-item border border-success my-1">
        <input type='checkbox' class="input-check" name="${todo.id}" id="${todo.id}" data-todo="${todo.id}">
        <span id="title_${todo.id}">${todo.title}</span>
      </label>`;
  }, '');
  document.getElementById("todos").innerHTML = list;

  /*adding checkbox event*/
  document.querySelectorAll('.input-check').forEach((element) => {
    const id = element.getAttribute('data-todo');
    element.addEventListener('change', e => toggleTodo(e, id));
  })

  function toggleTodo(e, id)  {
    document.getElementById(`label_${id}`).setAttribute("style" , `background-color: #f6ff4d !important`);
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        completed: e.target.checked
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => response.json())
    .then(todo => {
      console.log(todo);
      const decoration = todo.completed ? '#abffbe' : '#fff';
      document.getElementById(`label_${todo.id}`).setAttribute("style" , `background-color: ${decoration} !important`);
    })
  }

  document.getElementById("body").addEventListener("submit" , async (e) => {
    e.preventDefault();
    let new_todo = todos[0];
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

    let new_item = `<label id="label_${new_todo.id}" for="${new_todo.id}" class="list-group-item border border-success my-1">
      <input type='checkbox' name="${new_todo.id}" id="${new_todo.id}" data-todo="${new_todo.id}">
      <span id="title_${new_todo.id}">${new_todo.title}</span>
    </label>`;
    console.log(JSON.stringify(new_todo));
    list = new_item + list;
    document.getElementById("todos").innerHTML = list;
    document.getElementById(new_todo.id).addEventListener('change', e => toggleTodo(e, new_todo.id));
  })
})();

function clearForms() {
  document.getElementsByTagName("input").value = "";
  console.log("cleared");
}
