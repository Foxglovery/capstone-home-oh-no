import { useEffect, useState } from "react";
import { GetAllHomes, GetOwnersByHomeId } from "../../services/homeService";
import { GetAllJobs } from "../../services/jobsService";
import "./AllHomesList.css";
import { Link } from "react-router-dom";
import { FilterBar } from "../Filter/FilterBar";


export const AllHomesList = () => {
  const [allHomes, setAllHomes] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [homeJobCount, setHomeJobCount] = useState([]);
  const [filteredHomes, setFilteredHomes] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  
  


  useEffect(() => {
    // Fetch all homes
    GetAllHomes().then((homeArray) => {
      // Using reduce to only get 1 instance of each home. Accumulator(uniqueHomes) looks for home objects in "homeObj" to store in itself 
      const uniqueHomes = homeArray.reduce((acc, homeObj) => {
        //if accumulator DOES NOT already have a matching home name on an object...
        if (!acc.some((accHome) => accHome.home.name === homeObj.home.name)) {
        // home object is pushed into accumulator
          acc.push(homeObj);
        }
        return acc;
        //this is not a dependency, it tells accumulator what data type to be: array
      }, []);
  
      //  Promises will be a copy of the home object where for each unique home, fetches home owners and stores in ownerArray 
      const promises = uniqueHomes.map((home) => 
        GetOwnersByHomeId(home.homeId).then((ownerArray) => {
          //returns copy of home with added "owners" key and "ownerArray" as value
          return { ...home, owners: ownerArray };
        })
      );
  
      // Wait for all promises to resolve then set state with conjoined array
      Promise.all(promises).then((uniqueHomesWithOwners) => {
        setAllHomes(uniqueHomesWithOwners);
        console.log("homeArray",allHomes)
      });
    });
  }, []);

 
  useEffect(() => {
    if (searchTerm) {
      
      const homeSearch = allHomes.filter((home) =>
      //filter allHomes for title
       home.home.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       //filter for owner name. used .some to return boolean because owner is nested on allHomes from line 34
       home.owners.some(owner => owner.user.name.toLowerCase().includes(searchTerm.toLowerCase()))
       )
      setFilteredHomes(homeSearch)
    } else {
      setFilteredHomes(allHomes)
    }
  },[searchTerm, allHomes])

  useEffect(() => {
    GetAllJobs().then((jobArray) => {
      setJobs(jobArray);
      console.log("jobs",jobs)

      //to count the jobs for each home, reduce array
          const jobCount = jobArray.reduce((acc, job) => {
            //declares the home name ref for the key
            const homeName = job.home.name;
            //checks if acc has an entry for this home, if not it prepares the object to accept the counts
            if (!acc[homeName]) {
              acc[homeName] = { ongoing: 0, completed: 0}
            }
            if (job.endDate) {
              acc[homeName].completed += 1
            } else {
              acc[homeName].ongoing += 1
            }
            //returns an object key value pair with home name and job count
            return acc;
            //acc is an object here
          }, {});

          
      //set state to count
      setHomeJobCount(jobCount);
      console.log("homeJobCount", homeJobCount)
    });
  }, []);

  return (<>
    <FilterBar setSearchTerm={setSearchTerm} />
    <ul className="cards">
      {filteredHomes.map((home) => {
        return (
          <li className="cards__item" key={home.homeId}>
              <div className="card">
                <Link to={`/homeDetails/${home.homeId}`}>
                <div className="card__image card__image--fence"></div>
                </Link>
                <div className="card__content">
                  <div className="card__title">{home.home.name}</div>
                  {/* <p className="card__text">{home.home.description}</p> */}
                  <p>Ongoing Projects: {homeJobCount[home.home.name]?.ongoing}</p>
                  <p>Completed Projects: {homeJobCount[home.home.name]?.completed}</p>
                  <p>Owners: {home.owners.map(owner => owner.user.name).join(', ')}</p>
                  
                </div>
              </div>
            </li>
      )
      })}
    </ul>
  </>);
};
