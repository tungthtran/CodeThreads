import axios from "axios";
import { useNavigate } from "react-router-dom";
import { signUp } from "services/api/authService";
import { Button } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import "./SignUp.css";

type FormFields = {
    username: string;
    password: string;
    passwordRetype: string;
};

const SignUp: React.FC = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>();

    const handleSignUp: SubmitHandler<FormFields> = async (data) => {
        try {
            await signUp(data.username, data.password);
            alert("Signed up successfully!");
            navigate("/signin");
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
                alert(`Sign up failed: ${error}`);
            }
        }
    };

    return (
        <form className="signup-form" onSubmit={handleSubmit(handleSignUp)}>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                    {...register("username", {
                        required: "Username is required",
                    })}
                    type="text"
                    id="username"
                    name="username"
                    autoComplete="off"
                    placeholder="Enter your username"
                />
                {errors.username && (
                    <div className="error-message">
                        {errors.username.message}
                    </div>
                )}
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 8,
                            message: "Password must have at least 8 characters",
                        },
                    })}
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                />
                {errors.password && (
                    <div className="error-message">
                        {errors.password.message}
                    </div>
                )}
            </div>
            <div className="form-group">
                <label htmlFor="password">Re-enter password</label>
                <input
                    {...register("passwordRetype", {
                        required: "Retype Password is required",
                        validate: (value) => {
                            const { password } = getValues();
                            return (
                                password === value || "Passwords do not match"
                            );
                        },
                    })}
                    type="password"
                    id="passwordRetype"
                    name="passwordRetype"
                    placeholder="Re-enter your password"
                />
                {errors.passwordRetype && (
                    <div className="error-message">
                        {errors.passwordRetype.message}
                    </div>
                )}
            </div>
            <Button disabled={isSubmitting} type="submit">
                {isSubmitting ? "Loading..." : "Sign Up"}
            </Button>
        </form>
    );
};

export default SignUp;
