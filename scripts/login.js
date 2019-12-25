(async function() {
  console.log("loaded");
  document.getElementById('login-form').addEventListener("submit" , async (e) => {
    e.preventDefault();
    let url = `http://localhost:3000/auth/${+document.forms['login-form']['uid'].value}/${document.forms['login-form']['pass'].value}`;
    console.log(url);
    try {
      let response = await fetch(url);
      let token = await response.json();
      localStorage.setItem("token" , token.token);
      console.log("logged in");
      document.getElementById('msg').innerHTML = `<span class="text-success">User ${+document.forms['login-form']['uid'].value} successfully logged in<span>`;
      document.querySelectorAll('input').forEach((element) => {
        element.value = "";
      })
    }
    catch (e) {
      document.getElementById('msg').innerHTML = '<span class="text-danger">Login Failed: Invalid Username or Password<span>';
      document.querySelector('input[name="pass"]').value = '';
      console.log("wronggg");
    }
  });
})();
