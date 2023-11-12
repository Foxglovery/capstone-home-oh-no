// export const GetAllHomes = () => {
//     return fetch(
//       `https://home-oh-no-api.onrender.com/userHomes?_expand=user&_expand=home`
//     ).then((res) => res.json());
//   };
  
//   export const GetOwnersByHomeId = (homeId) => {
//     return fetch(
//       `https://home-oh-no-api.onrender.com/userHomes?homeId=${homeId}&_expand=user`
//     ).then((res) => res.json());
//   };
  
//   export const GetHomeById = (homeId) => {
//     return fetch(
//       `https://home-oh-no-api.onrender.com/userHomes?homeId=${homeId}&_expand=user&_expand=home`
//     ).then((res) => res.json());
//   };
  
//   export const GetOneHomeById = (homeId) => {
//     return fetch(
//       `https://home-oh-no-api.onrender.com/homes?id=${homeId}`
//     ).then((res) => res.json());
//   };
  
//   export const GetHomeByJobId = (jobId) => {
//     return fetch(
//       `https://home-oh-no-api.onrender.com/jobs?id=${jobId}&_expand=home`
//     ).then((res) => res.json());
//   };
  
  
//   export const GetHomesByUserId = (userId) => {
//     return fetch(
//       `https://home-oh-no-api.onrender.com/userHomes?userId=${userId}&_expand=user&_expand=home`
//     ).then((res) => res.json());
//   };
  
//   export const GetUserByUserId = (userId) => {
//     return fetch(
//       `https://home-oh-no-api.onrender.com/users?id=${userId}`
//     ).then((res) => res.json());
//   }
  
//   export const createHome = (home) => {
//     return fetch("https://home-oh-no-api.onrender.com/homes", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(home),
//     });
//   };
  
//   export const createUserHome = (userHome) => {
//     return fetch("https://home-oh-no-api.onrender.com/userHomes", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userHome),
//     });
//   };
  
  
  
  
  
  
//   export const submitUpdateHome = (home, homeId) => {
//     return fetch(`https://home-oh-no-api.onrender.com/homes/${homeId}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(home),
//     });
//   };