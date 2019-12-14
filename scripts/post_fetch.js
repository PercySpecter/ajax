(async function(){
  let response = await fetch('https://jsonplaceholder.typicode.com/posts');
  let posts = await response.json();
  console.log(posts);

  let list = posts.reduce((agg , post) => {
    return agg + `<a class="list-group-item list-group-item-action border border-success my-1" href="post.html?id=${post.id}" id="${post.id}">
                    ${post.title}<span class="ml-3 text-muted small">${post.body.substr(0 , 100)}...</span>
                  </a>`;
  } , '');
  document.getElementById('posts').innerHTML = list;
})();
