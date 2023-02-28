import React, { useState, useEffect } from 'react';
import Whiteboard from './Components/Whiteboard';
import './App.scss';
import './CssReset.css';
import paintbrushImg from './Img/paintbrush.png';
import eraserImg from './Img/eraser.png';

//Implementações
//    - borracha img
//      - ctrl +, ctrl -, ctrl Z

const colors: string[] = [
    "red",
    "green",
    "blue",
    "yellow",
    "orange",
    "pink",
    "brown",
];

function App() {
    const [widthScreen, setWidthScreen] = useState<number>(window.innerWidth);
    const [heightScreen, setHeightScreen] = useState<number>(window.innerHeight - 84);
    const [color, setColor] = useState<string>("black");
    const [lineWidth, setLineWidth] = useState<number>(1);
    const [paintOrEraser, setPaintOrEraser] = useState<string>("paint");

    let num: number = lineWidth;
    let keyPressed: string= "0";

    useEffect(() => {
        const handleRezise = () => {
            setWidthScreen(window.innerWidth);
            setHeightScreen(window.innerHeight - 84);
        };

        window.addEventListener('resize', handleRezise);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('resize', handleRezise);
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, []);

    const handleColor = (event: React.MouseEvent<HTMLLIElement>) => {
        setColor(event.currentTarget.style.backgroundColor);
    }

    const handleLineWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLineWidth(Number(event.currentTarget.value));
    }

    const handleKeyDown = (event: KeyboardEvent) => {

        if (event.key == "+") {
            num++;
            setLineWidth(num);

        } else if (event.key == "-") {
            num--;
            setLineWidth(num);
        }
    }

    return (
        <div>
            <header className="main-header">
                <h1>Whiteboard</h1>
            </header>
            <Whiteboard
                width={widthScreen}
                height={heightScreen}
                color={color}
                lineWidth={lineWidth}
                paintOrEraser={paintOrEraser}
                keyPressed={keyPressed}
            />

            <ul id="colors-palette">
                {
                    colors.map((elem: string, i: number) =>
                    (
                        <li key={i} onClick={handleColor} style={{ width: "50px", height: "50px", backgroundColor: elem }}></li>
                    ))
                }
                <li key={7} >
                    <input type="number" onChange={handleLineWidth} style={{ width: "150px", height: "50px", border: "none", textAlign: 'center', fontSize: "36px" }} value={lineWidth}/>
                </li>
                <div>
                    <button
                        style={{ width: "60px", height: "50px", border: "none", marginRight: "10px" }}
                        onClick={() => setPaintOrEraser("erase")}    
                    >
                        <img src={eraserImg} style={{ height: "100%"}} />
                    </button>
                    <button
                        style={{ width: "60px", height: "50px", border: "none" }}
                        onClick={() => setPaintOrEraser("paint")}
                    >
                        <img src={paintbrushImg} style={{ height: "100%" }} />
                    </button>
                </div>
            </ul>
        </div>
      );
}

export default App;
