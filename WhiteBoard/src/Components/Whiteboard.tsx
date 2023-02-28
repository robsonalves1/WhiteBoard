////import React, { useState, useRef } from 'react';

////interface WhiteboardProps {
////    width: number;
////    height: number;
////}

////const Whiteboard: React.FC<WhiteboardProps> = ({ width, height }) => {
////    const canvasRef = useRef<HTMLCanvasElement>(null);
////    const [isDrawing, setIsDrawing] = useState <boolean>(false);

////    const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
////        setIsDrawing(true);
////        const canvas = canvasRef.current;
////        if (!canvas) return;
////        const ctx = canvas.getContext('2d');
////        if (!ctx) return;
////        ctx.beginPath();
////        ctx.moveTo(event.clientX, event.clientY);
////    };

////    const stopDrawing = () => {
////        setIsDrawing(false);
////    };

////    const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
////        if (!isDrawing) return;
////        const canvas = canvasRef.current;
////        if (!canvas) return;
////        const ctx = canvas.getContext('2d');
////        if (!ctx) return;
////        ctx.lineTo(event.clientX, event.clientY);
////        ctx.stroke();
////    };

////    return (
////        <canvas
////            ref={canvasRef}
////            width={width}
////            height={height}
////            onMouseDown={startDrawing}
////            onMouseUp={stopDrawing}
////            onMouseMove={draw}
////        />
////    );
////};

////export default Whiteboard;

import React, { useState, useRef } from 'react';



interface WhiteboardProps {
    width: number;
    height: number;
    color: string;
    lineWidth: number;
    paintOrEraser: string;
    keyPressed: string;
}

const Whiteboard: React.FC<WhiteboardProps> = ({ width, height, color, lineWidth, paintOrEraser, keyPressed }) => {
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
            onMouseMove={draw}>
        </canvas>
        );
};

export default Whiteboard;