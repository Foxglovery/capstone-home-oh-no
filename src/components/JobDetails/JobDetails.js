import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetJobById } from "../../services/jobsService";
import { GetHomeById } from "../../services/homeService";

export const JobDetails = ({ currentUser }) => {
  const [job, setJob] = useState({});
  const [homeId, setHomeId] = useState(0);
  const { jobId } = useParams();
  const [home, setHome] = useState([]);

  useEffect(() => {
    GetJobById(jobId).then((data) => {
      setJob(data);
      setHomeId(data.homeId);
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

  //cat,step,homename,
  //if user is owner, display $$$
  return (
    <div className="home">
      {/* fetch payload is specific object. To check length I make an array of the key (properties) on job and check that length! */}
      {Object.keys(job).length > 0 ? (
        <div id="home_card">
          <div id="home_card_title">{job.title}</div>
          <div className="job-card-start">Started on: {new Date(job.startDate * 1000).toLocaleDateString("en-US")}</div>
          <div id="home_info">At: {job.home.name}</div>

          <div id="home_card_img">
            <img src={job.imgURL} alt={job.title} />
          </div>

          <div>
            <p className="home-info">{job.description}</p>
          </div>
          {isCurrentUserOwner && (
            <div className="job_budget_container">
              <div className="job_budget">
              Currently Saved: {job.budget} / {job.budgetGoal}
              </div>
            </div>
          )}
          <div className="card_btm_wrapper">
            <div className="home_card_topic">Category: {job.area.areaName}</div>
            <div className="home_card_topic">Next Step: {job.currentStep}</div>

          </div>
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
};
