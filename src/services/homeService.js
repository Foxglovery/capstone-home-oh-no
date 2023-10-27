export const GetAllHomes = () => {
  return fetch(
    `http://localhost:8088/userHomes?_expand=user&_expand=home`
  ).then((res) => res.json());
};

export const GetOwnersByHomeId = (homeId) => {
  return fetch(
    `http://localhost:8088/userHomes?homeId=${homeId}&_expand=user`
  ).then((res) => res.json());
};

export const GetHomeById = (homeId) => {
  return fetch(
    `http://localhost:8088/userHomes?homeId=${homeId}&_expand=user&_expand=home`
  ).then((res) => res.json());
};

export const GetHomesByUserId = (userId) => {
  return fetch(
    `http://localhost:8088/userHomes?userId=${userId}&_expand=user&_expand=home`
  ).then((res) => res.json());
};






export const submitUpdateHome = (home, homeId) => {
  return fetch(`http://localhost:8088/homes/${homeId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(home),
  });
};