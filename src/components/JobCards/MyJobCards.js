import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MyJobCards.css";
import { BudgetProgressBar } from "../Progress/BudgetProgressBar";

export const MyJobCards = ({ jobs, owners, isHomeOwner, currentUser }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const sortedJobs = [...jobs].sort((a, b) => {
    if (a.endDate && !b.endDate) {
      return 1;
    }
    if (b.endDate && !a.endDate) {
      return -1;
    }
    return 0;
  });

  useEffect(() => {
    // checks if jobs has been populated, if so it sets is loaded to true to render the content or not
    if (sortedJobs.length > 0) {
      setIsLoaded(true);
    }
  }, [sortedJobs]);

  if (!isLoaded) {
    return <div></div>;
  }

  return (
    <div className="jobs-container">
      {sortedJobs.map((job, index) => (
        <div key={index} className="job-card">
          {job.endDate && (
            <div className="ribbon-overlay">
              <span className="ribbon">Finished</span>
            </div>
          )}
          <Link to={`/jobDetails/${job.id}`}>
            <div className="job-card-title">{job.title}</div>
          </Link>
          <div className="myjobs_area_container">
                <div className="myjob_card_area"><span className="underline">Area:</span> {job.area?.areaName}</div>
            {console.log(job)}
          </div>
          <div>
            <div className="myJobs_card_start">
              <span className="underline">Started on:</span> {new Date(job.startDate).toLocaleDateString("en-US")}
            </div>
          </div>
          <div>
            {job.currentStep && (
              <div className="myJobs_card_step">
              <span className="underline">To Do:</span> {job.currentStep}
            </div>
            )}
            
          </div>

          <div className="job_card_img">
            <img src={job.imgUrl} alt={job.title} />
          </div>
          <div>
            <div className="myjobs_card_description">
              <p>{job.description}</p>
            </div>
            <BudgetProgressBar
              current={job.budget}
              goal={job.budgetGoal}
              owners={owners}
              isHomeOwner={isHomeOwner}
              currentUser={currentUser}
            />
            
            </div>
            

          <div className="update-btn-container">
            <button
              className="button-78"
              onClick={() => {
                navigate(`/updateJob/${job.id}`);
              }}
            >
              Update Job
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
