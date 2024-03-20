import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import Prism from "prismjs";
import "prismjs/components/prism-typescript";
import "prismjs/themes/prism-okaidia.css";
import { useEffect, useState } from "react";

interface CreateThreadModalProps {
    isOpen: any;
    onClose: any;
}

const CreateThreadModal: React.FC<CreateThreadModalProps> = ({isOpen, onClose}) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [code, setCode] = useState("");

    useEffect(() => {
        Prism.highlightAll();
    }, [code]);

    const handleSubmitModal = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Created thread ${title}`);
    };

    return (
        <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create a new thread</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Title</FormLabel>
                            <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Content</FormLabel>
                            <Input placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)}/>
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Code</FormLabel>
                            <Input placeholder="Code" value={code} onChange={(e) => setCode(e.target.value)}/>
                        </FormControl>

                        <div className="code-preview">
                            <h3>Preview</h3>
                            <pre>
                                <code className="language-javascript">{code}</code>
                            </pre>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleSubmitModal}>
                            Submit
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
    )
}

export default CreateThreadModal;