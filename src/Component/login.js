import React, { useState } from "react";
import "../css/login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const EstateLogin = () => {
    const [formData, setFormData] = useState({
        who: "admin",
        email: "",
        password: "",
    });

    const [loginType, setLoginType] = useState("admin");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // const handleLoginSwitch = (type) => {
    //     setLoginType(type);
    //     setFormData({
    //         who: type === "admin" ? "admin" : "student",
    //         email: "",
    //         password: "",
    //     });
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post("http://localhost:8080/login", formData);
            console.log("Response:", response.data);
            const token = response.data.token;

            localStorage.setItem("authToken", token);


                localStorage.setItem("isLogin", "true");
                window.location.href = `/Home`;

        } catch (error) {
            console.error("Error logging in:", error);
            alert("Invalid credentials.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-wrap">
            <h3 className="logintitle">Skyline Hostel Management</h3>



            <form className="login-form" onSubmit={handleSubmit}>
                <div className="group">
                    <label htmlFor="email" className="label">
                        Email
                    </label>
                    <input
                        id="email"
                        type="text"
                        className="input"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="group">
                    <label htmlFor="password" className="label">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        className="input"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                {isLoading ? (
                    <div className="loading">Loading...</div>
                ) : (
                    <div className="group">
                        <input type="submit" className="button" value="Sign In" />
                    </div>
                )}
            </form>
        </div>
    );
};

export default EstateLogin;
