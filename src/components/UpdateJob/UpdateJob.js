import { useEffect, useState } from "react";
import "./UpdateJob.css";
import {
  GetAllAreas,
  GetJobById,
  submitDeleteJob,
  submitUpdateJob,
} from "../../services/jobsService";
import { GetHomesByUserId } from "../../services/homeService";
import { useNavigate, useParams } from "react-router-dom";

export const UpdateJob = ({ currentUser }) => {
  const [areas, setAreas] = useState([]);
  const [home, setHome] = useState({});
  const [currentJob, setCurrentJob] = useState({});
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [isFinishModalVisible, setIsFinishModalVisible] = useState(false)
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState({
    title: "",
    description: "",
    imgUrl: "",
    budgetGoal: "",
    budget: "",
    selectedArea: "",
    currentStep: "",
  });

  useEffect(() => {
    GetAllAreas().then((areaArray) => {
      setAreas(areaArray);
    });
    GetHomesByUserId(currentUser.id).then((homeObj) => {
      setHome(homeObj);
    });
  }, [currentUser]);

  useEffect(() => {
    GetJobById(jobId).then((currentJobData) => {
      setCurrentJob(currentJobData);
      setJob({
        title: currentJobData.title,
        description: currentJobData.description,

        //changing this from areaId: to selectedArea let the update form populate the select with the previous choice
        selectedArea: currentJobData.areaId,
        startDate: Date.now(),
        endDate: false,
        budgetGoal: currentJobData.budgetGoal,
        budget: currentJobData.budget || 0,
        currentStep: currentJobData.currentStep,
        imgUrl: currentJobData.imgUrl,
      });
    });
  }, [jobId]);

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
        budgetGoal: job.budgetGoal ? parseInt(job.budgetGoal, 10) : 0,
        budget: job.budget ? parseInt(job.budget, 10) : 0,
        currentStep: job.currentStep,
        imgUrl: job.imgUrl,
      };
      console.log("Sending this updatedJob", updatedJob); //debug log
      submitUpdateJob(updatedJob, jobId).then(() => {
        navigate(`/myJobs/${currentUser.id}`);
      });
    } else {
      window.alert("Please Select and Area");
    }
  };

  const handleFinishJob = () => {
    const finishedJob = {
      homeId: home[0].homeId,
      title: job.title,
      description: job.description,
      areaId: parseInt(job.selectedArea),
      startDate: job.startDate,
      endDate: true,
      budgetGoal: job.budgetGoal,
      budget: job.budget,
      currentStep: job.currentStep,
      imgUrl: job.imgUrl,
    };
    console.log("Sending this finishedJob", finishedJob); //debug log
    submitUpdateJob(finishedJob, jobId).then(() => {
      navigate(`/myJobs/${currentUser.id}`);
    });
  };

  const handleDeleteJob = () => {
    submitDeleteJob(jobId).then(() => {
      closeDeleteModal()
      navigate(`/myJobs/${currentUser.id}`);
    });
  };

  //when change is made, the property name specified in the form-name is given the value and set in the job state
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setJob({
      ...job,
      [name]: value,
    });
  };

  const openDeleteModal = () => {
    setIsDeleteModalVisible(true)
  }

  const closeDeleteModal = () => {
    setIsDeleteModalVisible(false)
  }

  const openFinishModal = () => {
    setIsFinishModalVisible(true)
  }

  const closeFinishModal = () => {
    setIsFinishModalVisible(false)
  }


  return (
    <div id="main_container">
      <div id="card">
        <div>
          <form onSubmit={handleSubmit}>
            <h2>Update A Job</h2>
            <ul>
              <li>
                <div id="label_title">
                  <label htmlFor="title"> Title</label>
                </div>
                <input
                  type="text"
                  required
                  id="title"
                  name="title"
                  placeholder="Enter title"
                  value={job.title}
                  onChange={handleInputChange}
                  className=""
                />
                <div id="label_imgUrl">
                  <label htmlFor="imgUrl"> Image URL</label>
                </div>
                <input
                  type="url"
                  id="imgUrl"
                  name="imgUrl"
                  placeholder="Enter image URL"
                  value={job.imgUrl}
                  onChange={handleInputChange}
                  className=""
                />
              </li>

              <li>
                <div id="label_current_step">
                  <label htmlFor="currentStep"> Next Step</label>
                </div>
                <input
                  className=""
                  type="text"
                  required
                  name="currentStep"
                  placeholder="What's The First Step?"
                  value={job.currentStep}
                  onChange={handleInputChange}
                />
                <div id="label_budget_goal">
                  <label htmlFor="budgetGoal"> Budget Goal</label>
                </div>
                <input
                  type="text"
                  className=""
                  name="budgetGoal"
                  placeholder="How Much $$$"
                  value={job.budgetGoal}
                  onChange={handleInputChange}
                />
              </li>
              <li>
                <div id="label_budget">
                  <label htmlFor="title"> Currently Saved</label>
                </div>
                <input
                  type="text"
                  className=""
                  name="budget"
                  placeholder="How Much $$$"
                  value={job.budget}
                  onChange={handleInputChange}
                />
                <div id="label_area">
                  <label htmlFor="area">Area</label>
                </div>
                <select
                  id="area"
                  required
                  name="selectedArea"
                  className=""
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
              </li>
              <li>
                <div id="label_description">
                  <label htmlFor="description">Description</label>
                </div>
                <textarea
                  name="description"
                  className="field-style"
                  maxLength={84}
                  placeholder="Enter description"
                  value={job.description}
                  onChange={handleInputChange}
                ></textarea>
              </li>
            </ul>
            {/* Here Be Buttons */}
            <div className="btn-wrapper">
              {console.log("whatIsCurrentJob", currentJob)}
              {!currentJob.endDate && (
                <button
                  className="form-btn button-79"
                  type="button"
                  onClick={openFinishModal}
                >
                  Finish Job
                </button>
                
              )}
              {isFinishModalVisible && (
                
                <div id="id02" className="modal" style={{ display: isFinishModalVisible ? 'flex': 'none' }}>
                <span
                  onClick={closeFinishModal}
                  className="close"
                  title="Close Modal"
                >
                  &times;
                </span>
                <form className="modal-content" >
                  <div className="container">
                    <h1>Finish Job</h1>
                    <p>Are you sure you want to finish out this job?</p>

                    <div className="clearfix">
                      <div id="modal-btn-container">
                      <button type="button" className="cancel-btn" onClick={closeFinishModal}>
                        Cancel
                      </button>
                      <button type="button" className="finish-btn" onClick={handleFinishJob}>
                        Finish
                      </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              )}
              <button className="form-btn button-78 " type="submit">
                Submit Job
              </button>

              <button
                className="form-btn button-80"
                type="button"
                onClick={openDeleteModal}
              >
                Delete Job
              </button>
              {isDeleteModalVisible && (
                
                <div id="id01" className="modal" style={{ display: isDeleteModalVisible ? 'flex': 'none' }}>
                <span
                  onClick={closeDeleteModal}
                  className="close"
                  title="Close Modal"
                >
                  &times;
                </span>
                <form className="modal-content" >
                  <div className="container">
                    <h1>Delete Job</h1>
                    <p>Are you sure you want to delete this job?</p>

                    <div className="clearfix">
                      <div id="modal-btn-container">
                      <button type="button" className="cancel-btn" onClick={closeDeleteModal}>
                        Cancel
                      </button>
                      <button type="button" className="delete-btn" onClick={handleDeleteJob}>
                        Delete
                      </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              )}
              
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
