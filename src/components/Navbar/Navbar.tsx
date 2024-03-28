import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "services/state/store";
import { GoHome } from "react-icons/go";
import { FiUser } from "react-icons/fi";
import { GoSignOut } from "react-icons/go";
import { GoSignIn } from "react-icons/go";
import { IoCreateOutline } from "react-icons/io5";
import "./Navbar.css";
import CreateThreadModal from "components/CreateThreadModal/CreateThreadModal";
import { useDisclosure } from "@chakra-ui/react";

const Navbar: React.FC = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const generateSignInIcon = () => {
        return user ? <GoSignOut size={35} /> : <GoSignIn size={35} />;
    };

    return (
        <>
            <nav className="navbar">
                <Link to="/">
                    <GoHome size={35} />
                </Link>
                <IoCreateOutline size={35} onClick={onOpen}/>
                <div>Hello, {user || "stranger"}</div>
                <Link to="/profile">
                    <FiUser size={35} />
                </Link>
                <Link to="/signin">{generateSignInIcon()}</Link>
            </nav>

            <CreateThreadModal isOpen={isOpen} onClose={onClose}/>
        </>
    );
};

export default Navbar;
