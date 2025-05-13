import React from "react";
import { Input } from "~/components/ui/input";

export default function MainArea(){
    return (
        <div className="flex-1 h-full flex flex-col border border-red-500">
            <h1> main area </h1>
            <Input className="relative mt-auto mb-4 overflow-x-scroll"></Input>
        </div>
    )
}