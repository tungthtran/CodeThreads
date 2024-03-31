import { useEffect, useState } from "react";
import { Thread } from "utils/types";
import useAxios from "hooks/useAxios";

export default function useFetchThreads() {
    const [threads, setThreads] = useState<Thread[]>([]);

    const axiosInstance = useAxios();

    useEffect(() => {
        const fetchThreads = async () => {
            try {
                const response = await axiosInstance.get('http://localhost:3500/threads');
                const threadsData = response.data;
                setThreads(threadsData);
            } catch (error) {
                console.error("Error fetching threads:", error);
            }
        };
        fetchThreads();
    }, []);

    return threads;
}