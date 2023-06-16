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
  
} from "react-icons/bs";
import {TfiWorld} from "react-icons/tfi"
import {FiGithub , FiTwitter} from "react-icons/fi"
import {ImPinterest2} from "react-icons/im"
import {TbBrandTelegram} from "react-icons/tb"
import {FiFacebook} from "react-icons/fi"
import {FiLinkedin} from "react-icons/fi"
import {FiYoutube} from "react-icons/fi"
import {FaWhatsapp} from "react-icons/fa"
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
}

export default function LinkCard({
  href,
  title,
  borderData,
  cardColorData,
  borderRadiusData,
  textColordata,
  userData
}: Props) {
  

  const [copied, setCopied] = useState(false);
  const data = userData

  const Username = data.username;

  


  //count the number of times the link is clicked
  const [linkClicked, setLinkClicked] = useState(0)
  const handlelinkClicked = () => {
    setLinkClicked(linkClicked + 1);
    const clickData = linkClicked;
    axios
    .post(`https://api.linktyp.com/api/dashboard/container/${Username}`
    , {
      numberOfClicksOnLink:clickData
    }
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
 else{
    icon = <TfiWorld />;
 }



  const handleCopy = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    navigator.clipboard.writeText(href);
    setCopied(true);
    toast.success("Link copied to clipboard!");
  };


  const [showCopy, setShowCopy] = useState(false);

  return (
    <a
      href={href}
      onClick={handlelinkClicked}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center p-1 md:p-2 w-full  mb-3 max-w-2xl hover:scale-105 transition duration-500"
      style={{
                borderRadius:   borderRadiusData,
                border: borderData,
                backgroundColor: cardColorData,
       }}
      onMouseEnter={() => setShowCopy(true)}
      onMouseLeave={() => setShowCopy(false)}
    >
      <div className="flex text-center w-full">
        <div className="w-10 h-10">
          {icon && (
            <div
              className="flex items-center justify-center w-full h-full "
              style={{
                borderRadius:   borderRadiusData,
                backgroundColor: cardColorData,
              }}
            >
              <h1 className="text-4xl"
              style={{
                color: textColordata,
              }}
              >{icon}</h1>
              
            </div>
          )}
        </div>
        <h3 className="flex justify-center items-center font-sm w-full -ml-10"
        style={{
          color: textColordata,
        }}
        >
          {title}
        </h3>
        <div className="ml-auto flex items-center ">
          {showCopy && (
            <button
              onClick={handleCopy}
              className="bg-black hover:bg-black text-white font-bold py-2 px-4 rounded-full ml-2"
              style={{ display: copied ? "none" : "block" }}
            >
              <BsClipboard />
            </button>
          )}
          <div style={{ display: copied ? "block" : "none" }}>
            <BsCheckCircle className="text-black mr-3" />
          </div>
        </div>
      </div>
    </a>
  );
}
