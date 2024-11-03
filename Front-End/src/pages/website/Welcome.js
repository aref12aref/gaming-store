import { Link } from "react-router-dom";
import "./welcomeStyle.css";

export default function Welcome() {
  return (
    <div className="welcome">
      <div className="welcome-main">
        <div className="welcome-content">
          <div className="welcome-left">
            <div className="loader">
              <h1 className="welcome-title">WELCOME</h1>
            </div>
            <p className="welcome-text">to aref gaming store</p>
          </div>
          <div className="welcome-right">
            <p className="welcome-text">Go To</p>
            <Link to={"/home"} className="welcome-link">
              HOME
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
