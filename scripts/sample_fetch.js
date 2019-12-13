(async function(){
  /*fetching posts by GET requests*/
  let response = await fetch('https://jsonplaceholder.typicode.com/todos');
  let posts = await response.json();
  console.log(posts);

  /*enlisting posts*/
  // let list = "";
  let list = posts.reduce((agg, post, index) => {
    if(index <= 10)
    return agg + `
      <label for="${post.id}">
        <input type='checkbox' class="input-check" name="${post.id}" id="${post.id}" data-post="${post.id}" >
        <span id="title_${post.id}">${post.title}</span>
      </label>`;
      return agg + "";
  }, '');
  document.getElementById("posts").innerHTML = list;

  /*adding checkbox event*/
  document.querySelectorAll('.input-check').forEach((element) => {
    const id = element.getAttribute('data-post');
    element.addEventListener('change', e => toggleTodo(e, id));
  })

  function toggleTodo(e, id)  {
    // e.target.checked
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      // method: 'PUT',
      // body: JSON.stringify({
      //   completed: e.target.checked
      // }),
      // headers: {
      //   "Content-type": "application/json; charset=UTF-8"
      // }
    })
    .then(response => response.json())
    .then(post => {
      console.log(post);
      const decoration = post.completed ? 'line-through' : 'none';

      document.getElementById(`title_${post.id}`).setAttribute("style" , `text-decoration: ${decoration}`);
    })
  }

  document.getElementById("add-todo").addEventListener("click" , async (e) => {
    let new_todo = posts[0];
    new_todo.userId = +document.forms['todo-form']['uid'].value;
    new_todo.id = +document.forms['todo-form']['id'].value;
    new_todo.title = document.forms['todo-form']['title'].value;

    // await fetch(`https://jsonplaceholder.typicode.com/todos`, {
    //   method: 'POST',
    //   body: JSON.stringify(new_todo),
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8"
    //   }
    // });

    let new_item = `<label for="${new_todo.id}">
      <input type='checkbox' class="input-check" name="${new_todo.id}" id="${new_todo.id}" data-post="${new_todo.id}" >
      <span id="title_${new_todo.id}">${new_todo.title}</span>
    </label>`;
    console.log(JSON.stringify(new_todo));
    list = new_item + list;
    document.getElementById("posts").innerHTML = list;
    document.getElementById(new_todo.id).addEventListener('change', e => {
      const decoration = e.target.checked ? 'line-through' : 'none';
      document.getElementById(`title_${new_todo.id}`).setAttribute("style" , `text-decoration: ${decoration}`);
    });
  })
    // var e = document.getElementById(post.id)

    // e.addEventListener("click" , () => {
    //   if(e.checked)
    //   {
    //     fetch(`https://jsonplaceholder.typicode.com/todos/${post.id}`, {
    //     method: 'PUT',
    //     body: JSON.stringify({
    //       completed: true
    //       }),
    //     headers: {
    //       "Content-type": "application/json; charset=UTF-8"
    //       }
    //     })
    //     .then(() => {
    //       /*strikeout the post*/
    //       document.getElementById(`title_${post.id}`).setAttribute("style" , "text-decoration: line-through;");
    //     })
    //   }
    //   else
    //   {
    //     fetch(`https://jsonplaceholder.typicode.com/todos/${post.id}`, {
    //     method: 'PUT',
    //     body: JSON.stringify({
    //       completed: false
    //       }),
    //     headers: {
    //       "Content-type": "application/json; charset=UTF-8"
    //       }
    //     })
    //     .then(() => {
    //       /*remove strikeout from the post*/
    //       document.getElementById(`title_${post.id}`).setAttribute("style" , "text-decoration: none;");
    //     })
    //   }
    // });

})();
