(async function(){
  const id = window.location.search.substr(1).split('=')[1];
  console.log(id);

  document.title = `Post #${id}`;

  let response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  let post = await response.json();
  document.getElementById('post').innerHTML = `<div class="container-fluid border border-info post-container bg-light mb-2 pb-2">
                                                  <div class="row content">
                                                    <h2 class="col-lg-12">
                                                      ${post.title}
                                                      <span class="ml-2 small">
                                                      User ID: ${post.userId}
                                                      </span>
                                                    </h2>
                                                  </div>
                                                  <div class="row content">
                                                    <div class="col-lg-12">${post.body}</div>
                                                  </div>
                                                </div>`;


  response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
  let comments = await response.json();

  let comment_list = comments.reduce((agg , comment) => {
    return agg = `${agg}
                  <div class="row content border border-success bg-white comment-unit py-1 my-2">
                    <h5 class="col-lg-12">
                      ${comment.name}<span class="bg-light ml-1 small">${comment.email}</span>
                    </h5>
                    <div  class="col-lg-12">${comment.body}</div>
                  </div>`;}
                  , '<div class="container-fluid border border-info comment-list bg-light p-4">');
  comment_list += '</div>';
  console.log(comment_list);
  document.getElementById("comments").innerHTML = comment_list;
})();
