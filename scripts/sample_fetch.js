(async function(){
  /*fetching posts by GET requests*/
  let response = await fetch('https://jsonplaceholder.typicode.com/todos');
  let posts = await response.json();
  console.log(posts);

  /*enlisting posts*/
  let list = "";
  posts.map((post) => {
    list += `<input type='checkbox' name="${post.id}" id="${post.id}"><span id="title_${post.id}">${post.title}</span></input><br>`
  });
  document.getElementById("posts").innerHTML = list;

  /*adding checkbox event*/
  posts.map((post) => {
    document.getElementById(`${post.id}`).addEventListener("click" , () => {
      if(document.getElementById(`${post.id}`).checked)
      {
        fetch(`https://jsonplaceholder.typicode.com/todos/${post.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          completed: true
          }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
          }
        })
        .then(response => {
          /*strikeout the post*/
          document.getElementById(`title_${post.id}`).setAttribute("style" , "text-decoration: line-through;");
        })
      }
      else
      {
        fetch(`https://jsonplaceholder.typicode.com/todos/${post.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          completed: false
          }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
          }
        })
        .then(response => {
          /*remove strikeout from the post*/
          document.getElementById(`title_${post.id}`).setAttribute("style" , "text-decoration: none;");
        })
      }
    });
  });
})();
