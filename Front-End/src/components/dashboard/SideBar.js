import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../barsStyle.css";
import { NavLink } from "react-router-dom";
import { links } from "./SideNavLink";

export default function SideBar() {
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "70px",
          left: "0",
          width: "100%",
          height: "100vh",
          backgroundColor: "rgba(0,0,0,0.2)",
          display: "block",
        }}
      ></div>

      <div className="sideBar pt-3">
        {links.map((item, index) => (
          <NavLink
            key={index}
            to={item.linkTo}
            className="d-flex align-items-center gap-2 sidebar-item"
            activeclassname="active"
            style={{
              padding: "8px 15px 8px 8px",
            }}
          >
            <FontAwesomeIcon icon={item.fIcon} />
            <p className="m-0 link-text">{item.text}</p>
          </NavLink>
        ))}
      </div>
    </>
  );
}
