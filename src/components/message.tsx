import { ChatMessage } from "~/types/main-types";

export default function Message(
    {
    id,
    type,
    date,
    content
    } : ChatMessage
){
    const alignment = type === 'assistant' ? 'justify-start' : 'justify-end';
    const color = type === 'assistant' ? 'bg-muted' : 'bg-primary';
    return (
        <div className={`flex ${alignment} w-full px-4 pt-4 select-none`}>
            <div id={id} className={`${color} text-primary-foreground max-w-[75%] rounded-lg p-2 break-all select-text`}>
                {content}
            </div>
        </div>
    );
};