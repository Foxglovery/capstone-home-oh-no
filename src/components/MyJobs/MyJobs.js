import { useEffect, useState } from "react";
import {
  GetHomesByUserId,
  GetOwnersByHomeId,
} from "../../services/homeService";
import { useNavigate, useParams } from "react-router-dom";
import "./MyJobs.css";
import { GetAllAreas, GetJobsByHomeId } from "../../services/jobsService";
import { MyJobCards } from "../JobCards/MyJobCards";
import { AreaDropdown } from "../Filter/AreaDropdown";
import { Logo } from "../Logo/Logo";

export const MyJobs = ({ currentUser }) => {
  const { userId } = useParams();
  const [home, setHome] = useState([]);
  const [homeId, setHomeId] = useState(0);
  const [jobs, setJobs] = useState([]);
  const [owners, setOwners] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    GetHomesByUserId(userId).then((data) => {
      setHome(data);
      if (data.length > 0) {
        setHomeId(data[0]?.homeId);
      }
    });
  }, [userId]);

  useEffect(() => {
    GetJobsByHomeId(homeId).then((jobsArray) => {
      setJobs(jobsArray);
    });
  }, [homeId]);

  useEffect(() => {
    GetOwnersByHomeId(homeId).then((ownerArray) => {
      setOwners(ownerArray);
    });
  }, [homeId]);

  useEffect(() => {
    GetAllAreas().then((areaArray) => {
      setAreas(areaArray);
    });
  }, [currentUser]);

  useEffect(() => {
    setFilteredJobs(jobs);
  }, [jobs]);
  //can this be replaced ith a boolean
  const isHomeOwner = owners.some((owner) => owner.userId === currentUser.id);

  const handleHomeChange = (e) => {
    const selectedHomeId = e.target.value;
    setHomeId(selectedHomeId);
  };

  return (
    <>
      {isHomeOwner ? (
        <>
          <div className="main-container">
            <Logo />
            <div className="home_card_container dropdown">
              <h2 className="home_title_card dropbtn">
                {home.find((h) => h.homeId === homeId)?.home.name ||
                  "Select a Home"}
              </h2>
              <div className="dropdown-content">
                {home.map((homeEntry) => (
                  <a
                    key={homeEntry.homeId}
                    onClick={() =>
                      handleHomeChange({ target: { value: homeEntry.homeId } })
                    }
                  >
                    {homeEntry.home.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="home_card_container"></div>
            <div className="mydropdown_container">
              <div id="dropdown">
                <AreaDropdown
                  jobs={jobs}
                  areas={areas}
                  setFilteredJobs={setFilteredJobs}
                />
              </div>
            </div>
            <MyJobCards
              isHomeOwner={isHomeOwner}
              owners={owners}
              currentUser={currentUser}
              jobs={filteredJobs}
            />
          </div>
        </>
      ) : (
        <div>
          {/* TODO if user is not owner, nothing displays, replace with nav to  */}
        </div>
      )}
    </>
  );
};
