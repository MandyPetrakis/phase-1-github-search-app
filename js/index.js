const submitBtn = document.getElementById("button");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const input = document.querySelector("#search").value;

  let userList = document.querySelector("#user-list");
  userList.textContent = "";

  fetch(`https://api.github.com/search/users?q=${input}`)
    .then((res) => res.json())
    .then((data) => {
      renderUser(data.items);
    });
});

function renderUser(users) {
  if (!Array.isArray(users)) {
    return console.warn("users needs to be an array");
  }

  let userList = document.querySelector("#user-list");

  users.forEach((user) => {
    let name = user.login;
    let url = user.html_url;

    let link = document.createElement("a");
    let linkText = document.createTextNode(`Link to account`);
    link.append(linkText);
    link.href = url;

    let userElement = document.createElement("li");
    userElement.textContent = `${name}`;
    userElement.addEventListener("click", () => {
      fetch(`https://api.github.com/users/${name}/repos`)
        .then((res) => res.json())
        .then((data) => renderRepo(data));
    });

    userList.append(userElement);
    userList.append(link);
  });
}

function renderRepo(repos) {
  let repoList = document.querySelector("#repos-list");
  repos.forEach((repo) => {
    let repoName = repo.name;
    let repoElement = document.createElement("li");
    repoElement.textContent = `${repoName}`;
    repoList.append(repoName);
  });
}
