import React from 'react';
import { RootState } from "services/state/store";
import { useSelector } from "react-redux";
import './UserProfile.css';

const UserProfile: React.FC = () => {
    const userProfile = useSelector((state: RootState) => state.userProfile);

    return (
        <div className="user-profile">
            <strong>User Profile</strong>
            <div className="user-profile-details">
                <p><strong>Name:</strong> {userProfile.fullName}</p>
                <p><strong>Email:</strong> {userProfile.email}</p>
                <p><strong>Address:</strong> {userProfile.address}</p>
                <p><strong>Phone Number:</strong> {userProfile.phoneNumber}</p>
            </div>
        </div>
    );
};

export default UserProfile;
