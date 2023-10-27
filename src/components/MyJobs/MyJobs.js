import { useEffect, useState } from "react";
import { GetHomesByUserId, GetOwnersByHomeId } from "../../services/homeService";
import { useNavigate, useParams } from "react-router-dom";
import "./MyJobs.css"
import { GetAllAreas, GetJobsByHomeId } from "../../services/jobsService";
import { MyJobCards } from "../JobCards/MyJobCards";
import { AreaDropdown } from "../Filter/AreaDropdown";

export const MyJobs = ({ currentUser }) => {
  const { userId } = useParams();
  const [home, setHome] = useState([]);
  const [homeId, setHomeId] = useState(0)  
  const [jobs, setJobs] = useState([])
  const [owners, setOwners] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([])
  const [areas, setAreas] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    GetHomesByUserId(userId).then((data) => {
      console.log("data from api", data);//debug log
      setHome(data);
      setHomeId(data[0]?.homeId)
      
    });
    
  }, [userId]);
  
  useEffect(() => {
    GetJobsByHomeId(homeId).then((jobsArray) => {
      console.log("jobsArray", jobsArray); //debug log
      setJobs(jobsArray);
      
    });
  }, [homeId]);

  useEffect(() => {
    GetOwnersByHomeId(homeId).then((ownerArray) => {
        console.log("ownerArray", ownerArray)//debug log
        setOwners(ownerArray)
    })
  },[homeId])

  useEffect(() => {
    GetAllAreas().then((areaArray) => {
      setAreas(areaArray);
    });
  }, [currentUser]);

  useEffect(() => {
    setFilteredJobs(jobs)
  },[jobs])
//can this be replaced ith a boolean
  const isHomeOwner = owners.some(owner => owner.userId === currentUser.id)

  return (
    <>
      {isHomeOwner ? (
        <>
        <AreaDropdown jobs={jobs} areas={areas} setFilteredJobs={setFilteredJobs} />
          <div className="home_card_container">
            <div className="home_title_card">
              <div className="home_title">{home[0]?.home.name}</div>
            </div>
          </div>
          <MyJobCards isHomeOwner={isHomeOwner}  currentUser={currentUser} jobs={filteredJobs} />
        </>
      ) : (
        <div>
          {/* TODO if user is not owner, nothing displays, replace with nav to  */}
        </div>
        
      )}
    </>
  );
};
