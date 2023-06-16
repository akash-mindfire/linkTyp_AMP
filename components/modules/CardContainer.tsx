import { log } from "console";
import { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
// react icons
import {
  BsInstagram,
  BsClipboard,
  BsCheckCircle,
  BsSnapchat,
  BsTiktok,
  BsSpotify,
  BsApple,
  BsEmojiSunglasses,
} from "react-icons/bs";
import {TfiWorld} from "react-icons/tfi"
import { SlSocialSpotify } from "react-icons/sl";
import { RiAppleLine } from "react-icons/ri";
import { AiOutlineReddit } from "react-icons/ai";
import { FiGithub, FiTwitter } from "react-icons/fi";
import { RxDiscordLogo } from "react-icons/rx";
import { ImPinterest2 } from "react-icons/im";
import { TbBrandTelegram } from "react-icons/tb";
import { FiFacebook } from "react-icons/fi";
import { FiLinkedin } from "react-icons/fi";
import { FiYoutube } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import Cookies from "js-cookie";
import axios from "axios";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

type CardContainerProps = {
  addCard: (arg1: any, arg2: any, arg3: any) => void;
  addProductCard: (
    arg1: any,
    arg2: any,
    arg3: any,
    arg4: any,
    arg5: any
  ) => void;
  addTypofProductCard: (
    arg1: any,
    arg2: any,
    arg3: any,
    arg4: any,
    arg5: any
  ) => void;
};

export default function CardContainer({
  addCard,
  addProductCard,
  addTypofProductCard,
}: CardContainerProps) {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [typofProduts, setTypofProducts] = useState([]);
  const [addcardText, setAddcardText] = useState("");
  const [socialLink, setSocialLink] = useState("");
  const [status, setStatus] = useState(false);
  const [typofEmail, setTypofEmail] = useState("");
  const [typofPassword, setTypofPassword] = useState("");
  const [typofProductSol, setTypofProductSol] = useState("");
  const [addProductImagelink, setProductImageLink] = useState("");
  const [addProductName, setProductName] = useState("");
  const [addProductlink, setProductLink] = useState("");
  const [addProductPrice, setProductPrice] = useState("");
  const [productStatus, setProductStatus] = useState(false);
  const [selectedSocialLink, setSelectedSocialLink] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("Rs.");
   const [showPassword, setShowPassword] = useState(false);
 
   const getTypofProducts=()=>{
    const token = Cookies.get("typof_access_token");
    if (token) {
      setIsLoggedin(true);
      axios
        .get("https://mobileapi.typof.com/v1/product", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setTypofProducts(res.data.data);
        })
        .catch((err) => {
          console.log(err);
          // handle error
        });
    } else {
      setIsLoggedin(false);
    }
  }

 
  useEffect(() => {
   getTypofProducts()
  }, []);
  console.log(typofProduts)

  const handleAddCardClick = () => {
    setSocialLink("");
    setAddcardText("");
    setSelectedSocialLink("");
    addCard(addcardText, socialLink, status);
    setShowContent(false);
  };
  const handleAddProductCardClick = () => {
    addProductCard(
      addProductImagelink,
      addProductName,
      addProductlink,
      selectedCurrency +" "+ addProductPrice,
      productStatus
    );
    setProductImageLink(""),
    setProductName(""),
    setProductLink(""),
    setProductPrice(""),
    setProductStatus(false),
    setSelectedCurrency("Rs.")
    
  };

  // Icons iamge
  const icons = [
    {
      id: 1,
      img: <FiGithub />,
      name: "Github",
      link: "https://www.github.com/",
    },
    {
      id: 2,
      img: <BsInstagram />,
      name: "Instagram",
      link: "https://www.instagram.com/",
    },
    {
      id: 3,
      img: <FiLinkedin />,
      name: "LinkedIn",
      link: "https://www.linkedin.com/",
    },
    {
      id: 4,
      img: <FiFacebook />,
      name: "FaceBook",
      link: "https://www.facebook.com/",
    },
    {
      id: 5,
      img: <FiTwitter />,
      name: "Twitter",
      link: "https://www.twitter.com/",
    },
    {
      id: 6,
      img: <ImPinterest2 />,
      name: "Pintrest",
      link: "https://www.pinterest.com/",
    },

    {
      id: 7,
      img: <FiYoutube />,
      name: "Youtube",
      link: "https://www.youtube.com/",
    },
    {
      id: 8,
      img: <TbBrandTelegram />,
      name: "Telegram",
      link: "https://www.telegram.com/",
    },
    {
      id: 9,
      img: <AiOutlineReddit />,
      name: "Reddit",
      link: "https://www.reddit.com/",
    },

    {
      id: 10,
      img: <RxDiscordLogo />,
      name: "Discord",
      link: "https://www.discord.com/",
    },
    {
      id: 11,
      img: <BsSnapchat />,
      name: "Snapchat",
      link: "https://www.snapchat.com/",
    },
    {
      id: 12,
      img: <BsTiktok />,
      name: "Tiktok",
      link: "https://www.tiktok.com/",
    },
    {
      id: 13,
      img: <SlSocialSpotify />,
      name: "Spotify",
      link: "https://www.spotify.com/",
    },
    {
      id: 14,
      img: <RiAppleLine />,
      name: "Apple",
      link: "https://www.apple.com/",
    },
    {
      id: 15,
      img: <TfiWorld />,
      name: "Other",
      link: "",
    },
  ];

  const [showContent, setShowContent] = useState(false);
  const typofws = Cookies.get("typof_website");

  const handleSocialLink = (link: any, name: any) => {
    setAddcardText("");
    setSelectedSocialLink(name);
    setSocialLink(link);
  };

  const handleTypfofLogin = (email: any, password: any) => {
    const data = {
      email: email,
      password: password,
    };
    console.log(data);
    axios
      .post("https://mobileapi.typof.com/v1/auth/login", data)
      .then((res) => {
        // console.log(res);
        console.log(res.data.status);
        if (res.data.status === true) {
          console.log(res.data.token);
          // localStorage.setItem('access_token', res.data.access_token);
          Cookies.set("typof_website", res.data.website, { expires: 7 });
          Cookies.set("typof_access_token", res.data.token, { expires: 7 });
          const typofToken = Cookies.get("typof_access_token");
          console.log(typofToken);
          // Cookies.set('access_token',  res.data.access_token, { expires: 30, sameSite: 'none', secure: true });
          axios
            .get("https://mobileapi.typof.com/v1/product", {
              headers: {
                Authorization: `Bearer ${typofToken}`,
              },
            })
            .then((res) => {
              console.log(res.data);
              // push data to Home page with router.push
              // setUserData(res.data);
              // router.push('/dashBoard');
              setTypofProducts(res.data.data);
            })
            .catch((err) => {
              console.log(err);
              // handle error
            });
          console.log("Login Successful");
          setIsLoggedin(true);
          // LoginSuccessNotification();
        } else {
          // console.log('Login Failed');
          // setLoginError('Invalid Email or Password');
        }
      })
      .catch((err) => {
        console.log(err);
        //   LoginErrorNotification();
      });
  };
  const handleAddProductCardAndTypofProduct = ({
    pImage,
    pName,
    pLink,
    pPrice,
  }: {
    pImage: any;
    pName: any;
    pLink: any;
    pPrice: any;
  }) => {
    setProductImageLink(pImage);
    setProductName(pName);
    setProductLink(pLink);
    setProductPrice(pPrice);
    setStatus(false);
    setTypofProductSol(pImage);
  };

  useEffect(() => {
    if (typofProductSol != "") {
      addTypofProductCard(
        addProductImagelink,
        addProductName,
        addProductlink,
        selectedCurrency+ " " +addProductPrice,
        productStatus
      );
      setProductImageLink(""),
    setProductName(""),
    setProductLink(""),
    setProductPrice(""),
    setProductStatus(false)
    }
  }, [typofProductSol]);

  return (
    <>
      <div>
        <div className="flex flex-col items-center justify-center w-full pb-10 md:px-10">
          {/* button div */}
          <div className="flex justify-center w-4/5 pb-5 md:w-4/5">
            <button
              className="w-full gap-2 tracking-widest btn"
              onClick={() => setShowContent(!showContent)}
            >
              Add Link
              <GoPlus className="text-xl" />
            </button>
          </div>
          {/* content div */}
          {showContent && (
            <div className="w-4/5 animate-fade-in">
              <div>
                <p className="pt-10 pb-10 font-bold uppercase">
                  share your content
                </p>
              </div>
              {/*  */}
              <div className="flex flex-col items-center justify-center">
                <div className="grid w-full grid-cols-4 gap-6 p-2 px-2 md:grid-cols-5 rounded-3xl">
                  {icons.map((items, index) => {
                    return (
                      <div>
                        <div
                          className="flex justify-center avatar"
                          key={index}
                          onClick={() =>
                            handleSocialLink(items.link, items.name)
                          }
                        >
                          <h1
                            className="p-2 text-4xl border-2 rounded-lg"
                            style={
                              items.name == selectedSocialLink
                                ? { border: "2px solid" }
                                : {}
                            }
                          >
                            {" "}
                            {items.img}
                          </h1>
                        </div>
                        <h2
                          className="flex justify-center"
                          style={
                            items.name == selectedSocialLink
                              ? { color: "black" }
                              : { color: "grey" }
                          }
                        >
                          {items.name}
                        </h2>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* input files for card  */}
              <div className="w-full">
                <div className="w-full pt-2 form-control">
                  <label className="label">
                    <span className="label-text">Card Title</span>
                  </label>
                  <input
                    type="text"
                    value={addcardText}
                    onChange={(e) => setAddcardText(e.target.value)}
                    placeholder="Enter Card Title"
                    className="w-full rounded-lg input input-bordered"
                  />
                </div>
                <div className="w-full pt-2 form-control">
                  <label className="label">
                    <span className="label-text">Card Link</span>
                  </label>
                  <input
                    type="text"
                    value={socialLink}
                    onChange={(e) => setSocialLink(e.target.value)}
                    placeholder="Enter Social Link"
                    className="rounded-lg input input-bordered"
                  />
                </div>

                {/* <div className="w-1/3 pt-5 form-control">
                                    <label className="cursor-pointer label">
                                        <span className="pr-1 font-semibold label-text md:pr-2">Disable</span>
                                        <input type="checkbox " className="toggle toggle-md"
                                            checked={status}
                                            onChange={(e) => setStatus(e.target.checked)}
                                        />
                                        <span className="pl-1 font-semibold label-text md:pl-2">Enable</span>
                                    </label>
                                </div> */}
                <div className="w-1/3 pt-2 form-control">
                  <label className="cursor-pointer label">
                    <span className="label-text">Status</span>
                    <input
                      type="checkbox"
                      className="toggle toggle-success"
                      checked={status}
                      onChange={(e) => setStatus(e.target.checked)}
                    />
                  </label>
                </div>
              </div>
              <button
                className="w-full mt-5 tracking-widest rounded-lg btn"
                onClick={handleAddCardClick}
              >
                save
              </button>
              {/* input field for card end */}

              {/* add your products start*/}
              <div className="flex flex-col items-center justify-center pt-10">
                <div>
                  <p className="font-bold tracking-wider uppercase">
                    Add Your Products
                  </p>
                </div>
                <div className="flex">
                  <div className="flex flex-col items-center justify-center w-20 h-20 mt-10 mr-10 border-2 border-blue-500 rounded-lg aspect-square">
                    <label htmlFor="storeLoginModal" className="cursor-pointer" onClick={getTypofProducts}>
                      <img
                        src="https://uploads-ssl.webflow.com/6344fe0ae449f96ce795b92b/637b638f6f8fe0d4d13617ee_256-webclip.png"
                        alt=""
                      />
                    </label>
                    <input
                      type="checkbox"
                      id="storeLoginModal"
                      className="modal-toggle"
                    />
                    <div className="modal">
                      <div className="relative modal-box h-1/2">
                        {isLoggedin ? (
                          <div>
                            <label
                              htmlFor="storeLoginModal"
                              className="absolute btn btn-sm btn-circle right-2 top-2"
                            >
                              {" "}
                              ✕
                            </label>
                            <h3 className="text-lg font-bold">
                              Your products in typof
                            </h3>
                            {typofProduts.map((p: any, index: any) => {
                              return (
                                <div
                                  key={index}
                                  className="flex items-center justify-around w-full h-32 gap-1 px-3 py-1 my-4 border-2 border-gray-100 rounded-lg cursor-pointer stat"
                                  style={{
                                    boxShadow:
                                      "rgba(0, 0, 0, 0.1) 0px 10px 50px",
                                  }}
                                >
                                  <div className="relative w-16 h-16 mr-5">
                                    <img
                                      className="object-cover w-16 h-16 rounded-lg "
                                      src={p.images[0]}
                                      alt="{p.product_name}"
                                    />
                                  </div>
                                  {/* product name link div */}
                                  <div className="w-1/2">
                                    <span className="overflow-hidden font-sans text-base"
                                    style={{
                                     overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      display: "-webkit-box",
                                      WebkitLineClamp: 1,
                                      WebkitBoxOrient: "vertical",

                                    }}
                                    >
                                      {p.product_name}
                                    </span>
                                    <p className="font-mono text-sm"
                                    style={{
                                      overflow: "hidden",
                                       textOverflow: "ellipsis",
                                       display: "-webkit-box",
                                       WebkitLineClamp: 1,
                                       WebkitBoxOrient: "vertical",
 
                                     }}
                                    >{`https://${typofws}/p/${p.slug}`}</p>
                                    <p className="font-mono text-sm">
                                      {p.price}
                                    </p>
                                  </div>
                                  <div className="rounded-md modal-action">
                                    {/* <label htmlFor="storeLoginModal"> */}
                                    <label
                                      className="btn"
                                      htmlFor="storeLoginModal"
                                      onClick={() =>
                                        handleAddProductCardAndTypofProduct({
                                          pImage: p.images[0],
                                          pName: p.product_name,
                                          pLink: `https://${typofws}/p/${p.slug}`,
                                          pPrice: p.price,
                                        })
                                      }
                                    >
                                      Add
                                    </label>
                                    {/* </label> */}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <>
                            <label
                              htmlFor="storeLoginModal"
                              className="absolute btn btn-sm btn-circle right-2 top-2"
                            >
                              {" "}
                              ✕
                            </label>
                            <h3 className="text-lg font-bold">Log in</h3>
                            <p>
                              Sync your Typof store with Linktyp. Log in, select products, and integrate them effortlessly.
                            </p>

                             <div className="w-full form-control">
                              <label className="label">
                                <span className="label-text">Email</span>
                              </label>
                              <input
                                type="text"
                                value={typofEmail}
                                onChange={(e) => setTypofEmail(e.target.value)}
                                placeholder="Your Email ID"
                                className="w-full input input-bordered"
                              />
                              <label className="label">
                                <span className="label-text">Password</span>
                              </label>
                              <div className="relative">
                                <input
                                  type={showPassword ? 'text' : 'password'}
                                  value={typofPassword}
                                  onChange={(e) => setTypofPassword(e.target.value)}
                                  placeholder="Your password"
                                  className="w-full pr-10 input input-bordered"
                                />
                                <span
                                  className="password-icon"
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                                </span>
                              </div>

                              <button
                                className="w-full mt-10 rounded-full btn"
                                onClick={() => handleTypfofLogin(typofEmail, typofPassword)}
                              >
                                Login
                              </button>

                              <style jsx>{`
        .password-icon {
          position: absolute;
          top: 50%;
          right: 10px;
          transform: translateY(-50%);
          cursor: pointer;
        }
      `}</style>
                            </div>
                            
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center w-20 h-20 mt-10 border-2 border-blue-500 rounded-lg aspect-square">
                    <label htmlFor="my-modal-3" className="cursor-pointer">
                      <GoPlus className="p-2 text-5xl" />
                    </label>

                    <input
                      type="checkbox"
                      id="my-modal-3"
                      className="modal-toggle"
                    />
                    <div className="modal">
                      <div className="relative modal-box">
                        <label
                          htmlFor="my-modal-3"
                          className="absolute btn btn-sm btn-circle right-2 top-2"
                        >
                          {" "}
                          ✕
                        </label>
                        <h3 className="text-lg font-bold">Add your product</h3>
                        <div className="w-full form-control">
                          <label className="label">
                            <span className="label-text">Image URL</span>
                          </label>
                          <input
                            type="text"
                            value={addProductImagelink}
                            onChange={(e) =>
                              setProductImageLink(e.target.value)
                            }
                            placeholder="Image url"
                            className="w-full input input-bordered"
                          />
                          <label className="label">
                            <span className="label-text">Product name</span>
                          </label>
                          <input
                            type="text"
                            value={addProductName}
                            onChange={(e) => setProductName(e.target.value)}
                            placeholder="Product Name"
                            className="w-full input input-bordered"
                          />
                          <label className="label">
                            <span className="label-text">Product link</span>
                          </label>
                          <input
                            type="text"
                            value={addProductlink}
                            onChange={(e) => setProductLink(e.target.value)}
                            placeholder="Product link"
                            className="w-full input input-bordered"
                          />
                          <label className="label">
                            <span className="label-text">Product price</span>
                          </label>
                          
                          <span className="flex items-center w-full input input-bordered">
                          <label className="flex items-center font-semibold text-md whitespace-nowrap">
                                        {selectedCurrency ? selectedCurrency + " |" : ""}
                                      </label>
                            <input
                              type="text"
                              placeholder="Product price"
                              value={addProductPrice}
                              onChange={(e) => setProductPrice(e.target.value)}
                              className="w-full pl-1 border-none outline-none"
                            />

                            <select
                              className="border-none outline-none select-currency hide"
                              id="currencySelect"
                              style={{ width: "70px", height: "23px" }}
                              name="currency"
                              onChange={(e) => {
                                setSelectedCurrency(e.target.value);
                              }}
                            >
                              <option value=".إ">UAE Dirham (AED)</option>
                              <option value="؋">Afghani (AFN)</option>
                              <option value="Lek">Lek (Lek)</option>
                              <option value="֏">Armenian Dram (AMD)</option>
                              <option value="ƒ">
                                Netherlands Antillian Guilder (ƒ)
                              </option>
                              <option value="Kz">Kwanza (AOA)</option>
                              <option value="$">Argentine Peso ($)</option>
                              <option value="$">Australian Dollar ($)</option>
                              <option value="ƒ">Aruban Guilder (ƒ)</option>
                              <option value="AZN">
                                Azerbaijanian Manat (AZN)
                              </option>
                              <option value="KM">Convertible Marks (KM)</option>
                              <option value="$">Barbados Dollar ($)</option>

                              <option value="৳">Taka (BDT)</option>
                              <option value="Лв.">Bulgarian Lev (BGN)</option>
                              <option value="BHD">Bahraini Dinar (BHD)</option>
                              <option value="BIF">Burundi Franc (BIF)</option>
                              <option value="$">
                                Bermudian Dollar (Bermuda Dollar) ($)
                              </option>
                              <option value="$">Brunei Dollar ($)</option>
                              <option value="$b">Boliviano ($b)</option>
                              <option value="BOV">Mvdol (BOV)</option>
                              <option value="R$">Brazilian Real (R$)</option>
                              <option value="$">Bahamian Dollar ($)</option>
                              <option value="BTC">Bitcoin (BTC)</option>
                              <option value="BTN">Ngultrum (BTN)</option>
                              <option value="P">Pula (P)</option>
                              <option value="p.">Belarussian Ruble (p.)</option>
                              <option value="BZ$">Belize Dollar (BZ$)</option>
                              <option value="$">Canadian Dollar ($)</option>
                              <option value="CDF">Franc Congolais (CDF)</option>
                              <option value="CHE">WIR Euro (CHE)</option>
                              <option value="CHF">Swiss Franc (CHF)</option>
                              <option value="CHW">WIR Franc (CHW)</option>
                              <option value="CLF">des de formento (CLF)</option>
                              <option value="$">CLP - Chilean Peso ($)</option>
                              <option value="CNY">Yuan Renminbi (CNY)</option>
                              <option value="$">Colombian Peso ($)</option>
                              <option value="COU">
                                Unidad de Valor Real (COU)
                              </option>
                              <option value="CRC">
                                Costa Rican Colon (CRC)
                              </option>
                              <option value="CUC$">
                                Cuba Convertible Peso (CUC$)
                              </option>
                              <option value="CUP">Cuban Peso (CUP)</option>
                              <option value="CVE">
                                Cape Verde Escudo (CVE)
                              </option>
                              <option value="CYP">Cyprus Pound (CYP)</option>
                              <option value="CZK">Czech Koruna (CZK)</option>
                              <option value="DJF">Djibouti Franc (DJF)</option>
                              <option value="kr">Danish Krone (kr)</option>
                              <option value="RD$">Dominican Peso (RD$)</option>
                              <option value="DZD">Algerian Dinar (DZD)</option>
                              <option value="kr">Kroon (kr)</option>
                              <option value="£">Egyptian Pound (£)</option>
                              <option value="ERN">Nakfa (ERN)</option>
                              <option value="ETB">Ethiopian Birr (ETB)</option>
                              <option value="€">Euro (€)</option>
                              <option value="$"> Fiji Dollar ($)</option>
                              <option value="£">
                                Falkland Islands Pound (£)
                              </option>
                              <option value="£">Pound Sterling (£)</option>
                              <option value="GEL"> Lari (GEL)</option>
                              <option value="£"> Guernsey Pound (£)</option>
                              <option value="¢">GHS - Cedi (¢)</option>
                              <option value="£">Gibraltar Pound (£)</option>
                              <option value="GMD">Dalasi (GMD)</option>
                              <option value="GNF"> Guinea Franc (GNF)</option>
                              <option value="Q">Quetzal (Q)</option>
                              <option value="GWP">
                                Guinea-Bissau Peso (GWP)
                              </option>
                              <option value="$">Guyana Dollar ($)</option>
                              <option value="元">
                                HKD - Hong Kong Dollar (元)
                              </option>
                              <option value="L">HNL - Lempira (L)</option>
                              <option value="kn">Croatian Kuna (kn)</option>
                              <option value="G">HTG - Gourde (HTG)</option>
                              <option value="Ft"> Forint (Ft)</option>
                              <option value="Rp">IDR - Rupiah (Rp)</option>
                              <option value="ILS">
                                ILS - New Israeli Sheqel (ILS)
                              </option>
                              <option value="£">
                                IMP - Isle of Man Pound (£)
                              </option>

                              <option selected value="Rs.">
                                INR - Indian Rupee (Rs.)
                              </option>

                              <option value="IQD">Iraqi Dinar (IQD)</option>
                              <option value="IRR">
                                IRR - Iranian Rial (IRR)
                              </option>
                              <option value="kr">
                                ISK - Iceland Krona (kr)
                              </option>
                              <option value="£">Jersey Pound (£)</option>
                              <option value="J$">
                                JMD - Jamaican Dollar (J$)
                              </option>
                              <option value="JOD">Jordanian Dinar (JOD)</option>
                              <option value="¥">Yen (¥)</option>
                              <option value="KES">
                                KES - Kenyan Shilling (KES)
                              </option>
                              <option value="KGS">KGS - Som (KGS)</option>
                              <option value="KHR">KHR - Riel (KHR)</option>
                              <option value="KMF">Comoro Franc (KMF)</option>
                              <option value="₩">North Korean Won (₩)</option>
                              <option value="₩">KRW - Won (₩)</option>
                              <option value="KWD">Kuwaiti Dinar (KWD)</option>
                              <option value="$">
                                KYD - Cayman Islands Dollar ($)
                              </option>
                              <option value="KZT">Tenge (KZT)</option>
                              <option value="LAK"> Kip (LAK)</option>
                              <option value="£">
                                LBP - Lebanese Pound (£)
                              </option>
                              <option value="Rs">Sri Lanka Rupee (Rs)</option>
                              <option value="$">
                                LRD - Liberian Dollar ($)
                              </option>
                              <option value="LSL">LSL - Loti (LSL)</option>
                              <option value="Lt">Lithuanian Litas (Lt)</option>
                              <option value="Ls">
                                LVL - Latvian Lats (Ls)
                              </option>
                              <option value="LYD">Libyan Dinar (LYD)</option>
                              <option value="MAD">
                                MAD - Moroccan Dirham (MAD)
                              </option>
                              <option value="MDL">
                                MDL - Moldovan Leu (MDL)
                              </option>
                              <option value="MGA">
                                {" "}
                                Malagascy Ariary (MGA)
                              </option>
                              <option value="MKD">MKD - Denar (MKD)</option>
                              <option value="MMK">Kyat (MMK)</option>
                              <option value="MNT">MNT - Tugrik (MNT)</option>
                              <option value="MOP">MOP - Pataca (MOP)</option>
                              <option value="MRO">MRO - Ouguiya (MRO)</option>
                              <option value="MTL">
                                MTL - Maltese Lira (MTL)
                              </option>
                              <option value="Rp">Mauritius Rupee (Rp)</option>
                              <option value="MVR">MVR - Rufiyaa (MVR)</option>
                              <option value="MWK">Kwacha (MWK)</option>
                              <option value="$">Mexican Peso ($)</option>
                              <option value="MXV">
                                Mexican Unidad de Inversion (UID) (MXV)
                              </option>
                              <option value="RM">Malaysian Ringgit (RM)</option>
                              <option value="MT">MZN - Metical (MT)</option>
                              <option value="$">Namibian Dollar ($)</option>
                              <option value="NGN">Naira (NGN)</option>
                              <option value="C$">Cordoba Oro (C$)</option>
                              <option value="kr">Norwegian Krone (kr)</option>
                              <option value="Rp">Nepalese Rupee (Rp)</option>
                              <option value="$">New Zealand Dollar ($)</option>
                              <option value="OMR">Rial Omani (OMR)</option>
                              <option value="B/.">PAB - Balboa (B/.)</option>
                              <option value="S/.">PEN - Nuevo Sol (S/.)</option>
                              <option value="PGK">PGK - Kina (PGK)</option>
                              <option value="Php">Philippine Peso (Php)</option>
                              <option value="Rs">Pakistan Rupee (Rs)</option>
                              <option value="PLN">Zloty (PLN)</option>
                              <option value="Gs">PYG - Guarani (Gs)</option>
                              <option value="QAR"> Qatari Rial (QAR)</option>
                              <option value="ROL">Old Leu (ROL)</option>
                              <option value="lei">RON - New Leu (lei)</option>
                              <option value="RSD">Serbian Dinar (RSD)</option>
                              <option value="RUB">
                                RUB - Russian Ruble (RUB)
                              </option>
                              <option value="RWF">Rwanda Franc (RWF)</option>
                              <option value="SAR">Saudi Riyal (SAR)</option>
                              <option value="$">
                                Solomon Islands Dollar ($)
                              </option>
                              <option value="Rp">Seychelles Rupee (Rp)</option>
                              <option value="SDD">
                                SDD - Sudanese Dinar (SDD)
                              </option>
                              <option value="SDG">
                                SDG - Sudanese Pound (SDG)
                              </option>
                              <option value="kr">Swedish Krona (kr)</option>
                              <option value="$">Singapore Dollar ($)</option>
                              <option value="£">
                                SHP - Saint Helena Pound (£)
                              </option>
                              <option value="SIT">Tolar (SIT)</option>
                              <option value="SKK">
                                SKK - Slovak Koruna (SKK)
                              </option>
                              <option value="SLL">Leone (SLL)</option>
                              <option value="S">Somali Shilling (S)</option>
                              <option value="$">Surinam Dollar ($)</option>
                              <option value="STD">Dobra (STD)</option>
                              <option value="$">
                                SVC - El Salvador Colon ($)
                              </option>
                              <option value="£">Syrian Pound (£)</option>
                              <option value="SZL"> Lilangeni (SZL)</option>
                              <option value="THB">Baht (THB)</option>
                              <option value="TJS">Somoni (TJS)</option>
                              <option value="TMT">Manat (TMT)</option>
                              <option value="TND">Tunisian Dinar (TND)</option>
                              <option value="TOP">Paanga (TOP)</option>
                              <option value="TL">Turkish Lira (TL)</option>
                              <option value="YTL">
                                New Turkish Lira (YTL)
                              </option>
                              <option value="TT$">
                                TTD - Trinidad and Tobago Dollar (TT$)
                              </option>
                              <option value="$">TVD - Tuvalu Dollar ($)</option>
                              <option value="NT$">
                                Tew Taiwan Dollar (NT$)
                              </option>
                              <option value="TZS">
                                TZS - Tanzanian Shilling (TZS)
                              </option>
                              <option value="UAH">UAH - Hryvnia (UAH)</option>
                              <option value="UGX">Uganda Shilling (UGX)</option>
                              <option value="$">US Dollar ($)</option>
                              <option value="UYI">
                                Uruguay Peso en Unidades Indexadas (UYI)
                              </option>
                              <option value="$U"> Peso Uruguayo ($U)</option>
                              <option value="UZS">Uzbekistan Sum (UZS)</option>
                              <option value="VEB">VEB - Bolivar (VEB)</option>
                              <option value="VEF">Bolivar Fuerte (VEF)</option>
                              <option value="VND">Dong (VND)</option>
                              <option value="VUV">Vatu (VUV)</option>
                              <option value="WST">Tala (WST)</option>
                              <option value="XAF">
                                XAF - CFA Franc BEAC (XAF)
                              </option>
                              <option value="$">
                                East Caribbean Dollar ($)
                              </option>
                              <option value="XDR">SDR (XDR)</option>
                              <option value="XOF">
                                {" "}
                                CFA Franc BCEAO (XOF)
                              </option>
                              <option value="XPF">CFP Franc (XPF)</option>
                              <option value="YER">
                                YER - Yemeni Rial (YER)
                              </option>
                              <option value="R">Rand (R)</option>
                              <option value="ZMK">Zwacha (ZMK)</option>
                              <option value="Z$">Zimbabwe Dollar (Z$)</option>
                            </select>
                          </span>
                          <div className="w-1/3 pt-2 form-control">
                            <label className="cursor-pointer label">
                              <span className="pr-2 font-semibold tracking-wider label-text">
                                Disable
                              </span>
                              <input
                                type="checkbox"
                                className="toggle toggle-md"
                                checked={productStatus}
                                onChange={(e) =>
                                  setProductStatus(e.target.checked)
                                }
                              />
                              <span className="pl-2 font-semibold tracking-wider label-text">
                                Enable
                              </span>
                            </label>
                          </div>
                          <div className="flex justify-center pt-5 my-modal-action">
                                <label
                                  htmlFor="my-modal-3"
                                  className="w-4/5 m-2 btn"
                                  onClick={handleAddProductCardClick}
                                >
                                  save
                                </label>
                              </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
