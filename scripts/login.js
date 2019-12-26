(async function() {
  console.log("loaded");

  if(isLoggedIn())
  {
    handleLogin();
  }
  else
  {
    document.getElementById('login-form').addEventListener("submit" , async (e) => {
      e.preventDefault();
      const userId = +document.forms['login-form']['uid'].value;
      let url = `http://localhost:3000/auth/${userId}/${document.forms['login-form']['pass'].value}`;
      console.log(url);
      try {
        let response = await fetch(url);
        let token = await response.json();
        localStorage.setItem("token" , token.token);
        localStorage.setItem("uid" , userId);
        location.reload();
        // document.querySelectorAll('input').forEach((element) => {
        //   element.value = "";
        // })

      }
      catch (e) {
        document.getElementById('msg-fail').innerHTML = '<span class="text-danger">Login Failed<span>';
        document.querySelector('input[name="pass"]').value = '';
        console.log("wronggg");
      }
    });
  }

  function isLoggedIn() {
    console.log(localStorage.getItem('token') !== null);
    return (localStorage.getItem('token') !== null);
  }

  function handleLogin() {
    document.getElementById('msg-success').innerHTML = `<span class="text-info">User ${localStorage.getItem('uid')}<span>`;
    document.getElementById('logout-button').innerHTML =
    `<button class="btn btn-outline-warning mr-2" id="add-todo" type="button" onclick="logout()">Logout</button>`;
  }
})();

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('uid');
  location.reload();
}
