import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState ,useEffect} from 'react';
import { SketchPicker } from 'react-color';
import 'react-color-palette/lib/css/styles.css';
import { toast } from 'react-toastify';


const gradientsList = [
  { label: 'Purple', value: 'linear-gradient(45deg, #8B5CF6, #EC4899)' },
  { label: 'Blue', value: 'linear-gradient(45deg, #3B82F6, #2563EB)' },
  { label: 'Cyan', value: 'linear-gradient(45deg, #14B8A6, #0F9B8E)' },
  { label: 'Green', value: 'linear-gradient(45deg, #10B981, #059669)' },
  { label: 'Yellow', value: 'linear-gradient(45deg, #FBBF24, #D97706)' },
  { label: 'Red', value: 'linear-gradient(45deg, #EF4444, #DC2626)' },
  { label: 'Gray', value: 'linear-gradient(45deg, #9CA3AF, #6B7280)' },
  { label: 'Ocean', value: 'linear-gradient(45deg, #00A5FF, #0079FF)' },
  { label: 'Sunset', value: 'linear-gradient(45deg, #FF512F, #DD2476)' },
  { label: 'Emerald', value: 'linear-gradient(45deg, #2BCBBA, #20A39E)' },
  { label: 'Gold', value: 'linear-gradient(45deg, #FDC830, #F37335)' },
  { label: 'Violet', value: 'linear-gradient(45deg, #9D50BB, #6E48AA)' },
  { label: 'Mint', value: 'linear-gradient(45deg, #77E8B2, #0D98BA)' },
  { label: 'Rose', value: 'linear-gradient(45deg, #FF97B3, #FF3CAC)' },
];

const solidColors = [
  { label: 'Purple', value: '#8B5CF6' },
  { label: 'Blue', value: '#3B82F6' },
  { label: 'Cyan', value: '#14B8A6' },
  { label: 'Green', value: '#10B981' },
  { label: 'Yellow', value: '#FBBF24' },
  { label: 'Red', value: '#EF4444' },
  { label: 'Orange', value: '#F97316' },
  { label: 'Pink', value: '#EC4899' },
  { label: 'Indigo', value: '#6366F1' },
  { label: 'Lime', value: '#84CC16' },
  { label: 'Amber', value: '#F59E0B' },
  { label: 'Maroon', value: '#8B0000' },
  { label: 'Turquoise', value: '#40E0D0' },
];

export default function GradientSlider({backgroundColor}:any) {
  const [selectedGradient, setSelectedGradient] = useState(gradientsList[0].value);
  const [selectedColor, setSelectedColor] = useState('');
  const [color, setColor] = useState('#FFFFFF');


  const handleGradientClick = (value: React.SetStateAction<string>) => {
    setSelectedGradient(value);
  };


  const handleChange = (selectedColor: { hex: any; }) => {
    const hexColor = selectedColor.hex;
    setColor(hexColor);
    setSelectedColor(hexColor)
    setSelectedGradient(hexColor);
  };

  useEffect(() => {
    setSelectedGradient(backgroundColor);
  }, []);


  const handleChangeGradient = () => {
    const token = Cookies.get('access_token');
    const gradientValue = selectedGradient === 'transparent' ? color : selectedGradient;
    const body = { backgroundcolor: gradientValue };

    axios
      .post('https://api.linktyp.com/api/backgroundcolor', body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success('Background Color Changed');
          document.dispatchEvent(new Event('refreshEvent'));
        }
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSaveButtonClick = () => {
    handleChangeGradient();
  };


  
  return (
    <div className="container mx-auto">
    <div>
      <h2 className="py-10 font-mono text-xl font-semibold tracking-wider text-center uppercase">Select Background</h2>
    </div>
    <div className="block w-full gap-4 pb-10 md:flex">
      {/* Background solid color */}
      <div>
        <div>
          <h2 className="pb-5 font-semibold text-center uppercase">Solid</h2>
        </div>

        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {solidColors.map((color, index) => (
            <div
              key={index}
              className={`flex justify-center items-center ${selectedGradient === color.value ? 'border-2 border-black' : ''}`}
              onClick={() => index !== 0 && handleGradientClick(color.value)}
            >
              {index === 0 && (
                <div className="w-12 h-12 bg-blue-400 rounded-md cursor-default">
                  <label htmlFor="nameColorModal" className="w-12 px-2 py-1 text-white rounded-lg cursor-pointer mask btn btn-md">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </label>
                  <input type="checkbox" id="nameColorModal" className="hidden modal-toggle" />
                  <div className="modal">
                    <div className="flex items-center justify-end w-64 bg-current modal-box p-7">
                      <label htmlFor="nameColorModal" className="absolute btn btn-sm btn-square right-2 top-2">
                        ✕
                      </label>
                      <SketchPicker color={selectedColor} onChange={handleChange} />
                    </div>
                  </div>
                </div>
              )}
              {index !== 0 && (
                <div
                  className="w-12 h-12 transition-colors duration-300 ease-in-out rounded-md cursor-pointer hover:bg-blue-100"
                  style={{ background: color.value }}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Background gradient color */}
      <div>
        <div>
          <h2 className="pb-5 font-semibold text-center uppercase">Gradient</h2>
        </div>

        <div className="grid grid-cols-4 gap-2 pt-5 sm:grid-cols-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 md:pt-0">
          {gradientsList.map((gradient, index) => (
            <div
              key={index}
              className={`flex justify-center items-center ${selectedGradient === gradient.value ? 'border-2 border-black rounded-md' : ''}`}
              onClick={() => handleGradientClick(gradient.value)}
            >
              <div
                className="w-12 h-12 transition-colors duration-300 ease-in-out rounded-md cursor-pointer hover:bg-blue-100"
                style={{ background: gradient.value }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
    
      <div className="flex justify-center pt-10">
        <button className="w-64 tracking-widest rounded-lg btn btn-outline" onClick={handleSaveButtonClick}>Save</button>
      </div>

    <hr className="h-px my-6 bg-gray-400 border-0 " />
  </div>
  );
}
