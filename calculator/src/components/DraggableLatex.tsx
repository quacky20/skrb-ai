import useDragger from "@/hooks/useDragger";
import { MathJax } from "better-react-mathjax";
import { useRef } from "react";

const DraggableLatex = ({ latex, initialPosition }: { latex: string, initialPosition?: {x: number, y:number} }) => {
    const ref = useRef<HTMLDivElement>(null)
    useDragger(ref)
    return (
        <div
            ref={ref}
            className="text-white absolute p-2 select-none"
            style={{ top: initialPosition?.y, left:initialPosition?.x }}
        >
            <MathJax>{latex}</MathJax>
        </div>
    )
}

export default DraggableLatex