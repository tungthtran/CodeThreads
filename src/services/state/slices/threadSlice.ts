import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getThreads } from "services/api/threadService";
import { Thread } from "utils/types";

interface ThreadState {
    threads: Thread[];
    isLoading: boolean;
}

const initialState: ThreadState = {
    threads: [],
    isLoading: true,
};

export const fetchThreads = createAsyncThunk(
    "threads/fetchThreads",
    async () => {
        try {
            const threadsData = await getThreads();
            return threadsData;
        } catch (error) {
            console.error("Error fetching threads:", error);
        }
    }
);

const threadSlice = createSlice({
    name: "thread",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchThreads.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchThreads.fulfilled, (state, action) => {
                state.isLoading = false;
                state.threads = action.payload;
            })
            .addCase(fetchThreads.rejected, (state, action) => {
                console.log(action);
                state.isLoading = false;
            });
    },
});

export default threadSlice.reducer;
