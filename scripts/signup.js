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

    document.getElementById('signup-form').addEventListener("submit" , async (e) => {
      e.preventDefault();
      const userId = +document.forms['signup-form']['uid'].value;
      let url = `http://localhost:3000/new/${userId}/${document.forms['signup-form']['pass'].value}`;
      console.log(url);
      try {
        let response = await fetch(url);
        let msg = await response.json();
        document.getElementById('status-msg').innerHTML = msg.msg;
        document.querySelectorAll('input').forEach((element) => {
          element.value = "";
        })
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
    window.location.replace('../');
  }
})();

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('uid');
  location.reload();
}
