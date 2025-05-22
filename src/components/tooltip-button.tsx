import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { Button, type ButtonProps } from "~/components/ui/button";
import { cn } from "~/lib/utils";

// Define props specifically for TooltipButton
interface CustomTooltipButtonProps {
    tooltipText: string;
    children: React.ReactNode; // Icon for the button
    className?: string; // For additional styling on the Button
}
type TooltipButtonProps = CustomTooltipButtonProps & Omit<ButtonProps, 'children'>;


export default function TooltipButton({
    tooltipText,
    children,
    className,
    ...rest
}: TooltipButtonProps
){
    const defaultButtonVariant: ButtonProps['variant'] = "ghost";
    const defaultButtonSize: ButtonProps['size'] = "icon";
    const defaultButtonClasses = "h-7 w-7";

    let buttonContent = children;

    if (React.isValidElement(children) && (typeof children.type === 'function' || typeof children.type === 'object')) {
        buttonContent = React.cloneElement(children as React.ReactElement<any>, {
            ...children.props,
            width: children.props.width || 22, // Use passed width or default to 22
            height: children.props.height || 22, // Use passed height or default to 22
        });
    }

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant={defaultButtonVariant}
                        size={defaultButtonSize}
                        {...rest}
                        className={cn(defaultButtonClasses, className)}
                    >
                        {buttonContent}
                    </Button>
                </TooltipTrigger>
                <TooltipContent className="p-1.5">
                    <p className="leading-none text-xs text-muted-foreground">{tooltipText}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}