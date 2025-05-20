
// Used for single chat items in the sidebar
interface ChatItem {
    id: string;
    name: string;
    date: Date;
}

interface ChatMessage {
    id: string;
    type: "user" | "assistant";
    date: Date;
    content: string;
}

export type { ChatItem, ChatMessage };