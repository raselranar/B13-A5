const userNameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("login-btn");

loginButton.addEventListener("click", (e) => {
  const userName = userNameInput.value.trim();
  const password = passwordInput.value.trim();

  if (userName === "admin" && password === "admin123") {
    console.log("login successful");
    window.location.href = "home.html";
    return;
  }
  alert("Please enter correct Username and password");
});
