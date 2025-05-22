import { useState, ChangeEvent, useRef, KeyboardEvent, useEffect } from "react";

import { Textarea } from "~/components/ui/textarea";
import TooltipButton from "~/components/tooltip-button";
import { ScrollArea } from "~/components/ui/scroll-area";
import Message from "~/components/message";

import { useAtom } from "jotai";
import { chatMessagesAtom } from "~/atoms/main-atoms";

import { Send, ArrowDown } from "lucide-react";
import { ChatMessage } from "~/types/main-types";
import { v4 as uuidv4 } from "uuid";

export default function MainArea(){

    const [chatMessages, setChatMessages] = useAtom(chatMessagesAtom);
    const [areaValue, setAreaValue] = useState("");
    const [isScrolledUp, setIsScrolledUp] = useState(false);
    const areaRef = useRef<HTMLTextAreaElement>(null);
    const scrollAreaViewportRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollAreaViewportRef.current) {
            scrollAreaViewportRef.current.scrollTop = scrollAreaViewportRef.current.scrollHeight;
        }
    }, [chatMessages]); // set scroll position to bottom each message

    useEffect(() => {

        const viewport = scrollAreaViewportRef.current;
        if (!viewport) return;

        const checkScrollPosition = () => {

            if (!viewport) return;

            const { scrollTop, scrollHeight, clientHeight } = scrollAreaViewportRef.current;

            if (scrollHeight <= clientHeight) {
                setIsScrolledUp(false);
                return;
            }

            // how much content is hidden below the current viewport
            const hiddenContentBelow = scrollHeight - (scrollTop + clientHeight);

            setIsScrolledUp(hiddenContentBelow > scrollHeight * 0.25); // 25% threshold
        };

        viewport.addEventListener('scroll', checkScrollPosition);
        
        return () => {
            if (viewport) viewport.removeEventListener('scroll', checkScrollPosition);
        };
    }, []);

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

        const userMsg : ChatMessage = {
            id: uuidv4(),
            type: "user",
            date: new Date(),
            content: msg,
        };
        setChatMessages((prev) => [ ...(prev ?? []), userMsg ]);
        setAreaValue("");
        if(areaRef.current){
            areaRef.current.style.height = "auto";
        }
        const botMsg : ChatMessage = {
            id: Date.now().toString(),
            type: "assistant",
            date: new Date(),
            content: "This is a bot response",
        };

        setChatMessages((prev) => [ ...(prev ?? []), botMsg ]);
    }

    return (
        <div className="flex-1 flex flex-col overflow-hidden">

            <ScrollArea className="flex-auto mb-2" viewportRef={scrollAreaViewportRef}>


                <TooltipButton
                    tooltipText="Return"
                    variant="default"
                    id="return"
                    className={`absolute left-1/2 -translate-x-1/2 bottom-2 rounded-full z-50 h-9 w-9 transition-[opacity] ease-in duration-75 ${isScrolledUp ? "opacity-100" : "opacity-0"}`}
                    onClick={() => {
                        if (scrollAreaViewportRef.current) {
                            scrollAreaViewportRef.current.scrollTop = scrollAreaViewportRef.current.scrollHeight;
                        }
                        setIsScrolledUp(false);
                    }}
                    >
                        <ArrowDown />
                </TooltipButton> {/* Scroll to bottom button */}

                {chatMessages?.map((msg) => (
                    <Message key={msg.id}
                        id={msg.id}
                        type={msg.type}
                        content={msg.content}
                        date={msg.date}
                    />
                ))}
                {/* <Message type="user" content="Human message test"/>     
                <Message type="assistant" content="This is a bot response, which is longer than the human response"/>  */}
            </ScrollArea>
            <div id="input-area" className="flex flex-col mt-auto mb-4 mx-4 rounded-md border bg-card text-card-foreground shadow select-none transition-[height] duration-75 ease-out">
                <Textarea
                    ref={areaRef}
                    value={areaValue} 
                    onChange={handleAreaChange}
                    onKeyDown={handleOnKeyDown}
                    rows={1}
                    className="resize-none mt-1 relative max-h-24 overflow-y-auto border-none placeholder:italic placeholder:text-sm transition-[height] duration-100 ease-out"
                    placeholder="Write Here"
                >
                </Textarea>
                <div onClick={() => {areaRef.current?.focus()}} className="flex flex-row justify-end">
                    <TooltipButton 
                        tooltipText="Send"
                        className="m-2"
                        onClick={sendMessage}
                        disabled={areaValue.trim() === ""}
                        id="new-chat"
                    >
                        <Send className="rotate-45 -translate-x-[4px]"></Send>
                    </TooltipButton>
                </div>
            </div>
        </div>
    )
}