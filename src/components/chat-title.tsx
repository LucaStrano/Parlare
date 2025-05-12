import React from "react"

interface ChatTitleProps {
  children: React.ReactNode;
}

export default function ChatTitle({children}: ChatTitleProps){
    return (
        <div className="h-11 w-full border-b border-gray flex flex-1 overflow-auto items-center">
            {children}
        </div>
    )
}