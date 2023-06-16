import React, { useState } from 'react'
import Gradientslider from './BgSelect'
export default function Backgrounds() {
    const [color, setColor] = useState('#fff');
    
    return (
        <>
            <div className="w-full h-full">
                <div className="flex justify-center">
                    <h1 className="text-3xl md:text-4xl mb-[30px] uppercase tracking-wider text-center font-mono">Backgrounds</h1>
                    <h1>hello</h1>
                </div>
                <div >
                        <Gradientslider  />
                </div>
            </div>
        </>
    )
}