import { Outlet, Route, Routes } from "react-router-dom";

import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar/NavBar";


import { Welcome } from "../components/Welcome/Welcome";
import { AllHomesList } from "../components/AllHomesList/AllHomesList";
import { HomeDetails } from "../components/Home Details/HomeDetails";
import { JobsFilteredByHome } from "../components/JobsByHome/JobsFilteredByHome";
import { MyJobs } from "../components/MyJobs/MyJobs";
import { JobDetails } from "../components/JobDetails/JobDetails";
import { AddAJob } from "../components/AddAJob/AddAJob";
import { UpdateJob } from "../components/UpdateJob/UpdateJob";
import { UpdateHome } from "../components/UpdateHome/UpdateHome";
import { GetHomesByUserId } from "../services/homeService";
import { AddAHome } from "../components/AddAHome/AddAHome";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [homeId, setHomeId] = useState()

  useEffect(() => {
    const localLearningUser = localStorage.getItem("home_oh_no_user");
    const learningUserObject = JSON.parse(localLearningUser);
    setCurrentUser(learningUserObject);
  }, []);
  
  

  return (
    <>
      <Routes>
        {/* parent route */}
        <Route
          path="/"
          element={
            <>
              <NavBar currentUser = {currentUser} />
              
              <Outlet />
            </>
          }
        >
          <Route index element={<Welcome />} />

          {/* ALL HOMES PATH */}
          <Route path="allHomes">
            <Route index element={<AllHomesList />} />
          </Route>

          {/* HOME DETAILS PATH */}
          <Route path="homeDetails">
            <Route
              path=":currentHomeId"
              element={<HomeDetails currentUser={currentUser} />}
            />
          </Route>

          {/* JOBS FILTERED BY HOME PATH */}
          <Route path="homeJobs">
            <Route
              path=":currentHomeId"
              element={<JobsFilteredByHome currentUser={currentUser} />}
            />
          </Route>

          {/* MY JOBS PATH */}
          <Route path="myJobs">
            <Route
              path=":userId"
              element={<MyJobs currentUser={currentUser} />}
            />
          </Route>

          {/* JOB DETAILS PATH */}
          <Route path="jobDetails">
            <Route
              path=":jobId"
              element={<JobDetails currentUser={currentUser} />}
            />
          </Route>

          <Route path="addAJob" >
            <Route index element={<AddAJob currentUser={currentUser}/>}/>
          </Route>
          
          <Route path="updateJob">
            <Route path=":jobId" element={<UpdateJob currentUser={currentUser} />}/>
          </Route>
          <Route path="updateHome">
            <Route path=":currentHomeId" element={<UpdateHome currentUser={currentUser} />}/>
          </Route>
          <Route path="addAHome">
            <Route index element={<AddAHome currentUser={currentUser} />}/>
          </Route>

        </Route>
      </Routes>
    </>
  );
};
