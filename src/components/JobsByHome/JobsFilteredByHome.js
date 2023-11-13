import { Link, useParams } from "react-router-dom";
import "./JobsFilteredByHome.css";
import { useEffect, useState } from "react";
import { GetHomeById } from "../../services/homeService";
import { GetAllAreas, GetJobsByHomeId } from "../../services/jobsService";
import { JobCards } from "../JobCards/JobCards";
import { AreaDropdown } from "../Filter/AreaDropdown";
import { Logo } from "../Logo/Logo";

export const JobsFilteredByHome = ({ currentUser }) => {
  const { currentHomeId } = useParams();
  const [home, setHome] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [areas, setAreas] = useState([]);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  
  useEffect(() => {
    GetHomeById(currentHomeId).then((data) => {
      setHome(data);
    });
  }, [currentHomeId]);

  useEffect(() => {
    GetJobsByHomeId(currentHomeId).then((jobsArray) => {
      setJobs(jobsArray);
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

  const openImageModal = () => {
    setIsImageModalVisible(true);
  };

  const closeImageModal = () => {
    setIsImageModalVisible(false);
  };

  return (
    <>
      <div className="main_container">
        <Logo />
        <div className="home">
          {home.length > 0 ? (
            <div id="home_card">
              <Link to={`/homeDetails/${home[0].homeId}`}>
                <div>
                  <div id="home_card_title">{home[0].home?.name}</div>
                </div>
              </Link>

              <div id="home_card_img">
                <img
                  id="myImg"
                  className="fadein"
                  onClick={openImageModal}
                  src={home[0].home?.imgUrl}
                  alt={home[0].home?.name}
                />
              </div>
              {isImageModalVisible && (
                <div
                  id="myModal"
                  className="modal"
                  style={{ display: isImageModalVisible ? "flex" : "none" }}
                >
                  <span
                    onClick={closeImageModal}
                    className="close"
                    title="Close Modal"
                  >
                    &times;
                  </span>
                  <img
                    src={home[0].home?.imgUrl}
                    alt={home[0].home?.name}
                    className="modal_content"
                    id="img01"
                  />
                  <div className="caption_cont"></div>
                  <div id="caption">{home[0].home?.description}</div>
                </div>
              )}

              <div>
                <div className="filtered_owner_chip">
                  <div className="filtered_owner_text">~Owned By~ </div>

                  <div>
                    {home.map((homeEntry) => homeEntry.user?.name).join(" & ")}
                  </div>
                </div>
              </div>
              <div>
                <div className="filtered_description">
                  <p className="home-info">{home[0].home?.description}</p>
                </div>
              </div>
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
