import React, { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { SWATCHES } from '../../../constants'
import { ColorSwatch, Group } from "@mantine/core"
import { Button } from "@/components/ui/button"
import axios from 'axios'
import DraggableLatex from "@/components/DraggableLatex"
import { Slider } from "@/components/ui/slider"
import Cursor from "@/components/Cursor"
import Loader from "@/components/Loader"
import Toast from "@/components/Toast"

interface Response {
    expr: string;
    result: string;
    assign: boolean;
}

interface GeneratedResult {
    expression: string;
    answer: string;
}

const Home = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [color, setColor] = useState('rgb(255,255,255)')
    const [reset, setReset] = useState(false)
    const [result, setResult] = useState<GeneratedResult>()
    const [dictOfVars, setDictOfVars] = useState({})
    const [latexPosition, setLatexPosition] = useState({ x: 10, y: 200 })
    const [latexEx, setLatexEx] = useState<Array<{ latex: string, position: { x: number, y: number } }>>([])
    const [eraser, setEraser] = useState(false)
    const [brushSize, setBrushSize] = useState([5])
    const [isLoading, setIsLoading] = useState(false)
    const [isHidden, setIsHidden] = useState(false)
    const [isTouchDevice, setIsTouchDevice] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
    }, [])

    useEffect(() => {
        if (reset) {
            resetCanvas()
            setReset(false)
            setLatexEx([])
            setResult(undefined)
            setDictOfVars({})
        }
    }, [reset])

    useEffect(() => {
        const canvas = canvasRef.current

        if (canvas) {
            const ctx = canvas.getContext('2d')
            if (ctx) {
                canvas.width = window.innerWidth
                canvas.height = window.innerHeight - canvas.offsetTop
                ctx.lineCap = 'round'
                ctx.lineWidth = 3
            }
        }

    }, [])

    useEffect(() => {
        if (result) {
            renderLatex(result.expression, result.answer)
        }
    }, [result])

    const renderLatex = (expression: string, answer: string) => {
        const latex = `\\(\\LARGE{${expression} = ${answer}}\\)`
        const offsetY = latexEx.length * 50
        setLatexEx([...latexEx, {
            latex: latex,
            position: { x: latexPosition.x, y: latexPosition.y + offsetY }
        }])

        resetCanvas()
    }

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current

        if (canvas) {
            const ctx = canvas.getContext('2d')

            let x, y
            if (ctx) {
                ctx.beginPath()
                if ('touches' in e) {
                    const rect = canvas.getBoundingClientRect()
                    x = e.touches[0].clientX - rect.left
                    y = e.touches[0].clientY - rect.top
                }
                else {
                    x = e.nativeEvent.offsetX
                    y = e.nativeEvent.offsetY
                }
                ctx.moveTo(x, y)
                setIsDrawing(true)
            }
        }
    }

    const stopDrawing = () => {
        setIsDrawing(false)
    }

    const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return

        const canvas = canvasRef.current
        if (canvas) {
            const ctx = canvas.getContext('2d')
            if (ctx) {
                if (eraser) {
                    ctx.globalCompositeOperation = 'destination-out'
                }
                else {
                    ctx.globalCompositeOperation = 'source-over'
                }
                let x, y
                if ('touches' in e) {
                    const rect = canvas.getBoundingClientRect()
                    x = e.touches[0].clientX - rect.left
                    y = e.touches[0].clientY - rect.top
                }
                else {
                    x = e.nativeEvent.offsetX
                    y = e.nativeEvent.offsetY
                }
                ctx.lineWidth = Number(brushSize)
                ctx.strokeStyle = color
                ctx.lineTo(x, y)
                ctx.stroke()
            }
        }
    }

    const resetCanvas = () => {
        const canvas = canvasRef.current
        if (canvas) {
            const ctx = canvas.getContext('2d')
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height)
            }
        }
    }

    const sendData = async () => {
        setIsLoading(true)
        try {
            const canvas = canvasRef.current
            if (canvas) {

                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/calculate`,
                    {
                        image: canvas.toDataURL('image/png'),
                        variables: dictOfVars
                    }
                )

                const resp = await response.data

                resp.forEach((data: Response) => {
                    if (data.assign === true) {
                        setDictOfVars({
                            ...dictOfVars,
                            [data.expr]: data.result
                        })
                    }
                });

                const ctx = canvas.getContext('2d')
                const imageData = ctx!.getImageData(0, 0, canvas.width, canvas.height)
                let minX = canvas.width, minY = canvas.height, maxX = 0, maxY = 0

                for (let y = 0; y < canvas.height; y++) {
                    for (let x = 0; x < canvas.width; x++) {
                        const i = ((canvas.width * y) + x) * 4
                        if (imageData.data[i + 3] > 0) {
                            minX = Math.min(x, minX)
                            minY = Math.min(y, minY)
                            maxX = Math.max(x, maxX)
                            maxY = Math.max(y, maxY)
                        }
                    }
                }

                const centerX = (minX + maxX) / 2
                const centerY = (minY + maxY) / 2

                setLatexPosition({ x: centerX, y: centerY })

                resp.forEach((data: Response, index: number) => {
                    setTimeout(() => {
                        setResult({
                            expression: data.expr,
                            answer: data.result
                        })
                    }, (index + 1) * 1000);
                });
            }
        } catch (err) {
            console.log(err)
            setError((err as Error).message)
        } finally {
            setIsLoading(false)
            setError(null)
        }
    }

    return (
        <div className={(isTouchDevice ? "" : "cursor-none") + " canvas w-screen h-dvh font-outfit"}>
            <div className={(isHidden ? "translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100") + ` flex flex-col lg:flex-row justify-between gap-5 px-5 pt-5 pb-4 items-center fixed bottom-1 w-full select-none transition-all duration-300 ease-in-out z-10`}>
                <div className="hidden lg:flex justify-start">
                    <Button
                        onClick={() => setReset(true)}
                        className="z-20 bg-zinc-900 text-white shadow-zinc-700/50 shadow-lg hover:scale-102 cursor-pointer hover:shadow-zinc-700 transition-all duration-300"
                        variant='default'
                        color="black"
                        disabled={isLoading}
                    >
                        Reset
                    </Button>
                </div>
                <Group className="z-20 bg-zinc-900 flex justify-between p-3 rounded-lg shadow-zinc-700/50 shadow-lg items-center">
                    <div className="text-white font-bold text-center px-2 font-outfit">skrb.ai</div>
                    <div className="bg-white h-5 w-0.5 " />
                    {SWATCHES.map((swatchColor: string) => (
                        <ColorSwatch
                            key={swatchColor}
                            color={swatchColor}
                            onClick={() => {
                                setEraser(false)
                                setColor(swatchColor)
                            }}
                        />
                    ))}
                    <div className="bg-white h-5 w-0.5 " />
                    <ColorSwatch
                        color="white"
                        onClick={() => setEraser(true)}
                    >
                        <div className="h-full w-0.5 bg-red-600 rotate-45 pointer-events-none" />
                    </ColorSwatch>
                    <div className="h-10 w-40 z-20 flex items-center justify-center p-2 gap-3">
                        <Slider
                            defaultValue={[5]}
                            min={1}
                            max={30}
                            step={1}
                            className={cn("rounded-lg")}
                            rangeClassName={cn("bg-zinc-800 border-2 border-zinc-800")}
                            trackClassName={cn("bg-white")}
                            thumbClassName={cn("")}
                            onValueChange={setBrushSize}
                        />
                        <div className="bg-zinc-100 rounded-lg p-1 text-sm text-center border-2 border-zinc-500 font-medium text-zinc-900">{brushSize}</div>
                    </div>
                    <div
                        onClick={(e) => {
                            e.stopPropagation()
                            setIsHidden(true)
                        }}
                        className="material-symbols-outlined text-center text-zinc-100"
                    >
                        keyboard_arrow_down
                    </div>
                </Group>
                <div className="flex justify-between px-5 lg:p-0 w-screen lg:w-auto lg:justify-end">
                    <Button
                        onClick={() => setReset(true)}
                        className="z-20 bg-zinc-900 text-white shadow-zinc-700/50 shadow-lg hover:scale-102 cursor-pointer hover:shadow-zinc-700 transition-all duration-300 lg:hidden"
                        variant='default'
                        color="black"
                        disabled={isLoading}
                    >
                        Reset
                    </Button>
                    <Button
                        onClick={sendData}
                        className="z-20 bg-zinc-900 text-white shadow-zinc-700/50 shadow-lg hover:scale-102 cursor-pointer hover:shadow-zinc-700 transition-all duration-300"
                        variant='default'
                        color="black"
                        disabled={isLoading}
                    >
                        Calculate
                    </Button>
                </div>
            </div>
            <canvas
                ref={canvasRef}
                id="canvas"
                className="absolute top-0 left-0 h-full w-full"
                onMouseDown={startDrawing}
                onMouseOut={stopDrawing}
                onMouseUp={stopDrawing}
                onMouseMove={draw}
                onTouchStart={(e) => {
                    e.preventDefault()
                    startDrawing(e)
                }}
                onTouchEnd={(e) => {
                    e.preventDefault()
                    stopDrawing()
                }}
                onTouchMove={(e) => {
                    e.preventDefault()
                    draw(e)
                }}
            />
            {latexEx && latexEx.map((latex, _) => (
                <DraggableLatex key={_} latex={latex.latex} initialPosition={latex.position} />
            ))}
            {!isTouchDevice && <Cursor color={color} />}
            {isLoading && (
                <Loader />
            )}
            <div
                onClick={() => { setIsHidden(false) }}
                className={(!isHidden ? "translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100") + ` material-symbols-outlined text-center text-zinc-100 fixed bottom-10 right-10 p-3 rounded-full bg-zinc-900 shadow-zinc-700/50 shadow-lg select-none transition-all duration-300 ease-in-out z-10`}
            >
                keyboard_arrow_up
            </div>
            {error && (
                <Toast
                    content={error}
                    onClose={() => setError(null)}
                />
            )}
        </div>
    )
}

export default Home