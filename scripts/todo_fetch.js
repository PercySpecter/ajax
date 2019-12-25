(async function(){
  const token = localStorage.getItem('token');
  if(token == null)
  {
    console.log(token);
    document.getElementById("todos").innerHTML = `<span class="mx-auto"> Please Login to view your Todos </span>`;
    return;
  }
  /*fetching todos by GET requests*/
  let response = await fetch('http://localhost:3000/todos' , {
    headers: {
      "Authorization": `jwt ${token}`
    }
  });
  let todos = await response.json();
  console.log(todos);

  enlistTodos();

  document.getElementById("todo-form").addEventListener("submit" , async (e) => {
    console.log(e);
    e.preventDefault();
    let new_todo = {
                      "userId": 0,
                      // "id": 0,
                      "title": "",
                      "completed": false
                    };
    new_todo.userId = +document.forms['todo-form']['uid'].value;
    // new_todo.id = todos[todos.length-1].id + 1;
    new_todo.title = document.forms['todo-form']['title'].value;


    console.log(JSON.stringify(new_todo));

    response = await fetch(`http://localhost:3000/todos`, {
      method: 'POST',
      body: JSON.stringify(new_todo),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        // "Authorization": `jwt ${token}`
      }
    });

    let post = await response.json();

    todos.push(post);
    console.log(post);
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
          // console.log("Client:" + e.target.checked);
          response = await fetch(`http://localhost:3000/todos/${id}`, {
          method: 'PUT',
          body: JSON.stringify({
            completed: e.target.checked
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": `jwt ${token}`
          }
        })
        let todo = await response.json();
        console.log(todo);
        todos.find(obj => obj.id = todo.id).completed = todo.completed;
        const decoration = todo.completed ? '#abffbe' : '#fff';
        document.getElementById(`label_${todo.id}`).setAttribute("style" , `background-color: ${decoration} !important`);
    }
    catch (e) {
      // console.log(e);
      document.getElementById(`label_${id}`).setAttribute("style" , `background-color: #ffa4a4 !important`);
    }
  }
})();

function clearForms() {
  document.querySelectorAll('.form-input').forEach((element) => {
    element.value = "";
  })
}
