import { Outlet, Route, Routes } from "react-router-dom";

import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar/NavBar";

import HomePage from "../components/HomePage/HomePage";
import { Welcome } from "../components/Welcome/Welcome";
import { AllHomesList } from "../components/AllHomesList/AllHomesList";
import { HomeDetails } from "../components/Home Details/HomeDetails";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

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
              
              <NavBar />
              <Outlet />
            </>
          }
        >
          <Route index element={<Welcome />} />
          {/* ALL HOMES PATH */}
          <Route path="allHomes">
           <Route index element={<AllHomesList />} />
           <Route path=":homeId" element={<HomeDetails />} />
            </Route>
             </Route>
        
      </Routes>
    </>
  );
};
