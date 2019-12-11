(async function(){
  /*fetching posts by GET requests*/
  let response = await fetch('https://jsonplaceholder.typicode.com/posts');
  let posts = await response.json();
  console.log(posts);

  /*enlisting posts*/
  let list = "";
  posts.map((post) => {
    list += `<input type='checkbox' name="${post.id}" id="${post.id}"><span id="title_${post.id}">${post.title}</span></input><br>`
  })
  document.getElementById("posts").innerHTML = list;

  /*editing posts by PUT requests*/
  posts.map((post) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title: 'avengers',
      body: 'assemble',
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => {
      /*check and strikeout the post*/
      document.getElementById(`${post.id}`).checked = true;
      document.getElementById(`title_${post.id}`).setAttribute("style" , "text-decoration: line-through;");
    })
  })
})();
