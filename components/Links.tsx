import { useEffect, useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Analytics from "./modules/analytics";
import { TfiWorld } from "react-icons/tfi";
import {
  BsInstagram,
  BsClipboard,
  BsCheckCircle,
  BsTwitch,
  BsSnapchat,
  BsTiktok,
  BsSpotify,
  BsApple,
  BsReddit,
  BsDiscord,
} from "react-icons/bs";
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
import {
  FaBullseye,
  FaFacebook,
  FaInstagram,
  FaReddit,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBinLine } from "react-icons/ri";

import CardContainer from "./modules/CardContainer";
import Loader from "./modules/Loader";

export default function Links() {
  const [selectedDeleteLinkId, setSelectedDeletedLinkId] = useState("");
  const [selectedDeleteProductId, setSelectedDeletedProductId] = useState("");

  const [toggledProductId, setToggledProductId] = useState(null);
  interface ToggleStates {
    [key: string]: boolean;
  }

  interface ProductToggleStates {
    [key: string]: boolean;
  }

  const [toggleStates, setToggleStates] = useState<ToggleStates>({}); //for link status update
  const [toggleProductStates, setToggleProductStates] =
    useState<ProductToggleStates>({}); //for product status update
  console.log(toggleProductStates);

  const [open, setOpen] = useState(false);
  const [cards, setCards] = useState<{ name: string; link: string }[]>([]);
  const [productCards, setProductCards] = useState<
    {
      imageUrl: string;
      productName: string;
      productLink: string;
      productPrice: number;
    }[]
  >([]);
  const [showData, setShowData] = useState([]);
  const [productData, setProductData] = useState([]);

  const [newCard, setNewCard] = useState({ name: "", link: "" });
  const [newProductCard, setNewProductCard] = useState({
    imageUrl: "",
    productName: "",
    productLink: "",
    productPrice: "",
  });
  const [addcardText, setAddcardText] = useState("");
  const [addcardUrl, setAddcardUrl] = useState("");
  const [userData, setuserData] = useState();
  const [updateText, setupdateText] = useState("");
  const [updateUrl, setupdateUrl] = useState("");

  const [updateImageUrl, setupdateImageUrl] = useState("");
  const [updateProductName, setUpdateProductName] = useState("");
  const [updateProductLink, setupdateProductLink] = useState("");
  const [updateProductPrice, setupdateProductPrice] = useState("");
  const [updateProductStatus, setupdateProductStatus] = useState(false);
  const [showLink, setshowlink] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [showlinkUpdate, setshowlinkupdate] = useState(false);
  const [currency, setCurrency] = useState("INR");

  const [modifiedProductId, setModifiedProductId] = useState("");
  const [modifiedProductImageUrl, setModifiedProductImageUrl] = useState("");
  const [modifiedProductName, setModifiedProductName] = useState("");
  const [modifiedProductLink, setModifiedProductLink] = useState("");
  const [modifiedProductPrice, setModifiedProductPrice] = useState("");
  const [modifiedProductStatus, setModifiedProductStatus] = useState(false);




  const [selectedCurrency, setSelectedCurrency] = useState({ code: "", symbol: "" });


  // const [selectedCurrency, setSelectedCurrency] = useState("INR");


  useEffect(() => {
    console.log(selectedCurrency.code);
  }, [selectedCurrency.code]);
  
  const handleCurrencyChange = (e: any) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const currencyCode = selectedOption.getAttribute("data-code");
    const currencySymbol = selectedOption.getAttribute("data-symbol");
    console.log(currencyCode)
    console.log(currencySymbol)
    setSelectedCurrency({
      code: currencyCode || "", 
      symbol: currencySymbol || "" 
    });
   
  };
  



  const fetchData = () => {
    axios
      .get("https://api.linktyp.com/api/getdata", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setuserData(res.data);
        setShowData(res.data.data[0].containerLinks);
        console.log(showData);
        setProductData(res.data.data[0].product);

        const initialToggleStates: { [key: string]: any } = {};
        res.data.data[0].containerLinks.forEach((linkItem: any) => {
          initialToggleStates[linkItem._id] = linkItem.status;
        });
        setToggleStates(initialToggleStates);
        const initialProductsToggleStates: { [key: string]: any } = {};
        res.data.data[0].product.forEach((productItem: any) => {
          initialProductsToggleStates[productItem._id] = productItem.status;
        });
        console.log(initialProductsToggleStates);
        setToggleProductStates(initialProductsToggleStates);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(userData);

  useEffect(() => {
    fetchData();
  }, []);

  const token = Cookies.get("access_token");

  const handleAddCard = (
    cardText: string,
    cardUrl: string,
    showLink: boolean
  ) => {
    if (!cardText || !cardUrl) {
      // If either field is empty, don't add the card
      toast.warning("Fill all the inputs");
      return;
    }
    const linkRegex = /^(http:\/\/|https:\/\/)/;
    if (!cardUrl.match(linkRegex)) {
      toast.error("Invalid link");
      return;
    }

    const carddata = {
      name: cardText,
      link: cardUrl,
      status: showLink,
    };

    console.log(carddata);

    axios
      .post("https://api.linktyp.com/api/container/link", carddata, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          fetchData();
          document.dispatchEvent(new Event("refreshEvent"));
        }

        // Update the new card state variable with the response data
        setNewCard({ name: res.data.name, link: res.data.link });
        // console.log(newCard)
        toast.success("Card added successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddProductCard = (
    productImgUrl: string,
    pName: string,
    pLink: string,
    pPrice: string,
    pShowLink: boolean
  ) => {
    const linkRegex = /^(http:\/\/|https:\/\/)/;
    if (!pLink.match(linkRegex)) {
      toast.error("Invalid link");
      return;
    }

    const productCardData = {
      image: productImgUrl,
      link: pLink,
      name: pName,
      price: pPrice,
      status: pShowLink,
    };

    axios
      .post("https://api.linktyp.com/api/container/product", productCardData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);

        // Update the new card state variable with the response data
        //setNewProductCard({ imageUrl: res.data.imageUrl, productName: res.data.link });
        toast.success("Card added successfully");
        fetchData();
        document.dispatchEvent(new Event("refreshEvent"));
        if (res.data.status===true){
          
        }

      })
      .catch((err) => {
        console.log(err);
      });
  };

  //to update card
  const handleUpdateCard = (_id: number, index: number) => {
    if (!_id) {
      console.log("Error: id is undefined or null");

      return;
    }
    console.log(_id);

    const linkRegex = /^(http:\/\/|https:\/\/)/;
    if (!updateUrl.match(linkRegex)) {
      toast.error("Invalid link");
      setupdateText("");
      setupdateUrl("");
      return;
    }

    // setAddcardText(updateText);
    // setAddcardUrl(updateUrl);
    const updatedCardData = {
      name: updateText,
      link: updateUrl,
      status: showlinkUpdate,
    };

    axios
      .put(
        `https://api.linktyp.com/api/container/link/${_id}`,
        updatedCardData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);

        // Update the cards state variable with the updated card
        setCards((cards) => {
          const newCards = [...cards];
          newCards[index] = {
            name: res.data.name,
            link: res.data.link,
          };
          return newCards;
        });
        toast.success("Card updated successfully");
        fetchData();
        document.dispatchEvent(new Event("refreshEvent"));
        setupdateText("");
        setupdateUrl("");
        setupdateProductLink("")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const handleUpdateProductCard = (_id: number, index: number) => {
  //   if (!_id) {
  //     console.log("Error: id is undefined or null");
  //     return;
  //   }
  //   const linkRegex = /^(http:\/\/|https:\/\/)/;
  //   if (!updateProductLink.match(linkRegex)) {
  //     toast.error("Invalid link");
  //     setupdateImageUrl("");
  //     setUpdateProductName("");
  //     setupdateProductLink("");
  //     setupdateProductPrice("");
  //     setupdateProductStatus(false);
  //     return;
  //   }

  //   const updatedCardData = {
  //     name: updateProductLink,
  //     link: updateProductLink,
  //     status: updateProductStatus,
  //     image: updateImageUrl,
  //     price: currency + updateProductPrice,
  //   };

  //   axios
  //     .put(
  //       `https://api.linktyp.com/api/container/product/${_id}`,
  //       updatedCardData,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       console.log(res);

  //       toast.success("Card updated successfully");
  //       fetchData();
  //       document.dispatchEvent(new Event("refreshEvent"));
  //       setupdateImageUrl("");
  //       setUpdateProductName("");
  //       setupdateProductLink("");
  //       setupdateProductPrice("");
  //       setupdateProductStatus(false);
  //       setCurrency("");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const handleUpdateProductCard = () => {
    if (!modifiedProductId) {
      console.log("Error: id is undefined or null");
      return;
    }

    // Rest of the code...

    const updatedCardData = {
      name: modifiedProductName,
      link: modifiedProductLink,
      status: modifiedProductStatus,
      image: modifiedProductImageUrl,
      price: `${selectedCurrency.symbol} ${modifiedProductPrice}`,
    };

    console.log(updatedCardData)

    axios
      .put(
        `https://api.linktyp.com/api/container/product/${modifiedProductId}`,
        updatedCardData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);

        toast.success("Card updated successfully");
        fetchData();
        document.dispatchEvent(new Event("refreshEvent"));
        setModifiedProductId("");
        setModifiedProductImageUrl("");
        setModifiedProductName("");
        setModifiedProductLink("");
        setModifiedProductPrice("");
        setModifiedProductStatus(false);
        setSelectedCurrency({ code: "", symbol: "" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //to update link status
  const updateLinkStatus = (_id: any, newStatus: any, index: number) => {
    if (!_id) {
      console.log("Error: id is undefined or null");
      return;
    }

    const updatedCardData = {
      status: newStatus,
    };

    axios
      .put(
        `https://api.linktyp.com/api/container/link/status/${_id}`,
        updatedCardData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          fetchData();
          document.dispatchEvent(new Event("refreshEvent"));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const updateProductCardStatus = (
    _id: any,
    newProductStatus: any,
    index: number
  ) => {
    if (!_id) {
      console.log("Error: id is undefined or null");
      return;
    }
    console.log(_id);

    const updatedCardData = {
      status: newProductStatus,
    };

    console.log(updatedCardData);

    axios
      .put(
        `https://api.linktyp.com/api/container/product/status/${_id}`,
        updatedCardData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);

        if (res.status === 201) {
          fetchData();
          toast.success("Card updated successfully");
          document.dispatchEvent(new Event("refreshEvent"));
          setSelectedCurrency({ code: "", symbol: "" });
        }

        // fetchData();  Call fetchData() here to update the UI
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //to delete card

  const handleDeletecard = (_id: string, index: number) => {
    if (!_id) {
      console.log("Error: id is undefined or null");
      return;
    }

    axios
      .delete(`https://api.linktyp.com/api/container/link/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 201) {
          toast.success("Card deleted successfully");
          console.log(res);
          fetchData();
          document.dispatchEvent(new Event("refreshEvent"));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteProductCard = (_id: string, index: number) => {
    if (!_id) {
      console.log("Error: id is undefined or null");
      return;
    }

    axios
      .delete(`https://api.linktyp.com/api/container/product/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);

        if (res.status === 201) {
          console.log(res);
          toast.success("Card deleted successfully");
          fetchData();
          document.dispatchEvent(new Event("refreshEvent"));
        }
        console.log(`Deleted card with id: ${_id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (userData === undefined) {
    return (
      <>
        <Loader />
      </>
    );
  }

  const handleToggle = (item: { _id: string | number }) => {
    const toggleState = toggleStates[item._id];
    console.log(`Toggle state for product ${item._id} is ${toggleState}`);
  };
  // const handleModifiedProduct = (item: any) => {
  //   console.log(item);
  //   setupdateImageUrl(item.image);
  //   setUpdateProductName(item.name);
  //   setupdateProductLink(item.link);
  //   // setupdateProductPrice(item.price.substring(1, item.price.length));
  //   setupdateProductStatus(item.status);
  // };

  const handleModifiedProduct = (item: any) => {
    const getPriceDetails = (price: string): { currencySymbol: string, priceValue: string } | null => {
      const regexPattern = /^(.+)\s(.+)$/; 
    
      const match = price.match(regexPattern);
    
      if (match && match.length === 3) {
        const currencySymbol = match[1]; 
        const priceValue = match[2];    
    
        return {
          currencySymbol,
          priceValue,
        };
      }
    
      return null; 
    };
    
   console.log(item)
    
   const priceDetails = getPriceDetails(item.price);
   console.log(priceDetails.currencySymbol); 
   console.log(priceDetails.priceValue);     
    
    setModifiedProductId(item._id);
    setModifiedProductImageUrl(item.image);
    setModifiedProductName(item.name);
    setModifiedProductLink(item.link);
    setSelectedCurrency({ code: "", symbol: priceDetails.currencySymbol })
    setModifiedProductStatus(item.status)
    setModifiedProductPrice(priceDetails.priceValue)

    
  };




  const handleLinkModalClick = (item: any) => {
    setupdateText(item.name);
    setupdateUrl(item.link);
    setshowlinkupdate(item.status);
  };
  return (
    <div className="w-full h-full border-gray-100 cursor-pointer md:border-r-2">
      <div className="flex justify-center p-5">
        <div
          tabIndex={0}
          className="w-full border-b-2 collapse bg-base-100 rounded-box"
        >
          {/* Analytics Start */}
          <div className="flex items-center text-xl font-medium collapse-title">
            Analytics
          </div>
          <div className="collapse">
            <Analytics />
          </div>
        </div>
      </div>
      <div>
        <CardContainer
          addCard={handleAddCard}
          addProductCard={handleAddProductCard}
          addTypofProductCard={handleAddProductCard}
        />
      </div>
      {/* card container */}
      {showData.length > 0 ? (
        <>
          <div className="pt-10">
            <p className="mt-4 mb-8 text-lg font-bold text-center uppercase">
              Social Link Container: Manage and Edit Link Cards
            </p>
          </div>
          <div className="flex items-center justify-center w-full pb-5 ">
            <div className="flex flex-col items-center w-full px-3 md:w-4/5">
              {showData.map((item: any, index: any) => {
                let icon;
                if (item.link.includes("instagram")) {
                  icon = <FaInstagram className="text-5xl text-pink-600" />;
                } else if (item.link.includes("twitter")) {
                  icon = <FiTwitter className="text-5xl text-blue-500" />;
                } else if (item.link.includes("facebook")) {
                  icon = <FiFacebook className="text-5xl text-blue-600" />;
                } else if (item.link.includes("youtube")) {
                  icon = <FiYoutube className="text-5xl text-red-600" />;
                } else if (item.link.includes("linkedin")) {
                  icon = <FiLinkedin className="text-5xl text-blue-600" />;
                } else if (item.link.includes("whatsapp")) {
                  icon = <FaWhatsapp className="text-5xl text-green-500" />;
                } else if (item.link.includes("telegram")) {
                  icon = <TbBrandTelegram className="text-5xl text-blue-500" />;
                } else if (item.link.includes("github")) {
                  icon = <FiGithub className="text-5xl text-black-500" />;
                } else if (item.link.includes("twitter")) {
                  icon = <FiTwitter className="text-5xl text-blue-500" />;
                } else if (item.link.includes("pinterest")) {
                  icon = <ImPinterest2 className="text-5xl text-red-500" />;
                } else if (item.link.includes("reddit")) {
                  icon = <BsReddit className="text-5xl text-red-500" />;
                } else if (item.link.includes("snapchat")) {
                  icon = <BsSnapchat className="text-5xl text-yellow-500" />;
                } else if (item.link.includes("discord")) {
                  icon = <BsDiscord className="text-5xl text-blue-500" />;
                } else if (item.link.includes("spotify")) {
                  icon = <BsSpotify className="text-5xl text-green-500" />;
                } else {
                  icon = <TfiWorld className="text-5xl text-red-500" />;
                }

                return (
                  <div
                    key={index}
                    className="flex items-center justify-between w-full p-6 mt-4 bg-white border shadow-xl rounded-xl"
                  >
                    <div className="flex items-center space-x-6">
                      {icon && <h1 className="text-5xl">{icon}</h1>}
                      <div className="cursor-pointer">
                        <div className="w-[195px] pr-2">
                          <p className="text-base font-semibold truncate">
                            {item.name}
                          </p>
                        </div>
                        <div className="w-[200px]">
                          <p className="text-sm font-semibold text-gray-400 truncate">
                            {item.link}
                          </p>
                        </div>
                        <div className="flex pt-1 cursor-pointer">
                          <label htmlFor={`updateModal-${item._id}`}>
                            <TbEdit
                              className="text-xl bg-gray-300 rounded-lg cursor-pointer"
                              onClick={() => handleLinkModalClick(item)}
                            />
                          </label>
                          <input
                            type="checkbox"
                            id={`updateModal-${item._id}`}
                            className="modal-toggle"
                          />
                          <div className="modal">
                            <div className="relative modal-box ">
                              <label
                                htmlFor={`updateModal-${item._id}`}
                                className="absolute btn btn-sm btn-circle right-2 top-2"
                              >
                                ✕
                              </label>
                              {/* Modal Content Start */}
                              <div className="form-control">
                                <label className="label">
                                  <span className="pt-2 font-semibold label-text">
                                    Enter Text
                                  </span>
                                </label>
                                <label className="input-group">
                                  <span>Text</span>
                                  <input
                                    type="text"
                                    value={updateText}
                                    placeholder="Your Link Name"
                                    className="w-full input input-bordered"
                                    onChange={(e) =>
                                      setupdateText(e.target.value)
                                    }
                                  />
                                </label>
                              </div>
                              <div className="pb-3 form-control">
                                <label className="label">
                                  <span className="pt-2 font-semibold label-text">
                                    Enter Link
                                  </span>
                                </label>
                                <label className="input-group">
                                  <span>Link</span>
                                  <input
                                    type="url"
                                    value={updateUrl}
                                    placeholder="Your link"
                                    className="w-full input input-bordered"
                                    onChange={(e) =>
                                      setupdateUrl(e.target.value)
                                    }
                                  />
                                </label>
                              </div>
                              <div className="flex pt-5 item-center">
                                <span className="pr-1 font-semibold label-text md:pr-2">
                                  Disable
                                </span>
                                <input
                                  type="checkbox"
                                  className="toggle"
                                  checked={showlinkUpdate}
                                  onChange={(e) =>
                                    setshowlinkupdate(e.target.checked)
                                  }
                                />
                                <span className="pl-1 font-semibold label-text md:pl-2">
                                  Enable
                                </span>
                              </div>
                              <div className="flex justify-center pt-5 my-modal-action">
                                <label
                                  htmlFor={`updateModal-${item._id}`}
                                  className="w-4/5 m-2 btn"
                                  onClick={() =>
                                    handleUpdateCard(item._id, index)
                                  }
                                >
                                  save
                                </label>
                              </div>
                              {/* Modal Content End */}
                            </div>
                          </div>
                          {/* eddit modal end */}
                          {/* Delete Start */}
                          <label htmlFor="my-modal-6">
                            <RiDeleteBinLine
                              className="ml-3 text-xl bg-gray-300 rounded-lg cursor-pointer"
                              onClick={() => setSelectedDeletedLinkId(item._id)}
                            />
                          </label>
                          <input
                            type="checkbox"
                            id="my-modal-6"
                            className="modal-toggle"
                          />
                          <div className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box">
                              {/*  */}
                              <div className="">
                                {/* <!--body--> */}
                                <div className="justify-center flex-auto p-5 text-center">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="flex items-center w-4 h-4 mx-auto -m-1 text-red-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    ></path>
                                  </svg>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="flex items-center w-16 h-16 mx-auto text-red-500"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                      clip-rule="evenodd"
                                    />
                                  </svg>
                                  <h2 className="py-4 text-xl font-bold ">
                                    Are you sure?
                                  </h2>
                                  <p className="px-8 text-sm text-gray-500">
                                    Do you really want to delete your account?
                                    This process cannot be undone
                                  </p>
                                </div>
                                {/* <!--footer--> */}
                                <div className="p-3 mt-2 space-x-4 text-center md:block mt-modal-action">
                                  <label
                                    htmlFor="my-modal-6"
                                    className="px-5 py-2 mb-2 text-sm font-medium tracking-wider text-gray-600 bg-white border rounded-full shadow-sm md:mb-0 hover:shadow-lg hover:bg-gray-100"
                                    onClick={() => setSelectedDeletedLinkId("")}
                                  >
                                    Cancel
                                  </label>
                                  <label
                                    htmlFor="my-modal-6"
                                    className="px-5 py-2 mb-2 text-sm font-medium tracking-wider text-white bg-red-500 border border-red-500 rounded-full shadow-sm md:mb-0 hover:shadow-lg hover:bg-red-600"
                                    onClick={() =>
                                      handleDeletecard(
                                        selectedDeleteLinkId,
                                        index
                                      )
                                    }
                                  >
                                    Delete
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* delete modal end */}
                          {/* ACTIVE MODAL START */}
                          <input
                            type="checkbox"
                            className="ml-3 toggle toggle-success toggle-sm"
                            checked={toggleStates[item._id]}
                            onChange={(e) => {
                              console.log("toggle states:", toggleStates);
                              const newToggleStates = { ...toggleStates };
                              newToggleStates[item._id] = e.target.checked;
                              console.log(
                                "new toggle states:",
                                newToggleStates
                              );
                              setToggleStates(newToggleStates);
                              const itemState = newToggleStates[item._id];
                              updateLinkStatus(item._id, itemState, index); // call the updateLinkStatus function
                            }}
                          />
                          {/* ATIVE MODAL MODAL END */}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center p-2 rounded-md ">
                        {/* Active Deactive Icon Start*/}

                        {/* Active Deactive Icon End*/}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <div className="hidden"></div>
      )}

      {/* Product Card Container */}
      {productData.length > 0 ? (
        <>
          <div className="pt-10">
            <p className="mt-4 mb-8 text-lg font-bold text-center uppercase">
              Product Container: Manage and Edit Product Cards
            </p>
          </div>
          <div className="flex items-center justify-center pt-5 pb-5">
            <div className="flex flex-col items-center w-full px-3 md:w-4/5">
              {productData.map((item: any, index: any) => {
                return (
                  <>
                    <div
                      key={index}
                      className="flex items-center justify-between w-full p-4 mt-4 bg-white border shadow-xl rounded-xl"
                    >
                      <div className="flex items-center space-x-6">
                        <div className="h-20 w-28">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="object-cover h-20 rounded-lg w-28"
                          />
                        </div>
                        <div>
                          <p className="text-base font-semibold line-clamp-1">
                            {item.name}
                          </p>
                          <p className="text-sm font-semibold text-gray-400 line-clamp-1">
                            {item.link}
                          </p>
                          <p className="text-base font-semibold">
                            {" "}
                            {item.price}
                          </p>
                          <div className="flex pt-1 cursor-pointer">
                            <label htmlFor={`updateProductModal-${item._id}`}>
                              <TbEdit
                                className="text-xl bg-gray-300 rounded-lg cursor-pointer"
                                onClick={() => handleModifiedProduct(item)}
                              />
                            </label>
                            <input
                              type="checkbox"
                              id={`updateProductModal-${item._id}`}
                              className="modal-toggle"
                            />
                            <div className="modal">
                              <div className="relative modal-box ">
                                <label
                                  htmlFor={`updateProductModal-${item._id}`}
                                  className="absolute btn btn-sm btn-circle right-2 top-2"
                                >
                                  ✕
                                </label>
                                {/* Modal Content Start */}
                                <div className="form-control">
                                  <label className="label">
                                    <span className="label-text">
                                      Enter Url
                                    </span>
                                  </label>
                                  <label className="input-group">
                                    <input
                                      type="text"

                                      placeholder="Image Url"
                                      className="w-full input input-bordered"
                                      value={modifiedProductImageUrl}
                                      onChange={(e) => setModifiedProductImageUrl(e.target.value)}

                                    />
                                  </label>
                                </div>
                                <div className="pb-3 form-control">
                                  <label className="label">
                                    <span className="label-text">
                                      Enter name
                                    </span>
                                  </label>
                                  <label className="input-group">
                                    <input
                                      type="url"

                                      placeholder="Card Name"
                                      className="w-full input input-bordered"
                                      value={modifiedProductName}
                                      onChange={(e) => setModifiedProductName(e.target.value)}
                                    />
                                  </label>
                                </div>
                                <div className="form-control">
                                  <label className="label">
                                    <span className="label-text">
                                      Enter Link
                                    </span>
                                  </label>
                                  <label className="input-group">
                                    <input
                                      type="text"

                                      placeholder="Enter Link Here"
                                      className="w-full input input-bordered"
                                      value={modifiedProductLink}
                                      onChange={(e) => setModifiedProductLink(e.target.value)}
                                    />
                                  </label>
                                </div>
                                <div className="form-control">
                                  <label className="label">
                                    <span className="label-text">
                                      Enter Price
                                    </span>
                                  </label>
                                  <label className="">
                                    <span className="flex items-center w-full input input-bordered">
                                      <label className="flex items-center font-semibold text-md whitespace-nowrap">
                                        {selectedCurrency ? selectedCurrency.symbol + " |" : ""}
                                      </label>
                                      <input
                                        type="text"
                                        placeholder="Type here"
                                        value={modifiedProductPrice}
                                        onChange={(e) => setModifiedProductPrice(e.target.value)}
                                        className="w-full pl-1 border-none outline-none"
                                      />

                                      <select
                                        className="border-none outline-none select-currency hide"
                                        id="currencySelect"
                                        style={{
                                          width: "70px",
                                          height: "23px",
                                        }}
                                        name="currency"
                                       
                                        onChange={handleCurrencyChange}
                                      >
                                        <option value=".إ" data-code="AED" data-symbol=".إ" >UAE Dirham (AED)</option>
                                        <option value="؋" data-code="AFN" data-symbol="؋">Afghani (AFN)</option>
                                        <option value="Lek" data-code="ALL" data-symbol="Lek">Lek (Lek)</option>
                                        <option value="֏" data-code="AMD" data-symbol="֏">Armenian Dram (AMD)</option>
                                        <option value="ƒ" data-code="ANG" data-symbol="ƒ">Netherlands Antillian Guilder (ƒ)</option>
                                        <option value="Kz" data-code="AOA" data-symbol="Kz">Kwanza (AOA)</option>
                                        <option value="$" data-code="ARS" data-symbol="$">Argentine Peso ($)</option>
                                        <option value="$" data-code="AUD" data-symbol="$">Australian Dollar ($)</option>
                                        <option value="ƒ" data-code="AWG" data-symbol="ƒ">Aruban Guilder (ƒ)</option>
                                        <option value="AZN" data-code="AZN" data-symbol="AZN">Azerbaijanian Manat (AZN)</option>
                                        <option value="KM" data-code="BAM" data-symbol="KM">Convertible Marks (KM)</option>
                                        <option value="$" data-code="BBD" data-symbol="$">Barbados Dollar ($)</option>
                                        <option value="৳" data-code="BDT" data-symbol="৳">Taka (BDT)</option>
                                        <option value="Лв." data-code="BGN" data-symbol="Лв.">Bulgarian Lev (BGN)</option>
                                        <option value="BHD" data-code="BHD" data-symbol="BHD">Bahraini Dinar (BHD)</option>
                                        <option value="BIF" data-code="BIF" data-symbol="BIF">Burundi Franc (BIF)</option>
                                        <option value="$" data-code="BMD" data-symbol="$">Bermudian Dollar (Bermuda Dollar) ($)</option>
                                        <option value="$" data-code="BND" data-symbol="$">Brunei Dollar ($)</option>
                                        <option value="$b" data-code="BOB" data-symbol="$b">Boliviano ($b)</option>
                                        <option value="BOV" data-code="BOV" data-symbol="BOV">Mvdol (BOV)</option>
                                        <option value="R$" data-code="BRL" data-symbol="R$">Brazilian Real (R$)</option>
                                        <option value="$" data-code="BSD" data-symbol="$">Bahamian Dollar ($)</option>
                                        <option value="BTC" data-code="BTC" data-symbol="BTC">Bitcoin (BTC)</option>
                                        <option value="BTN" data-code="BTN" data-symbol="BTN">Ngultrum (BTN)</option>
                                        <option value="P" data-code="BWP" data-symbol="P">Pula (P)</option>
                                        <option value="p." data-code="BYR" data-symbol="p.">Belarussian Ruble (p.)</option>
                                        <option value="BZ$" data-code="BZD" data-symbol="BZ$">Belize Dollar (BZ$)</option>
                                        <option value="$" data-code="CAD" data-symbol="$">Canadian Dollar ($)</option>
                                        <option value="CDF" data-code="CDF" data-symbol="CDF">Franc Congolais (CDF)</option>
                                        <option value="CHE" data-code="CHE" data-symbol="CHE">WIR Euro (CHE)</option>
                                        <option value="CHF" data-code="CHF" data-symbol="CHF">Swiss Franc (CHF)</option>
                                        <option value="CHW" data-code="CHW" data-symbol="CHW">WIR Franc (CHW)</option>
                                        <option value="CLF" data-code="CLF" data-symbol="CLF">des de formento (CLF)</option>
                                        <option value="$" data-code="CLP" data-symbol="$">CLP - Chilean Peso ($)</option>
                                        <option value="CNY" data-code="CNY" data-symbol="CNY">Yuan Renminbi (CNY)</option>
                                        <option value="$" data-code="COP" data-symbol="$">Colombian Peso ($)</option>
                                        <option value="COU" data-code="COU" data-symbol="COU">Unidad de Valor Real (COU)</option>
                                        <option value="CRC" data-code="CRC" data-symbol="CRC">Costa Rican Colon (CRC)</option>
                                        <option value="CUC$" data-code="CUC" data-symbol="CUC$">Cuba Convertible Peso (CUC$)</option>
                                        <option value="CUP" data-code="CUP" data-symbol="CUP">Cuban Peso (CUP)</option>
                                        <option value="CVE" data-code="CVE" data-symbol="CVE">Cape Verde Escudo (CVE)</option>
                                        <option value="CYP" data-code="CYP" data-symbol="CYP">Cyprus Pound (CYP)</option>
                                        <option value="CZK" data-code="CZK" data-symbol="CZK">Czech Koruna (CZK)</option>
                                        <option value="DJF" data-code="DJF" data-symbol="DJF">Djibouti Franc (DJF)</option>
                                        <option value="kr" data-code="DKK" data-symbol="kr">Danish Krone (kr)</option>
                                        <option value="RD$" data-code="DOP" data-symbol="RD$">Dominican Peso (RD$)</option>
                                        <option value="DZD" data-code="DZD" data-symbol="DZD">Algerian Dinar (DZD)</option>
                                        <option value="kr" data-code="EEK" data-symbol="kr">Kroon (kr)</option>
                                        <option value="£" data-code="EGP" data-symbol="£">Egyptian Pound (£)</option>
                                        <option value="ERN" data-code="ERN" data-symbol="ERN">Nakfa (ERN)</option>
                                        <option value="ETB" data-code="ETB" data-symbol="ETB">Ethiopian Birr (ETB)</option>
                                        <option value="€" data-code="EUR" data-symbol="€">Euro (€)</option>
                                        <option value="$" data-code="FJD" data-symbol="$">Fiji Dollar ($)</option>
                                        <option value="£" data-code="FKP" data-symbol="£">Falkland Islands Pound (£)</option>
                                        <option value="£" data-code="GBP" data-symbol="£">Pound Sterling (£)</option>
                                        <option value="GEL" data-code="GEL" data-symbol="GEL">Lari (GEL)</option>
                                        <option value="£" data-code="GGP" data-symbol="£">Guernsey Pound (£)</option>
                                        <option value="¢" data-code="GHS" data-symbol="¢">GHS - Cedi (¢)</option>
                                        <option value="£" data-code="GIP" data-symbol="£">Gibraltar Pound (£)</option>
                                        <option value="GMD" data-code="GMD" data-symbol="GMD">Dalasi (GMD)</option>
                                        <option value="GNF" data-code="GNF" data-symbol="GNF">Guinea Franc (GNF)</option>
                                        <option value="Q" data-code="GTQ" data-symbol="Q">Quetzal (Q)</option>
                                        <option value="GWP" data-code="GWP" data-symbol="GWP">Guinea-Bissau Peso (GWP)</option>
                                        <option value="$" data-code="GYD" data-symbol="$">Guyana Dollar ($)</option>
                                        <option value="元" data-code="HKD" data-symbol="元">HKD - Hong Kong Dollar (元)</option>
                                        <option value="L" data-code="HNL" data-symbol="L">HNL - Lempira (L)</option>
                                        <option value="kn" data-code="HRK" data-symbol="kn">Croatian Kuna (kn)</option>
                                        <option value="G" data-code="HTG" data-symbol="G">HTG - Gourde (HTG)</option>
                                        <option value="Ft" data-code="HUF" data-symbol="Ft">Forint (Ft)</option>
                                        <option value="Rp" data-code="IDR" data-symbol="Rp">IDR - Rupiah (Rp)</option>
                                        <option value="ILS" data-code="ILS" data-symbol="ILS">ILS - New Israeli Sheqel (ILS)</option>
                                        <option value="£" data-code="IMP" data-symbol="£">IMP - Isle of Man Pound (£)</option>
                                        <option value="Rs."  data-code="INR" data-symbol="Rs.">INR - Indian Rupee (Rs.)</option>

                                        <option value="IQD" data-code="IQD" data-symbol="IQD">Iraqi Dinar (IQD)</option>
                                        <option value="IRR" data-code="IRR" data-symbol="IRR">IRR - Iranian Rial (IRR)</option>
                                        <option value="ISK" data-code="ISK" data-symbol="kr">ISK - Iceland Krona (kr)</option>
                                        <option value="JEP" data-code="JEP" data-symbol="£">Jersey Pound (£)</option>
                                        <option value="JMD" data-code="JMD" data-symbol="J$">JMD - Jamaican Dollar (J$)</option>
                                        <option value="JOD" data-code="JOD" data-symbol="JOD">Jordanian Dinar (JOD)</option>
                                        <option value="JPY" data-code="JPY" data-symbol="¥">Yen (¥)</option>
                                        <option value="KES" data-code="KES" data-symbol="KES">KES - Kenyan Shilling (KES)</option>
                                        <option value="KGS" data-code="KGS" data-symbol="KGS">KGS - Som (KGS)</option>
                                        <option value="KHR" data-code="KHR" data-symbol="KHR">KHR - Riel (KHR)</option>
                                        <option value="KMF" data-code="KMF" data-symbol="KMF">Comoro Franc (KMF)</option>
                                        <option value="KPW" data-code="KPW" data-symbol="₩">North Korean Won (₩)</option>
                                        <option value="KRW" data-code="KRW" data-symbol="₩">KRW - Won (₩)</option>
                                        <option value="KWD" data-code="KWD" data-symbol="KWD">Kuwaiti Dinar (KWD)</option>
                                        <option value="KYD" data-code="KYD" data-symbol="$">KYD - Cayman Islands Dollar ($)</option>
                                        <option value="KZT" data-code="KZT" data-symbol="KZT">Tenge (KZT)</option>
                                        <option value="LAK" data-code="LAK" data-symbol="LAK"> Kip (LAK)</option>
                                        <option value="LBP" data-code="LBP" data-symbol="£">LBP - Lebanese Pound (£)</option>
                                        <option value="LKR" data-code="LKR" data-symbol="Rs">Sri Lanka Rupee (Rs)</option>
                                        <option value="LRD" data-code="LRD" data-symbol="$">LRD - Liberian Dollar ($)</option>
                                        <option value="LSL" data-code="LSL" data-symbol="LSL">LSL - Loti (LSL)</option>
                                        <option value="LTL" data-code="LTL" data-symbol="Lt">Lithuanian Litas (Lt)</option>
                                        <option value="LVL" data-code="LVL" data-symbol="Ls">LVL - Latvian Lats (Ls)</option>
                                        <option value="LYD" data-code="LYD" data-symbol="LYD">Libyan Dinar (LYD)</option>
                                        <option value="MAD" data-code="MAD" data-symbol="MAD">MAD - Moroccan Dirham (MAD)</option>
                                        <option value="MDL" data-code="MDL" data-symbol="MDL">MDL - Moldovan Leu (MDL)</option>
                                        <option value="MGA" data-code="MGA" data-symbol="MGA"> Malagascy Ariary (MGA)</option>
                                        <option value="MKD" data-code="MKD" data-symbol="MKD">MKD - Denar (MKD)</option>
                                        <option value="MMK" data-code="MMK" data-symbol="MMK">Kyat (MMK)</option>
                                        <option value="MNT" data-code="MNT" data-symbol="MNT">MNT - Tugrik (MNT)</option>
                                        <option value="MOP" data-code="MOP" data-symbol="MOP">MOP - Pataca (MOP)</option>
                                        <option value="MRO" data-code="MRO" data-symbol="MRO">MRO - Ouguiya (MRO)</option>
                                        <option value="MTL" data-code="MTL" data-symbol="MTL">MTL - Maltese Lira (MTL)</option>
                                        <option value="MUR" data-code="MUR" data-symbol="Rp">Mauritius Rupee (Rp)</option>
                                        <option value="MVR" data-code="MVR" data-symbol="MVR">MVR - Rufiyaa (MVR)</option>
                                        <option value="MWK" data-code="MWK" data-symbol="MWK">Kwacha (MWK)</option>
                                        <option value="MXN" data-code="MXN" data-symbol="$">Mexican Peso ($)</option>
                                        <option value="MXV" data-code="MXV" data-symbol="MXV">Mexican Unidad de Inversion (UID) (MXV)</option>
                                        <option value="MYR" data-code="MYR" data-symbol="RM">Malaysian Ringgit (RM)</option>
                                        <option value="MZN" data-code="MZN" data-symbol="MT">MZN - Metical (MT)</option>
                                        <option value="NAD" data-code="NAD" data-symbol="$">Namibian Dollar ($)</option>
                                        <option value="NGN" data-code="NGN" data-symbol="NGN">Naira (NGN)</option>
                                        <option value="NIO" data-code="NIO" data-symbol="C$">Cordoba Oro (C$)</option>
                                        <option value="NOK" data-code="NOK" data-symbol="kr">Norwegian Krone (kr)</option>
                                        <option value="NPR" data-code="NPR" data-symbol="Rp">Nepalese Rupee (Rp)</option>
                                        <option value="NZD" data-code="NZD" data-symbol="$">New Zealand Dollar ($)</option>
                                        <option value="OMR" data-code="OMR" data-symbol="OMR">Rial Omani (OMR)</option>
                                        <option value="PAB" data-code="PAB" data-symbol="B/.">PAB - Balboa (B/.)</option>
                                        <option value="PEN" data-code="PEN" data-symbol="S/.">PEN - Nuevo Sol (S/.)</option>
                                        <option value="PGK" data-code="PGK" data-symbol="PGK">PGK - Kina (PGK)</option>
                                        <option value="PHP" data-code="PHP" data-symbol="Php">Philippine Peso (Php)</option>
                                        <option value="PKR" data-code="PKR" data-symbol="Rs">Pakistan Rupee (Rs)</option>
                                        <option value="PLN" data-code="PLN" data-symbol="PLN">Zloty (PLN)</option>
                                        <option value="PYG" data-code="PYG" data-symbol="Gs">PYG - Guarani (Gs)</option>
                                        <option value="QAR" data-code="QAR" data-symbol="QAR"> Qatari Rial (QAR)</option>
                                        <option value="ROL" data-code="ROL" data-symbol="ROL">Old Leu (ROL)</option>
                                        <option value="RON" data-code="RON" data-symbol="lei">RON - New Leu (lei)</option>
                                        <option value="RSD" data-code="RSD" data-symbol="RSD">Serbian Dinar (RSD)</option>
                                        <option value="RUB" data-code="RUB" data-symbol="RUB">RUB - Russian Ruble (RUB)</option>
                                        <option value="RWF" data-code="RWF" data-symbol="RWF">Rwanda Franc (RWF)</option>
                                        <option value="SAR" data-code="SAR" data-symbol="SAR">Saudi Riyal (SAR)</option>
                                        <option value="SBD" data-code="SBD" data-symbol="$">Solomon Islands Dollar ($)</option>
                                        <option value="SCR" data-code="SCR" data-symbol="Rp">Seychelles Rupee (Rp)</option>
                                        <option value="SDD" data-code="SDD" data-symbol="SDD">SDD - Sudanese Dinar (SDD)</option>
                                        <option value="SDG" data-code="SDG" data-symbol="SDG">SDG - Sudanese Pound (SDG)</option>
                                        <option value="SEK" data-code="SEK" data-symbol="kr">Swedish Krona (kr)</option>
                                        <option value="SGD" data-code="SGD" data-symbol="$">Singapore Dollar ($)</option>
                                        <option value="SHP" data-code="SHP" data-symbol="£">SHP - Saint Helena Pound (£)</option>
                                        <option value="SIT" data-code="SIT" data-symbol="SIT">Tolar (SIT)</option>
                                        <option value="SKK" data-code="SKK" data-symbol="SKK">SKK - Slovak Koruna (SKK)</option>
                                        <option value="SLL" data-code="SLL" data-symbol="SLL">Leone (SLL)</option>
                                        <option value="SOS" data-code="SOS" data-symbol="S">Somali Shilling (S)</option>
                                        <option value="SRD" data-code="SRD" data-symbol="$">Surinam Dollar ($)</option>
                                        <option value="STD" data-code="STD" data-symbol="STD">Dobra (STD)</option>
                                        <option value="SVC" data-code="SVC" data-symbol="$">SVC - El Salvador Colon ($)</option>
                                        <option value="SYP" data-code="SYP" data-symbol="£">Syrian Pound (£)</option>
                                        <option value="SZL" data-code="SZL" data-symbol="SZL"> Lilangeni (SZL)</option>
                                        <option value="THB" data-code="THB" data-symbol="THB">Baht (THB)</option>
                                        <option value="TJS" data-code="TJS" data-symbol="TJS">Somoni (TJS)</option>
                                        <option value="TMT" data-code="TMT" data-symbol="TMT">Manat (TMT)</option>
                                        <option value="TND" data-code="TND" data-symbol="TND">Tunisian Dinar (TND)</option>
                                        <option value="TOP" data-code="TOP" data-symbol="TOP">Paanga (TOP)</option>
                                        <option value="TRL" data-code="TRL" data-symbol="TL">Turkish Lira (TL)</option>
                                        <option value="TRY" data-code="TRY" data-symbol="YTL">New Turkish Lira (YTL)</option>
                                        <option value="TTD" data-code="TTD" data-symbol="TT$">TTD - Trinidad and Tobago Dollar (TT$)</option>
                                        <option value="TVD" data-code="TVD" data-symbol="$">TVD - Tuvalu Dollar ($)</option>
                                        <option value="TWD" data-code="TWD" data-symbol="NT$">TWD - Taiwan New Dollar (NT$)</option>
                                        <option value="TZS" data-code="TZS" data-symbol="TZS">TZS - Tanzanian Shilling (TZS)</option>
                                        <option value="UAH" data-code="UAH" data-symbol="UAH">UAH - Ukrainian Hryvnia (UAH)</option>
                                        <option value="UGX" data-code="UGX" data-symbol="UGX">Uganda Shilling (UGX)</option>
                                        <option value="USD" data-code="USD" data-symbol="$">US Dollar ($)</option>
                                        <option value="UYU" data-code="UYU" data-symbol="$U">Peso Uruguayo ($U)</option>
                                        <option value="UZS" data-code="UZS" data-symbol="UZS">UZS - Uzbekistan Sum (UZS)</option>
                                        <option value="VEB" data-code="VEB" data-symbol="Bs">Venezuelan Bolivar (Bs)</option>
                                        <option value="VEF" data-code="VEF" data-symbol="BsF">VEF - Venezuelan Bolivar (BsF)</option>
                                        <option value="VND" data-code="VND" data-symbol="₫">VND - Vietnamese Dong (₫)</option>
                                        <option value="VUV" data-code="VUV" data-symbol="VUV">VUV - Vanuatu Vatu (VUV)</option>
                                        <option value="WST" data-code="WST" data-symbol="WST">Tala (WST)</option>
                                        <option value="XAF" data-code="XAF" data-symbol="XAF">XAF - CFA Franc BEAC (XAF)</option>
                                        <option value="XAG" data-code="XAG" data-symbol="oz">Silver (oz)</option>
                                        <option value="XAU" data-code="XAU" data-symbol="oz">Gold (oz)</option>
                                        <option value="XCD" data-code="XCD" data-symbol="EC$">East Caribbean Dollar (EC$)</option>
                                        <option value="XDR" data-code="XDR" data-symbol="XDR">Special Drawing Rights (XDR)</option>
                                        <option value="XOF" data-code="XOF" data-symbol="XOF">XOF - CFA Franc BCEAO (XOF)</option>
                                        <option value="XPD" data-code="XPD" data-symbol="oz">Palladium (oz)</option>
                                        <option value="XPF" data-code="XPF" data-symbol="XPF">XPF - CFP Franc (XPF)</option>
                                        <option value="XPT" data-code="XPT" data-symbol="oz">Platinum (oz)</option>
                                        <option value="YER" data-code="YER" data-symbol="YER">YER - Yemeni Rial (YER)</option>
                                        <option value="YUM" data-code="YUM" data-symbol="YUM">YUM - Yugoslavian Dinar (YUM)</option>
                                        <option value="ZAR" data-code="ZAR" data-symbol="R">South African Rand (R)</option>
                                        <option value="ZMK" data-code="ZMK" data-symbol="ZMK">ZMK - Zambian Kwacha (ZMK)</option>
                                        <option value="ZMW" data-code="ZMW" data-symbol="ZMW">ZMW - Zambian Kwacha (ZMW)</option>
                                        <option value="ZWD" data-code="ZWD" data-symbol="Z$">ZWD - Zimbabwe Dollar (Z$)</option>
                                      </select>

                                    </span>
                                  </label>
                                </div>
                                <input
                                  type="checkbox"
                                  className="mt-2 toggle toggle-success"
                                  checked={modifiedProductStatus}
                                  onChange={(e) =>
                                    setModifiedProductStatus(e.target.checked)
                                  }
                                />
                                <div className="flex justify-center my-modal-action">
                                  <label
                                    htmlFor={`updateProductModal-${item._id}`}
                                    className="w-4/5 m-2 btn"
                                    onClick={handleUpdateProductCard}
                                  >
                                    save
                                  </label>
                                </div>
                                {/* Modal Content End */}
                              </div>
                            </div>

                            {/* eddit modal end */}
                            {/* delete  modal */}
                            <label htmlFor="my-modal-7">
                              <RiDeleteBinLine
                                className="ml-3 text-xl bg-gray-300 rounded-lg cursor-pointer"
                                onClick={() =>
                                  setSelectedDeletedProductId(item._id)
                                }
                              />
                            </label>
                            <input
                              type="checkbox"
                              id="my-modal-7"
                              className="modal-toggle"
                            />
                            <div className="modal modal-bottom sm:modal-middle">
                              <div className="modal-box">
                                {/*  */}
                                <div className="">
                                  {/* <!--body--> */}
                                  <div className="justify-center flex-auto p-5 text-center">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="flex items-center w-4 h-4 mx-auto -m-1 text-red-500"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                      ></path>
                                    </svg>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="flex items-center w-16 h-16 mx-auto text-red-500"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                        clip-rule="evenodd"
                                      />
                                    </svg>
                                    <h2 className="py-4 text-xl font-bold ">
                                      Are you sure?
                                    </h2>
                                    <p className="px-8 text-sm text-gray-500">
                                      Do you really want to delete your account?
                                      This process cannot be undone
                                    </p>
                                  </div>
                                  {/* <!--footer--> */}
                                  <div className="p-3 mt-2 space-x-4 text-center md:block mt-modal-action">
                                    <label
                                      htmlFor="my-modal-7"
                                      className="px-5 py-2 mb-2 text-sm font-medium tracking-wider text-gray-600 bg-white border rounded-full shadow-sm md:mb-0 hover:shadow-lg hover:bg-gray-100"
                                      onClick={() =>
                                        setSelectedDeletedProductId("")
                                      }
                                    >
                                      Cancel
                                    </label>
                                    <label
                                      htmlFor="my-modal-7"
                                      className="px-5 py-2 mb-2 text-sm font-medium tracking-wider text-white bg-red-500 border border-red-500 rounded-full shadow-sm md:mb-0 hover:shadow-lg hover:bg-red-600"
                                      onClick={() =>
                                        handleDeleteProductCard(
                                          selectedDeleteProductId,
                                          index
                                        )
                                      }
                                    >
                                      Delete
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* delete modal for product end*/}
                            {/* Active Deactive Icon Start*/}
                            <input
                              type="checkbox"
                              className="ml-3 toggle toggle-success toggle-sm"
                              checked={toggleProductStates[item._id]}
                              onChange={(e) => {
                                console.log(
                                  "toggle states:",
                                  toggleProductStates
                                );
                                const newProductToggleStates = {
                                  ...toggleProductStates,
                                };
                                newProductToggleStates[item._id] =
                                  e.target.checked;
                                console.log(
                                  "new toggle states:",
                                  newProductToggleStates
                                );
                                setToggleProductStates(newProductToggleStates);
                                const itemProductState =
                                  newProductToggleStates[item._id];
                                updateProductCardStatus(
                                  item._id,
                                  itemProductState,
                                  index
                                ); // call the updateLinkStatus function
                              }}
                            />
                            {/* Active Deactive Icon End*/}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center p-2 rounded-md "></div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <div className="hidden"></div>
      )}
    </div>
  );
}
