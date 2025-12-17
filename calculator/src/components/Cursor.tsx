import { useEffect, useRef } from "react"

const Cursor = ({ color }: { color: string }) => {
    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const cursor = ref.current

        const onMouseMove = (e: MouseEvent) => {
            if (cursor) {
                const maxX = window.innerWidth - cursor.offsetWidth
                const maxY = window.innerHeight - cursor.offsetHeight

                const y = Math.max(0, Math.min(e.clientY - cursor.offsetHeight / 2, maxY))
                const x = Math.max(0, Math.min(e.clientX - cursor.offsetWidth / 2, maxX))
                cursor.style.top = `${y}px`
                cursor.style.left = `${x}px`
            }

        }

        const onMouseLeave = () => {
            if (cursor) {
                cursor.style.display = 'none'
            }
        }

        const onMouseEnter = () => {
            if (cursor) {
                cursor.style.display = 'block'
            }
        }

        cursor?.parentElement?.addEventListener('mousemove', onMouseMove)
        cursor?.parentElement?.addEventListener('mouseleave', onMouseLeave)
        cursor?.parentElement?.addEventListener('mouseenter', onMouseEnter)

        return () => {
            cursor?.parentElement?.removeEventListener('mousemove', onMouseMove)
            cursor?.parentElement?.removeEventListener('mouseleave', onMouseLeave)
        }
    }, [])

    return (
        <div
            ref={ref}
            className={`border-4 h-5 w-5 fixed pointer-events-none rounded-full z-30`}
            style={{
                borderColor: color
            }}
        >

        </div>
    )
}

export default Cursor