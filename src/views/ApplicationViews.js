import { Outlet, Route, Routes } from "react-router-dom";

import { useEffect, useState } from "react";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localLearningUser = localStorage.getItem("learning_user");
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
              hello world
              {/* <NavBar /> */}
              {/* <Outlet /> */}
            </>
          }
        ></Route>
      </Routes>
    </>
  );
};
