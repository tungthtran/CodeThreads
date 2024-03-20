export interface BaseThread {
    id: string;
    content: string;
    author: string;
    date: string;
}

export interface Thread extends BaseThread {
    title: string;
    imageUrl: string;
}

export interface Message {
    author: string;
    text: string;
    timestamp: string;
}
