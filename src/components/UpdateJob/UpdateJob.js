import { useEffect, useState } from "react";
import "./UpdateJob.css";
import { GetAllAreas, GetJobById, submitUpdateJob } from "../../services/jobsService";
import { GetHomeByUserId } from "../../services/homeService";
import { useNavigate, useParams } from "react-router-dom";

export const UpdateJob = ({ currentUser }) => {
  const [areas, setAreas] = useState([]);
  const [home, setHome] = useState({});
  const {jobId} = useParams()
  const navigate = useNavigate();
  const [job, setJob] = useState({
    title: "",
    description: "",
    imgUrl: "",
    budgetGoal: 0,
    selectedArea: "",
    currentStep: "",
  });

  useEffect(() => {
    GetAllAreas().then((areaArray) => {
      setAreas(areaArray);
    });
    GetHomeByUserId(currentUser.id).then((homeObj) => {
      setHome(homeObj);
    });
  }, [currentUser]);

  useEffect(() => {
    GetJobById(jobId).then((currentJobData) => {
      setJob({
        
        title: currentJobData.title,
        description: currentJobData.description,
        // TODO areaId is a string
        //changing this from areaId: to selectedArea let the update form populate the select with the previous choice
        selectedArea: currentJobData.areaId,
        startDate: Date.now(),
        endDate: false,
        budgetGoal: currentJobData.budgetGoal,
        budget: 0,
        currentStep: currentJobData.currentStep,
        imgUrl: currentJobData.imgUrl
      })
    })
  },[jobId])

  const handleSubmit = (event) => {
    event.preventDefault();
    if (job.selectedArea) {
        const updatedJob = {
        homeId: home[0].homeId,
        title: job.title,
        description: job.description,
        areaId: parseInt(job.selectedArea),
        startDate: Date.now(),
        endDate: false,
        budgetGoal: job.budgetGoal,
        budget: 0,
        currentStep: job.currentStep,
        imgUrl: job.imgUrl
        };
        submitUpdateJob(updatedJob, jobId).then(() => {
            navigate(`/myJobs/${currentUser.id}`)
        })
    } else {
        window.alert("Please Select and Area")
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setJob({
      ...job,
      [name]: value,
    });
  };

  return (
    <div className="card">
    <div className="card-body">
      <h5 className="card-title">Update Job</h5>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            required
            name="title"
            className="form-control"
            placeholder="Enter title"
            value={job.title}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="imgUrl">Image URL:</label>
          <input
            type="text"
            id="imgUrl"
            name="imgUrl"
            className="form-control"
            placeholder="Enter image URL"
            value={job.imgUrl}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            required
            id="description"
            name="description"
            className="form-control"
            placeholder="Enter description"
            value={job.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="budgetGoal">Budget Goal</label>
          <input
            type="text"
            id="budgetGoal"
            name="budgetGoal"
            className="form-control"
            placeholder="How Much $$$"
            value={job.budgetGoal}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="currentStep">First Step</label>
          <input
            type="text"
            required
            id="currentStep"
            name="currentStep"
            className="form-control"
            placeholder="What's The First Step?"
            value={job.currentStep}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="area">Select an Area:</label>
          <select
            id="area"
            required
            name="selectedArea"
            className="form-control"
            value={job.selectedArea}
            onChange={handleInputChange}
          >
            <option value="">-- Select Area --</option>
            {areas.map((area, index) => (
              <option key={index} value={area.id}>
                {area.areaName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <button className="form-btn btn-info" type="submit" >
            Submit Job
          </button>
        </div>
      </form>
    </div>
  </div>
  )
};