import React, { useState } from 'react';
import './ThreadReply.css';
import { Button, Input } from '@chakra-ui/react';

interface ThreadReplyProps {
    onReplySubmit: (reply: string) => void;
}

const ThreadReply: React.FC<ThreadReplyProps> = ({ onReplySubmit }) => {
    const [reply, setReply] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onReplySubmit(reply);
        setReply('');
    };

    return (
        <form className="reply-form" onSubmit={handleSubmit}>
            <Input
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Write a reply ..."
            />
            <Button type="submit">Post</Button>
        </form>
    );
};

export default ThreadReply;
