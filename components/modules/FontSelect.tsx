import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fontStyles = [
  { label: "Roboto", value: "roboto" },
  { label: "EB Garamond", value: "ebGaramond" },
  { label: "Bitter", value: "bitter" },
  { label: "Opensans", value: "opensans" },
  { label: "Arvo", value: "arvo" },
  { label: "Lato", value: "lato" },
  { label: "Poppins", value: "poppins" },
  { label: "DM Sans", value: "dMSans" },
  { label: "Capriola", value: "capriola" },
  { label: "Barlow", value: "barlow" },
  { label: "Courgette", value: "courgette" },
  { label: "Oswald", value: "oswald" },
  { label: "Merri Weather", value: "merriWeather" },
  { label: "Lobster", value: "lobster" },
  { label: "Crete Round", value: "creteRound" },
];

export default function Fonts() {
  const [selectedFont, setSelectedFont] = useState(fontStyles[0].label);
  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const response = await axios.get("https://api.linktyp.com/api/getdata", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data?.data[0]?.profile) {
        setSelectedFont(response.data.data[0].font);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch user data");
    }
  };

  const handleFontClick = (event: any) => {
    setSelectedFont(event.target.value);
  };

  const token = Cookies.get("access_token");

  const handleChangeFont = (fontStyle: any) => {
    const body = { font: fontStyle };
    axios
      .post(`https://api.linktyp.com/api/font`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Font saved");
          document.dispatchEvent(new Event("refreshEvent"));
        }
        console.log(res);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full pb-10">
      <div className="max-w-md mx-auto text-center">
        <h2 className="pb-10 text-lg font-bold tracking-wider text-gray-700 uppercase sm:text-xl">
          Select font family
        </h2>
      </div>
      {/* <button className="w-full btn"> */}
      <label htmlFor="my-modal-4" className="w-full gap-2 btn btn-outline">
        Choose a font Style
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </label>
      {/* </button> */}
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label
        className="cursor-pointer modal modal-bottom sm:modal-middle"
        htmlFor="my-modal-4"
      >
        <label className="relative w-full modal-box">
          <label
            htmlFor="my-modal-4"
            className="absolute btn btn-sm btn-circle right-2 bottom-4 top-2"
          >
            {" "}
            ✕
          </label>
          <select
            className="w-full mt-6 select select-accent"
            value={selectedFont}
            onChange={handleFontClick}
          >
            {fontStyles.map((fontStyle) => (
              <option key={fontStyle.value} value={fontStyle.value}>
                {fontStyle.label}
              </option>
            ))}
          </select>
          <div
            className="pt-5 text-2xl text-center font-preview"
            style={{ fontFamily: selectedFont }}
          >
            {selectedFont}
          </div>
          <div className="modal-action">
            <button
              className="w-full btn"
              onClick={() => handleChangeFont(selectedFont)}
            >
              Save
            </button>
          </div>
        </label>
      </label>
      <ToastContainer />
    </div>
  );
}
