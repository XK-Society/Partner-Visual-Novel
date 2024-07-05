document.getElementById("show-register").addEventListener("click", function () {
  document.getElementById("selection-container").style.display = "none";
  document.getElementById("registration-form").style.display = "block";
});

document.getElementById("show-login").addEventListener("click", function () {
  document.getElementById("selection-container").style.display = "none";
  document.getElementById("login-form").style.display = "block";
});

document
  .getElementById("return-button1")
  .addEventListener("click", function () {
    document.getElementById("registration-form").style.display = "none";
    document.getElementById("selection-container").style.display = "block";
  });

document
  .getElementById("return-button2")
  .addEventListener("click", function () {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("selection-container").style.display = "block";
  });

document
  .getElementById("registerForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const wallet = document.getElementById("wallet").value;

    const userData = {
      referenceId: username,
      email: email,
      externalWalletAddress: wallet || undefined,
    };

    try {
      const response = await fetch("https://api.gameshift.dev/nx/users", {
        method: "POST",
        headers: {
          accept: "application/json",
          "x-api-key":
            "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Registration successful: " + result.message);
        document.getElementById("registration-form").style.display = "none";
        document.getElementById("game-container").style.display = "block";

        if (typeof RenJS !== "undefined" && typeof RenJS.init === "function") {
          RenJS.init("#game-container");
        }
      } else {
        alert("Registration failed: " + result.message);
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
    document.getElementById("registration-form").style.display = "none";
    document.getElementById("game-container").style.display = "block";
  });

document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("login-username").value;

    try {
      const response = await fetch(
        `https://api.gameshift.dev/nx/users/${username}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            "x-api-key":
              "",
          },
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Login successful: " + result.message);
        document.getElementById("login-form").style.display = "none";
        document.getElementById("game-container").style.display = "block";

        if (typeof RenJS !== "undefined" && typeof RenJS.init === "function") {
          RenJS.init("#game-container");
        }
      } else {
        alert("Login failed: " + result.message);
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
    document.getElementById("login-form").style.display = "none";
    document.getElementById("game-container").style.display = "block";
  });
