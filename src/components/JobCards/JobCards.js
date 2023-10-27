import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./JobCards.css";
import { GetOwnersByHomeId } from "../../services/homeService";

export const JobCards = ({ currentUser, jobs, currentHomeId }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [owners, setOwners] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if (jobs.length > 0) {
      setIsLoading(true)
    }
  },[jobs]);

  useEffect(() => {
    GetOwnersByHomeId(currentHomeId).then((ownerArray) => {
        console.log("ownerArray", ownerArray)//debug log
        setOwners(ownerArray)
    })
  },[currentHomeId])
//can this be replaced ith a boolean
  const isHomeOwner = owners.some(owner => owner.userId === currentUser.id)

  if (!isLoading) {
    return <div></div>
  }

  return (
    <div className="jobs-container">
      {jobs.map((job, index) => (
            <div key={index} className="job-card">
              <Link to={`/jobDetails/${job.id}`}>
                <div className="job-card-title">{job.title}</div>
              </Link>
              {job.endDate ? (
                <div>~COMPLETED~</div>
              ) : ("")}
              
              <div className="job-card-start">Started on: {new Date(job.startDate).toLocaleDateString("en-US")}</div>
              <div className="job-card-start">Current Step: {job.currentStep}</div>
              <div id="job_card_img">
                <img src={job.imgUrl} alt={job.title} />
              </div>
              <div className="job-card-description">
                <p>{job.description}</p>
                <div className="job-card-area">Category: {job.area?.areaName}</div>
                {console.log("jobMapObject",job)}
              </div>
              {isHomeOwner ? (
                <div className="btn-container">
                  <button onClick={() => navigate(`/updateJob/${job.id}`)}>Update Job</button>
                </div>
              ) : ("")}
              
            </div>
          ))}
    </div>
  );
};