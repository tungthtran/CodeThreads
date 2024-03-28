import { useEffect, useState } from "react";
import { getThreads } from "services/api/threadService";
import { Thread } from "utils/types";

export default function useFetchThreads() {
    const [threads, setThreads] = useState<Thread[]>([]);

    useEffect(() => {
        const fetchThreads = async () => {
            try {
                const threadsData = await getThreads();
                setThreads(threadsData);
            } catch (error) {
                console.error("Error fetching threads:", error);
            }
        };
        fetchThreads();
    }, []);

    return threads;
}