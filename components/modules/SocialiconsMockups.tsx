import { BsInstagram, BsReddit, BsTwitch, BsDiscord, BsSnapchat, BsTiktok, BsSpotify, BsApple } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa";
import { FiTwitter, FiGithub, FiYoutube, FiFacebook, FiLinkedin } from "react-icons/fi";
import { ImPinterest2 } from "react-icons/im";
import { TbBrandTelegram } from "react-icons/tb";
import { TfiWorld } from "react-icons/tfi";

export default function SocialiconsMockups({ userData , SkillIconColor}: { userData: any, SkillIconColor: string }) {
  return (
    <div className="flex justify-center">
      {/* Render user links using LinkCard component */}
      {userData?.containerLinks?.map((link: any, index: number) => {

        let icon: JSX.Element | null = null;
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
          icon = <TbBrandTelegram />;
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
          icon = <TfiWorld />;
        }

        if (
          link.status === true &&
          (link.link.includes("telegram") ||
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
            link.link.includes("npm")
          )
          ) {
          return (
            <div key={index}>
              <h2 className="text-base p-1"
               style={{color: SkillIconColor}}
              >{icon}</h2>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}
