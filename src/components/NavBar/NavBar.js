import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { useEffect, useState } from "react";
import { GetHomesByUserId } from "../../services/homeService";

export const NavBar = ({ currentUser }) => {
  const navigate = useNavigate();
  const [homeId, setHomeId] = useState(0);

  useEffect(() => {
    GetHomesByUserId(currentUser.id).then((homeObj) => {
      if (homeObj) {
        setHomeId(homeObj[0]?.homeId);
      }
    });
  }, [currentUser]);

  return (
    <ul className="navbar">
      <li className="navbar-item">
        <Link className="navbar-link" to="allHomes">
          Home
        </Link>
      </li>
      <li className="navbar-item">
        <Link className="navbar-link" to={`/myJobs/${currentUser.id}`}>
          My Jobs
        </Link>
      </li>
      <li className="navbar-item">
        <Link className="navbar-link" to="/addAJob">
          Add A Job
        </Link>
      </li>
      <li className="navbar-item">
        <Link className="navbar-link" to={`/homeDetails/${homeId}`}>
          Home Details
        </Link>
      </li>
      {localStorage.getItem("home_oh_no_user") ? (
        <li className="navbar-item navbar-logout">
          <Link
            className="navbar-link"
            to="/login"
            onClick={() => {
              localStorage.removeItem("home_oh_no_user");
              navigate("/login", { replace: true });
            }}
          >
            Logout
          </Link>
        </li>
      ) : (
        ""
      )}
    </ul>
  );
};
