import React, { useState } from 'react';

interface ColorPaletteProps {
    colors: string[];
    setColor: React.Dispatch<React.SetStateAction<string>>;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ colors, setColor }) => {
    // create a selector of colors

    return (
        <ul id="colors">
            {colors.map((elem: string, i: number) => (<li key={i} style={{ width: "50px", height: "50px", backgroundColor: elem }}></li>))}
        </ul>
        );
}

export default ColorPalette;