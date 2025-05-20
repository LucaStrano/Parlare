import React from "react";

interface MessageProps {
    type: "assistant" | "human";
    content: string;
}

export default function Message(
    {
    type,
    content
    } : MessageProps
){
    return (
        <div className={`flex flex-1 ${type==='assistant'? 'flex-row' : 'flex-row-reverse'} m-4`}>
            <div className="bg-red-200 w-fit max-w-[75%] rounded-md p-2">
                {content}
            </div>
        </div>
    );
};