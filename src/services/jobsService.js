export const GetAllJobs = () => {
  return fetch(`http://localhost:8088/jobs?_expand=home`).then((res) =>
    res.json()
  );
};

export const GetJobsByHomeId = (homeId) => {
  return fetch(
    `http://localhost:8088/jobs?homeId=${homeId}&_expand=home&_expand=area`
  ).then((res) => res.json());
};

//had to change from a query fetch to this specific fetch
export const GetJobById = (jobId) => {
  return fetch(
    `http://localhost:8088/jobs/${jobId}?_expand=home&_expand=area`
  ).then((res) => res.json());
};

export const submitJob = (job) => {
  return fetch("http://localhost:8088/jobs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(job)
  })
}

export const GetAllAreas = () => {
  return fetch(`http://localhost:8088/areas`).then((res) => res.json());
};
