import { BiWorld } from "react-icons/bi";
import { BsInstagram, BsReddit, BsTwitch, BsDiscord, BsSnapchat, BsTiktok, BsSpotify, BsApple } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa";
import { FiTwitter, FiGithub, FiYoutube, FiFacebook, FiLinkedin } from "react-icons/fi";
import { ImPinterest2 } from "react-icons/im";
import { FaTelegramPlane } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";

export default function LinkCardMockups({ userData }: any) {
  let icon = null;

  const containerColor = userData?.container?.containerColor;
  const containerTextColor = userData?.container?.textColor;
  const containerBorderRadius = userData?.container?.shape;
  const containerBorder = userData?.container?.border;
  const containerBorderColor = userData?.container?.borderColor;

  return (
    <>
      {userData?.containerLinks?.map((link: any, index: number) => {
      if (link.status===false){
          return null
        }
        if (link.link.includes("instagram")) {
          icon = <BsInstagram />;
        } else if (link.link.includes("twitter")) {
          icon = <FiTwitter />;
        } else if (link.link.includes("github")) {
          icon = <FiGithub />;
        } else if (link.link.includes("pinterest")) {
          icon = <ImPinterest2 />;
        } else if (link.link.includes("youtube")) {
          icon = <FiYoutube />;
        } else if (link.link.includes("whatsapp")) {
          icon = <FaWhatsapp />;
        } else if (link.link.includes("facebook")) {
          icon = <FiFacebook />;
        } else if (link.link.includes("linkedin")) {
          icon = <FiLinkedin />;
        } else if (link.link.includes("telegram")) {
          icon = <FaTelegramPlane/>;
        } else if (link.link.includes("reddit")) {
          icon = <BsReddit />;
        } else if (link.link.includes("twitch")) {
          icon = <BsTwitch />;
        } else if (link.link.includes("discord")) {
          icon = <BsDiscord />;
        } else if (link.link.includes("snapchat")) {
          icon = <BsSnapchat />;
        } else if (link.link.includes("tiktok")) {
          icon = <BsTiktok />;
        } else if (link.link.includes("spotify")) {
          icon = <BsSpotify />;
        } else if (link.link.includes("apple")) {
          icon = <BsApple />;
        } else {
          icon = <TbWorld />;
        }

        if (
          (link.link.includes("youtube") ||
            link.link.includes("twitter") ||
            link.link.includes("facebook") ||
            link.link.includes("instagram") ||
            link.link.includes("linkedin") ||
            link.link.includes("github") ||
            link.link.includes("pinterest") ||
            link.link.includes("tiktok") ||
            link.link.includes("snapchat") ||
            link.link.includes("reddit") ||
            link.link.includes("tumblr") ||
            link.link.includes("spotify") ||
            link.link.includes("twitch") ||
            link.link.includes("soundcloud") ||
            link.link.includes("discord") ||
            link.link.includes("medium") ||
            link.link.includes("vimeo") ||
            link.link.includes("behance") ||
            link.link.includes("dribbble") ||
            link.link.includes("codepen") ||
            link.link.includes("deviantart") ||
            link.link.includes("stack-overflow") ||
            link.link.includes("gitlab") ||
            link.link.includes("bitbucket") ||
            link.link.includes("freecodecamp") ||
            link.link.includes("kaggle") ||
            link.link.includes("replit") ||
            link.link.includes("codesandbox") ||
            link.link.includes("hackerrank") ||
            link.link.includes("leetcode") ||
            link.link.includes("npm") ||
            link.link.includes("telegram") ||
            link.link.includes("apple")
            ) 
            
        ) {
          return null;
        } else {
          return (
            <a
              key={index}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center  w-full  mb-3 max-w-xl"
              style={{
                borderRadius: containerBorderRadius,
                border: containerBorderColor,
                backgroundColor: containerColor,
                
              }}
            >
              <div className="flex text-center w-full">
                <div className="w-10 h-10">
                  {icon && (
                    <div
                      className="flex items-center justify-center w-full h-full "
                      style={{
                        borderRadius: containerBorderRadius,

                      }}
                    >
                      <h1
                        className="text-3xl"
                        style={{
                          color : containerTextColor
                        }}
                        
                      >
                        {icon}
                      </h1>
                    </div>
                  )}
                </div>
                <h3
                  className="flex justify-center items-center  text-[10px] font-semibold w-full -ml-10"
                  style={{
                    color: containerTextColor,
                  }}
                >
                  {link.name}
                </h3>
                <div className="ml-auto flex items-center"></div>
              </div>
            </a>
          );
        }
      })}
    </>
  );
}
