import { useEffect, useRef } from "react";

function useDragger(ref: React.RefObject<HTMLDivElement | null>): void {

    const isClicked = useRef<boolean>(false)

    const coords = useRef<{
        startX: number,
        startY: number,
        lastX: number,
        lastY: number
    }>({
        startX: 0,
        startY: 0,
        lastX: 0,
        lastY: 0
    })

    useEffect(() => {
        const target = ref.current
        if (!target) throw Error("Element with given ID does not exist")

        const container = target.parentElement
        if (!container) throw Error("Target element must have a parent")

        coords.current.lastX = target.offsetLeft
        coords.current.lastY = target.offsetTop

        const onMouseDown = (e: MouseEvent) => {
            isClicked.current = true
            coords.current.startX = e.clientX
            coords.current.startY = e.clientY
        }

        const onMouseUp = () => {
            isClicked.current = false
            coords.current.lastX = target.offsetLeft
            coords.current.lastY = target.offsetTop
        }

        const onMouseMove = (e: MouseEvent) => {
            if (!isClicked.current) return

            const nextX = e.clientX - coords.current.startX + coords.current.lastX
            const nextY = e.clientY - coords.current.startY + coords.current.lastY

            target.style.top = `${nextY}px`
            target.style.left = `${nextX}px`
        }

        const onTouchStart = (e: TouchEvent) => {
            isClicked.current = true
            coords.current.startX = e.touches[0].clientX
            coords.current.startY = e.touches[0].clientY
        }

        const onTouchEnd = () => {
            isClicked.current = false
            coords.current.lastX = target.offsetLeft
            coords.current.lastY = target.offsetTop
        }

        const onTouchMove = (e: TouchEvent) => {
            if (!isClicked.current) return

            const nextX = e.touches[0].clientX - coords.current.startX + coords.current.lastX
            const nextY = e.touches[0].clientY - coords.current.startY + coords.current.lastY

            target.style.top = `${nextY}px`
            target.style.left = `${nextX}px`
        }

        target.addEventListener('mousedown', onMouseDown)
        target.addEventListener('mouseup', onMouseUp)
        container.addEventListener('mousemove', onMouseMove)
        container.addEventListener('mouseleave', onMouseUp)
        container.addEventListener('mouseup', onMouseUp)
        target.addEventListener('touchstart', onTouchStart)
        target.addEventListener('touchend', onTouchEnd)
        container.addEventListener('touchmove', onTouchMove)

        const cleanup = () => {
            target.removeEventListener('mousedown', onMouseDown)
            target.removeEventListener('mouseup', onMouseUp)
            container.removeEventListener('mousemove', onMouseMove)
            container.removeEventListener('mouseleave', onMouseUp)
            container.removeEventListener('mouseup', onMouseUp)
            target.removeEventListener('touchstart', onTouchStart)
            target.removeEventListener('touchend', onTouchEnd)
            container.removeEventListener('touchmove', onTouchMove)
        }

        return cleanup
    }, [ref])
}

export default useDragger