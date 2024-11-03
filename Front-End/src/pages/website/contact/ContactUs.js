import { useState } from "react";
import TopBar from "../../../components/TopBar";
import "./ContactusStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSquareFacebook,
    faSquareTwitter,
    faSquareWhatsapp,
    faSquareYoutube,
} from "@fortawesome/free-brands-svg-icons";

export default function ContactUs() {
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        massage: "",
    });

    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <div>
            <TopBar />

            <div className="contact">
                <div className="contact-text">
                    <h1>Contact Us</h1>
                    <br />
                    <p>Need to get in touch with us?</p>
                    <p>
                        Either fill out the form or find the department email
                        you would like to contact below
                    </p>
                    <div className="emails">
                        <p>test@gmail.com</p>
                        <p>test@gmail.com</p>
                        <p>test@gmail.com</p>
                    </div>
                    <p style={{ marginTop: "30px" }}>
                        Or you can contact us by one of this social media
                        accounts
                    </p>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "70%",
                        }}
                    >
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
                </div>

                <form
                    className="contact-form"
                    onSubmit={(e) => handleSubmit(e)}
                >
                    <label>First Name:</label>
                    <input
                        type="text"
                        placeholder="First Name..."
                        value={data.firstName}
                        onChange={(e) =>
                            setData({ ...data, firstName: e.target.value })
                        }
                    />
                    <label>Last Name:</label>
                    <input
                        type="text"
                        placeholder="Last Name..."
                        value={data.lastName}
                        onChange={(e) =>
                            setData({ ...data, lastName: e.target.value })
                        }
                    />
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Email..."
                        value={data.email}
                        onChange={(e) =>
                            setData({ ...data, email: e.target.value })
                        }
                    />
                    <label>What can we help you with?</label>
                    <textarea
                        placeholder="What can we help you with?..."
                        value={data.massage}
                        onChange={(e) =>
                            setData({ ...data, massage: e.target.value })
                        }
                    />
                    <button type="submit" className="button">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
