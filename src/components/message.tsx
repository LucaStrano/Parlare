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
            <div id={id} className="bg-red-200 w-fit max-w-[75%] rounded-md p-2">
                {content}
            </div>
        </div>
    );
};