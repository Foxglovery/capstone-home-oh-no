export const getUserByEmail = (email) => {
  return fetch(`http://localhost:8088/users?email=${email}`).then((res) =>
    res.json()
  );
};

export const createUser = (user) => {
  return fetch("http://localhost:8088/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());
};

export const GetUsersByHomeId = (homeId) => {
  return fetch(
    `http://localhost:8088/userHomes?homeId=${homeId}&_expand=user`
  ).then((res) => res.json());
};

export const GetAllUsers = () => {
  return fetch(
    `http://localhost:8088/users`
  ).then((res) => res.json());
};

export const RemoveOwnerFromHome = (userHomeId) => {
  return fetch(`http://localhost:8088/userHomes/${userHomeId}`, {
    method: "DELETE",
  });
};

export const GetAllUserHomes = () => {
  return fetch(
    `http://localhost:8088/userHomes`
  ).then((res) => res.json());
};
