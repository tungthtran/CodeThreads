import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "services/state/store";
import { GoHome } from "react-icons/go";
import { FiUser } from "react-icons/fi";
import { GoSignOut } from "react-icons/go";
import { GoSignIn } from "react-icons/go";
import { IoCreateOutline } from "react-icons/io5";
import "./Navbar.css";
import CreateThreadModal from "components/CreateThreadModal/CreateThreadModal";
import { useDisclosure } from "@chakra-ui/react";
import { setAccessToken, setUser } from "services/state/slices/authSlice";

const Navbar: React.FC = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch: AppDispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const generateSignInIcon = () => {
        return user ? (
            <GoSignOut size={35} onClick={handleSignOut} />
        ) : (
            <GoSignIn size={35} />
        );
    };

    const handleSignOut = () => {
        dispatch(setUser(null));
        dispatch(setAccessToken(null));
    };

    const handleCreateThreadClick = () => {
        if (user != null) {
            onOpen();
        }
    };

    return (
        <>
            <nav className="navbar">
                <Link to="/">
                    <GoHome size={35} />
                </Link>
                <IoCreateOutline size={35} onClick={handleCreateThreadClick} />
                <div>Hello, {user || "stranger"}</div>
                <Link to="/profile">
                    <FiUser size={35} />
                </Link>
                <Link to="/signin">{generateSignInIcon()}</Link>
            </nav>

            <CreateThreadModal isOpen={isOpen} onClose={onClose} />
        </>
    );
};

export default Navbar;
