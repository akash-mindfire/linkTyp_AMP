import { MdOutlinePreview } from "react-icons/md";
import { useMediaQuery } from "react-responsive";
import router from "next/router";
import { IoIosArrowRoundBack, IoLogoTumblr } from "react-icons/io";
import {
  MdOutlineLogout,
  MdOutlineNotificationsActive,
  MdSubject,
} from "react-icons/md";


import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import {auth} from '../pages/firebase'


import { Transition } from "@headlessui/react";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { BsTrash } from "react-icons/bs";
import { GrMail } from "react-icons/gr";
import { profile } from "console";
import { AiOutlineSetting } from "react-icons/ai";
import { TbFileDescription } from "react-icons/tb";
import Modal from "react-modal";
import { FiShare2 } from "react-icons/fi";
import { FaUserTie } from "react-icons/fa";
//import NotificationDetailModal from "./NotificationDetailModal";
import Backgrounds from "./modules/Backgrounds";
import { toast } from "react-toastify";
export default function Navbar({
  onAppearanceClick,
  onLinkClick,
  onAnalyticsClick,
  onSettingsClick,
  props,
  ProfileData,
  userName,
}: any) {



  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      Cookies.remove("access_token");
      router.push("/login");
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };








  let [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  let [isProfileOpen, setIsProfileOpen] = useState(false);
  let [showProfileDropDown, setShowProfileDropDown] = useState("none");
  let [isModalOpen, setIsModalOpen] = useState(false);
  const token = Cookies.get("access_token");
  let [showDropDown, setShowDropDown] = useState("none");
  let [showMobileProfileDropDown, setShowMobileProfileDropDown] =
    useState("none");
  let notificationList = ProfileData ? ProfileData?.data[0]?.messages : [];
  let [selectedNotification, setSelectedNotification] = useState<any>({});
  console.log();
  let Profiledata = ProfileData ? ProfileData?.data[0]?.profile : "";
  //  console.log(Profiledata.avatar);
  function dateFormat(date: any) {
    let d = new Date(date);
    return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
  }

  const handleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    if (isNotificationOpen) setIsNotificationOpen(!isNotificationOpen);
  };
  const openNotificationDetail = (value: any) => {
    setIsModalOpen(true);
    setSelectedNotification(value);
  };
  console.log(isModalOpen);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const closeDropDown = () => {
    //document.getElementById('dropdown-menu').style.display='none'
  };
  const handleDropdownItemClick = () => {
    setIsModalOpen(true);
  };
  console.log(isModalOpen);

  const handleDeleteNotifictaion = (id: any, index: any) => {
    axios
      .delete(`https://api.linktyp.com/api/message/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          window.location.reload();
        }

        // Update the new card state variable with the response data
        // setNewCard({ name: res.data.name, link: res.data.link });
        // console.log(newCard)
        toast.success("Notifictaion deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const username = ProfileData?.data[0]?.username;

  return (
    <div className="w-full h-full bg-white">
      {/*z-50 apply here (z-index) */}
      <div className="fixed z-50 flex flex-col-reverse items-stretch w-full bg-white border-b md:w-auto md:flex-row md:right-2 md:left-2 md:rounded-full md:items-center border-sand">
        <a
          aria-label="Admin"
          href=""
          className="hidden md:w-15 h-15 md:flex md:mx-6"
          data-testid="Route"
        >
          {/* Logo Goes Here */}
          {/* <IoLogoTumblr className="text-3xl text-black" /> */}
          <img src="/Frame 5.svg" alt="logo" className="sm:w-8 md:w-20" />
        </a>
        <div className="flex w-full h-16 overflow-x-auto md:gap-4">
          <button
            onClick={onLinkClick}
            className="relative items-center justify-center flex-1 inline-block py-3 text-center md:flex focus:outline-none group md:flex-none"
            data-testid="Route"
          >
            <span className="flex-col md:flex-row text-xs md:text-sm duration-75 ease-out font-semibold md:group-hover:bg-marble md:px-xs rounded-sm transition-background-color group-focus-visible:ring-2 group-focus-visible:ring-black -tracking-[0.35px] xl:tracking-[0px] flex items-center h-auto md:h-full text-concrete">
              <span aria-hidden="true" className="p-1 md:pr-2 md:pl-0">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className=""
                  role="img"
                  aria-hidden="false"
                  aria-labelledby="ltclid0_title "
                >
                  <title id="ltclid0_title">Links</title>
                  <path
                    fillRule="evenodd"
                    // clip-rule="evenodd"
                    d="M16 2H0V1h16v1ZM0 5.5.5 5h15l.5.5v5l-.5.5H.5l-.5-.5v-5ZM1 6v4h14V6H1Zm-1 9h16v-1H0v1Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
              <span className="block text-sm font-semibold">Links</span>
            </span>
          </button>
          <button
            onClick={onAppearanceClick}
            className="relative items-center justify-center flex-1 inline-block py-3 text-center md:flex focus:outline-none group md:flex-none"
            data-testid="Route"
          >
            <span className="flex-col md:flex-row text-xs md:text-sm duration-75 ease-out font-semibold md:group-hover:bg-marble md:px-xs rounded-sm transition-background-color group-focus-visible:ring-2 group-focus-visible:ring-black -tracking-[0.35px] xl:tracking-[0px] flex items-center h-auto md:h-full text-concrete">
              <span aria-hidden="true" className="p-1 md:pr-2 md:pl-0">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className=""
                  role="img"
                  aria-hidden="false"
                  aria-labelledby="ltclid1_title "
                >
                  <title id="ltclid1_title">Appearance</title>
                  <path
                    fillRule="evenodd"
                    // clip-rule="evenodd"
                    d="M6.008 1a5.009 5.009 0 1 0 0 10.018v1A6.009 6.009 0 1 1 6.008 0v1Zm5.01 5.009A5.009 5.009 0 0 0 6.008 1V0a6.009 6.009 0 0 1 6.01 6.009h-1Zm-4.01.5-.5.5V15.5l.5.5H15.5l.5-.5V7.008l-.5-.5H7.007Zm.5 8.492V7.508H15v7.493H7.507Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
              <span className="block text-sm font-semibold">Appearance</span>
            </span>
          </button>

          <button
            onClick={onSettingsClick}
            className="relative items-center justify-center flex-1 inline-block py-3 text-center focus:outline-none group md:flex-none"
            data-testid="Route"
          >
            <span className="flex-col md:flex-row text-xs md:text-sm duration-75 ease-out font-semibold md:group-hover:bg-marble md:px-xs rounded-sm transition-background-color group-focus-visible:ring-2 group-focus-visible:ring-black -tracking-[0.35px] xl:tracking-[0px] flex items-center h-auto md:h-full text-concrete">
              <span aria-hidden="true" className="p-1 md:pr-2 md:pl-0">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className=""
                  role="img"
                  aria-hidden="false"
                  aria-labelledby="ltclid2_title "
                >
                  <title id="ltclid2_title">Settings</title>
                  <path
                    // clip-rule="evenodd"
                    d="m11 1-1 1v2h-4l-1 1v2h-4l-1 1v6l1 1h4l.5-.5.5.5h4l.5-.5.5.5h4l1-1v-12l-1-1zm0 13h1 2 1v-1-10-1h-1-2-1v1 2 8zm-1-9h-1-2-1v1 2 5 1h1 2 1v-1-7zm-6 3h1v1 4 1h-1-2-1v-1-4-1h1z"
                    fill="currentColor"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </span>
              <span className="block text-sm font-semibold">Settings</span>
            </span>
          </button>

          <button
            className="relative items-center justify-center flex-1 inline-block py-3 text-center focus:outline-none group md:flex-none md:hidden"
            data-testid="Route"
            onClick={() => {
              showMobileProfileDropDown === "none"
                ? setShowMobileProfileDropDown("block")
                : setShowMobileProfileDropDown("none");

              setShowDropDown("none");
            }}
          >
            <span className="flex-col md:flex-row text-xs md:text-sm duration-75 ease-out font-semibold md:group-hover:bg-marble md:px-xs rounded-sm transition-background-color group-focus-visible:ring-2 group-focus-visible:ring-black -tracking-[0.35px] xl:tracking-[0px] flex items-center h-auto md:h-full text-black">
              <span
                aria-hidden="true"
                className="block rounded-full"
              >
                {Profiledata?.avatar? (
                  <img
                    src={`${Profiledata.avatar}`}
                    alt="Profile Avatar"
                    className="border border-solid rounded-full border-marble"
                    style={{ width: "1.5rem", height: "1.5rem" }}
                  />
                ) : (
                  <div
                    className="flex items-center justify-center font-bold text-white rounded-full"
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                  >
                    <img
                      src="/default.png"
                      alt="Default Avatar"
                      className="rounded-full"
                      style={{ width: "1.5rem", height: "1.5rem" }}
                    />
                  </div>
                )}
              </span>


              <span className="block text-sm font-semibold">More</span>
            </span>
          </button>
          <ul
            className="dropdown-menu origin-top-right absolute right-0 top-[75px] mt-2 w-[20rem] overflow-y-auto rounded-3xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 pt-4 px-2"
            style={{ display: `${showMobileProfileDropDown}` }}
            onMouseLeave={() => setShowMobileProfileDropDown("none")}
          >
            <li>
              <div
                className="flex w-full px-2 pt-1 pb-2 font-bold"
                style={{ borderBottom: "1px solid #dfd6d6" }}
              >
                <div>
  {Profiledata?.avatar ? (
    <img
      src={`${Profiledata.avatar}`}
      alt="Profile Avatar"
      className="w-16 h-16 border border-solid rounded-full border-marble"
    />
  ) : (
    <img
      src="/default.png"
      alt="Default Avatar"
      className="w-16 h-16 border border-solid rounded-full border-marble"
    />
  )}
</div>

                <div className="flex items-end">
                  <div className="ml-[10px] items-baseline">
                    <div
                      className="flex items-center"
                      style={{ fontSize: "18px" }}
                    >
                      {Profiledata?.name || "Your Name"}
                    </div>
                    <div style={{ fontSize: "12px" }}>
                      {ProfileData?.data[0]?.email}
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div
                className="font-medium text-lg py-2 hover:bg-[#E2E8F0] flex px-2 cursor-pointer"
                style={{ borderBottom: "1px solid #dfd6d6" }}
                onClick={() => {
                  Cookies.remove("access_token");
                  router.push("/");
                }}
              >
                <span className="mt-1">
                  <MdOutlineLogout />
                </span>
                <span className="ml-1">Log Out</span>
              </div>
            </li>
          </ul>
        </div>
        <div className="flex items-center justify-between border-b md:border-none border-marble h-15">
          <a
            aria-label="Admin"
            href=""
            className="flex-col items-center justify-center inline-block h-10 mx-4 sm:w-8 md:w-12 md:hidden"
            data-testid="Route"
          >
            <img src="/Frame 5.svg" alt="logo" className="w-20" />
          </a>
          <div className="relative flex items-center mx-2 gap-x-2 md:mx-3">
            {/* share icon start */}
            <div className="dropdown md:dropdown-left dropdown-buttom">
              <label
                tabIndex={0}
                className="flex items-center justify-center cursor-pointer">
                < MdOutlinePreview className="text-2xl text-black" />
                <span className='block pl-1 pr-1 text-sm font-semibold'>Preview</span>
              </label>
              <ul tabIndex={0} className="p-2 shadow dropdown-content menu bg-base-100 rounded-box ">
                <li className="bg-gray-300"><a href={`https://linktyp.com/${username}`} target="_blank">
                  {username}</a></li>
              </ul>
            </div>
            {/* Share Icon End */}
            {/* demo div */}
            <div className="flex h-10 dropdown">
              <button
                className="relative w-full px-2 antialiased text-black transition duration-75 ease-out border border-none outline-none dropdown-toggle h-2xl px-md rounded-xl focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black max-h-10 hover:bg-sand bg-marble active:bg-sand focus-visible:bg-sand focus-visible:outline-none border-sand hover:bg-chalk hover:border-chalk active:bg-chalk active:border-chalk"
                type="button"
                onClick={() => {
                  setShowDropDown("block");
                  setShowProfileDropDown("none");
                  setShowMobileProfileDropDown("none");
                }}
              >
                <span className="flex items-center justify-center">
                  <span className="block pr-xs">
                    {/* Demo Icon Goes Here */}
                    <MdOutlineNotificationsActive className="text-2xl text-black" />
                  </span>
                  <span className="block pl-1 pr-1 text-sm font-semibold">
                    Notification
                  </span>
                </span>
              </button>
              <ul
                className="dropdown-menu origin-top-right absolute sm:top-[-7px] sm:left-[-242px] sm:w-[24rem] md:left[-280px]   md:right-0 md:top-[35px] mt-2 w-[30rem] sm:h-[100vh] md:max-h-[30rem] overflow-y-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 pt-4 px-2"
                style={{ display: `${showDropDown}` }}
                onMouseLeave={() => setShowDropDown("none")}
              >
                <li
                  className="flex items-center w-full px-4 py-2 text-2xl font-bold"
                  style={{
                    borderBottom: "1px solid #dfd6d6",
                    // backgroundColor: "#eeeeee",
                  }}
                >
                  <span className="md:hidden sm:block">
                    <IoIosArrowRoundBack
                      onClick={() => setShowDropDown("none")}
                    />
                  </span>
                  <span className="sm:ml-2 md:ml-0">Notifications</span>
                </li>
                {notificationList?.length ? (
                  notificationList.map((n: any, index: any) => {
                    return (
                      <li
                        className="py-2 px-2 cursor-pointer hover:bg-[#E2E8F0]"
                        style={{
                          margin: "10px",
                          border: "1px solid #dbd8d8",
                          background: "#f5f7f8",
                        }}
                      >
                        <div className="flex justify-between">
                          <div>
                            <span className="font-semibold">{n.name}</span>
                          </div>
                          <div>
                            <span className="text-sm">
                              {dateFormat(n.createdAt)}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between ">
                          <div onClick={() => openNotificationDetail(n)}>
                            {" "}
                            <span className="">{n.email}</span>
                          </div>
                          <div
                            className="pt-1 hover:text-black"
                            onClick={() =>
                              handleDeleteNotifictaion(n._id, index)
                            }
                          >
                            <BsTrash />
                          </div>
                        </div>
                      </li>
                    );
                  })
                ) : (
                  <li
                    className="flex text-xl font-medium "
                    style={{ padding: "25px 20px" }}
                  >
                    No Notification found
                  </li>
                )}
              </ul>
            </div>
            <Modal
              isOpen={isModalOpen}
              // className="md:w-1/3 sm:w-full"
              onRequestClose={closeModal}
              style={{
                overlay: {
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                },

                content: {
                  background: "#fff",
                  width: isMobile ? "100%" : "30%",
                  height: isMobile ? "100vh" : "auto",
                  top: "50%",
                  left: "50%",
                  right: "auto",
                  bottom: "auto",
                  marginRight: "-50%",
                  transform: "translate(-50%, -50%)",
                  borderRadius: "8px",
                },
              }}
            >
              <div
                className="flex justify-between w-full pb-2 "
                style={{ borderBottom: "1px solid #dbd8d8" }}
              >
                <div className="flex sm:items-center">
                  <span className="text-xl md:hidden sm:block">
                    <IoIosArrowRoundBack
                      onClick={() => setIsModalOpen(false)}
                    />
                  </span>
                  <span className="font-semibold sm:text-xl md:text-2xl sm:ml-2">
                    Message Details
                  </span>
                </div>
                <div className="sm:hidden md:block">
                  <button
                    className="p-2 font-bold"
                    style={{
                      borderRadius: "50%",
                      backgroundColor: "black",
                      color: "white",
                      padding: "2px 10px 5px",
                    }}
                    onClick={closeModal}
                  >
                    x
                  </button>
                </div>
              </div>
              <div className="modal-container">
                <div className="flex w-full" style={{ margin: "2% 1%" }}>
                  <div className="flex items-center">
                    <label className="font-medium sm:text-sm md:text-xl">
                      User Name
                    </label>
                  </div>
                  <div
                    style={{
                      width: isMobile ? "73%" : "75%",
                      marginLeft: "5%",
                    }}
                  >
                    <label
                      className="flex items-center w-full border"
                      style={{ padding: "2%" }}
                    >
                      <FaUserTie />
                      <span className="ml-2 sm:text-sm">
                        {selectedNotification.name}
                      </span>
                    </label>
                  </div>
                </div>
                <div className="flex w-full" style={{ margin: "2% 1%" }}>
                  <div className="flex items-center">
                    <label className="font-medium sm:text-sm md:text-xl">
                      User Email
                    </label>
                  </div>
                  <div
                    style={{
                      width: isMobile ? "72%" : "75%",
                      marginLeft: isMobile ? "6%" : "5%",
                    }}
                  >
                    <label
                      className="flex items-center w-full border"
                      style={{ padding: "2%" }}
                    >
                      <GrMail />
                      <span className="ml-2 sm:text-sm">
                        {selectedNotification.email}
                      </span>
                    </label>
                  </div>
                </div>
                <div className="flex w-full" style={{ margin: "2% 1%" }}>
                  <div className="flex items-center">
                    <label className="font-medium sm:text-sm md:text-xl">
                      User Subject
                    </label>
                  </div>
                  <div
                    style={{
                      width: isMobile ? "71%" : "75%",
                      marginLeft: isMobile ? "3%" : "2%",
                    }}
                  >
                    <label
                      className="flex items-center w-full border"
                      style={{ padding: "2%" }}
                    >
                      <MdSubject />
                      <span className="ml-2" style={{
                        overflowWrap:"anywhere"
                      }}>{selectedNotification.title}</span>
                    </label>
                  </div>
                </div>
                <div className="flex w-full" style={{ margin: "2% 1%" }}>
                  <div className="flex items-center">
                    <label className="font-medium sm:text-sm md:text-xl">
                      Description
                    </label>
                  </div>
                  <div
                    style={{
                      width: isMobile ? "71%" : "75%",
                      marginLeft: "5%",
                    }}
                  >
                    <label
                      className="flex items-start w-full overflow-y-auto border"
                      style={{ padding: "2%", height: "100px" }}
                    >
                      <TbFileDescription style={{ marginTop: "1%" }} />
                      <span className="ml-2" style={{
                        overflowWrap:"anywhere"
                      }}>
                        {selectedNotification.message}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </Modal>
            {/* Account div */}
            <div className="relative hidden md:flex dropdown">
              <button
                className="relative transition duration-75 ease-out rounded-full dropdown-toggle hover:outline-sand hover:outline-2 hover:outline-offset-2 hover:outline focus:outline-2 focus:outline-offset-2 focus-visible:outline-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline outline outline-2"
                type="button"
                style={{ padding: "0", borderRadius: "50%" }}
                onClick={() => {
                  setShowProfileDropDown("block");

                  setShowDropDown("none");
                }}
                aria-expanded="false"
                id="headlessui-popover-button-1"
              >
                <span className="sr-only">Open user menu</span>
                <span className="relative flex w-8 overflow-hidden rounded-full">
                  <span className="sr-only">Account Menu</span>

                  <span aria-hidden="true">
                    {Profiledata?.avatar ? (
                      <img
                        src={`${Profiledata.avatar}`}
                        alt="Profile Avatar"
                        className="rounded-full"
                        style={{ width: "2rem", height: "2rem" }}
                      />
                    ) : (
                      <img
                        src="/default.png"
                        alt="Default Avatar"
                        className="rounded-full"
                        style={{ width: "2rem", height: "2rem" }}
                      />
                    )}
                  </span>

                </span>
              </button>
              <ul
                className="dropdown-menu origin-top-right absolute right-0 top-[75px] mt-2 w-[20rem] overflow-y-auto rounded-3xl shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                style={{ display: `${showProfileDropDown}` }}
                onMouseLeave={() => setShowProfileDropDown("none")}
              >
                <li>
                  <div
                    className="flex w-full px-2 pt-1 pb-2 text-xl font-bold"
                    style={{ borderBottom: "1px solid #dfd6d6" }}
                  >


                    <div style={{ width: "20%" }}>
                      {Profiledata?.avatar ? (
                        <img
                          src={`${Profiledata.avatar}`}
                          alt="Profile Avatar"
                          className="rounded-full"
                          style={{ width: "3rem", height: "3rem" }}
                        />
                      ) : (
                        <div
                          className="flex items-center justify-center font-bold text-white rounded-full"
                        >
                          <img
                            src="/default.png"
                            alt="Default Avatar"
                            className="rounded-full"
                            style={{ width: "3rem", height: "3rem" }}
                          />
                        </div>
                      )}
                    </div>




                    <div className="flex items-end">
                      <div className="ml-[10px] items-baseline">
                        <div className="flex items-center">
                          {Profiledata?.name || "Your Name"}
                        </div>
                        <div className="text-sm">
                          {ProfileData?.data[0]?.email}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="cursor-pointer">
                  <div
                    className="flex w-full px-2 py-2 text-xl font-medium bg-white"
                    // style={{ borderBottom: "1px solid #dfd6d6" }}
                    onClick={handleSignOut}
                  >
                    <span className="mt-1">
                      <MdOutlineLogout />
                    </span>
                    <span className="ml-1 cursor-pointer">Log Out</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}