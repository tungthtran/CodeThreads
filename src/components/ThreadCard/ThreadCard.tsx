import React from "react";
import { formattedDate } from "utils/helpers";
import { BiLike } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiChat } from "react-icons/bi";
import { BiShare } from "react-icons/bi";
import { Card, CardBody, CardFooter, CardHeader } from "@chakra-ui/card";
import { Heading, Text } from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/avatar";
import { Button, IconButton } from "@chakra-ui/button";
import { Box, Flex, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router";

interface ThreadCardProps {
    title: string;
    content: string;
    author: string;
    date: string;
    imageUrl: string;
    threadId: string;
}

const ThreadCard: React.FC<ThreadCardProps> = ({
    title,
    content,
    author,
    date,
    imageUrl,
    threadId,
}) => {
    const navigate = useNavigate();

    const handleThreadClick = () => {
        navigate(`/thread/${threadId}`, {
            state: {
                title: title,
                content: content,
                author: author,
                date: date,
            },
        });
    };

    const handleAvatarClick = () => {
        navigate("/profile");
    };

    return (
        <Card maxW="l" margin="40px 0px 40px">
            <CardHeader>
                <Flex>
                    <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                        <Avatar
                            name="Tung Tran"
                            src="https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png"
                            onClick={handleAvatarClick}
                        />
                        <Box>
                            <Heading size="sm">{title}</Heading>
                            <Text>
                                By {author} on {formattedDate(date)}
                            </Text>
                        </Box>
                    </Flex>
                    <IconButton
                        variant="ghost"
                        colorScheme="gray"
                        aria-label="See menu"
                        icon={<BsThreeDotsVertical />}
                    />
                </Flex>
            </CardHeader>
            <CardBody onClick={handleThreadClick}>
                <Text>{content}</Text>
            </CardBody>
            <Image
                objectFit="cover"
                src={imageUrl}
                alt="Thread Image"
            />
            <CardFooter justify="space-between" flexWrap="wrap">
                <Button flex="1" variant="ghost" leftIcon={<BiLike />}>
                    Like
                </Button>
                <Button flex="1" variant="ghost" leftIcon={<BiChat />}>
                    Comment
                </Button>
                <Button flex="1" variant="ghost" leftIcon={<BiShare />}>
                    Share
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ThreadCard;
