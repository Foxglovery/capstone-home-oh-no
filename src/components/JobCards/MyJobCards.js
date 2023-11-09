import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MyJobCards.css";
import { BudgetProgressBar } from "../Progress/BudgetProgressBar";

export const MyJobCards = ({ jobs, owners, isHomeOwner, currentUser }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();
    const sortedJobs = [...jobs].sort((a,b) => {
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

                    <div className="job-card-start">
                        Started on:{" "}
                        {new Date(job.startDate).toLocaleDateString("en-US")}
                    </div>
                    <div className="job-card-start">
                        Current Step: {job.currentStep}
                    </div>
                    <div id="job_card_img">
                        <img src={job.imgUrl} alt={job.title} />
                    </div>
                    <div className="job-card-description">
                        <p>{job.description}</p>
                        <BudgetProgressBar
                            current={job.budget}
                            goal={job.budgetGoal}
                            owners={owners}
                            isHomeOwner={isHomeOwner}
                            currentUser={currentUser}
                        />
                        <div className="job-card-area">
                            Category: {job.area?.areaName}
                        </div>
                        {console.log(job)}
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
