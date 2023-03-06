import React, { useState, useEffect, useRef, SetStateAction } from 'react';
import Whiteboard from './Components/Whiteboard';
import './App.scss';
import './CssReset.css';
import paintbrushImg from './Img/paintbrush.png';
import eraserImg from './Img/eraser.png';
import deleteImg from './Img/delete.png';


const colors: string[] = [
    "red",
    "green",
    "blue",
    "yellow",
    "orange",
    "pink",
    "brown",
    "black"
];

function App() {
    const [widthScreen, setWidthScreen] = useState<number>(window.innerWidth);
    const [heightScreen, setHeightScreen] = useState<number>(window.innerHeight - 84);
    const [color, setColor] = useState<string>("black");
    const [lineWidth, setLineWidth] = useState<number>(1);
    const [paintOrEraser, setPaintOrEraser] = useState<string>("paint");
    const [showToast, setShowToast] = useState<boolean>(false);

    let num: number = lineWidth;
    let keyPressed: string= "";

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

    const handleToastClick = () => {
        setShowToast(true);
    };

    const handleToastClose = () => {
        setShowToast(false);
    };

    

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
            />

            <ul id="colors-palette">
                {
                    colors.map((elem: string, i: number) =>
                    (
                        <li key={i} onClick={handleColor} title={elem} style={{ width: "50px", height: "50px", backgroundColor: elem, borderRadius: "50px" }}></li>
                    ))
                }
                <li
                    key={7}
                    title="Increase or decrease the size of your brush or eraser"
                >
                    <input type="number" onChange={handleLineWidth} style={{ width: "150px", height: "50px", border: "none", textAlign: 'center', fontSize: "36px", borderRadius: "50px", marginLeft: "150px" }} value={lineWidth} />
                </li>
                <div style={{ display: "flex", columnGap: "10px"}}>

                    <button
                        title="Eraser"
                        style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "50px", height: "50px", border: "none", borderRadius: "50px", overflow: "hidden" }}
                        onClick={() => setPaintOrEraser("erase")}    
                    >
                        <img src={eraserImg} style={{ height: "90%"}} />
                    </button>
                    <button
                        title="Brush"
                        style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "50px", height: "50px", border: "none", borderRadius: "50px", overflow: "hidden"  }}
                        onClick={() => setPaintOrEraser("paint")}   
                    >
                        <img src={paintbrushImg} style={{ height: "75%" }} />
                    </button>
                    <button
                        title="Delete your draw"
                        style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "50px", height: "50px", border: "none", borderRadius: "50px", overflow: "hidden" }}
                        onClick={() => window.location.reload()}
                    >
                        <img src={deleteImg} style={{ height: "90%" }} />
                    </button>
                </div>
            </ul>            
        </div>
      );
}

export default App;