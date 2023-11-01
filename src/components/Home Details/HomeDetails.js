import { Link, useNavigate, useParams } from "react-router-dom";
import "./HomeDetails.css";
import { useEffect, useState } from "react";
import { GetHomeById } from "../../services/homeService";
import { GetJobsByHomeId, numToWord } from "../../services/jobsService";

export const HomeDetails = ({ currentUser }) => {
  const { currentHomeId } = useParams();
  const [home, setHome] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [finishedJobs, setFinishedJobs] = useState([]);
  const [ongoingJobs, setOngoingJobs] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    GetHomeById(currentHomeId).then((data) => {
      console.log("data from api:", data); //debug log

      setHome(data);
    });
  }, [currentHomeId]);
  //uses .some to check all the objects in the array. my new darling child
  const isCurrentUserOwner = home.some(
    (homeEntry) => homeEntry.userId === currentUser.id
  );

  useEffect(() => {
    GetJobsByHomeId(currentHomeId).then((jobsArray) => {
      const numberOngoingJobs = jobsArray.filter((job) => !job.endDate).length
      const stringOngoingJob = numToWord(numberOngoingJobs)
      setOngoingJobs(stringOngoingJob)
      
      setJobs(jobsArray);
      
      const numberFinishedJobs = jobsArray.filter((job) => job.endDate).length;
      const stringFinishedJobs = numToWord(numberFinishedJobs)
      setFinishedJobs(stringFinishedJobs);
    });
  }, [currentHomeId]);

  return (
    <div className="home">
  {home.length > 0 ? (
    <div id="home_card">
      <div id="home_card_title">{home[0].home?.name}</div>
      <div id="home_card_img">
        <img src={home[0].home?.imgUrl} alt={home[0].home?.name} />
      </div>
      <div className="home-info-wrapper">
        <Link to={`/homeJobs/${home[0]?.homeId}`}></Link>
        <div>
          <p className="home-info">{home[0].home?.description}</p>
        </div>
        <div>
          <span className="home-info">
            Owners:{" "}
            {home.map((homeEntry) => homeEntry.user?.name).join(", ")}
          </span>
        </div>
        <div className="card_btm_wrapper">
          <div className="home_card_topic"></div>
          <div>
          <span className="home-info">Currently Working On <span className="underline">{ongoingJobs}</span> Of Our Jobs </span>
          </div>
          <div>
          <span className="home-info">We Have Finished <span className="underline">{finishedJobs}</span> Of Our Jobs </span>
          </div>
        </div>
        {isCurrentUserOwner && (
          <div className="btn-container">
            <button onClick={() => {
              navigate(`/updateHome/${home[0]?.homeId}`)
            }}>Change Something About Your Home</button>
          </div>
        )}
      </div>
    </div>
  ) : (
    "Loading..."
  )}
</div>

  );
};
