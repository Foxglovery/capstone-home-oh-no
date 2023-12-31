import React, { useEffect, useState } from "react";
import "./AddAJob.css";
import { GetAllAreas, submitJob } from "../../services/jobsService";
import { GetHomesByUserId } from "../../services/homeService";
import { useNavigate } from "react-router-dom";

export const AddAJob = ({ currentUser }) => {
  const [job, setJob] = useState({
    title: "",
    description: "",
    imgUrl: "",
    budgetGoal: "",
    selectedArea: "",
    currentStep: "",
  });
  const [selectedHomeId, setSelectedHomeId] = useState(0)


  const [areas, setAreas] = useState([]);
  const [home, setHome] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    GetAllAreas().then((areaArray) => {
      setAreas(areaArray);
    });
    GetHomesByUserId(currentUser.id).then((homeArray) => {
      if (homeArray.length > 0) {
        setHome(homeArray);
        setSelectedHomeId(homeArray[0].homeId); // Use the first home's ID from the array
      }
    });
  }, [currentUser]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (job.title) {
      const newJob = {
        homeId: selectedHomeId,
        title: job.title,
        description: job.description,
        areaId: parseInt(job.selectedArea),
        startDate: Date.now(),
        endDate: false,
        budgetGoal: job.budgetGoal ? parseInt(job.budgetGoal) : 0,
        budget: 0,
        currentStep: job.currentStep,
        imgUrl: job.imgUrl,
        imgArray: [job.imgUrl]
      };
      submitJob(newJob).then(() => {
        navigate(`/myJobs/${currentUser.id}`);
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

  const handleHomeChange = (event) => {
    setSelectedHomeId(event.target.value)
  }

  return (
    <form onSubmit={handleSubmit} className="form-style-9">
      <h2>Add A Job</h2>
      <ul>
        <li>
          <input
            type="text"
            required
            name="title"
            placeholder="Enter title"
            value={job.title}
            onChange={handleInputChange}
            className="field-style field-split align-left"
          />
          <input
            type="url"
            className="field-style field-split align-right"
            name="imgUrl"
            placeholder="Enter image URL"
            value={job.imgUrl}
            onChange={handleInputChange}
          />
        </li>
        <li>
          <input
            type="text"
            className="field-style field-split align-left"
            name="budgetGoal"
            placeholder="How Much $$$"
            value={job.budgetGoal}
            onChange={handleInputChange}
          />
          <input
            className="field-style field-split align-right"
            type="text"
            required
            name="currentStep"
            placeholder="What's The First Step?"
            value={job.currentStep}
            onChange={handleInputChange}
          />
        </li>
        <li>
        <select
              id="area"
              required
              name="selectedArea"
              className="field-style field-split align-left"
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
                
            <select
              id="selectedHome"
              required
              name="selectedHome"
              className="field-style field-split align-right"
              value={selectedHomeId}
              onChange={handleHomeChange}
            >
              <option value="">-- Select Home --</option>
              {home.map((homeEntry) => (
                <option key={homeEntry.homeId} value={homeEntry.homeId}>
                  {homeEntry.home.name}
                </option>
              ))}
            </select>
        </li>
        <li>
          <textarea
            name="description"
            className="field-style"
            maxLength={84}
            placeholder="Enter description"
            value={job.description}
            onChange={handleInputChange}
          ></textarea>
        </li>
        <li>
          <button type="submit" className="button-78">Submit Job</button>
        </li>
      </ul>
    </form>
  );
};
