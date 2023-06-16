import { Color, ColorPicker } from "react-color-palette";
import Themes from "./modules/ThemeSelect";
import Backgrounds from "./modules/Backgrounds";
import CardStyle from "./modules/CardStyle";
import Gradientslider from "./modules/BgSelect";
import Test from "./modules/CardStyle";
import Select from "./modules/ChooseColor";
import Fonts from "./modules/FontSelect";
import { log } from "console";
import EditProfile from "./modules/EditProfile";
import ProductCardSkeleton from "./modules/ProductcardStyle";

export default function Appearance({getAllData}:any) {
  
  return (
    <>
      <div className="flex items-center justify-center w-full pb-5">
       <div className="flex flex-col items-center w-full px-3 md:w-4/5">
        <div className="w-full">
          <Themes />
        </div>
        <div className="flex flex-col justify-center w-full">
          <Gradientslider backgroundColor={getAllData?.data[0]?.backgroundColor} />
        </div>
        <div className="flex flex-col justify-center w-full">
          <CardStyle cardStyleData={getAllData?.data[0]?.container} />
        </div>
        <div className="flex flex-col justify-center w-full">
          <Fonts />
        </div>
      </div>
      </div>
    </>
  )
}

