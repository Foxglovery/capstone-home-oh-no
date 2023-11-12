import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetJobById } from "../../services/jobsService";
import { GetHomeById } from "../../services/homeService";
import "./JobDetails.css";
import { Carousel } from "../Carousel/Carousel";
import { Logo } from "../Logo/Logo";
export const JobDetails = ({ currentUser }) => {
  const [job, setJob] = useState({});
  const [homeId, setHomeId] = useState(0);
  const { jobId } = useParams();
  const [home, setHome] = useState([]);
  const [jobImgArray, setJobImageArray] = useState([]);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    GetJobById(jobId).then((data) => {
      setJob(data);
      setHomeId(data.homeId);
      setJobImageArray(data.imgArray);
    });
  }, [jobId]);

  //anytime homeId changes, fetch the new home info
  useEffect(() => {
    GetHomeById(homeId).then((homeData) => {
      console.log("jobDetailsHomeState", homeData); //debug log
      setHome(homeData);
    });
  }, [homeId]);

  const isCurrentUserOwner = home.some(
    (homeEntry) => homeEntry?.userId === currentUser.id
  );

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
        <div className="details_job">
          {/* fetch payload is specific object. To check length I make an array of the key (properties) on job and check that length! */}
          {Object.keys(job).length > 0 ? (
            <div className="job_detail_container">
              <div id="job_detail_card">
                <div id="job_card_title">
                  <h2>{job.title}</h2>
                </div>
                <div className="job_detail_info_blurb">
                  <div id="job_start">
                    Started on:{" "}
                    {new Date(job.startDate).toLocaleDateString("en-US")}
                  </div>

                  <div id="job_house">At: {job.home.name}</div>
                </div>

                <div id="job_card_img">
                  <img
                    id="myImg"
                    className="fadein"
                    onClick={openImageModal}
                    src={job.imgUrl}
                    alt={job.title}
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
                      src={job.imgUrl}
                      alt="a job"
                      className="modal_content"
                      id="img01"
                    />
                    <div id="caption">{job.description}</div>
                  </div>
                )}
                {isCurrentUserOwner && (
                  <div className="job_budget_container">
                    <div className="job_budget">
                      <span></span>
                      Currently Saved: ${job.budget} / ${job.budgetGoal}
                    </div>
                  </div>
                )}
                <div>
                  <p className="job_description">{job.description}</p>
                </div>
                <div>
                  <div className="job_step">Next Step: {job.currentStep}</div>
                </div>

                <div className="card_btm_wrapper">
                  <div className="job_topic">Category: {job.area.areaName}</div>

                  <div id="back-btn-container">
                    <span
                      onClick={() => navigate(-1)}
                      className="back"
                      title="Go Back"
                    >
                      &#8619;
                    </span>
                  </div>
                </div>
              </div>
              {jobImgArray.length > 0 && <Carousel images={jobImgArray} />}
            </div>
          ) : (
            "Loading..."
          )}
        </div>
      </div>
    </>
  );
};
