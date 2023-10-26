<div className="post">
      <div id="post_card">
        <div id="post_card_title">{home[0].home?.name}}</div>
        <div>
          <p className="post-info">{home[0].home?.description}</p>
        </div>
        <div>
          {/* joins my owners in one beautiful stress-free string */}
          <span className="post-info"><p>Owners: {home.map(homeEntry => homeEntry.user?.name).join(", ")}</p></span>
        </div>

        <div className="card_btm_wrapper">
          <div className="post_card_topic">
            <span>
              Posted In:{" "}
              <span className="italics"></span>
            </span>
          </div>

          <div>
            <span className="post-info">some info here</span>
          </div>

        

          
        </div>
      </div>
    </div>



this is what i had before:

<div>
          {home.length > 0 ? (
            <>
              <h1>{home[0].home?.name}</h1>
              <p>{home[0].home?.description}</p>
              {/* joins my owners in one beautiful stress-free string */}
              <p>Owners: {home.map(homeEntry => homeEntry.user?.name).join(", ")}</p>
              {/* more properties */}
            </>
          ) : (
            'Loading...'
          )}
        </div>



{/* <div className="btn-container">
            {/* if logged in user id matches the post.userId, display Edit Post  */}
            {currentUser.id === post.userId ? <button>Edit Post</button> : ""}
            {/* if logged in userid does not match, display UpSchmood btn */}
            {currentUser.id != post.userId ? (
              <button onClick={handleLike}>UpSchmoodles</button>
            ) : (
              ""
            )}
          </div> */}






          import { useEffect, useState } from "react";
          import { Link } from "react-router-dom";
          import "./JobCards.css";
          import { GetHomeByUserId } from "../../services/homeService";
          
          export const JobCards = ({ currentUser, jobs }) => {
          const [home, setHome] = useState([])
          const [userId, setUserId] = useState(0)
            useEffect(() => {
              GetHomeByUserId(currentUser.id).then((homeObj) => {
                  console.log("homebyuserobj from api", homeObj)//debug log
                  setUserId(homeObj[0].userId)
                  
              })
            },[currentUser])
            const isHomeOwner = home.some(homeObj => homeObj[0]?.userId === currentUser.id)
          
            return (
              <div className="jobs-container">
                {console.log(isHomeOwner)}
                {jobs.length > 0
                  ? jobs.map((job, index) => (
                      <div key={index} className="job-card">
                        <Link to={`/jobDetails/${job.id}`}>
                          <div className="job-card-title">{job.title}</div>
                        </Link>
                        {/* added in the * 1000; otherwise all the dates are the same from the 70's */}
                        <div className="job-card-start">Started on: {new Date(job.startDate * 1000).toLocaleDateString("en-US")}</div>
                        <div className="job-card-start">Current Step: {job.currentStep}</div>
                        <div id="job_card_img">
                          <img src={job.imgUrl} alt={job.title} />
                        </div>
                        <div className="job-card-description">
                          <p>{job.description}</p>
                          <div className="job-card-area">Category: {job.area?.areaName}</div>
                          
                        </div>
                        {/* Add more fields here as needed */}
                      </div>
                    ))
                  : "Loading..."}
              </div>
            );
          };
          
          const isHomeOwner = home[0]?.userId === currentUser.id

          {isHomeOwner && (
            <div>
              <button>Update This Job</button>
            </div>
          )}