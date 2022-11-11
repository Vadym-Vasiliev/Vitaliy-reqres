const content = document.querySelector(".main__list");
const moreBtn = document.querySelector(".main__btn");

let currentPage = 1;

async function loadUsers(page) {
  const server = `https://reqres.in/api/users?page=${page}`;
  const response = await fetch(server);
  const responseResult = await response.json();

  if (response.ok) {
    getUsers(responseResult);
    currentPage++;
  } else {
    content.innerHTML = responseResult.message;
  }
}
loadUsers(currentPage);

function getUsers(users) {
  console.log(users);
  users.data.forEach((user) => {
    const divItem = document.createElement("div");
    divItem.className = "main__item";

    divItem.insertAdjacentHTML(
      "beforeend",
      `<div class="main__user">First_name: ${user.first_name}</div>`
    );
    divItem.insertAdjacentHTML(
      "beforeend",
      `<div class="main__user">Last_name: ${user.last_name}</div>`
    );
    divItem.insertAdjacentHTML(
      "beforeend",
      `<div class="main__user">Email: ${user.email}</div>`
    );
    divItem.insertAdjacentHTML(
      "beforeend",
      `<div class="main__user main__ids">Id: ${user.id}</div>`
    );

    divItem.insertAdjacentHTML(
      "beforeend",
      `<img class="main__img" src="${user.avatar}">`
    );

    const divMain = document.createElement("div").appendChild(divItem);

    content.appendChild(divMain);

    divMain.addEventListener("click", () => {
      window.location.href = `user.html?userId/${user.id}`;
    });
  });
}

moreBtn.addEventListener("click", () => {
  loadUsers(currentPage);
});
