import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "services/api/authService";
import { useDispatch } from "react-redux";
import { setUser, setAccessToken } from "services/state/slices/authSlice";
import { AppDispatch } from "services/state/store";
import { Button } from "@chakra-ui/react";
import "./SignIn.css";

const SignIn: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate();

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await signIn(username, password);
            const accessToken = response?.data?.accessToken;
            dispatch(setUser(username));
            dispatch(setAccessToken(accessToken));
            alert("Signed in sucessfully!");
            navigate("/");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorResponse = error.response;
                if (!errorResponse) {
                    alert("No response received!");
                } else {
                    alert(
                        `Error status code: ${errorResponse?.status}. Details: ${errorResponse?.statusText}`
                    );
                }
            } else {
                alert(`Sign in failed: ${error}`);
            }
        }
    };

    return (
        <form className="signin-form" onSubmit={handleSignIn}>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    autoComplete="off"
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                />
            </div>
            <Link to="/signup">New to Threads? Please sign up here.</Link>
            <Button type="submit">Sign In</Button>
        </form>
    );
};

export default SignIn;
