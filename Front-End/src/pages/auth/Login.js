import { useState } from "react";
import "./authStyle.css";
import { useNavigate } from "react-router-dom";
import TopBar from "../../components/TopBar.js";
import Cookie from "cookie-universal";
import axios from "axios";
import { BASE_URL, users_URL } from "../../AxiosAPIs";

export default function Login() {
    //login data state
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });
    //error state
    const nav = useNavigate();

    //cookie
    const cookie = Cookie();

    //submit function
    async function handleSubmit(e) {
        e.preventDefault(); //prevent default form action

        try {
            const res = await axios.post(`${BASE_URL}/${users_URL}/login`, {
                email: loginData.email,
                password: loginData.password,
            });
            const user = res.data.data;
            cookie.set("Bearer", user.token);
            cookie.set("refresh", user.refreshToken);
            cookie.set("user", user);
            if (user.role === "ADMIN" || user.role === "MANAGER") {
                nav("/dashboard");
            } else {
                nav("/home");
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="authContainer d-f">
            <TopBar />

            <form className="authForm" onSubmit={handleSubmit}>
                <div className="authFormInputs">
                    <h1 className="loginTitle">Login Now</h1>

                    <div className="auth_Inp_Lab">
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter Your Email..."
                            value={loginData.email}
                            onChange={(e) =>
                                setLoginData({
                                    ...loginData,
                                    email: e.target.value,
                                })
                            }
                            className="authInput"
                            required
                        />
                        <label htmlFor="email" className="authLabel">
                            Email
                        </label>
                    </div>

                    <div className="auth_Inp_Lab">
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter Your Password..."
                            value={loginData.password}
                            onChange={(e) =>
                                setLoginData({
                                    ...loginData,
                                    password: e.target.value,
                                })
                            }
                            className="authInput"
                            required
                            minLength="6"
                        />
                        <label htmlFor="password" className="authLabel">
                            Password
                        </label>
                    </div>

                    <button type="submit" className="authButton">
                        Login
                    </button>
                </div>

                <div className="authFormPhoto"></div>
            </form>
        </div>
    );
}
