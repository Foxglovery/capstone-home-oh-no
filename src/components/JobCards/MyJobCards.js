import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./JobCards.css";

export const MyJobCards = ({ jobs }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    console.log("jobs",jobs)
    // checks if jobs has been populated, if so it
    if (jobs.length > 0) {
      setIsLoaded(true)
      
    }
  },[jobs]);

  if (!isLoaded) {
    return <div></div>
  }

  return (
    <div className="jobs-container">
      {jobs.map((job, index) => (
            <div key={index} className="job-card">
              <Link to={`/jobDetails/${job.id}`}>
                <div className="job-card-title">{job.title}</div>
              </Link>
              {/* added in the * 1000; otherwise all the dates are the same from the 70's */}
              <div className="job-card-start">Started on: {new Date(job.startDate).toLocaleDateString("en-US")}</div>
              <div className="job-card-start">Current Step: {job.currentStep}</div>
              <div id="job_card_img">
                <img src={job.imgUrl} alt={job.title} />
              </div>
              <div className="job-card-description">
                <p>{job.description}</p>
                <div className="job-card-area">Category: {job.area?.areaName}</div>
                {console.log(job)}
              </div>
              <div className="update-btn-container">
                <button onClick={() => {navigate(`/updateJob/${job.id}`)}}>Update Job</button>
              </div>
            </div>
          ))}
    </div>
  );
};