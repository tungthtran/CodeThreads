import ThreadCard from "components/ThreadCard";
import React, { useEffect } from "react";
import "./HomePage.css";
// import useFetchThreads from "hooks/useFetchThreads";
import { AppDispatch, RootState } from "services/state/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchThreads } from "services/state/slices/threadSlice";

const HomePage: React.FC = () => {
    //const threads = useFetchThreads();
    const { threads, isLoading } = useSelector(
        (state: RootState) => state.thread
    );
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchThreads());
    }, []);

    return (
        <div className="home-page">
            {isLoading ? <h1>Loading...</h1> : threads.map((thread) => (
                <div key={thread.id}>
                    <ThreadCard {...thread} threadId={thread.id} />
                </div>
            ))}
        </div>
    );
};

export default HomePage;
