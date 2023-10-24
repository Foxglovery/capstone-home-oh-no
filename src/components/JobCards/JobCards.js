import { useState } from "react";
import { Link } from "react-router-dom";
import "./JobCards.css";

export const JobCards = ({ jobs }) => {
  

  return (
    <div className="jobs-container">
      {jobs.length > 0
        ? jobs.map((job, index) => (
            <div key={index} className="job-card">
              <Link to={`/jobDetails/${job.id}`}>
                <div className="job-card-title">{job.title}</div>
              </Link>
              <div className="job-card-start">Started on: {new Date(job.startDate).toLocaleDateString("en-US")}</div>
              <div className="job-card-start">Current Step: {job.currentStep}</div>
              <div id="job_card_img">
                <img src={job.imgURL} alt={job.title} />
              </div>
              <div className="job-card-description">
                <p>{job.description}</p>
                <div className="job-card-area">Category: {job.area.areaName}</div>
                {console.log(job)}
              </div>
              {/* Add more fields here as needed */}
            </div>
          ))
        : "Loading..."}
    </div>
  );
};
