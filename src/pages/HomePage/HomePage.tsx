import ThreadCard from "components/ThreadCard";
import React from "react";
import "./HomePage.css";
import { refreshAccessToken } from "services/api/authService";
import useFetchThreads from "hooks/useFetchThreads";

const HomePage: React.FC = () => {
    const threads = useFetchThreads()

    return (
        <div className="home-page">
            <button onClick={refreshAccessToken}>Refresh</button>
            {threads.map((thread) => (
                <div key={thread.id}>
                    <ThreadCard {...thread} threadId={thread.id} />
                </div>
            ))}
        </div>
    );
};

export default HomePage;
