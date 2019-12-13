(async function(){
  let response = await fetch('https://jsonplaceholder.typicode.com/posts');
  let posts = await response.json();
  console.log(posts);

  let list = posts.reduce((agg , post) => {
    return agg + `<li><a href="post.html?id=${post.id}"> ${post.title} </a></li>`;
  } , '');
  document.getElementById('posts').innerHTML = list;
})();
