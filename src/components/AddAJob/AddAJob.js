import React, { useEffect, useState } from "react";
import "./AddAJob.css";
import { GetAllAreas, submitJob } from "../../services/jobsService";
import { GetHomeByUserId } from "../../services/homeService";
import { useNavigate } from "react-router-dom";

export const AddAJob = ({ currentUser }) => {
  const [job, setJob] = useState({
    title: "",
    description: "",
    imageUrl: "",
    budgetGoal: 0,
    selectedArea: "",
    currentStep: ""
  });

  const [areas, setAreas] = useState([]);
  const [home, setHome] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    GetAllAreas().then((areaArray) => {
      setAreas(areaArray);
    });
    GetHomeByUserId(currentUser.id).then((homeObj) => {
      setHome(homeObj);
      console.log("homeObjLog",homeObj)//debug log
    });
  }, [currentUser.id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (job.title) {
      const newJob = {
        homeId: home[0].homeId,
        title: job.title,
        description: job.description,
        areaId: job.selectedArea,
        startDate: Date.now(),
        endDate: false,
        budgetGoal: job.budgetGoal,
        budget: 0,
        currentStep: job.currentStep,
        imageUrl: job.imageUrl
      };
      submitJob(newJob).then(() => {
        navigate(`/myJobs`);
      });
    } else {
      window.alert("Please Name Your Job");
    }
  };

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
        <h5 className="card-title">Add A Job</h5>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              placeholder="Enter title"
              value={job.title}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="imageUrl">Image URL:</label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              className="form-control"
              placeholder="Enter image URL"
              value={job.imageUrl}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
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
            <button className="form-btn btn-info" type="submit">
              Submit Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
