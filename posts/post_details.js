(async function(){
  const id = window.location.search.substr(1).split('=')[1];
  console.log(id);

  document.title = `Post #${id}`;

  let response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  let post = await response.json();
  document.getElementById('post').innerHTML = ` <div class="container-fluid border border-info">
                                                  <div class="row content">
                                                    <h2 class="col-lg-12">
                                                      ${post.title}
                                                      <small>
                                                      &nbspUser ID: ${post.userId}
                                                      </small>
                                                    </h2>
                                                  </div>
                                                  <div class="row content">
                                                    <div class="col-lg-12">${post.body}</div>
                                                  </div>
                                                </div>`;


  response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
  let comments = await response.json();

  let comment_list = comments.reduce((agg , comment) => {
    return agg + `<div class="row content border border-success bg-white comment-unit"><h5 class="col-lg-12">${comment.name}<small>&nbsp${comment.email}</small></h5>
                  <div  class="col-lg-12">${comment.body}</div></div>`;
  } , '<div class="container-fluid border border-info comment-list bg-light">');
  comment_list += '</div>';
  document.getElementById("comments").innerHTML = comment_list;
})();
