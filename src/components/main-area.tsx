import { Textarea } from "~/components/ui/textarea";
import { useState, ChangeEvent, useRef } from "react";
import { Send, Truck } from "lucide-react";
import { Button } from "~/components/ui/button";

export default function MainArea(){

    const [areaValue, setAreaValue] = useState("");
    const areaRef = useRef<HTMLTextAreaElement>(null);

    function handleAreaChange(event: ChangeEvent<HTMLTextAreaElement> ){
        setAreaValue(event.target.value);
        if (areaRef.current) {
            areaRef.current.style.height = "auto"; // Reset height to allow shrinking
            areaRef.current.style.height = `${areaRef.current.scrollHeight}px`;
        }
    }

    return (
        <div className="flex-1 h-full flex flex-col bg-slate-100 border border-red-500">
            <h1> main area </h1>
            <div id="input-area" className="flex flex-col mt-auto mb-4 mx-4 rounded-md shadow-md bg-white select-none">
                <Textarea
                    ref={areaRef}
                    value={areaValue} 
                    onChange={handleAreaChange} 
                    rows={1}
                    className="resize-none relative max-h-24 overflow-y-auto border-none placeholder:italic"
                    placeholder="Write Anything..."
                >
                </Textarea>
                <div onClick={() => {areaRef.current?.focus()}} className="flex flex-row justify-end">
                    <Button disabled={areaValue.trim() === ""} id="new-chat" variant="ghost" size="icon" className="h-7 w-7 m-2">
                        <Send width={22} height={22}></Send>
                    </Button>
                </div>
            </div>
        </div>
    )
}