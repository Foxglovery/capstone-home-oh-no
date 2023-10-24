export const GetAllJobs = () => {
  return fetch(`http://localhost:8088/jobs?_expand=home`).then((res) =>
    res.json()
  );
};

export const GetJobsByHomeId = (homeId) => {
  return fetch(`http://localhost:8088/jobs?homeId=${homeId}&_expand=home&_expand=area`).then(
    (res) => res.json()
  );
};
