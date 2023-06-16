import Image from "next/image";
import Router from "next/router";
import { useAmp } from "next/amp";
import { useEffect, useRef, useState, Fragment } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import LinkCard from "@/components/Linkcard";
import StylesProduct from "@/components/modules/productOne";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import Seotags from "@/components/seo";
import SocialIcons from "@/components/Skills";
import Producttwo from "@/components/modules/Producttwo";
export const config = { amp: true };
interface User {
  [x: string]: any;
  container: any;
  mediaIcon: any;
  profile: {
    fontStyle: any;
    border: any;
    cardColor: any;
    borderRadius: any;
    bio: any;
    bioColor: any;
    nameColor: any;
    name: string;
    avatar: string;
  };
  containerLinks: {
    name: string;
    url: string;
    icon: string;
  }[];
  product: {
    name: string;
    url: string;
    icon: string;
  }[];
}

export default function Username({ user }: { user: User }) {
  const router = useRouter();
  const { username } = router.query;
  const isMounted = useRef(false); // Add useRef hook
  const isAmp = useAmp();
  console.log(isAmp);

  useEffect(() => {
    if (!isMounted.current) {
      // Only make API call on initial mount
      const fetchData = async () => {
        try {
          const response = await axios.post(
            `https://api.linktyp.com/api/dashboard/${username}`
          );
        } catch (error) {}
      };
      fetchData();
      isMounted.current = true; // Update the isMounted value after the initial API call
    }
  }, [username]);

  // Display loading message until user data is loaded
  if (!user) {
    return <Loader />;
  }

  const profileNameColor = user.profile.nameColor
    ? user.profile.nameColor
    : "#1a202c";
  const profileBioColor = user.profile.bioColor
    ? user.profile.bioColor
    : "#718096";
  const profileBio = user.profile.bio ? user.profile.bio : "";
  const profileName = user.profile.name ? user.profile.name : "Your Name";
  const backgroundColor = user.backgroundColor;
  const fontStyle = user.font;
  const avatar = user.profile.avatar;
  const productcardstyle = user.productcardstyle;

  return (
    <>
      <Layout user={user}>
        <div className="min-h-screen">
          <div className="pt-5">
            <Header userData={user} />
          </div>
          <div className="flex flex-col items-center justify-center w-full h-full px-2 mx-auto mt-5">
            {/* Display user avatar */}
            <div className="border-2 border-black rounded-full">
              {isAmp ? (
                <amp-img
                  alt={user.profile.name}
                  src={avatar || "/default.png"}
                  width={120}
                  height={120}
                  className="object-cover rounded-full"
                  style={{ height: "95px", width: "95px" }}
                ></amp-img>
              ) : (
                <Image
                  alt={user.profile.name}
                  src={avatar || "/default.png"}
                  width={120}
                  height={120}
                  className="object-cover rounded-full"
                  style={{ height: "95px", width: "95px" }}
                />
              )}
            </div>
            {/* prfile name and bio */}
            <div className="flex flex-col items-center justify-center">
              <h1
                className="pb-2 mt-4 text-lg font-semibold"
                style={{ color: profileNameColor }}
              >
                {profileName}
                {/* <span className='pl-2 text-sky-300'>
                  <Image src={'https://upload.wikimedia.org/wikipedia/commons/e/e4/Twitter_Verified_Badge.svg'} alt={'blue-tik'} width={28} height={28} />
                </span> */}
              </h1>

              <h2
                className="pb-1 text-sm font-semibold text-center"
                style={{ color: profileBioColor }}
              >
                {profileBio}
              </h2>
            </div>

            {/* social icons */}
            <div className="flex ">
              {
                // Render user links using LinkCard component
                user.containerLinks.map((link: any, index: any) => {
                  if (link.status === true) {
                    if (
                      link.link.includes("youtube") ||
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
                    ) {
                      return (
                        <SocialIcons
                          title={link.name}
                          href={link.link}
                          key={index}
                          iconColor={profileNameColor}
                          {...link}
                          borderData={user.container.borderColor}
                          cardColorData={user.container.containerColor}
                          borderRadiusData={user.container.shape}
                          textColordata={user.container.textColor}
                          userData={user}
                        />
                      );
                    }
                  }
                  return null;
                })
              }
            </div>

            {/* prodict card */}
            <div className="w-full pt-5 pb-10">
              {user.productcardstyle === "style1" ? (
                <Producttwo product={user} />
              ) : user.productcardstyle === "style2" ? (
                <StylesProduct product={user} />
              ) : (
                <Producttwo product={user} />
              )}
            </div>
            {/* links */}

            {user.containerLinks.map((link: any, index: any) => {
              if (
                link.status === true &&
                (link.link.includes("facebook") ||
                  link.link.includes("youtube") ||
                  link.link.includes("instagram") ||
                  link.link.includes("github") ||
                  link.link.includes("twitter") ||
                  link.link.includes("linkedin") ||
                  link.link.includes("pinterest") ||
                  link.link.includes("tiktok") ||
                  link.link.includes("snapchat") ||
                  link.link.includes("reddit") ||
                  link.link.includes("tumblr") ||
                  link.link.includes("spotify") ||
                  link.link.includes("soundcloud") ||
                  link.link.includes("twitch") ||
                  link.link.includes("vimeo") ||
                  link.link.includes("discord") ||
                  link.link.includes("telegram") ||
                  link.link.includes("whatsapp") ||
                  link.link.includes("medium") ||
                  link.link.includes("behance") ||
                  link.link.includes("dribbble") ||
                  link.link.includes("deviantart") ||
                  link.link.includes("flickr") ||
                  link.link.includes("mixcloud") ||
                  link.link.includes("myspace") ||
                  link.link.includes("quora") ||
                  link.link.includes("skype") ||
                  link.link.includes("slack") ||
                  link.link.includes("tripadvisor") ||
                  link.link.includes("vk") ||
                  link.link.includes("apple"))
              ) {
                return <Fragment key={index}></Fragment>;
              } else if (link.status === true) {
                return (
                  <LinkCard
                    title={link.name}
                    href={link.link}
                    key={index}
                    {...link}
                    borderData={user.container.borderColor}
                    cardColorData={user.container.containerColor}
                    borderRadiusData={user.container.shape}
                    textColordata={user.container.textColor}
                    userData={user}
                  />
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context: {
  query: { username: any };
}) {
  const { username } = context.query;
  let user = null;

  try {
    if (username) {
      const response = await axios.get(
        `https://api.linktyp.com/api/user/${username}`
      );
      user = response.data.data[0];
    }
  } catch (error) {
    console.log("Error fetching user data", error);
  }

  if (!user) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      user,
    },
  };
}
