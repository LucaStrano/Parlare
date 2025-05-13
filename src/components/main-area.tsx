import { Textarea } from "~/components/ui/textarea";
import { useState, ChangeEvent, useRef } from "react";

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
        <div className="flex-1 h-full flex flex-col border border-red-500">
            <h1> main area </h1>
            <Textarea
                ref={areaRef}
                value={areaValue} 
                onChange={handleAreaChange} 
                rows={1}
                className="resize-none relative mt-auto mb-4 max-h-24 overflow-y-auto placeholder:italic"
                placeholder="Write Anything..."
            >
            </Textarea>
        </div>
    )
}