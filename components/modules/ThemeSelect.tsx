import React, { useEffect, useState } from "react";

import axios from "axios";

import { toast } from "react-toastify";

import Cookies from "js-cookie";





const themeList = [



  { backgroundcolor: "#C2A6F7", font: "lobster", containerColor: "#9169DB", shape: "10px", borderColor: "black", textColor: "black", cardstyle: "style1" },

  { backgroundcolor: "#F8F7FA", font: "arvo", containerColor: "#DADCE0", shape: "20px", borderColor: "black", textColor: "black", cardstyle: "style1" },

  { backgroundcolor: "linear-gradient(142deg, rgba(2,0,36,1) 0%, rgba(17,17,129,0.8101365546218487) 44%, rgba(5,145,205,1) 77%, rgba(2,170,227,1) 84%, rgba(0,212,255,1) 100%)", font: "opensans", containerColor: "#ffffff00", shape: "27px", borderColor: "white solid 1px", textColor: "white", cardstyle: "style1" },

  { backgroundcolor: "#F8FCA7", font: "poppins", containerColor: "#8A8F5B", shape: "35px", borderColor: "", textColor: "white", cardstyle: "style1" },

  { backgroundcolor: "#04BFBF", font: "courgette", containerColor: "#BBF1F1", shape: "4px", borderColor: "", textColor: "#1D5757", cardstyle: "style1" },

  { backgroundcolor: "#FFFFFF", font: "courgette", containerColor: "#BBF1F1", shape: "4px", borderColor: "", textColor: "#1D5757", cardstyle: "style2" }


]






export default function Themes() {

  const [selectedThemeIndex, setSelectedThemeIndex] = useState();

  const [userData, setuserData] = useState();

  const token = Cookies.get("access_token");

  useEffect(() => {

    axios

      .get("https://api.linktyp.com/api/getdata", {

        headers: {

          Authorization: `Bearer ${token}`,

        },

      })

      .then((res) => {

        console.log(res);

        setuserData(res.data);

      })

      .catch((err) => {

        console.log(err);

      });

  }, []);

  console.log(userData)

  const handleThemeClick = (index: any) => {

    setSelectedThemeIndex(index)

  }

  const handleThemeSelect = (selectedIndex: any) => {

    const data = themeList[selectedIndex]

    console.log(themeList[selectedIndex])

    axios

      .post("https://api.linktyp.com/api/theme", data, {

        headers: {

          Authorization: `Bearer ${token}`,

        },

      })

      .then((res) => {

        console.log(res);

        toast.success("Theme updated successfully");

        if (res.status) {

          document.dispatchEvent(new Event('refreshEvent'))

        }

      })

      .catch((err) => {

        console.log(err);

      });

  };

  return (

    <div id="ThemeSection w-full">

      <div className="pb-10 text-lg font-bold tracking-wider text-center text-gray-700 uppercase sm:text-xl">Themes</div>

      <div className="w-full bg-white rounded-3xl">

        <div className="grid grid-cols-2 gap-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">

          {themeList.map((item: any, index: any) => (

            <div key={index}>

              <div

                className={`border-2 border-gray-500 rounded-lg aspect-[2/3] border-dashed cursor-pointer ${selectedThemeIndex === index

                  ? "transition-all duration-150 ease-in p-2"

                  : "transition-all duration-150 ease-out p-0"

                  }`}

                onClick={() => handleThemeClick(index)}

              >

                <div className="relative h-full mx-auto rounded-xl">

                  <div className={`absolute left-0 top-0 h-full w-full z-0`}

                    style={{

                      background: item.backgroundcolor

                    }}

                  />

                  <div className="relative z-10 p-1">

                    {index === themeList.length - 1 ? (
                      <>
                        <div className="rounded-full mx-auto w-12 h-12 bg-[#EFF0EA] bg-opacity-70" />
                        <div className="flex gap-1 p-1">
                          <div className="w-1/2 mx-auto rounded-lg h-12 mt-4 bg-[#EFF0EA] bg-opacity-70" />
                          <div className="w-1/2 mx-auto rounded-lg h-12 mt-4 bg-[#EFF0EA] bg-opacity-70" />
                        </div>
                        <div className="rounded-full mx-auto w-full h-6  bg-[#EFF0EA] bg-opacity-70"></div>
                      </>
                    ) : (
                      <>
                        <div className="rounded-full mx-auto w-12 h-12 bg-[#EFF0EA] bg-opacity-70" />
                        <div className="w-[calc(100%-20px)] mx-auto rounded-full h-6 mt-4 bg-[#EFF0EA] bg-opacity-70" />
                        <div className="w-[calc(100%-20px)] mx-auto rounded-full h-6 mt-1 bg-[#EFF0EA] bg-opacity-70" />
                        <div className="w-[calc(100%-20px)] mx-auto rounded-full h-6 mt-1 bg-[#EFF0EA] bg-opacity-70" />
                      </>
                    )}

                  </div>

                </div>

              </div>

              <div className="text-center">{item.name}</div>

            </div>

          ))}


        </div>

      </div>

      {/* <div className="btn" onClick={() => handleThemeSelect(selectedThemeIndex)}>save</div> */}

      <div className="flex justify-center pt-10">
        <button className="w-64 tracking-widest rounded-lg btn btn-outline" onClick={() => handleThemeSelect(selectedThemeIndex)}>Save</button>
      </div>
      <hr className="h-px my-6 bg-gray-400 border-0 " />
    </div>

  );

}

