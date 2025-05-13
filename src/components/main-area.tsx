import React from "react";
import { Textarea } from "~/components/ui/textarea";

export default function MainArea(){
    return (
        <div className="flex-1 h-full flex flex-col border border-red-500">
            <h1> main area </h1>
            <Textarea rows={2} className="resize-none relative mt-auto mb-4"></Textarea>
        </div>
    )
}