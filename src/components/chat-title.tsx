import React from "react"

interface ChatTitleProps {
  children: React.ReactNode;
}

export default function ChatTitle({children}: ChatTitleProps){
    return (
        <div className="h-11 w-full border-b border-gray flex overflow-hidden items-center">
            {children} {/* Chat title or App title if no chat is selected */}
        </div>
    )
}