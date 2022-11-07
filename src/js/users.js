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
    const template = `
    <div class="main__item">
      <img class="main__img" src="${user.avatar}">
      <div class="main__content-user">
        <div class="main__user">Id: ${user.id}</div>
        <div class="main__user">Email: ${user.email}</div>
        <div class="main__user">First_name: ${user.first_name}</div>
        <div class="main__user">Last_name: ${user.last_name}</div>
      </div>
    </div>`;

    content.innerHTML += template;
  });
}

moreBtn.addEventListener("click", () => {
  loadUsers(currentPage);
});
