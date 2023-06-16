import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import { TiPlus } from "react-icons/ti";
import { toast } from "react-toastify";

export default function CardStyle({ cardStyleData }: any) {
  const [cardBorder, setCardBorder] = useState(1);
  const [cardRadius, setCardRadius] = useState(0); // initialize with number
  const [cardColor, setCardColor] = useState('#FFFFFF');
  const [fontColor, setFontColor] = useState('#000000');
  const [borderColor, setBorderColor] = useState('#000000');
  const [showCardColorPicker, setShowCardColorPicker] = useState(false);
  const [showFontColorPicker, setShowFontColorPicker] = useState(false);
  const [showBorderColorPicker, setShowBorderColorPicker] = useState(false);
  const [selectedOption, setSelectedOption] = useState('fill');

  //show hide color picker








  const [containerColor, setContainerColor] = useState("#00FFFFFF")
  useEffect(() => {
    if (selectedOption === "outline") {
      setContainerColor("#00000000");
    } else {
      setContainerColor(cardColor);
    }
  }, [selectedOption, cardColor]);
  
  useEffect(() => {
    setFontColor(cardStyleData.textColor);
    setCardColor(cardStyleData.containerColor);
    let index = cardStyleData.borderColor.indexOf("#");
    if (index !== -1){
      setBorderColor(
        cardStyleData.borderColor.substring(
          index,
          cardStyleData.borderColor.length
        )
      )};
    setCardBorder(
      cardStyleData.borderColor
        .split(" ")[0]
        .substring(0, cardStyleData.borderColor.split(" ")[0].length - 2)
    );
    setCardRadius(
      cardStyleData.shape.substring(0, cardStyleData.shape.length - 2)
    );
    if (cardStyleData.containerColor === "#00000000")
      setSelectedOption("outline");
  }, []);

  console.log(cardColor)
  console.log(containerColor)


  const handleCardColorClick = () => {
    setShowCardColorPicker(!showCardColorPicker);
  };

  const handleFontColorClick = () => {
    setShowFontColorPicker(!showFontColorPicker);
  };

  const handleBorderColorClick = () => {
    setShowBorderColorPicker(!showBorderColorPicker);
  };

  const handleCardColorChange = (newColor: any) => {
    setCardColor(newColor.hex);
  };

  const handleFontColorChange = (newColor: any) => {
    setFontColor(newColor.hex);
  };

  const handleBorderColorChange = (newColor: any) => {
    setBorderColor(newColor.hex);
  };


  const handleCardRadiusChange = (e: any) => {
    setCardRadius(Number(e.target.value)); // convert to number
  };
  const handleCardBorderWidthChange = (e: any) => {
    setCardBorder(Number(e.target.value)); // convert to number
  };

  const handleCardBorderColorChange = (color: any) => {
    setBorderColor(color.hex);
  };

  const cardBorderStyle = `${cardBorder}px solid ${borderColor}`; //card width and color
  
  

  // console.log(cardRadius);
  // console.log(cardBorderStyle);
  // console.log(cardColor);



  const handleOptionChange = (option: any) => {
    setSelectedOption(option);
  };

  console.log(selectedOption)

  const token = Cookies.get('access_token');

  const handleLinkCardChange = () => {
    const containerStyleData = {
      borderColor: cardBorderStyle,
      containerColor: containerColor,
      shape: cardRadius + "px",
      textColor: fontColor
    }
    console.log(containerColor)
    axios
      .post(`https://api.linktyp.com/api/container/desgin`, containerStyleData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Card style changed");
          document.dispatchEvent(new Event('refreshEvent'))
        }
        console.log(res);

      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  return (
    <>





      <div className="justify-between block w-full gap-4 md:block">
        {/* card style */}
        <div className="w-full text-gray-700">
          {/* Header */}
          <div className="max-w-md mx-auto text-center">
            <h2 className="pb-10 text-lg font-bold tracking-wider text-gray-700 uppercase sm:text-xl">
              Select Card Style
            </h2>
          </div>

          {/* Card options */}
          <div className="flex flex-col w-full pb-10">
            {/* Placeholder card */}
            <button
              style={{
                border: `${cardBorder}px solid ${borderColor}`,
                borderRadius: `${cardRadius}px`,
                backgroundColor: `${containerColor}`,
                color: `${fontColor}`
              }}
              className="flex items-center justify-center w-full h-20 text-gray-400 btn"
            >
              <h1 className="tracking-widest uppercase">Card Style</h1>
            </button>
            {/* Card options */}
            <div className="flex pt-10 item-center">
              <div
                className={`w-1/2 text-center font-semibold tracking-widest radio-button ${selectedOption === 'fill' ? 'filled' : ''}`}
                onClick={() => handleOptionChange('fill')}
              >
                Fill
              </div>
              <div
                className={`w-1/2 text-center font-semibold tracking-widest radio-button ${selectedOption === 'outline' ? 'outlined' : ''}`}
                onClick={() => handleOptionChange('outline')}
              >
                Outline
              </div>
            </div>
            {/* card option end */}
          </div>
          <div className="flex flex-col items-center justify-around">
            <div className="w-full px-3 md:w-full">
              <h1 className="text-base font-semibold tracking-widest ">Card Radius</h1>
              <input
                type="range"
                min="0"
                max="50"
                value={cardRadius}
                className="range range-sm range-info"
                step="0.1"
                onChange={handleCardRadiusChange}
              />
            </div>
            <div className="w-full px-3 md:w-full">
              <h1 className="text-base font-semibold tracking-widest">Card Border </h1>
              <input
                type="range"
                min="0"
                max="10"
                value={cardBorder}
                className="range range-sm range-info"
                step="0.1"
                onChange={handleCardBorderWidthChange}
              />
            </div>

            <hr className="h-px my-8 bg-gray-500 border-0 " />
          </div>
        </div>

        {/* Card color */}
        <div className="flex flex-col justify-center w-full">

          {/* card color */}
          <div className="flex items-center justify-center gap-4 pb-2">
            <div>
              {/* The button to open modal */}
              <label htmlFor="my-modal-3" className="rounded-lg mask h-14 btn w-14" style={{ backgroundColor: cardColor }} onClick={handleCardColorChange}>
                <TiPlus className="text-3xl" />
              </label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="my-modal-3" className="modal-toggle" />
              <div className="modal">
                <div className="flex items-center justify-end w-64 bg-current modal-box p-7">
                  <label htmlFor="my-modal-3" className="absolute btn btn-sm btn-circle right-2 top-2">✕</label>
                  <SketchPicker color={cardColor} onChange={handleCardColorChange} />
                </div>
              </div>

            </div>
            <div className="w-full">
            <p className="w-1/3 font-semibold sm:text-xs ">Card color</p>
              <input type="text" placeholder="Card color" value={cardColor} disabled className="w-full input input-bordered" />
            </div>
          </div>
          {/* font color */}
          <div className="flex items-center justify-center gap-4 pb-2">
            <div>
              <div>
                {/* The button to open modal */}
                <label htmlFor="FontColorModal" className="rounded-lg mask h-14 btn w-14" style={{ backgroundColor: fontColor }} onClick={handleFontColorChange}>
                  <TiPlus className="text-3xl" />
                </label>

                {/* Put this part before </body> tag */}
                <input type="checkbox" id="FontColorModal" className="modal-toggle" />
                <div className="modal">
                  <div className="flex items-center justify-end w-64 bg-current modal-box p-7">
                    <label htmlFor="FontColorModal" className="absolute btn btn-sm btn-circle right-2 top-2">✕</label>
                    <SketchPicker color={fontColor} onChange={handleFontColorChange} />
                  </div>
                </div>

              </div>
            </div>
            <div className="w-full">
            <p className="w-1/3 font-semibold sm:text-xs ">Card font color</p>
              <input type="text" placeholder="Card font color" value={fontColor} disabled className="w-full input input-bordered" />
            </div>
          </div>
            {/* border color */}
          <div className="flex items-center justify-center gap-4 pb-2">
            <div>
              <div>
                {/* border color */}
                {/* The button to open modal */}
                <label htmlFor="borderColorModal" className="rounded-lg mask h-14 btn w-14" style={{ borderColor: borderColor, borderWidth: '2px', borderStyle: 'solid', backgroundColor: borderColor }} onClick={handleBorderColorChange}>
                  <TiPlus className="text-3xl" />
                </label>

                {/* Put this part before </body> tag */}
                <input type="checkbox" id="borderColorModal" className="modal-toggle" />
                <div className="modal">
                  <div className="flex items-center justify-end w-64 bg-current modal-box p-7">
                    <label htmlFor="borderColorModal" className="absolute btn btn-sm btn-circle right-2 top-2">✕</label>
                    <SketchPicker color={borderColor} onChange={handleBorderColorChange} />
                  </div>
                </div>

              </div>
            </div>
            <div className="items-center w-full ">
              <p className="w-1/3 font-semibold sm:text-xs ">Card border color</p>
              <input type="text" placeholder="Border color" disabled value={borderColor} className="w-full input input-bordered" />
              
            </div>
          </div>

        </div>
      </div>







      {/* Save button */}
      <div className="flex justify-center pt-10">
        <button className="w-64 tracking-widest rounded-lg btn btn-outline" onClick={handleLinkCardChange}>Save</button>
      </div>
      
      <hr className="h-px my-8 bg-gray-400 border-0 " />
    </>
  );
}