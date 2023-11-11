import { Link, useNavigate, useParams } from "react-router-dom";
import "./HomeDetails.css";
import { useEffect, useState } from "react";
import {
  GetHomeById,
  GetHomesByUserId,
  GetOneHomeById,
} from "../../services/homeService";
import { GetJobsByHomeId, numToWord } from "../../services/jobsService";
import { Carousel } from "../Carousel/Carousel";
import { Logo } from "../Logo/Logo";

export const HomeDetails = ({ currentUser }) => {
  const { currentHomeId } = useParams();
  const [home, setHome] = useState([]);
  const [userHomes, setUserHomes] = useState([]);
  const [homeId, setHomeId] = useState(0);
  const [completeImgs, setCompleteImgs] = useState([]);
  const [finishedJobs, setFinishedJobs] = useState([]);
  const [ongoingJobs, setOngoingJobs] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    GetHomeById(currentHomeId).then((data) => {
      setHome(data);
      if (data.length > 0) {
        setHomeId(data[0]?.homeId);
      }
    });
  }, [currentHomeId]);

  //   useEffect(() => {
  //     GetOneHomeById(currentHomeId).then((data) => {
  //         console.log("detailsHome from api:", data); //debug log
  //         if (data.length > 0) {
  //             setSwitchedHomeId(data.id)
  //         }
  //     })
  //   },[])
  //uses .some to check all the objects in the array. my new darling child
  const isCurrentUserOwner = home.some(
    (homeEntry) => homeEntry.userId === currentUser.id
  );

  //this will change dependence when I select home from dropdown
  useEffect(() => {
    GetJobsByHomeId(currentHomeId).then((jobsArray) => {
      const numberOngoingJobs = jobsArray.filter((job) => !job.endDate).length;
      const stringOngoingJob = numToWord(numberOngoingJobs);
      setOngoingJobs(stringOngoingJob);
      const numberFinishedJobs = jobsArray.filter((job) => job.endDate).length;
      const stringFinishedJobs = numToWord(numberFinishedJobs);
      setFinishedJobs(stringFinishedJobs);

      const completeJobsFilter = jobsArray.filter((job) => job.endDate);
      const completeImgArray = completeJobsFilter.map((job) => job.imgUrl);
      setCompleteImgs(completeImgArray);
    });
  }, [currentHomeId, homeId]);

  useEffect(() => {
    GetHomesByUserId(currentUser.id).then((data) => {
      console.log("Home data from api", data); //debug log
      setUserHomes(data);
    });
  }, [currentUser]);

  const handleHomeChange = (selectedHomeId) => {
    navigate(`/homeDetails/${selectedHomeId}`);
  };

  return (
    <>
      <div className="main_container">
        <Logo />
        <div className="home home-container">
          {home.length > 0 ? (
            <>
              <div id="home_card">
                {/* <div><span>&#127968;</span><span>Choose Your Home</span></div> */}
                {isCurrentUserOwner && (
                  <div className=" details_dropdown">
                    <h2 className=" details_dropbtn">Select Your Home</h2>
                    <div className="details_dropdown_content">
                      {userHomes.map((homeEntry) => (
                        <a
                          key={homeEntry.homeId}
                          onClick={() => handleHomeChange(homeEntry.homeId)}
                        >
                          {homeEntry.home.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                <h2 id="home_details_card_title">
                  {home.find((h) => h.homeId === homeId)?.home.name ||
                    "Select a Home"}
                </h2>

                <div id="home_card_img">
                  <img src={home[0].home?.imgUrl} alt={home[0].home?.name} />
                </div>
                
                <div>
                  <div className="owner_chip">
                    <div className="owner_text">~Owned By~ </div>

                    <div className="owner">
                      {home
                        .map((homeEntry) => homeEntry.user?.name)
                        .join(" & ")}
                    </div>
                  </div>
                </div>

                {/* <div className="home_card_btm_wrapper">
                  <div className="details_home_jobs_container">
                    <span className="home-info">
                      Currently Working On{" "}
                      <span className="underline">{ongoingJobs}</span> Of Our
                      Jobs{" "}
                    </span>

                    <div>
                      <span className="home-info">
                        We Have Finished{" "}
                        <span className="underline">{finishedJobs}</span> Of Our
                        Jobs{" "}
                      </span>
                    </div>
                  </div>
                </div> */}
                <div className="details_home_description_container">
                  <p className="home-info details_description">
                    {home[0].home?.description}
                  </p>
                </div>
                {isCurrentUserOwner && (
                  <div className="details_btn_container">
                    <button
                      className="details_button-78"
                      onClick={() => {
                        navigate(`/updateHome/${homeId}`);
                      }}
                    >
                      Update Home
                    </button>
                    <div id="back-btn-container">
                      <span
                        onClick={() => navigate(-1)}
                        className="back"
                        title="Go Back"
                      >
                        &#8619;
                      </span>
                    </div>
                    <button
                      className="details_button-78"
                      onClick={() => {
                        navigate(`/addAHome`);
                      }}
                    >
                      Add Home
                    </button>
                  </div>
                )}
              </div>
              {completeImgs.length > 0 && (
                <div>
                  <Carousel images={completeImgs} />
                </div>
              )}
            </>
          ) : (
            //TODO: this needs to move to include the jobCard component
            "Loading..."
          )}
        </div>
      </div>
    </>
  );
};
