import React, { useState } from 'react';
import { SketchPicker } from 'react-color';

export default function Select() {
    const [cardColor, setCardColor] = useState('#FFFFFF');
    const [fontColor, setFontColor] = useState('#000000');
    const [borderColor, setBorderColor] = useState('#000000');
    const [showCardColorPicker, setShowCardColorPicker] = useState(false);
    const [showFontColorPicker, setShowFontColorPicker] = useState(false);
    const [showBorderColorPicker, setShowBorderColorPicker] = useState(false);

    const handleCardColorClick = () => {
        setShowCardColorPicker(!showCardColorPicker);
    };

    const handleFontColorClick = () => {
        setShowFontColorPicker(!showFontColorPicker);
    };

    const handleBorderColorClick = () => {
        setShowBorderColorPicker(!showBorderColorPicker);
    };

    const handleCardColorChange = (newColor:any) => {
        setCardColor(newColor.hex);
    };

    const handleFontColorChange = (newColor:any) => {
        setFontColor(newColor.hex);
    };

    const handleBorderColorChange = (newColor:any) => {
        setBorderColor(newColor.hex);
    };



    return (
        <>
            <div className="flex justify-around w-full pb-10 md:pt-10">
                <div className="avatar ">
                    <div className="w-24 border-2 border-gray-400 rounded-lg cursor-pointer mask mask-square" style={{ backgroundColor: cardColor }} onClick={handleCardColorClick}>
               
                    </div>
                    {showCardColorPicker && (
                        <div className="absolute top-0 left-0">
                            <div className="fixed top-0 bottom-0 left-0 right-0" onClick={handleCardColorClick}></div>
                            <SketchPicker color={cardColor} onChange={handleCardColorChange} />
                        </div>
                    )}
                </div>
                <div className="avatar">
                    <div className="w-24 border-2 border-gray-400 rounded-lg cursor-pointer mask mask-square" style={{ backgroundColor: fontColor  }}  onClick={handleFontColorClick}>
                        
                    </div>
                    {showFontColorPicker && (
                        <div className="absolute top-0 left-0">
                            <div className="fixed top-0 bottom-0 left-0 right-0" onClick={handleFontColorClick}></div>
                            <SketchPicker color={fontColor} onChange={handleFontColorChange} />
                        </div>
                    )}
                    
                </div>
                <div className="avatar">
                    <div className="w-24 border-2 border-gray-400 rounded-lg cursor-pointer mask mask-square" style={{ borderColor: borderColor, borderWidth: '2px', borderStyle: 'solid' }} onClick={handleBorderColorClick}>
                    {showBorderColorPicker && (
                        <div className="absolute top-0 left-0 ">
                            <div className="fixed top-0 bottom-0 left-0 right-0" onClick={handleBorderColorClick}></div>
                            <SketchPicker color={borderColor} onChange={handleBorderColorChange} />
                        </div>
                    )}
                    </div>
                </div>
                <hr className="h-px my-8 bg-gray-500 border-0 "/>
            </div>
        </>
    );
}
