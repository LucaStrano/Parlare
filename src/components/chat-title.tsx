import React from "react"

interface ChatTitleProps {
  children: React.ReactNode;
}

export default function ChatTitle({children}: ChatTitleProps){
    return (
        <div className="h-11 w-full border-b flex overflow-hidden items-center select-none text-primary-foreground text-lg font-semibold leading-none">
            {children} {/* Chat title or App title if no chat is selected */}
        </div>
    )
}