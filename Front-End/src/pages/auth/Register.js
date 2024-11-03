import { useState } from "react";
import "./authStyle.css";
import { useNavigate } from "react-router-dom";
import TopBar from "../../components/TopBar";
import Cookie from "cookie-universal";
import axios from "axios";
import { BASE_URL, users_URL } from "../../AxiosAPIs";

export default function Register() {
    //data state
    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState(false);

    // const userNow = useContext(User);
    const nav = useNavigate();

    //cookie
    const cookie = Cookie();

    //submit function
    async function handleSubmit(e) {
        e.preventDefault(); //prevent default form action
        try {
            const user = await axios.post(`${BASE_URL}/${users_URL}/register`, {
                username: data.username,
                email: data.email,
                password: data.password,
            });
            cookie.set("Bearer", user.data.token);
            cookie.set("user", user.data.data);
            cookie.set("refresh", user.refreshToken);
            nav("/home");
        } catch (err) {
            console.log(err);
            setError(true);
        }
    }

    return (
        <div>
            <TopBar />
            <form className="authForm" onSubmit={handleSubmit}>
                <div className="authFormInputs">
                    <h1 className="authTitle">Register Now</h1>

                    <div className="auth_Inp_Lab">
                        <input
                            id="name"
                            type="text"
                            placeholder="Enter Your Name..."
                            value={data.name}
                            onChange={(e) => {
                                setData({ ...data, username: e.target.value });
                                setError(false);
                            }}
                            className="authInput"
                            required
                            minLength="0"
                        />
                        <label htmlFor="name" className="authLabel">
                            name
                        </label>
                    </div>

                    <div className="auth_Inp_Lab">
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter Your Email..."
                            value={data.email}
                            onChange={(e) => {
                                setData({ ...data, email: e.target.value });
                                setError(false);
                            }}
                            className="authInput"
                            required
                        />
                        <label htmlFor="email" className="authLabel">
                            Email
                        </label>
                    </div>

                    <div className="auth_Inp_Lab">
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter Your Password..."
                            value={data.password}
                            onChange={(e) => {
                                setData({ ...data, password: e.target.value });
                                setError(false);
                            }}
                            className="authInput"
                            required
                            minLength="6"
                        />
                        <label htmlFor="password" className="authLabel">
                            Password
                        </label>
                    </div>

                    {error && <p style={{ color: "red" }}>data not valid</p>}

                    <button type="submit" className="authButton">
                        Register
                    </button>
                </div>
                <div className="authFormPhoto"></div>
            </form>
        </div>
    );
}
