import { useEffect, useState } from "react";
import { GetAllHomes, GetOwnersByHomeId } from "../../services/homeService";
import { GetAllJobs } from "../../services/jobsService";
import "./AllHomesList.css";
import { Link } from "react-router-dom";
import { FilterBar } from "../Filter/FilterBar";
import { Logo } from "../Logo/Logo";

export const AllHomesList = () => {
  const [allHomes, setAllHomes] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [homeJobCount, setHomeJobCount] = useState([]);
  const [filteredHomes, setFilteredHomes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
        //this is not a dependency, it tells accumulator the initial value and data type
      }, []);

      //  Promises will be a copy of the home object where for each unique home,the next line fetches home owners and stores in ownerArray
      const promises = uniqueHomes.map((home) =>
        GetOwnersByHomeId(home.homeId).then((ownerArray) => {
          //returns copy of home with added "owners" key and "ownerArray" as value for each home entry
          return { ...home, owners: ownerArray };
        })
      );

      // Wait for all promises to resolve then set state with now conjoined and happy array
      Promise.all(promises).then((uniqueHomesWithOwners) => {
        setAllHomes(uniqueHomesWithOwners);
        console.log("homeArray", allHomes);
      });
    });
  }, []);

  //search bar logic
  useEffect(() => {
    if (searchTerm) {
      const homeSearch = allHomes.filter(
        (home) =>
          //filter allHomes for title
          home.home.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          //filter for owner name. used .some to return boolean because owner is nested on allHomes from line 34
          home.owners.some((owner) =>
            owner.user.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
      setFilteredHomes(homeSearch);
    } else {
      setFilteredHomes(allHomes);
      console.log("filteredHomes", filteredHomes);
    }
  }, [searchTerm, allHomes]);

  useEffect(() => {
    GetAllJobs().then((jobArray) => {
      setJobs(jobArray);
      console.log("jobs", jobs);

      //to count the jobs for each home, reduce array of all jobs
      const jobCount = jobArray.reduce((acc, job) => {
        //declares the home name ref for the key
        const homeName = job.home.name;
        //checks if acc has an entry for this home, if not it prepares the object with initial values
        if (!acc[homeName]) {
          acc[homeName] = { ongoing: 0, completed: 0 };
        }
        //if job entry has an end date, acc gets a special treat(completed job)
        if (job.endDate) {
          acc[homeName].completed += 1;
        } else {
          //otherwise, acc still gets a treat, just not a special one(ongoing job)
          acc[homeName].ongoing += 1;
        }
        //returns an object key value pair with home name and job count
        return acc;
        //initial value is an empty object here
      }, {});

      //set state to count
      setHomeJobCount(jobCount);
      console.log("homeJobCount", homeJobCount);
    });
  }, []);

  
  return (
    <>
      <div className="main_container">
        <Logo />
        <div>
          <FilterBar setSearchTerm={setSearchTerm} />
        </div>
        <div className="home">
          {filteredHomes.map((home) => (
            <div className="home_card" key={home.homeId}>
              <Link to={`/homeJobs/${home.homeId}`}>
                <div className="home_card_title">{home.home.name}</div>
              </Link>
              <div className="home_card_img">
                <img src={home.home.imgUrl} alt={home.home.name} />
              </div>

              
                <div className="owners_list_container">
                  <p className="owners_list">
                  {home.owners.map((owner, index) => (
                    <span key={owner.id}>
                      {owner.user.name}
                      {index < home.owners.length - 1 ? " & " : ""}
                    </span>
                  ))}
                </p>
                </div>
                
              
              <div className="allhomes_card_btm_wrapper">
                
                <div>
                  <span className="home-info">
                    {" "}
                    <span className="big_number">
                      {/* uses OR to give a value to display if undefined */}
                      {homeJobCount[home.home.name]?.ongoing || 0}
                      
                    </span>{" "}
                    Jobs{" "}
                  </span>
                </div>
                <div>
                  <span className="home-info">
                    {" "}
                    <span className="big_number">
                      {homeJobCount[home.home.name]?.completed || 0}
                      
                    </span>{" "}
                    Finished
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
