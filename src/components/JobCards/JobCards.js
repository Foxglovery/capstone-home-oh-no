import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./JobCards.css";
import { GetOwnersByHomeId } from "../../services/homeService";
import { BudgetProgressBar } from "../Progress/BudgetProgressBar";

export const JobCards = ({ currentUser, jobs, currentHomeId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [owners, setOwners] = useState([]);
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
    if (sortedJobs.length > 0) {
      setIsLoading(true);
    }
  }, [sortedJobs]);

  useEffect(() => {
    GetOwnersByHomeId(currentHomeId).then((ownerArray) => {
      setOwners(ownerArray);
    });
  }, [currentHomeId]);
  //can this be replaced ith a boolean
  const isHomeOwner = owners.some((owner) => owner.userId === currentUser.id);

  if (!isLoading) {
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
          <div className="job_area_div">
            <div className="job_card_area">
              <span className="underline">Area:</span> {job.area?.areaName}
            </div>
          </div>
          <div>
            <div className="job_card_start">
              <span className="underline">Started on:</span>{" "}
              {new Date(job.startDate).toLocaleDateString("en-US")}
            </div>
          </div>
          {job.currentStep && (
            <div>
              <div className="job_card_step">
                <span className="underline">To Do:</span> {job.currentStep}
              </div>
            </div>
          )}

          <div className="job_card_img">
            <img src={job.imgUrl} alt={job.title} />
          </div>
          <div className="job-card-description">
            <p>{job.description}</p>
            <BudgetProgressBar
              current={job.budget}
              goal={job.budgetGoal}
              isHomeOwner={isHomeOwner}
              owners={owners}
              currentUser={currentUser}
            />
          </div>
          {isHomeOwner ? (
            <div className="btn-container">
              <button
                className="button-78"
                onClick={() => navigate(`/updateJob/${job.id}`)}
              >
                Update Job
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      ))}
    </div>
  );
};
