import { useEffect, useState } from "react";
import { GetHomeByUserId, GetOwnersByHomeId } from "../../services/homeService";
import { useNavigate, useParams } from "react-router-dom";
import "./MyJobs.css"
import { GetJobsByHomeId } from "../../services/jobsService";
import { JobCards } from "../JobCards/JobCards";
import { MyJobCards } from "../JobCards/MyJobCards";

export const MyJobs = ({ currentUser }) => {
  const { userId } = useParams();
  const [home, setHome] = useState([]);
  const [homeId, setHomeId] = useState(0)  
  const [jobs, setJobs] = useState([])
  const [finishedJobs, setFinishedJobs] = useState([])
  const [owners, setOwners] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    GetHomeByUserId(userId).then((data) => {
      console.log("data from api", data);//debug log
      setHome(data);
      setHomeId(data[0]?.homeId)
      
    });
    
  }, [userId]);
  
  useEffect(() => {
    GetJobsByHomeId(homeId).then((jobsArray) => {
      console.log("jobsArray", jobsArray); //debug log
      setJobs(jobsArray);
      const numberFinishedJobs = jobsArray.filter((job) => job.endDate).length;
      setFinishedJobs(numberFinishedJobs);
    });
  }, [homeId]);

  useEffect(() => {
    GetOwnersByHomeId(homeId).then((ownerArray) => {
        console.log("ownerArray", ownerArray)//debug log
        setOwners(ownerArray)
    })
  },[homeId])
//can this be replaced ith a boolean
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
          <MyJobCards isHomeOwner={isHomeOwner} currentUser={currentUser} jobs={jobs} />
        </>
      ) : (
        <div>
          {/* TODO if user is not owner, nothing displays, replace with nav to  */}
        </div>
        
      )}
    </>
  );
};
