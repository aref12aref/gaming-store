import {
  faSquareFacebook,
  faSquareTwitter,
  faSquareWhatsapp,
  faSquareYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "./barsStyle.css";

export default function FootBar() {
  return (
    <section className="infos">
      <div className="infos-icons">
        <FontAwesomeIcon
          icon={faSquareWhatsapp}
          className="infos-icon"
          style={{ color: "green" }}
        />
        <FontAwesomeIcon
          icon={faSquareFacebook}
          className="infos-icon"
          style={{ color: "blue" }}
        />
        <FontAwesomeIcon
          icon={faSquareYoutube}
          className="infos-icon"
          style={{ color: "red" }}
        />
        <FontAwesomeIcon
          icon={faSquareTwitter}
          className="infos-icon"
          style={{ color: "blue" }}
        />
      </div>
      <div className="infos-texts">
        <div className="infos-box">
          <h5 className="infos-title">website informations</h5>
          <Link className="infos-link">who are we</Link>
          <Link className="infos-link">privacy policy</Link>
          <Link className="infos-link">Shipping information</Link>
        </div>
        <div className="infos-box">
          <h5 className="infos-title">customers service</h5>
          <Link className="infos-link">contact</Link>
          <Link className="infos-link">guarantee</Link>
          <Link className="infos-link">tax</Link>
        </div>
        <div className="infos-box">
          <h5 className="infos-title">massages</h5>
          <p className="infos-text">be in touch with us to know the last offers and products</p>
          <input className="infos-input" type="email" placeholder="email..." />
        </div>
      </div>
    </section>
  );
}
