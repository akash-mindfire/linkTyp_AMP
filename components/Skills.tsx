import { useState } from "react";
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
    BsMedium

} from "react-icons/bs";
import { TfiWorld } from "react-icons/tfi"
import { FiGithub, FiTwitter } from "react-icons/fi"
import { ImPinterest2 } from "react-icons/im"
import { TbBrandTelegram } from "react-icons/tb"
import { FiFacebook } from "react-icons/fi"
import { FiLinkedin } from "react-icons/fi"
import { FiYoutube } from "react-icons/fi"
import { FaWhatsapp } from "react-icons/fa"
import toast from "react-hot-toast";
import Username from '../pages/[username]';

interface Props {
    href: string;
    title: string;
    borderData: string;
    cardColorData: string;
    borderRadiusData: string;
    textColordata: string;
    userData: any;
    iconColor : string;

}

export default function SocialIcons({
    href,
    title,
    borderData,
    cardColorData,
    borderRadiusData,
    textColordata,
    userData,
    iconColor

}: Props) {

    const data = userData

    const Username = data.username;

  



    const handlelinkClicked = () => {
        
        axios
        .post(`https://api.linktyp.com/api/dashboard/container/${Username}`
        )
        .then((res) => {
          console.log(res);
          console.log(res.data);
        }
        )
        .catch((error) => {
          console.log(error);
        }
        );
      };


    let icon = null;

    if (href.includes("instagram")) {
        icon = <BsInstagram />;
    } else if (href.includes("twitter")) {
        icon = <FiTwitter />;
    } else if (href.includes("github")) {
        icon = <FiGithub />;
    } else if (href.includes("pinterest")) {
        icon = <ImPinterest2 />;
    }
    else if (href.includes("youtube")) {
        icon = <FiYoutube />;
    }
    else if (href.includes("whatsapp")) {
        icon = <FaWhatsapp />;
    }
    else if (href.includes("facebook")) {
        icon = <FiFacebook />;
    }
    else if (href.includes("linkedin")) {
        icon = <FiLinkedin />;
    }
    else if (href.includes("telegram")) {
        icon = <TbBrandTelegram />;
    }
    else if (href.includes("reddit")) {
        icon = <BsReddit />;
    }
    else if (href.includes("twitch")) {
        icon = <BsTwitch />;
    }
    else if (href.includes("discord")) {
        icon = <BsDiscord />;
    }
    else if (href.includes("snapchat")) {
        icon = <BsSnapchat />;
    }
    else if (href.includes("tiktok")) {
        icon = <BsTiktok />;
    }
    else if (href.includes("spotify")) {
        icon = <BsSpotify />;
    }
    else if (href.includes("apple")) {
        icon = <BsApple />;
    }
    else if (href.includes("medium")) {
        icon = <BsMedium />;
    }
    else {
        icon = <TfiWorld />;
    }



    return (

        <div className="flex flex-row justify-center">
            <a
                href={href}
                onClick={handlelinkClicked}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-4 text-2xl"
                style={{
                    color: iconColor,
                }}
                >
                {icon}
                
            </a>
        </div>
    );
}
