import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css"
export const NavBar = () => {
  const navigate = useNavigate();
  return (
    <ul className="navbar">
      <li className="navbar-item">
        <Link className="navbar-link" to="allHomes">Home</Link>
      </li>
      <li className="navbar-item">
        <Link className="navbar-link" to="">My Jobs</Link>
      </li>
      <li className="navbar-item">
        <Link className="navbar-link" to="">Add A Job</Link>
      </li>
      <li className="navbar-item">
        <Link className="navbar-link" to="">Home Details</Link>
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
