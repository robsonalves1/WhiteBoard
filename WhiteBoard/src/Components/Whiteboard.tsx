import React, { useState, useRef, useEffect } from 'react';
import brush from '../Img/brush.png';
import eraser from '../Img/eraserCur.png';

interface WhiteboardProps {
    width: number;
    height: number;
    color: string;
    lineWidth: number;
    paintOrEraser: string;
}

const cursorIconBrush = { cursor: "url(" + brush + ") 8 29, auto" };
const cursorIconEraser = { cursor: "url(" + eraser + ") 8 29, auto" };

const Whiteboard: React.FC<WhiteboardProps> = ({ width, height, color, lineWidth, paintOrEraser }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isDrawing, setIsDrawing] = useState<boolean>(false);

    const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
        setIsDrawing(true);
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(event.clientX, event.clientY);
    }

    const stopDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
        setIsDrawing(false);
    }

    const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        if (paintOrEraser == "paint") {
            ctx.strokeStyle = color;
        } else {
            ctx.strokeStyle = "white";
            ctx.lineWidth = lineWidth + 10
        }

        ctx.lineTo(event.clientX, event.clientY);
        ctx.stroke();
    }

    return (
        <canvas
            ref={canvasRef}
            width={width}
            height={height}
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseMove={draw}
            style={
                (paintOrEraser == "paint") ? cursorIconBrush : cursorIconEraser
                 
            }>
        </canvas>
        );
};

export default Whiteboard;