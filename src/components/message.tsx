import React from "react";
import { ChatMessage } from "~/types/main-types";



export default function Message(
    {
    id,
    type,
    date,
    content
    } : ChatMessage
){
    return (
        <div className={`flex flex-1 ${type==='assistant'? 'flex-row' : 'flex-row-reverse'} m-4`}>
            <div id={id} className="bg-primary text-primary-foreground w-fit max-w-[75%] rounded-lg p-2">
                {content}
            </div>
        </div>
    );
};