export const getUserByEmail = (email) => {
  return fetch(`https://home-oh-no-api.onrender.com/users?email=${email}`).then((res) =>
    res.json()
  );
};

export const createUser = (user) => {
  return fetch("https://home-oh-no-api.onrender.com/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());
};

export const GetUsersByHomeId = (homeId) => {
  return fetch(
    `https://home-oh-no-api.onrender.com/userHomes?homeId=${homeId}&_expand=user`
  ).then((res) => res.json());
};
