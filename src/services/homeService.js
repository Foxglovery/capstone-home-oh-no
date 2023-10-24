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

export const GetHomeByUserId = (userId) => {
  return fetch(
    `http://localhost:8088/userHomes?userId=${userId}&_expand=user&_expand=home`
  ).then((res) => res.json());
};
