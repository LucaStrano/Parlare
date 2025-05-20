import { useState, ChangeEvent, useRef, KeyboardEvent } from "react";

import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import Message from "~/components/message";

import { useAtom } from "jotai";
import { chatMessagesAtom } from "~/atoms/main-atoms";

import { Send } from "lucide-react";
import { ChatMessage } from "~/types/main-types";

export default function MainArea(){

    const [chatMessages, setChatMessages] = useAtom(chatMessagesAtom);
    const [areaValue, setAreaValue] = useState("");
    const areaRef = useRef<HTMLTextAreaElement>(null);

    function handleAreaChange(event: ChangeEvent<HTMLTextAreaElement> ){

        setAreaValue(event.target.value);

        if (areaRef.current) {
            const textarea = areaRef.current;
            const previousStyleHeight = textarea.style.height;
            textarea.style.height = 'auto'; // force natural scrollHeight
            const newTargetPixelHeight = textarea.scrollHeight;

            // Restore the previous explicit pixel height or set to current offsetHeight
            // This gives a concrete starting point for the height transition
            if (previousStyleHeight && previousStyleHeight !== 'auto' && previousStyleHeight.endsWith('px')) {
                textarea.style.height = previousStyleHeight;
            } else {
                textarea.style.height = `${textarea.offsetHeight}px`;
            }
            
            // Reading offsetHeight to force reflow
            textarea.offsetHeight; 

            textarea.style.overflow = "hidden";
            setTimeout(() => {
                if (areaRef.current) {
                    textarea.style.overflowY = 'auto';
                }
            }, 110);

            requestAnimationFrame(() => {
                if (areaRef.current) { 
                    textarea.style.height = `${newTargetPixelHeight}px`;
                }
            });
        }
    }

    function handleOnKeyDown(event: KeyboardEvent<HTMLTextAreaElement>){
        if(event.key==="Enter" && !event.shiftKey){
            event.preventDefault();
            sendMessage();
        }
    }

    function sendMessage(){
        const msg = areaValue.trim();
        if (!msg) return;

        const msgObj : ChatMessage = {
            id: Date.now().toString(),
            type: "user",
            date: new Date(),
            content: msg,
        };
        setChatMessages((prev) => [ ...(prev ?? []), msgObj ]);
        setAreaValue("");
        if(areaRef.current){
            areaRef.current.style.height = "auto";
        }
    }

    return (
        <div className="flex-1 h-full flex flex-col bg-slate-100">
            <ScrollArea className="flex-auto mb-1 border border-red-500">
                {chatMessages?.map((msg) => (
                    <Message 
                        id={msg.id}
                        type={msg.type}
                        content={msg.content}
                        date={msg.date}
                    />
                ))}
                {/* <Message type="user" content="Human message test"/>     
                <Message type="assistant" content="This is a bot response, which is longer than the human response"/>  */}
            </ScrollArea>
            <div id="input-area" className="flex flex-col mt-auto mb-4 mx-4 rounded-md shadow-md bg-white select-none transition-[height] duration-75 ease-out">
                <Textarea
                    ref={areaRef}
                    value={areaValue} 
                    onChange={handleAreaChange}
                    onKeyDown={handleOnKeyDown}
                    rows={1}
                    className="resize-none mt-1 relative max-h-24 overflow-y-auto border-none placeholder:italic transition-[height] duration-100 ease-out"
                    placeholder="Wite Anything..."
                >
                </Textarea>
                <div onClick={() => {areaRef.current?.focus()}} className="flex flex-row justify-end">
                    <Button
                        onClick={sendMessage}
                        disabled={areaValue.trim() === ""}
                        id="new-chat"
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 m-2">
                        <Send width={22} height={22} className="rotate-45 -translate-x-[4px]"></Send>
                    </Button>
                </div>
            </div>
        </div>
    )
}