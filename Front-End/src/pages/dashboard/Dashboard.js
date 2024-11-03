import { Outlet } from "react-router-dom";
import SideBar from "../../components/dashboard/SideBar";
import TopBar from "../../components/TopBar";
import "./dashboardStyle.css";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <TopBar />

      <div>
        <div className="main-dashboard-side">
          <SideBar />
        </div>
        <div className="main-dashboard-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
