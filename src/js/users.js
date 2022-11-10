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
  users.data.forEach((user) => {
    // const template = `
    // <div class="main__item" id="card-${user.id}">

    //   <div class="main__content-user">
    //     <div class="main__user">First_name: ${user.first_name}</div>
    //     <div class="main__user">Last_name: ${user.last_name}</div>
    //     <div class="main__user">Email: ${user.email}</div>
    //     <div class="main__user main__ids">Id: ${user.id}</div>
    //   </div>
    //   <img class="main__img" src="${user.avatar}">

    // </div>`;

    const divContent = document.createElement("div");

    divContent.insertAdjacentHTML(
      "beforeend",
      `<div class="main__user">First_name: ${user.first_name}</div>`
    );
    divContent.insertAdjacentHTML(
      "beforeend",
      `<div class="main__user">Last_name: ${user.last_name}</div>`
    );
    divContent.insertAdjacentHTML(
      "beforeend",
      `<div class="main__user">Email: ${user.email}</div>`
    );
    divContent.insertAdjacentHTML(
      "beforeend",
      `<div class="main__user main__ids">Id: ${user.id}</div>`
    );
    divContent.insertAdjacentHTML(
      "beforeend",
      `<img class="main__img" src="${user.avatar}">`
    );

    divContent.addEventListener("click", (e) => {
      console.log(e);
      window.location.href = `user.html?userId=param`;
    });

    const divMain = document.createElement("div").appendChild(divContent);

    content.appendChild(divMain);

    // const card = document.getElementById(`card-${user.id}`);
    // console.log(card);
  });
}

moreBtn.addEventListener("click", () => {
  loadUsers(currentPage);
});
