import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn, signUp } from "services/api/authService";
import { useDispatch } from "react-redux";
import { setUser, setAccessToken } from "services/state/slices/authSlice";
import "./SignIn.css";
import { AppDispatch } from "services/state/store";
import { Button } from "@chakra-ui/react";

const SignIn: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    const clearInputs = () => {
      setUsername("");
      setPassword("");
    }

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await signIn(username, password);
            const accessToken = response?.data?.accessToken;
            clearInputs()
            alert("Signed in sucessfully!")
            dispatch(setUser(username))
            dispatch(setAccessToken(accessToken))
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
                console.error("Sign in failed:", error);
            }
        }
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await signUp(username, password);
            console.log(response)
            clearInputs();
            alert("Signed up successfully!")
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
            console.error("Sign up failed:", error);
        }
        }
    };

    return (
        <div className="signin-container">
            <form className="signin-form">
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        autoComplete='off'
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
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
                <div className="button-group">
                    <Button onClick={handleSignIn} colorScheme="telegram">
                        Sign In
                    </Button>
                    <Button onClick={handleSignUp} colorScheme="twitter">
                        Sign Up
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SignIn;
