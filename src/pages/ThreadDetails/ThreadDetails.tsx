import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Thread, BaseThread } from "utils/types";
import ThreadReply from "components/ThreadReply";
import { getThreadReplies } from "services/api/threadService";
import { formattedDate } from "utils/helpers";
import "./ThreadDetails.css";

const ThreadDetails: React.FC = () => {
    const [replies, setReplies] = useState<BaseThread[]>([]);
    const { id } = useParams();
    const location = useLocation();
    const { title, content, author, date } = location.state as Thread;

    useEffect(() => {
        const fetchThreadReplies = async () => {
            if (!id) {
                return <div className="thread-not-found">Thread not found</div>;
            }
            try {
                const threadReplies = await getThreadReplies(id);
                setReplies(threadReplies);
            } catch (error) {
                console.error("Error fetching thread replies:", error);
            }
        };
        fetchThreadReplies();
    }, [id]);

    const handleReplySubmit = (reply: string) => {
        console.log("Reply submitted:", reply);
    };

    return (
        <div className="thread-details-container">
            <div className="thread-details">
                <h2>{title}</h2>
                <p>{content}</p>
                <div className="thread-info">
                    <span>Posted by {author}</span>
                    <span>{new Date(date).toLocaleDateString()}</span>
                </div>
            </div>
            <ThreadReply onReplySubmit={handleReplySubmit} />
            <div className="replies">
                {replies.map((reply) => (
                    <div key={reply.id} className="reply">
                        <div className="reply-content">{reply.content}</div>
                        <div className="reply-info">
                            <span>
                                {reply.author} on {formattedDate(reply.date)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ThreadDetails;
