import { Link, useParams } from "react-router-dom";
import "./JobsFilteredByHome.css";
import { useEffect, useState } from "react";
import { GetHomeById } from "../../services/homeService";
import { GetAllAreas, GetJobsByHomeId } from "../../services/jobsService";
import { JobCards } from "../JobCards/JobCards";
import { AreaDropdown } from "../Filter/AreaDropdown";

export const JobsFilteredByHome = ({currentUser}) => {
  const { currentHomeId } = useParams();
  const [home, setHome] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [finishedJobs, setFinishedJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([])
  const [areas, setAreas] = useState([])
  useEffect(() => {
    GetHomeById(currentHomeId).then((data) => {
      console.log("HOMEDATA:", data); //debug log

      setHome(data);
    });
  }, [currentHomeId]);
  
  useEffect(() => {
    GetJobsByHomeId(currentHomeId).then((jobsArray) => {
      console.log("jobsArray from api:", jobsArray); //debug log
      

      setJobs(jobsArray);
      const numberFinishedJobs = jobsArray.filter((job) => job.endDate).length;
      setFinishedJobs(numberFinishedJobs);
    });
  }, [currentHomeId]);

  useEffect(() => {
    GetAllAreas().then((areaArray) => {
      setAreas(areaArray);
    });
  }, [currentUser]);

  useEffect(() => {
    setFilteredJobs(jobs)
  },[jobs])



  return (<>
  <div>
    <AreaDropdown areas={areas} jobs = {jobs} setFilteredJobs={setFilteredJobs} />
    </div>
    <div className="home">
      {home.length > 0 ? (
        <div id="home_card">
          <Link to={`/homeDetails/${home[0].homeId}`}>
            <div id="home_card_title">{home[0].home?.name}</div>
          </Link>
          <div id="home_card_img">
            <img src={home[0].home?.imgUrl} alt={home[0].home?.name} />
          </div>
          
          <div>
            <p className="home-info">{home[0].home?.description}</p>
          </div>
          <div>
            <span className="home-info">
              <p>
                Owners:{" "}
                {home.map((homeEntry) => homeEntry.user?.name).join(", ")}
              </p>
            </span>
          </div>
          <div className="card_btm_wrapper">
            <div className="home_card_topic">
              
            </div>
            <div>
              <span className="home-info">Ongoing Jobs:{jobs.length} </span>
            </div>
            <div>
              <span className="home-info">Finished Jobs:{finishedJobs} </span>
            </div>
            
          </div>
        </div>
      ) : (//TODO: this needs to move to include the jobCard component
        "Loading..."
      )}
    </div>
    <JobCards currentUser={currentUser} jobs = {filteredJobs}  currentHomeId = {currentHomeId}/>
  </>)
};
