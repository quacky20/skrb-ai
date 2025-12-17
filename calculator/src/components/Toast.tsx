import { useEffect, useState } from "react"

function Toast({ content, onClose }: { content: string, onClose: () => void }) {
    const [isVisible, setIsVisible] = useState(false)
    useEffect(() => {
        if (content) {
            setIsVisible(false)
            setTimeout(() => {
                setIsVisible(true)
            }, 10);
            setTimeout(() => {
                setIsVisible(false)
                if (onClose) {
                    setTimeout(() => {
                        onClose()
                    }, 500);
                }
            }, 3000);
        }
        else {
            setIsVisible(false)
        }
    }, [content, onClose])
    return (
        <div className={`absolute top-5 left-1/2 -translate-x-1/2 mx-auto bg-zinc-900 backdrop-blur-lg border border-zinc-200/50 p-3 rounded-lg transition-all duration-500 shadow-lg shadow-zinc-700/50 select-none text-text flex gap-3 items-center text-white max-w-3/4 text-wrap ` + (isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0')}>
            <span className="material-symbols-outlined text-red-300 animate-pulse">error</span>
            <p>{content}</p>
        </div>
    )
}

export default Toast