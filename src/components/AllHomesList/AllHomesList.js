import { useEffect, useState } from "react";
import { GetAllHomes, GetOwnersByHomeId } from "../../services/homeService";
import { GetAllJobs } from "../../services/jobsService";
import "./AllHomesList.css";
import { Link } from "react-router-dom";


export const AllHomesList = () => {
  const [allHomes, setAllHomes] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [homeJobCount, setHomeJobCount] = useState([]);
  const [owners, setOwners] = useState([])
  


  useEffect(() => {
    // Fetch all homes
    GetAllHomes().then((homeArray) => {
      // Using reduce to get unique homes
      const uniqueHomes = homeArray.reduce((acc, home) => {
        if (!acc.some((accHome) => accHome.home.name === home.home.name)) {
          acc.push(home);
        }
        return acc;
      }, []);
  
      // Fetch owners for each unique home
      const promises = uniqueHomes.map((home) => 
        GetOwnersByHomeId(home.homeId).then((ownerArray) => {
          return { ...home, owners: ownerArray };
        })
      );
  
      // Wait for all promises to resolve
      Promise.all(promises).then((uniqueHomesWithOwners) => {
        setAllHomes(uniqueHomesWithOwners);
      });
    });
  }, []);

 
  

  useEffect(() => {
    GetAllJobs().then((jobArray) => {
      setJobs(jobArray);

      //to count the jobs for each home, reduce array
      const jobCount = jobArray.reduce((acc, job) => {
        //declares the home name
        const homeName = job.home.name;
        //looks for each time that home name appears in the array and increments the count each time.
        acc[homeName] = (acc[homeName] || 0) + 1;
        //returns count
        return acc;
      }, {});
      //set state to count
      setHomeJobCount(jobCount);
    });
  }, []);

  return (
    
    <ul className="cards">
      {allHomes.map((home) => {
        return (
          <li className="cards__item" key={home.homeId}>
              <div className="card">
                <Link to={`/homeDetails/${home.homeId}`}>
                <div className="card__image card__image--fence"></div>
                </Link>
                <div className="card__content">
                  <div className="card__title">{home.home.name}</div>
                  {/* <p className="card__text">{home.home.description}</p> */}
                  <p>Ongoing Projects: {homeJobCount[home.home.name]}</p>
                  <p>Owners: {home.owners.map(owner => owner.user.name).join(', ')}</p>
                  <button className="btn btn--block card__btn">Button</button>
                </div>
              </div>
            </li>
      )
      })}
    </ul>
  );
};
