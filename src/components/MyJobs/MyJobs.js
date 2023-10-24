import { useEffect, useState } from "react";
import { GetHomeByUserId, GetOwnersByHomeId } from "../../services/homeService";
import { useParams } from "react-router-dom";
import "./MyJobs.css"
import { GetJobsByHomeId } from "../../services/jobsService";
import { JobCards } from "../JobCards/JobCards";

export const MyJobs = ({ currentUser }) => {
  const { userId } = useParams();
  const [home, setHome] = useState([]);
  const [homeId, setHomeId] = useState(0)  
  const [jobs, setJobs] = useState([])
  const [finishedJobs, setFinishedJobs] = useState([])
  const [owners, setOwners] = useState([])
  useEffect(() => {
    GetHomeByUserId(userId).then((data) => {
      console.log("data from api", data);//debug log
      setHome(data);
      setHomeId(data[0]?.homeId)
      
    });
  }, [userId]);
  
  useEffect(() => {
    GetJobsByHomeId(homeId).then((jobsArray) => {
      console.log("jobsArray from api:", jobsArray); //debug log
      setJobs(jobsArray);
      const numberFinishedJobs = jobsArray.filter((job) => job.endDate).length;
      setFinishedJobs(numberFinishedJobs);
    });
  }, [homeId]);

  useEffect(() => {
    GetOwnersByHomeId(homeId).then((ownerArray) => {
        console.log("ownerArray from api", ownerArray)//debug log
        setOwners(ownerArray)
    })
  },[homeId])

  const isHomeOwner = owners.some(owner => owner.userId === currentUser.id)

  return (
    <>
      {isHomeOwner ? (
        <>
          <div className="home_card_container">
            <div className="home_title_card">
              <div className="home_title">{home[0]?.home.name}</div>
            </div>
          </div>
          <JobCards jobs={jobs} />
        </>
      ) : (
        <div></div>
      )}
    </>
  );
};
