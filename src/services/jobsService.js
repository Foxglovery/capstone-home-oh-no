export const GetAllJobs = () => {
  return fetch(`https://home-oh-no-api.onrender.com/jobs?_expand=home`).then((res) =>
    res.json()
  );
};

export const GetJobsByHomeId = (homeId) => {
  return fetch(
    `https://home-oh-no-api.onrender.com/jobs?homeId=${homeId}&_expand=home&_expand=area`
  ).then((res) => res.json());
};

//had to change from a query fetch to this specific fetch
export const GetJobById = (jobId) => {
  return fetch(
    `https://home-oh-no-api.onrender.com/jobs/${jobId}?_expand=home&_expand=area`
  ).then((res) => res.json());
};

export const submitJob = (job) => {
  return fetch("https://home-oh-no-api.onrender.com/jobs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(job),
  });
};

export const submitUpdateJob = (job, jobId) => {
  return fetch(`https://home-oh-no-api.onrender.com/jobs/${jobId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(job),
  });
};

export const submitDeleteJob = (jobId) => {
  return fetch(`https://home-oh-no-api.onrender.com/jobs/${jobId}`, {
    method: "DELETE",
  });
};

export const GetAllAreas = () => {
  return fetch(`https://home-oh-no-api.onrender.com/areas`).then((res) => res.json());
};

export const numToWord = (num) => {
  const words = ["None", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  return words[num] || num;
}