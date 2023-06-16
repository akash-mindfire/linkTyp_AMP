import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BsInstagram,
  BsClipboard,
  BsCheckCircle,
  BsReddit,
  BsTwitch,
  BsDiscord,
  BsSnapchat,
  BsTiktok,
  BsSpotify,
  BsApple,
  BsGithub,
} from "react-icons/bs";
import { TiWorld } from "react-icons/ti";
import { FiGithub, FiTwitter } from "react-icons/fi";
import { ImPinterest2 } from "react-icons/im";
import { FiFacebook, FiLinkedin, FiYoutube } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { TbBrandTelegram } from "react-icons/tb";
import { TfiWorld } from "react-icons/tfi";
import SocialiconsMockups from "./modules/SocialiconsMockups";
import ProductOneMockups from "./modules/ProductOneMockups";
import ProductTwomockups from "./modules/ProductTwomockups";
import LinkCardMockups from "./modules/LinkCardMockups";

interface Props {
  icon: any;
  href: string;
  title: string;
  borderData: string;
  cardColorData: string;
  borderRadiusData: string;
  textColordata: string;
  userData: any;
}

export default function MobileMockups(data: any) {
  const username = data.data;

  const [Loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://api.linktyp.com/api/user/${username}`);
        // console.log(res);
        setUserData(res.data.data[0]);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [username,userData]);

  if (Loading) {
    return <div>Loading...</div>;
  }

  const profileName = userData?.profile?.name ? userData?.profile?.name:"Your name"
  const profileImage = userData?.profile?.avatar;
  const profileBio = userData?.profile?.bio? userData?.profile?.bio: ""

  let icon: JSX.Element | null = null;

  return (
    <div className="md:block hidden w-[250px] mx-auto h-[360px]"
      style={{
        fontFamily: userData?.font,
      }}
    >
      <div className="flex items-center justify-center w-full  mx-auto lg:max-w-[290px] max-w-[250px] lg:h-[410px] h-[350px] md:mt-44 lg:mt-36  rounded-3xl relative"
       
      >
        <img
          className="absolute z-50 pointer-events-none select-none"
          src="/mobileMockups.png"
          alt="mobileMockup"
        />
        <div className=" absolute lg:max-w-[300px] w-[245px] max-w-[245px] rounded-3xl lg:h-[498px] h-[496px] p-4 overflow-hidden overflow-y-scroll"
          style={{
            background: userData?.backgroundColor,
            color: userData?.container.TextColor,
          }}
        >
          <div className="w-full h-full ">
            <div>
            <img
                className="rounded-full min-w-[60px] w-[60px] h-[60px] object-cover mx-auto mt-8"
                src={profileImage || "/default.png"}
                alt="profileImage"
              />
            </div>
            <div className="mt-4 text-sm font-semibold text-center break-words"
              style={{
                color: userData?.profile.nameColor,
              }}
            >
              {profileName}
            </div>
            <div className="text-center text-[12px] font-semibold mt-2">
              <div className="px-8 break-words"
                style={{
                  color: userData?.profile.bioColor,
                }}
              >{profileBio}</div>
            </div>

            {/* social icons */}
            <div>
              <SocialiconsMockups userData={userData} SkillIconColor ={userData?.profile?.nameColor}/>
            </div>

            <div>
               {userData?.productcardstyle === "style2" ? (
                <ProductTwomockups userData={userData} />
              ) : (
                <ProductOneMockups userData={userData} />
              )}
            </div>

            <div className="p-1">
              <LinkCardMockups userData={userData} />
            </div>
            <footer className='pb-5 pt-5 bottom-0  text-center text-[10px] flex justify-center items-center font-sans'>
              made with ❤️ by  
                <img src="/typoflogo.svg" alt="" className="w-8 h-8" />
            </footer>
            <div className="pb-12" />
          </div>
        </div>
      </div>
    </div>
  );
}
