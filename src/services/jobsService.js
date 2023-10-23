export const GetAllJobs = () => {
        return fetch(
          `http://localhost:8088/jobs?_expand=home`
        ).then((res) => res.json());
      };
