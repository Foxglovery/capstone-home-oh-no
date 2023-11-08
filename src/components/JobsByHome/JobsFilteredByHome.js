import { Link, useParams } from "react-router-dom";
import "./JobsFilteredByHome.css";
import { useEffect, useState } from "react";
import { GetHomeById } from "../../services/homeService";
import {
  GetAllAreas,
  GetJobsByHomeId,
  numToWord,
} from "../../services/jobsService";
import { JobCards } from "../JobCards/JobCards";
import { AreaDropdown } from "../Filter/AreaDropdown";
import { Logo } from "../Logo/Logo";

export const JobsFilteredByHome = ({ currentUser }) => {
  const { currentHomeId } = useParams();
  const [home, setHome] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [finishedJobs, setFinishedJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [ongoingJobs, setOngoingJobs] = useState([]);
  const [areas, setAreas] = useState([]);
  useEffect(() => {
    GetHomeById(currentHomeId).then((data) => {
      console.log("HOMEDATA:", data); //debug log

      setHome(data);
    });
  }, [currentHomeId]);

  useEffect(() => {
    GetJobsByHomeId(currentHomeId).then((jobsArray) => {
      const numberOngoingJobs = jobsArray.filter((job) => !job.endDate).length;
      const stringOngoingJob = numToWord(numberOngoingJobs);
      setOngoingJobs(stringOngoingJob);

      setJobs(jobsArray);
      const numberFinishedJobs = jobsArray.filter((job) => job.endDate).length;
      const stringFinishedJobs = numToWord(numberFinishedJobs);
      setFinishedJobs(stringFinishedJobs);
    });
  }, [currentHomeId]);

  useEffect(() => {
    GetAllAreas().then((areaArray) => {
      setAreas(areaArray);
    });
  }, [currentUser]);

  useEffect(() => {
    setFilteredJobs(jobs);
  }, [jobs]);

  return (
    <>
      <div className="main_container">
        
        <Logo />
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
                <span className="home-info">
                  <p>
                    ~Owners~{" "}
                    <div>
                      {home
                        .map((homeEntry) => homeEntry.user?.name)
                        .join(" & ")}
                    </div>
                  </p>
                </span>
              </div>
              <div className="home-description-container">
                <p className="home-info">{home[0].home?.description}</p>
              </div>
              
              {/* <div className="card_btm_wrapper">
                <div className="home_card_topic"></div>
                <div>
                  <span className="home-info">
                    Currently Working On{" "}
                    <span className="underline">{ongoingJobs}</span> Of Our Jobs{" "}
                  </span>
                </div>
                <div>
                  <span className="home-info">
                    We Have Finished{" "}
                    <span className="underline">{finishedJobs}</span> Of Our
                    Jobs{" "}
                  </span>
                </div>
              </div> */}
            </div>
          ) : (
            //TODO: this needs to move to include the jobCard component
            "Loading..."
          )}
        </div>
        <div id="area-dropdown-container">
          <div id="dropdown">
            <AreaDropdown
            areas={areas}
            jobs={jobs}
            setFilteredJobs={setFilteredJobs}
          />
            </div>
        </div>
        <JobCards
          currentUser={currentUser}
          jobs={filteredJobs}
          currentHomeId={currentHomeId}
        />
      </div>
    </>
  );
};
